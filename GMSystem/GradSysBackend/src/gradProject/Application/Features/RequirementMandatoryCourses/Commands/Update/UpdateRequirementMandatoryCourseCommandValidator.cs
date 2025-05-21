using FluentValidation;

namespace Application.Features.RequirementMandatoryCourses.Commands.Update;

public class UpdateRequirementMandatoryCourseCommandValidator : AbstractValidator<UpdateRequirementMandatoryCourseCommand>
{
    public UpdateRequirementMandatoryCourseCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
        RuleFor(c => c.RequirementSetId).NotEmpty();
        RuleFor(c => c.CourseId).NotEmpty();
    }
}