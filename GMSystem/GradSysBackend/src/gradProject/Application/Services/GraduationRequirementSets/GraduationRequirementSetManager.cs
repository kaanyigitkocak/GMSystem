using Application.Features.GraduationRequirementSets.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.GraduationRequirementSets;

public class GraduationRequirementSetManager : IGraduationRequirementSetService
{
    private readonly IGraduationRequirementSetRepository _graduationRequirementSetRepository;
    private readonly GraduationRequirementSetBusinessRules _graduationRequirementSetBusinessRules;

    public GraduationRequirementSetManager(IGraduationRequirementSetRepository graduationRequirementSetRepository, GraduationRequirementSetBusinessRules graduationRequirementSetBusinessRules)
    {
        _graduationRequirementSetRepository = graduationRequirementSetRepository;
        _graduationRequirementSetBusinessRules = graduationRequirementSetBusinessRules;
    }

    public async Task<GraduationRequirementSet?> GetAsync(
        Expression<Func<GraduationRequirementSet, bool>> predicate,
        Func<IQueryable<GraduationRequirementSet>, IIncludableQueryable<GraduationRequirementSet, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        GraduationRequirementSet? graduationRequirementSet = await _graduationRequirementSetRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return graduationRequirementSet;
    }

    public async Task<IPaginate<GraduationRequirementSet>?> GetListAsync(
        Expression<Func<GraduationRequirementSet, bool>>? predicate = null,
        Func<IQueryable<GraduationRequirementSet>, IOrderedQueryable<GraduationRequirementSet>>? orderBy = null,
        Func<IQueryable<GraduationRequirementSet>, IIncludableQueryable<GraduationRequirementSet, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<GraduationRequirementSet> graduationRequirementSetList = await _graduationRequirementSetRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return graduationRequirementSetList;
    }

    public async Task<GraduationRequirementSet> AddAsync(GraduationRequirementSet graduationRequirementSet)
    {
        GraduationRequirementSet addedGraduationRequirementSet = await _graduationRequirementSetRepository.AddAsync(graduationRequirementSet);

        return addedGraduationRequirementSet;
    }

    public async Task<GraduationRequirementSet> UpdateAsync(GraduationRequirementSet graduationRequirementSet)
    {
        GraduationRequirementSet updatedGraduationRequirementSet = await _graduationRequirementSetRepository.UpdateAsync(graduationRequirementSet);

        return updatedGraduationRequirementSet;
    }

    public async Task<GraduationRequirementSet> DeleteAsync(GraduationRequirementSet graduationRequirementSet, bool permanent = false)
    {
        GraduationRequirementSet deletedGraduationRequirementSet = await _graduationRequirementSetRepository.DeleteAsync(graduationRequirementSet);

        return deletedGraduationRequirementSet;
    }
}
