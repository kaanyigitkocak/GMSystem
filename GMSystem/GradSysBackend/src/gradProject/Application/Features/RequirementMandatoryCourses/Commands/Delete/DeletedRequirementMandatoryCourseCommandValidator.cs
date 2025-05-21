using FluentValidation;

namespace Application.Features.RequirementMandatoryCourses.Commands.Delete;

public class DeleteRequirementMandatoryCourseCommandValidator : AbstractValidator<DeleteRequirementMandatoryCourseCommand>
{
    public DeleteRequirementMandatoryCourseCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
    }
}