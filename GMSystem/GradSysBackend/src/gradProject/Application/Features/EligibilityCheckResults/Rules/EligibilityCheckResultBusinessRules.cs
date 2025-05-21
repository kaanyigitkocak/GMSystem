using Application.Features.EligibilityCheckResults.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.EligibilityCheckResults.Rules;

public class EligibilityCheckResultBusinessRules : BaseBusinessRules
{
    private readonly IEligibilityCheckResultRepository _eligibilityCheckResultRepository;
    private readonly ILocalizationService _localizationService;

    public EligibilityCheckResultBusinessRules(IEligibilityCheckResultRepository eligibilityCheckResultRepository, ILocalizationService localizationService)
    {
        _eligibilityCheckResultRepository = eligibilityCheckResultRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, EligibilityCheckResultsBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task EligibilityCheckResultShouldExistWhenSelected(EligibilityCheckResult? eligibilityCheckResult)
    {
        if (eligibilityCheckResult == null)
            await throwBusinessException(EligibilityCheckResultsBusinessMessages.EligibilityCheckResultNotExists);
    }

    public async Task EligibilityCheckResultIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        EligibilityCheckResult? eligibilityCheckResult = await _eligibilityCheckResultRepository.GetAsync(
            predicate: ecr => ecr.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await EligibilityCheckResultShouldExistWhenSelected(eligibilityCheckResult);
    }
}