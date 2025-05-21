using Domain.Enums;
using Application.Services.Repositories;
using MediatR;

namespace Application.Features.Auth.Commands.VerifyCode;

public class VerifyCodeCommand : IRequest<VerifyCodeResponse>
{
    public string Email { get; set; }
    public string Code { get; set; }
    public ValidationPurpose ValidationType { get; set; }

    public class VerifyCodeCommandHandler : IRequestHandler<VerifyCodeCommand, VerifyCodeResponse>
    {
        private readonly IValidationCodeRepository _validationCodeRepository;
        private readonly IUserRepository _userRepository;

        public VerifyCodeCommandHandler(
            IValidationCodeRepository validationCodeRepository,
            IUserRepository userRepository)
        {
            _validationCodeRepository = validationCodeRepository;
            _userRepository = userRepository;
        }

        public async Task<VerifyCodeResponse> Handle(VerifyCodeCommand request, CancellationToken cancellationToken)
        {


            var validationCode = await _validationCodeRepository.GetAsync(
                vc =>  
                      vc.Code == request.Code && 
                      vc.ValidationType == request.ValidationType &&
                      !vc.IsUsed &&
                      vc.ExpireDate > DateTime.UtcNow
            );

            if (validationCode == null)
                throw new Exception("Geçersiz veya süresi dolmuş doğrulama kodu.");

            validationCode.IsUsed = true;
            await _validationCodeRepository.UpdateAsync(validationCode);

            return new VerifyCodeResponse
            {
                IsVerified = true,
                IsSuccess = true,
                Message = "Doğrulama başarılı."
            };
        }
    }
} 