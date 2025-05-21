using FluentValidation;

namespace Application.Features.EligibilityCheckResults.Commands.Update;

public class UpdateEligibilityCheckResultCommandValidator : AbstractValidator<UpdateEligibilityCheckResultCommand>
{
    public UpdateEligibilityCheckResultCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
        RuleFor(c => c.ProcessId).NotEmpty();
        RuleFor(c => c.CheckType).NotEmpty();
        RuleFor(c => c.IsMet).NotEmpty();
        RuleFor(c => c.ActualValue).NotEmpty();
        RuleFor(c => c.RequiredValue).NotEmpty();
        RuleFor(c => c.NotesOrMissingItems).NotEmpty();
        RuleFor(c => c.CheckDate).NotEmpty();
    }
}