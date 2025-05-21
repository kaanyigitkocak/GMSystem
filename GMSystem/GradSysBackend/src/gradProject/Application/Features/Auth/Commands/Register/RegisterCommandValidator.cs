using System.Text.RegularExpressions;
using FluentValidation;

namespace Application.Features.Auth.Commands.Register;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(c => c.UserForRegisterDto.Email).NotEmpty().EmailAddress();
        RuleFor(c => c.UserForRegisterDto.Password)
            .NotEmpty()
            .MinimumLength(6)
            .Must(StrongPassword)
            .WithMessage(
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
            );
        RuleFor(c => c.UserForRegisterDto.FirstName).NotEmpty();
        RuleFor(c => c.UserForRegisterDto.LastName).NotEmpty();
        RuleFor(c => c.UserForRegisterDto.PhoneNumber).NotEmpty();
        
        // Öğrenci doğrulama
        RuleFor(c => c.UserForRegisterDto.StudentNumber).NotEmpty()
            .WithMessage("Student number is required.");
        RuleFor(c => c.UserForRegisterDto.DepartmentId).NotEmpty()
            .WithMessage("Department information is required.");
        RuleFor(c => c.UserForRegisterDto.FacultyId).NotEmpty()
            .WithMessage("Faculty information is required.");
    }

    private bool StrongPassword(string value)
    {
        Regex strongPasswordRegex = new("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", RegexOptions.Compiled);

        return strongPasswordRegex.IsMatch(value);
    }
}
