using Application.Features.ValidationCodes.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.ValidationCodes.Rules;

public class ValidationCodeBusinessRules : BaseBusinessRules
{
    private readonly IValidationCodeRepository _validationCodeRepository;
    private readonly ILocalizationService _localizationService;

    public ValidationCodeBusinessRules(IValidationCodeRepository validationCodeRepository, ILocalizationService localizationService)
    {
        _validationCodeRepository = validationCodeRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, ValidationCodesBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task ValidationCodeShouldExistWhenSelected(ValidationCode? validationCode)
    {
        if (validationCode == null)
            await throwBusinessException(ValidationCodesBusinessMessages.ValidationCodeNotExists);
    }

    public async Task ValidationCodeIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        ValidationCode? validationCode = await _validationCodeRepository.GetAsync(
            predicate: vc => vc.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await ValidationCodeShouldExistWhenSelected(validationCode);
    }
}