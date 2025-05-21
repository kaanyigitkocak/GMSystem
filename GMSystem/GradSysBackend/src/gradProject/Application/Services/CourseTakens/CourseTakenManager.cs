using Application.Features.CourseTakens.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.CourseTakens;

public class CourseTakenManager : ICourseTakenService
{
    private readonly ICourseTakenRepository _courseTakenRepository;
    private readonly CourseTakenBusinessRules _courseTakenBusinessRules;

    public CourseTakenManager(ICourseTakenRepository courseTakenRepository, CourseTakenBusinessRules courseTakenBusinessRules)
    {
        _courseTakenRepository = courseTakenRepository;
        _courseTakenBusinessRules = courseTakenBusinessRules;
    }

    public async Task<CourseTaken?> GetAsync(
        Expression<Func<CourseTaken, bool>> predicate,
        Func<IQueryable<CourseTaken>, IIncludableQueryable<CourseTaken, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        CourseTaken? courseTaken = await _courseTakenRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return courseTaken;
    }

    public async Task<IPaginate<CourseTaken>?> GetListAsync(
        Expression<Func<CourseTaken, bool>>? predicate = null,
        Func<IQueryable<CourseTaken>, IOrderedQueryable<CourseTaken>>? orderBy = null,
        Func<IQueryable<CourseTaken>, IIncludableQueryable<CourseTaken, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<CourseTaken> courseTakenList = await _courseTakenRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return courseTakenList;
    }

    public async Task<CourseTaken> AddAsync(CourseTaken courseTaken)
    {
        CourseTaken addedCourseTaken = await _courseTakenRepository.AddAsync(courseTaken);

        return addedCourseTaken;
    }

    public async Task<CourseTaken> UpdateAsync(CourseTaken courseTaken)
    {
        CourseTaken updatedCourseTaken = await _courseTakenRepository.UpdateAsync(courseTaken);

        return updatedCourseTaken;
    }

    public async Task<CourseTaken> DeleteAsync(CourseTaken courseTaken, bool permanent = false)
    {
        CourseTaken deletedCourseTaken = await _courseTakenRepository.DeleteAsync(courseTaken);

        return deletedCourseTaken;
    }
}
