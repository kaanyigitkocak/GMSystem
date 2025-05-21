using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.GraduationRequirementSets;

public interface IGraduationRequirementSetService
{
    Task<GraduationRequirementSet?> GetAsync(
        Expression<Func<GraduationRequirementSet, bool>> predicate,
        Func<IQueryable<GraduationRequirementSet>, IIncludableQueryable<GraduationRequirementSet, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<GraduationRequirementSet>?> GetListAsync(
        Expression<Func<GraduationRequirementSet, bool>>? predicate = null,
        Func<IQueryable<GraduationRequirementSet>, IOrderedQueryable<GraduationRequirementSet>>? orderBy = null,
        Func<IQueryable<GraduationRequirementSet>, IIncludableQueryable<GraduationRequirementSet, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<GraduationRequirementSet> AddAsync(GraduationRequirementSet graduationRequirementSet);
    Task<GraduationRequirementSet> UpdateAsync(GraduationRequirementSet graduationRequirementSet);
    Task<GraduationRequirementSet> DeleteAsync(GraduationRequirementSet graduationRequirementSet, bool permanent = false);
}
