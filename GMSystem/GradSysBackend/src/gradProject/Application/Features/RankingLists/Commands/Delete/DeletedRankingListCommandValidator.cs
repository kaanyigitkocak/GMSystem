using FluentValidation;

namespace Application.Features.RankingLists.Commands.Delete;

public class DeleteRankingListCommandValidator : AbstractValidator<DeleteRankingListCommand>
{
    public DeleteRankingListCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
    }
}