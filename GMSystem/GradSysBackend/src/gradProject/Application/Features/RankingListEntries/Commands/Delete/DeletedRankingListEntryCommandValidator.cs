using FluentValidation;

namespace Application.Features.RankingListEntries.Commands.Delete;

public class DeleteRankingListEntryCommandValidator : AbstractValidator<DeleteRankingListEntryCommand>
{
    public DeleteRankingListEntryCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
    }
}