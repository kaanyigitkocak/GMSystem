using FluentValidation;

namespace Application.Features.RankingListCriterias.Commands.Delete;

public class DeleteRankingListCriteriaCommandValidator : AbstractValidator<DeleteRankingListCriteriaCommand>
{
    public DeleteRankingListCriteriaCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
    }
}