using System.Net;
using System.Net.Mail;
using Application.Services.Repositories;
using Application.SubServices.MailService;
using Domain.Entities;

using Microsoft.Extensions.Options;

namespace Infrastructure.Mailing
{

    public class MailService : IMailService
    {
        private readonly IMailLogRepository _mailLogRepository;
        private readonly SmtpMailSettings _smtpSettings;

        public MailService(IMailLogRepository mailLogRepository,
                           IOptions<SmtpMailSettings> smtpSettings)
        {
            _mailLogRepository = mailLogRepository;
            _smtpSettings = smtpSettings.Value;
            
            // SMTP ayarlarının doğruluğunu kontrol et
            ValidateSmtpSettings();
        }
        
        private void ValidateSmtpSettings()
        {
            if (string.IsNullOrEmpty(_smtpSettings.Host))
                throw new ArgumentException("SMTP Host boş olamaz");
                
            if (string.IsNullOrEmpty(_smtpSettings.Username))
                throw new ArgumentException("SMTP Username boş olamaz");
                
            if (string.IsNullOrEmpty(_smtpSettings.Password))
                throw new ArgumentException("SMTP Password boş olamaz");
                
            if (string.IsNullOrEmpty(_smtpSettings.FromAddress))
                throw new ArgumentException("SMTP FromAddress boş olamaz");
                
            if (string.IsNullOrEmpty(_smtpSettings.FromName))
                throw new ArgumentException("SMTP FromName boş olamaz");
        }


        public async Task SendMailAsync(MailDto mailDto)
        {
            // Gelen veriyi doğrula
            if (string.IsNullOrEmpty(mailDto.To))
                throw new ArgumentException("Alıcı e-posta adresi boş olamaz", nameof(mailDto.To));
                
            if (string.IsNullOrEmpty(mailDto.Subject))
                throw new ArgumentException("E-posta konusu boş olamaz", nameof(mailDto.Subject));
                
            if (string.IsNullOrEmpty(mailDto.Body))
                throw new ArgumentException("E-posta içeriği boş olamaz", nameof(mailDto.Body));
            
            // MailLog nesnesini hazırlıyoruz (başta IsSentSuccessfully = false)
            var mailLog = new MailLog
            {
                Id = Guid.NewGuid(),
                SentDate = DateTime.UtcNow,
                From = _smtpSettings.FromAddress, // sabit from
                To = mailDto.To,
                Subject = mailDto.Subject,
                Body = mailDto.Body,
                IsBodyHtml = mailDto.IsBodyHtml,
                IsSentSuccessfully = false
            };

            try
            {
                using var smtpClient = new SmtpClient
                {
                    Host = _smtpSettings.Host,
                    Port = _smtpSettings.Port,
                    EnableSsl = _smtpSettings.EnableSsl,
                    UseDefaultCredentials = _smtpSettings.UseDefaultCredentials,
                    Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password)
                };

                var fromAddress = new MailAddress(
                    _smtpSettings.FromAddress,
                    _smtpSettings.FromName
                );

                using var message = new MailMessage
                {
                    From = fromAddress,
                    Subject = mailDto.Subject,
                    Body = mailDto.Body,
                    IsBodyHtml = mailDto.IsBodyHtml
                };

                // Alıcı
                message.To.Add(new MailAddress(mailDto.To));

                // Gönder
                await smtpClient.SendMailAsync(message);

                // Gönderim başarılı oldu
                mailLog.IsSentSuccessfully = true;
            }
            catch (Exception ex)
            {
                // Hata durumunda error mesajı kaydedelim
                mailLog.ErrorMessage = ex.Message;
            }

            // Mail log tablosuna kaydet
            await _mailLogRepository.AddAsync(mailLog);
        }
    }
}
