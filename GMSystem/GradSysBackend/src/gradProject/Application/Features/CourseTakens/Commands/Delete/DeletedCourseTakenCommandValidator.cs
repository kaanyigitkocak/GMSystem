using FluentValidation;

namespace Application.Features.CourseTakens.Commands.Delete;

public class DeleteCourseTakenCommandValidator : AbstractValidator<DeleteCourseTakenCommand>
{
    public DeleteCourseTakenCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
    }
}