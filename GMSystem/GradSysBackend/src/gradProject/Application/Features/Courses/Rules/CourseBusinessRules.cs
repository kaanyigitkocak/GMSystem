using Application.Features.Courses.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.Courses.Rules;

public class CourseBusinessRules : BaseBusinessRules
{
    private readonly ICourseRepository _courseRepository;
    private readonly ILocalizationService _localizationService;

    public CourseBusinessRules(ICourseRepository courseRepository, ILocalizationService localizationService)
    {
        _courseRepository = courseRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, CoursesBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task CourseShouldExistWhenSelected(Course? course)
    {
        if (course == null)
            await throwBusinessException(CoursesBusinessMessages.CourseNotExists);
    }

    public async Task CourseIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        Course? course = await _courseRepository.GetAsync(
            predicate: c => c.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await CourseShouldExistWhenSelected(course);
    }
}