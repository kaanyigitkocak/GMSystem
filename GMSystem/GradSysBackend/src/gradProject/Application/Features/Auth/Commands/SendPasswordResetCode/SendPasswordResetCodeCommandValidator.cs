using FluentValidation;

namespace Application.Features.Auth.Commands.SendPasswordResetCode;

public class SendPasswordResetCodeCommandValidator : AbstractValidator<SendPasswordResetCodeCommand>
{
    public SendPasswordResetCodeCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email adresi boş olamaz.")
            .EmailAddress().WithMessage("Geçerli bir email adresi giriniz.")
            .MaximumLength(256).WithMessage("Email adresi 256 karakterden uzun olamaz.");
    }
} 