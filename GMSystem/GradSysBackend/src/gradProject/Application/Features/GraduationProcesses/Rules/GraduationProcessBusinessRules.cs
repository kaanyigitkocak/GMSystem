using Application.Features.GraduationProcesses.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.GraduationProcesses.Rules;

public class GraduationProcessBusinessRules : BaseBusinessRules
{
    private readonly IGraduationProcessRepository _graduationProcessRepository;
    private readonly ILocalizationService _localizationService;

    public GraduationProcessBusinessRules(IGraduationProcessRepository graduationProcessRepository, ILocalizationService localizationService)
    {
        _graduationProcessRepository = graduationProcessRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, GraduationProcessesBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task GraduationProcessShouldExistWhenSelected(GraduationProcess? graduationProcess)
    {
        if (graduationProcess == null)
            await throwBusinessException(GraduationProcessesBusinessMessages.GraduationProcessNotExists);
    }

    public async Task GraduationProcessIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        GraduationProcess? graduationProcess = await _graduationProcessRepository.GetAsync(
            predicate: gp => gp.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await GraduationProcessShouldExistWhenSelected(graduationProcess);
    }
}