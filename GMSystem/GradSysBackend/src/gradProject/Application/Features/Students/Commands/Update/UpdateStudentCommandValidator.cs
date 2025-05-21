using FluentValidation;

namespace Application.Features.Students.Commands.Update;

public class UpdateStudentCommandValidator : AbstractValidator<UpdateStudentCommand>
{
    public UpdateStudentCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
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