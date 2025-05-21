using Application.Features.TranscriptDatas.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.TranscriptDatas.Rules;

public class TranscriptDataBusinessRules : BaseBusinessRules
{
    private readonly ITranscriptDataRepository _transcriptDataRepository;
    private readonly ILocalizationService _localizationService;

    public TranscriptDataBusinessRules(ITranscriptDataRepository transcriptDataRepository, ILocalizationService localizationService)
    {
        _transcriptDataRepository = transcriptDataRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, TranscriptDatasBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task TranscriptDataShouldExistWhenSelected(TranscriptData? transcriptData)
    {
        if (transcriptData == null)
            await throwBusinessException(TranscriptDatasBusinessMessages.TranscriptDataNotExists);
    }

    public async Task TranscriptDataIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        TranscriptData? transcriptData = await _transcriptDataRepository.GetAsync(
            predicate: td => td.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await TranscriptDataShouldExistWhenSelected(transcriptData);
    }
}