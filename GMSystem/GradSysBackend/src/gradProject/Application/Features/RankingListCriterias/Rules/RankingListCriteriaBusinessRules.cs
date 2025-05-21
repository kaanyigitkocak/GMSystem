using Application.Features.RankingListCriterias.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.RankingListCriterias.Rules;

public class RankingListCriteriaBusinessRules : BaseBusinessRules
{
    private readonly IRankingListCriteriaRepository _rankingListCriteriaRepository;
    private readonly ILocalizationService _localizationService;

    public RankingListCriteriaBusinessRules(IRankingListCriteriaRepository rankingListCriteriaRepository, ILocalizationService localizationService)
    {
        _rankingListCriteriaRepository = rankingListCriteriaRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, RankingListCriteriasBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task RankingListCriteriaShouldExistWhenSelected(RankingListCriteria? rankingListCriteria)
    {
        if (rankingListCriteria == null)
            await throwBusinessException(RankingListCriteriasBusinessMessages.RankingListCriteriaNotExists);
    }

    public async Task RankingListCriteriaIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        RankingListCriteria? rankingListCriteria = await _rankingListCriteriaRepository.GetAsync(
            predicate: rlc => rlc.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await RankingListCriteriaShouldExistWhenSelected(rankingListCriteria);
    }
}