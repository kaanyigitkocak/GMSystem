using Application.Features.RankingListEntries.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.RankingListEntries.Rules;

public class RankingListEntryBusinessRules : BaseBusinessRules
{
    private readonly IRankingListEntryRepository _rankingListEntryRepository;
    private readonly ILocalizationService _localizationService;

    public RankingListEntryBusinessRules(IRankingListEntryRepository rankingListEntryRepository, ILocalizationService localizationService)
    {
        _rankingListEntryRepository = rankingListEntryRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, RankingListEntriesBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task RankingListEntryShouldExistWhenSelected(RankingListEntry? rankingListEntry)
    {
        if (rankingListEntry == null)
            await throwBusinessException(RankingListEntriesBusinessMessages.RankingListEntryNotExists);
    }

    public async Task RankingListEntryIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        RankingListEntry? rankingListEntry = await _rankingListEntryRepository.GetAsync(
            predicate: rle => rle.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await RankingListEntryShouldExistWhenSelected(rankingListEntry);
    }
}