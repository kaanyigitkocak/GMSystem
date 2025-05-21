using FluentValidation;

namespace Application.Features.RankingListEntries.Commands.Update;

public class UpdateRankingListEntryCommandValidator : AbstractValidator<UpdateRankingListEntryCommand>
{
    public UpdateRankingListEntryCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
        RuleFor(c => c.RankingListId).NotEmpty();
        RuleFor(c => c.StudentUserId).NotEmpty();
        RuleFor(c => c.Rank).NotEmpty();
        RuleFor(c => c.GpaAtRanking).NotEmpty();
        RuleFor(c => c.HonourStatus).NotEmpty();
    }
}