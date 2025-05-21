using FluentValidation;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetAdvisorEligible;

public class SetAdvisorEligibleCommandValidator : AbstractValidator<SetAdvisorEligibleCommand>
{
    public SetAdvisorEligibleCommandValidator()
    {
        RuleFor(c => c.StudentUserIds)
            .NotEmpty().WithMessage("Student User IDs list cannot be empty.")
            .ForEach(idRule => 
            {
                idRule.NotEmpty().WithMessage("Student User ID in the list cannot be empty.");
            });

        RuleFor(c => c.AdvisorUserId)
            .NotEmpty().WithMessage("Advisor User ID cannot be empty.");
    }
} 