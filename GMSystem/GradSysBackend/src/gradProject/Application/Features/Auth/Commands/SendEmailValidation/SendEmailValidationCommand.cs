using Application.Services.Repositories;
using Application.SubServices.MailService;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Application.Constants;

namespace Application.Features.Auth.Commands.SendEmailValidation;

public class SendEmailValidationCommand : IRequest<SendEmailValidationResponse>
{
    public string Email { get; set; }

    public class SendEmailValidationCommandHandler : IRequestHandler<SendEmailValidationCommand, SendEmailValidationResponse>
    {
        private readonly IValidationCodeRepository _validationCodeRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMailService _mailService;

        public SendEmailValidationCommandHandler(
            IValidationCodeRepository validationCodeRepository,
            IUserRepository userRepository,
            IMailService mailService)
        {
            _validationCodeRepository = validationCodeRepository;
            _userRepository = userRepository;
            _mailService = mailService;
        }

        public async Task<SendEmailValidationResponse> Handle(SendEmailValidationCommand request, CancellationToken cancellationToken)
        {


            string code = new Random().Next(100000, 999999).ToString();
            var expireDate = DateTime.UtcNow.AddMinutes(15);

            var validationCode = new ValidationCode
            {
                Id = Guid.NewGuid(),
                Code = code,
                ExpireDate = expireDate,
                IsUsed = false,
                ValidationType = ValidationPurpose.EmailVerification
            };

            await _validationCodeRepository.AddAsync(validationCode);

            var mailDto = new MailDto
            {
                To = request.Email,
                Subject = MailTemplates.EmailVerification.SUBJECT,
                Body = MailTemplates.EmailVerification.GetBody(code),
                IsBodyHtml = MailTemplates.Settings.USE_HTML
            };

            await _mailService.SendMailAsync(mailDto);

            return new SendEmailValidationResponse
            {
                Message = "Doğrulama kodu email adresinize gönderildi.",
                IsSuccess = true,
                ExpireDate = expireDate
            };
        }
    }
} 