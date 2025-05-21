using FluentValidation;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.PerformSystemEligibilityChecks;

public class PerformSystemEligibilityChecksCommandValidator : AbstractValidator<PerformSystemEligibilityChecksCommand>
{
    public PerformSystemEligibilityChecksCommandValidator()
    {
        RuleFor(c => c.StudentUserIds)
            .NotEmpty().WithMessage("Student User IDs list cannot be empty.")
            .ForEach(idRule => 
            {
                idRule.NotEmpty().WithMessage("Student User ID in the list cannot be empty.");
            });
    }
} 