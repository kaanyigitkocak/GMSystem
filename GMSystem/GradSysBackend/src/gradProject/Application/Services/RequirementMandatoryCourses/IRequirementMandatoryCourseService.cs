using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.RequirementMandatoryCourses;

public interface IRequirementMandatoryCourseService
{
    Task<RequirementMandatoryCourse?> GetAsync(
        Expression<Func<RequirementMandatoryCourse, bool>> predicate,
        Func<IQueryable<RequirementMandatoryCourse>, IIncludableQueryable<RequirementMandatoryCourse, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<RequirementMandatoryCourse>?> GetListAsync(
        Expression<Func<RequirementMandatoryCourse, bool>>? predicate = null,
        Func<IQueryable<RequirementMandatoryCourse>, IOrderedQueryable<RequirementMandatoryCourse>>? orderBy = null,
        Func<IQueryable<RequirementMandatoryCourse>, IIncludableQueryable<RequirementMandatoryCourse, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<RequirementMandatoryCourse> AddAsync(RequirementMandatoryCourse requirementMandatoryCourse);
    Task<RequirementMandatoryCourse> UpdateAsync(RequirementMandatoryCourse requirementMandatoryCourse);
    Task<RequirementMandatoryCourse> DeleteAsync(RequirementMandatoryCourse requirementMandatoryCourse, bool permanent = false);
}
