using FluentValidation;

namespace Application.Features.GraduationRequirementSets.Commands.Update;

public class UpdateGraduationRequirementSetCommandValidator : AbstractValidator<UpdateGraduationRequirementSetCommand>
{
    public UpdateGraduationRequirementSetCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
        RuleFor(c => c.DepartmentId).NotEmpty();
        RuleFor(c => c.MinGpa).NotEmpty();
        RuleFor(c => c.TotalMinEcts).NotEmpty();
        RuleFor(c => c.MinTechnicalElectiveCoursesCount).NotEmpty();
        RuleFor(c => c.MinNonTechnicalElectiveCoursesCount).NotEmpty();
        RuleFor(c => c.MinUniversityElectiveCoursesCount).NotEmpty();
        RuleFor(c => c.Description).NotEmpty();
        RuleFor(c => c.LastModifiedByUserId).NotEmpty();
    }
}