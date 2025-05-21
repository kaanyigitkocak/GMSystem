using FluentValidation;
using System;
using System.Collections.Generic; // Required for List

namespace Application.Features.GraduationProcesses.Commands.SetAdvisorNotEligible;

public class SetAdvisorNotEligibleCommandValidator : AbstractValidator<SetAdvisorNotEligibleCommand>
{
    public SetAdvisorNotEligibleCommandValidator()
    {
        RuleFor(c => c.StudentUserIds)
            .NotEmpty().WithMessage("Student User IDs list cannot be empty.")
            .ForEach(idRule => 
            {
                idRule.NotEmpty().WithMessage("Student User ID in the list cannot be empty.");
            });

        RuleFor(c => c.AdvisorUserId)
            .NotEmpty().WithMessage("Advisor User ID cannot be empty.");
        
        RuleFor(c => c.RejectionReason)
            .NotEmpty().WithMessage("Rejection reason cannot be empty.")
            .MaximumLength(1000).WithMessage("Rejection reason cannot exceed 1000 characters."); // Example length
    }
} 