using FluentValidation;

namespace Application.Features.Auth.Commands.SendEmailValidation;

public class SendEmailValidationCommandValidator : AbstractValidator<SendEmailValidationCommand>
{
    public SendEmailValidationCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email adresi boş olamaz.")
            .EmailAddress().WithMessage("Geçerli bir email adresi giriniz.")
            .MaximumLength(256).WithMessage("Email adresi 256 karakterden uzun olamaz.");
    }
} 