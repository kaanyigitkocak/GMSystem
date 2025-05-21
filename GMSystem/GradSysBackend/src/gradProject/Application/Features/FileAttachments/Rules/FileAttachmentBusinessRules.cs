using Application.Features.FileAttachments.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.FileAttachments.Rules;

public class FileAttachmentBusinessRules : BaseBusinessRules
{
    private readonly IFileAttachmentRepository _fileAttachmentRepository;
    private readonly ILocalizationService _localizationService;

    public FileAttachmentBusinessRules(IFileAttachmentRepository fileAttachmentRepository, ILocalizationService localizationService)
    {
        _fileAttachmentRepository = fileAttachmentRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, FileAttachmentsBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task FileAttachmentShouldExistWhenSelected(FileAttachment? fileAttachment)
    {
        if (fileAttachment == null)
            await throwBusinessException(FileAttachmentsBusinessMessages.FileAttachmentNotExists);
    }

    public async Task FileAttachmentIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        FileAttachment? fileAttachment = await _fileAttachmentRepository.GetAsync(
            predicate: fa => fa.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await FileAttachmentShouldExistWhenSelected(fileAttachment);
    }
}