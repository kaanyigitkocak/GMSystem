using FluentValidation;
using System;
using System.Linq;

namespace Application.Features.GraduationProcesses.Commands.SetToParseSuccessful;

public class SetGraduationProcessToParseSuccessfulCommandValidator : AbstractValidator<SetGraduationProcessToParseSuccessfulCommand>
{
    public SetGraduationProcessToParseSuccessfulCommandValidator()
    {
        RuleFor(c => c.StudentUserIds)
            .NotEmpty().WithMessage("StudentUserIds list cannot be empty.")
            .Must(list => list != null && list.All(id => id != Guid.Empty)).WithMessage("All StudentUserIds in the list must be valid GUIDs.")
            .When(c => c.StudentUserIds != null); // Ensure this rule runs only if list is not null to avoid NullRef on .All

        RuleFor(c => c.ProcessedByUserId)
            .NotEmpty().WithMessage("ProcessedByUserId cannot be empty.");
    }
} 