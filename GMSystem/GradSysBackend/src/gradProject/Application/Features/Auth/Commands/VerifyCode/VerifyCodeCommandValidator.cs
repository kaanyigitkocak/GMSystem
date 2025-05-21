using FluentValidation;
using Domain.Enums;

namespace Application.Features.Auth.Commands.VerifyCode;

public class VerifyCodeCommandValidator : AbstractValidator<VerifyCodeCommand>
{
    public VerifyCodeCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email adresi boş olamaz.")
            .EmailAddress().WithMessage("Geçerli bir email adresi giriniz.")
            .MaximumLength(256).WithMessage("Email adresi 256 karakterden uzun olamaz.");

        RuleFor(x => x.Code)
            .NotEmpty().WithMessage("Doğrulama kodu boş olamaz.")
            .Length(6).WithMessage("Doğrulama kodu 6 karakter olmalıdır.")
            .Matches("^[0-9]*$").WithMessage("Doğrulama kodu sadece rakamlardan oluşmalıdır.");

        RuleFor(x => x.ValidationType)
            .IsInEnum().WithMessage("Geçersiz doğrulama tipi.");
    }
} 