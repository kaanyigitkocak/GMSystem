using Application.Features.Faculties.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.Faculties;

public class FacultyManager : IFacultyService
{
    private readonly IFacultyRepository _facultyRepository;
    private readonly FacultyBusinessRules _facultyBusinessRules;

    public FacultyManager(IFacultyRepository facultyRepository, FacultyBusinessRules facultyBusinessRules)
    {
        _facultyRepository = facultyRepository;
        _facultyBusinessRules = facultyBusinessRules;
    }

    public async Task<Faculty?> GetAsync(
        Expression<Func<Faculty, bool>> predicate,
        Func<IQueryable<Faculty>, IIncludableQueryable<Faculty, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        Faculty? faculty = await _facultyRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return faculty;
    }

    public async Task<IPaginate<Faculty>?> GetListAsync(
        Expression<Func<Faculty, bool>>? predicate = null,
        Func<IQueryable<Faculty>, IOrderedQueryable<Faculty>>? orderBy = null,
        Func<IQueryable<Faculty>, IIncludableQueryable<Faculty, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<Faculty> facultyList = await _facultyRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return facultyList;
    }

    public async Task<Faculty> AddAsync(Faculty faculty)
    {
        Faculty addedFaculty = await _facultyRepository.AddAsync(faculty);

        return addedFaculty;
    }

    public async Task<Faculty> UpdateAsync(Faculty faculty)
    {
        Faculty updatedFaculty = await _facultyRepository.UpdateAsync(faculty);

        return updatedFaculty;
    }

    public async Task<Faculty> DeleteAsync(Faculty faculty, bool permanent = false)
    {
        Faculty deletedFaculty = await _facultyRepository.DeleteAsync(faculty);

        return deletedFaculty;
    }
}
