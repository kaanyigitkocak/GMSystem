using FluentValidation;

namespace Application.Features.RankingListCriterias.Commands.Create;

public class CreateRankingListCriteriaCommandValidator : AbstractValidator<CreateRankingListCriteriaCommand>
{
    public CreateRankingListCriteriaCommandValidator()
    {
        RuleFor(c => c.RankingListId).NotEmpty();
        RuleFor(c => c.CriteriaName).NotEmpty();
        RuleFor(c => c.CriteriaValue).NotEmpty();
    }
}