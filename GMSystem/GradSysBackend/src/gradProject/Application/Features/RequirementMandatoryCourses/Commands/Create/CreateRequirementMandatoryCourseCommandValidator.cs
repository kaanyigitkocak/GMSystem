using FluentValidation;

namespace Application.Features.RequirementMandatoryCourses.Commands.Create;

public class CreateRequirementMandatoryCourseCommandValidator : AbstractValidator<CreateRequirementMandatoryCourseCommand>
{
    public CreateRequirementMandatoryCourseCommandValidator()
    {
        RuleFor(c => c.RequirementSetId).NotEmpty();
        RuleFor(c => c.CourseId).NotEmpty();
    }
}