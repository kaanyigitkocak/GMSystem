using Application.Features.RequirementMandatoryCourses.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.RequirementMandatoryCourses.Rules;

public class RequirementMandatoryCourseBusinessRules : BaseBusinessRules
{
    private readonly IRequirementMandatoryCourseRepository _requirementMandatoryCourseRepository;
    private readonly ILocalizationService _localizationService;

    public RequirementMandatoryCourseBusinessRules(IRequirementMandatoryCourseRepository requirementMandatoryCourseRepository, ILocalizationService localizationService)
    {
        _requirementMandatoryCourseRepository = requirementMandatoryCourseRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, RequirementMandatoryCoursesBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task RequirementMandatoryCourseShouldExistWhenSelected(RequirementMandatoryCourse? requirementMandatoryCourse)
    {
        if (requirementMandatoryCourse == null)
            await throwBusinessException(RequirementMandatoryCoursesBusinessMessages.RequirementMandatoryCourseNotExists);
    }

    public async Task RequirementMandatoryCourseIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        RequirementMandatoryCourse? requirementMandatoryCourse = await _requirementMandatoryCourseRepository.GetAsync(
            predicate: rmc => rmc.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await RequirementMandatoryCourseShouldExistWhenSelected(requirementMandatoryCourse);
    }
}