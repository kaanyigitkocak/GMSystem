using Application.Features.GraduationRequirementSets.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.GraduationRequirementSets.Rules;

public class GraduationRequirementSetBusinessRules : BaseBusinessRules
{
    private readonly IGraduationRequirementSetRepository _graduationRequirementSetRepository;
    private readonly ILocalizationService _localizationService;

    public GraduationRequirementSetBusinessRules(IGraduationRequirementSetRepository graduationRequirementSetRepository, ILocalizationService localizationService)
    {
        _graduationRequirementSetRepository = graduationRequirementSetRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, GraduationRequirementSetsBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task GraduationRequirementSetShouldExistWhenSelected(GraduationRequirementSet? graduationRequirementSet)
    {
        if (graduationRequirementSet == null)
            await throwBusinessException(GraduationRequirementSetsBusinessMessages.GraduationRequirementSetNotExists);
    }

    public async Task GraduationRequirementSetIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        GraduationRequirementSet? graduationRequirementSet = await _graduationRequirementSetRepository.GetAsync(
            predicate: grs => grs.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await GraduationRequirementSetShouldExistWhenSelected(graduationRequirementSet);
    }
}