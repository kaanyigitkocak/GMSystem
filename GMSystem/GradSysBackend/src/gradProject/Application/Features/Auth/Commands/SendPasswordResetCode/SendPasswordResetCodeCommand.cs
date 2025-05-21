using Application.Services.Repositories;
using Application.SubServices.MailService;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Application.Constants;

namespace Application.Features.Auth.Commands.SendPasswordResetCode;

public class SendPasswordResetCodeCommand : IRequest<SendPasswordResetCodeResponse>
{
    public string Email { get; set; }

    public class SendPasswordResetCodeCommandHandler : IRequestHandler<SendPasswordResetCodeCommand, SendPasswordResetCodeResponse>
    {
        private readonly IValidationCodeRepository _validationCodeRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMailService _mailService;

        public SendPasswordResetCodeCommandHandler(
            IValidationCodeRepository validationCodeRepository,
            IUserRepository userRepository,
            IMailService mailService)
        {
            _validationCodeRepository = validationCodeRepository;
            _userRepository = userRepository;
            _mailService = mailService;
        }

        public async Task<SendPasswordResetCodeResponse> Handle(SendPasswordResetCodeCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetAsync(u => u.Email == request.Email);
            if (user == null)
                throw new Exception("Kullanıcı bulunamadı.");

            string code = new Random().Next(100000, 999999).ToString();
            var expireDate = DateTime.UtcNow.AddMinutes(15);

            var validationCode = new ValidationCode
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                Code = code,
                ExpireDate = expireDate,
                IsUsed = false,
                ValidationType = ValidationPurpose.PasswordReset
            };

            await _validationCodeRepository.AddAsync(validationCode);

            var mailDto = new MailDto
            {
                To = user.Email,
                Subject = MailTemplates.PasswordReset.SUBJECT,
                Body = MailTemplates.PasswordReset.GetBody(code),
                IsBodyHtml = MailTemplates.Settings.USE_HTML
            };

            await _mailService.SendMailAsync(mailDto);

            return new SendPasswordResetCodeResponse
            {
                Message = "Şifre sıfırlama kodu email adresinize gönderildi.",
                IsSuccess = true,
                ExpireDate = expireDate
            };
        }
    }
} 