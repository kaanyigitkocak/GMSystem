using FluentValidation;
using System;
using System.Linq;

namespace Application.Features.GraduationProcesses.Commands.SetToParseError;

public class SetGraduationProcessToParseErrorCommandValidator : AbstractValidator<SetGraduationProcessToParseErrorCommand>
{
    public SetGraduationProcessToParseErrorCommandValidator()
    {
        RuleFor(c => c.StudentUserIds)
            .NotEmpty().WithMessage("StudentUserIds list cannot be empty.")
            .Must(list => list != null && list.All(id => id != Guid.Empty)).WithMessage("All StudentUserIds in the list must be valid GUIDs.")
            .When(c => c.StudentUserIds != null);

        RuleFor(c => c.ProcessedByUserId)
            .NotEmpty().WithMessage("ProcessedByUserId cannot be empty.");

        RuleFor(c => c.ErrorReason)
            .MaximumLength(1000).WithMessage("ErrorReason cannot exceed 1000 characters.")
            .When(c => !string.IsNullOrEmpty(c.ErrorReason)); // Validate only if a reason is provided
    }
} 