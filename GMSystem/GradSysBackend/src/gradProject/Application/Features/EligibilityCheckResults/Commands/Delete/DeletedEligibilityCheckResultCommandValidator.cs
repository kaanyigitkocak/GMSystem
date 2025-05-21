using FluentValidation;

namespace Application.Features.EligibilityCheckResults.Commands.Delete;

public class DeleteEligibilityCheckResultCommandValidator : AbstractValidator<DeleteEligibilityCheckResultCommand>
{
    public DeleteEligibilityCheckResultCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
    }
}