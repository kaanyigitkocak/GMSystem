using FluentValidation;

namespace Application.Features.Faculties.Commands.Delete;

public class DeleteFacultyCommandValidator : AbstractValidator<DeleteFacultyCommand>
{
    public DeleteFacultyCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
    }
}