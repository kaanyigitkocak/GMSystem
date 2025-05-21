using FluentValidation;

namespace Application.Features.GraduationProcesses.Commands.StartForAllStudents;

public class StartGraduationForAllStudentsCommandValidator : AbstractValidator<StartGraduationForAllStudentsCommand>
{
    public StartGraduationForAllStudentsCommandValidator()
    {
        RuleFor(c => c.AcademicTerm)
            .NotEmpty().WithMessage("Akademik dönem boş olamaz.")
            .MaximumLength(50).WithMessage("Akademik dönem en fazla 50 karakter olabilir.");
    }
} 