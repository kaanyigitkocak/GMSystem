using Application.Features.CourseTakens.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.CourseTakens.Rules;

public class CourseTakenBusinessRules : BaseBusinessRules
{
    private readonly ICourseTakenRepository _courseTakenRepository;
    private readonly ILocalizationService _localizationService;

    public CourseTakenBusinessRules(ICourseTakenRepository courseTakenRepository, ILocalizationService localizationService)
    {
        _courseTakenRepository = courseTakenRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, CourseTakensBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task CourseTakenShouldExistWhenSelected(CourseTaken? courseTaken)
    {
        if (courseTaken == null)
            await throwBusinessException(CourseTakensBusinessMessages.CourseTakenNotExists);
    }

    public async Task CourseTakenIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        CourseTaken? courseTaken = await _courseTakenRepository.GetAsync(
            predicate: ct => ct.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await CourseTakenShouldExistWhenSelected(courseTaken);
    }
}