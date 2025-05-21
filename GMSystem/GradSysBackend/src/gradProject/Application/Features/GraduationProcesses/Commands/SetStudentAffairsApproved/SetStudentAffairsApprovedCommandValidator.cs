using FluentValidation;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetStudentAffairsApproved;

public class SetStudentAffairsApprovedCommandValidator : AbstractValidator<SetStudentAffairsApprovedCommand>
{
    public SetStudentAffairsApprovedCommandValidator()
    {
        RuleFor(c => c.StudentUserIds)
            .NotEmpty().WithMessage("Student User IDs list cannot be empty.")
            .ForEach(idRule => 
            {
                idRule.NotEmpty().WithMessage("Student User ID in the list cannot be empty.");
            });

        RuleFor(c => c.StudentAffairsUserId)
            .NotEmpty().WithMessage("Student Affairs User ID cannot be empty.");
    }
} 