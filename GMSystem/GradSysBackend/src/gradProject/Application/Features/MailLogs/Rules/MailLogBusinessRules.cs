using Application.Features.MailLogs.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.MailLogs.Rules;

public class MailLogBusinessRules : BaseBusinessRules
{
    private readonly IMailLogRepository _mailLogRepository;
    private readonly ILocalizationService _localizationService;

    public MailLogBusinessRules(IMailLogRepository mailLogRepository, ILocalizationService localizationService)
    {
        _mailLogRepository = mailLogRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, MailLogsBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task MailLogShouldExistWhenSelected(MailLog? mailLog)
    {
        if (mailLog == null)
            await throwBusinessException(MailLogsBusinessMessages.MailLogNotExists);
    }

    public async Task MailLogIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        MailLog? mailLog = await _mailLogRepository.GetAsync(
            predicate: ml => ml.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await MailLogShouldExistWhenSelected(mailLog);
    }
}