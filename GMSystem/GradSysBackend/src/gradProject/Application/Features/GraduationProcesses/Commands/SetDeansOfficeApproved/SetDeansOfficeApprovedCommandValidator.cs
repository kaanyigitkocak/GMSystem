using FluentValidation;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetDeansOfficeApproved;

public class SetDeansOfficeApprovedCommandValidator : AbstractValidator<SetDeansOfficeApprovedCommand>
{
    public SetDeansOfficeApprovedCommandValidator()
    {
        RuleFor(c => c.StudentUserIds)
            .NotEmpty().WithMessage("Student User IDs list cannot be empty.")
            .ForEach(idRule => 
            {
                idRule.NotEmpty().WithMessage("Student User ID in the list cannot be empty.");
            });

        RuleFor(c => c.DeansOfficeUserId)
            .NotEmpty().WithMessage("Dean's Office User ID cannot be empty.");
    }
} 