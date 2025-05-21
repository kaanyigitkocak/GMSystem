using FluentValidation;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetDeptSecretaryApproved;

public class SetDeptSecretaryApprovedCommandValidator : AbstractValidator<SetDeptSecretaryApprovedCommand>
{
    public SetDeptSecretaryApprovedCommandValidator()
    {
        RuleFor(c => c.StudentUserIds)
            .NotEmpty().WithMessage("Student User IDs list cannot be empty.")
            .ForEach(idRule => 
            {
                idRule.NotEmpty().WithMessage("Student User ID in the list cannot be empty.");
            });

        RuleFor(c => c.DeptSecretaryUserId)
            .NotEmpty().WithMessage("Department Secretary User ID cannot be empty.");
    }
} 