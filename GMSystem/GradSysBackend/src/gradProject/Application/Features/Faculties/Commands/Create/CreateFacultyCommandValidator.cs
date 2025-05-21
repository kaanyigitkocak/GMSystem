using FluentValidation;

namespace Application.Features.Faculties.Commands.Create;

public class CreateFacultyCommandValidator : AbstractValidator<CreateFacultyCommand>
{
    public CreateFacultyCommandValidator()
    {
        RuleFor(c => c.Name).NotEmpty();
    }
}