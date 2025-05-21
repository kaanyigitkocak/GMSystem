using FluentValidation;

namespace Application.Features.EligibilityCheckResults.Commands.Create;

public class CreateEligibilityCheckResultCommandValidator : AbstractValidator<CreateEligibilityCheckResultCommand>
{
    public CreateEligibilityCheckResultCommandValidator()
    {
        RuleFor(c => c.ProcessId).NotEmpty();
        RuleFor(c => c.CheckType).NotEmpty();
        RuleFor(c => c.IsMet).NotEmpty();
        RuleFor(c => c.ActualValue).NotEmpty();
        RuleFor(c => c.RequiredValue).NotEmpty();
        RuleFor(c => c.NotesOrMissingItems).NotEmpty();
        RuleFor(c => c.CheckDate).NotEmpty();
    }
}