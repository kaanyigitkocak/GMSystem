using FluentValidation;

namespace Application.Features.RankingListCriterias.Commands.Update;

public class UpdateRankingListCriteriaCommandValidator : AbstractValidator<UpdateRankingListCriteriaCommand>
{
    public UpdateRankingListCriteriaCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
        RuleFor(c => c.RankingListId).NotEmpty();
        RuleFor(c => c.CriteriaName).NotEmpty();
        RuleFor(c => c.CriteriaValue).NotEmpty();
    }
}