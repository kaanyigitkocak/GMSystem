using FluentValidation;

namespace Application.Features.GraduationRequirementSets.Commands.Delete;

public class DeleteGraduationRequirementSetCommandValidator : AbstractValidator<DeleteGraduationRequirementSetCommand>
{
    public DeleteGraduationRequirementSetCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
    }
}