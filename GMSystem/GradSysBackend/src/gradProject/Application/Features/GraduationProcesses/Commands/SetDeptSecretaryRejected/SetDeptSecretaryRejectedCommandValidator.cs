using FluentValidation;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetDeptSecretaryRejected;

public class SetDeptSecretaryRejectedCommandValidator : AbstractValidator<SetDeptSecretaryRejectedCommand>
{
    public SetDeptSecretaryRejectedCommandValidator()
    {
        RuleFor(c => c.StudentUserIds)
            .NotEmpty().WithMessage("Student User IDs list cannot be empty.")
            .ForEach(idRule => 
            {
                idRule.NotEmpty().WithMessage("Student User ID in the list cannot be empty.");
            });

        RuleFor(c => c.DeptSecretaryUserId)
            .NotEmpty().WithMessage("Department Secretary User ID cannot be empty.");

        RuleFor(c => c.RejectionReason)
            .NotEmpty().WithMessage("Rejection reason cannot be empty when rejecting.")
            .MaximumLength(1000).WithMessage("Rejection reason cannot exceed 1000 characters.");
    }
} 