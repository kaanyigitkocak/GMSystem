using FluentValidation;

namespace Application.Features.GraduationRequirementSets.Commands.Create;

public class CreateGraduationRequirementSetCommandValidator : AbstractValidator<CreateGraduationRequirementSetCommand>
{
    public CreateGraduationRequirementSetCommandValidator()
    {
        RuleFor(c => c.DepartmentId).NotEmpty();
        RuleFor(c => c.AcademicTerm).NotEmpty();
        RuleFor(c => c.MinGpa).NotEmpty();
        RuleFor(c => c.TotalMinEcts).NotEmpty();
        RuleFor(c => c.MinTechnicalElectiveCoursesCount).NotEmpty();
        RuleFor(c => c.MinNonTechnicalElectiveCoursesCount).NotEmpty();
        RuleFor(c => c.MinUniversityElectiveCoursesCount).NotEmpty();
        RuleFor(c => c.Description).NotEmpty();
        RuleFor(c => c.CreatedByUserId).NotEmpty();
    }
}