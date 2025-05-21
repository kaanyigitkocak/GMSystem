using FluentValidation;

namespace Application.Features.RankingListEntries.Commands.Create;

public class CreateRankingListEntryCommandValidator : AbstractValidator<CreateRankingListEntryCommand>
{
    public CreateRankingListEntryCommandValidator()
    {
        RuleFor(c => c.RankingListId).NotEmpty();
        RuleFor(c => c.StudentUserId).NotEmpty();
        RuleFor(c => c.Rank).NotEmpty();
        RuleFor(c => c.GpaAtRanking).NotEmpty();
        RuleFor(c => c.HonourStatus).NotEmpty();
    }
}