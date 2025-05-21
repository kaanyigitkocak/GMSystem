using Application.Features.RankingLists.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.RankingLists.Rules;

public class RankingListBusinessRules : BaseBusinessRules
{
    private readonly IRankingListRepository _rankingListRepository;
    private readonly ILocalizationService _localizationService;

    public RankingListBusinessRules(IRankingListRepository rankingListRepository, ILocalizationService localizationService)
    {
        _rankingListRepository = rankingListRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, RankingListsBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task RankingListShouldExistWhenSelected(RankingList? rankingList)
    {
        if (rankingList == null)
            await throwBusinessException(RankingListsBusinessMessages.RankingListNotExists);
    }

    public async Task RankingListIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        RankingList? rankingList = await _rankingListRepository.GetAsync(
            predicate: rl => rl.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await RankingListShouldExistWhenSelected(rankingList);
    }
}