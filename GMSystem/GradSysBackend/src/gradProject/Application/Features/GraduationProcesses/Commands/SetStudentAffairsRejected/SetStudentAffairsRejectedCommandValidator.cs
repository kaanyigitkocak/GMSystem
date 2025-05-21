using FluentValidation;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetStudentAffairsRejected;

public class SetStudentAffairsRejectedCommandValidator : AbstractValidator<SetStudentAffairsRejectedCommand>
{
    public SetStudentAffairsRejectedCommandValidator()
    {
        RuleFor(c => c.StudentUserIds)
            .NotEmpty().WithMessage("Student User IDs list cannot be empty.")
            .ForEach(idRule => 
            {
                idRule.NotEmpty().WithMessage("Student User ID in the list cannot be empty.");
            });

        RuleFor(c => c.StudentAffairsUserId)
            .NotEmpty().WithMessage("Student Affairs User ID cannot be empty.");

        RuleFor(c => c.RejectionReason)
            .NotEmpty().WithMessage("Rejection reason cannot be empty when rejecting.")
            .MaximumLength(1000).WithMessage("Rejection reason cannot exceed 1000 characters.");
    }
} 