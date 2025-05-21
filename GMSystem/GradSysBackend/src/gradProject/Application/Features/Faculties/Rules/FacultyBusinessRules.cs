using Application.Features.Faculties.Constants;
using Application.Services.Repositories;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using NArchitecture.Core.Localization.Abstraction;
using Domain.Entities;

namespace Application.Features.Faculties.Rules;

public class FacultyBusinessRules : BaseBusinessRules
{
    private readonly IFacultyRepository _facultyRepository;
    private readonly ILocalizationService _localizationService;

    public FacultyBusinessRules(IFacultyRepository facultyRepository, ILocalizationService localizationService)
    {
        _facultyRepository = facultyRepository;
        _localizationService = localizationService;
    }

    private async Task throwBusinessException(string messageKey)
    {
        string message = await _localizationService.GetLocalizedAsync(messageKey, FacultiesBusinessMessages.SectionName);
        throw new BusinessException(message);
    }

    public async Task FacultyShouldExistWhenSelected(Faculty? faculty)
    {
        if (faculty == null)
            await throwBusinessException(FacultiesBusinessMessages.FacultyNotExists);
    }

    public async Task FacultyIdShouldExistWhenSelected(Guid id, CancellationToken cancellationToken)
    {
        Faculty? faculty = await _facultyRepository.GetAsync(
            predicate: f => f.Id == id,
            enableTracking: false,
            cancellationToken: cancellationToken
        );
        await FacultyShouldExistWhenSelected(faculty);
    }
}