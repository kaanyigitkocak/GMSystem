using FluentValidation;

namespace Application.Features.Students.Commands.Create;

public class CreateStudentCommandValidator : AbstractValidator<CreateStudentCommand>
{
    public CreateStudentCommandValidator()
    {
        RuleFor(c => c.StudentNumber).NotEmpty();
        RuleFor(c => c.DepartmentId).NotEmpty();
        RuleFor(c => c.ProgramName).NotEmpty();
        RuleFor(c => c.EnrollDate).NotEmpty();
        RuleFor(c => c.CurrentGpa).NotEmpty();
        RuleFor(c => c.CurrentEctsCompleted).NotEmpty();
        RuleFor(c => c.GraduationStatus).NotEmpty();
        RuleFor(c => c.AssignedAdvisorUserId).NotEmpty();
    }
}