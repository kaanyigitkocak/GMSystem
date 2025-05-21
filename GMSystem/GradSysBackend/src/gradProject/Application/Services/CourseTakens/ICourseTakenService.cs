using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.CourseTakens;

public interface ICourseTakenService
{
    Task<CourseTaken?> GetAsync(
        Expression<Func<CourseTaken, bool>> predicate,
        Func<IQueryable<CourseTaken>, IIncludableQueryable<CourseTaken, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<CourseTaken>?> GetListAsync(
        Expression<Func<CourseTaken, bool>>? predicate = null,
        Func<IQueryable<CourseTaken>, IOrderedQueryable<CourseTaken>>? orderBy = null,
        Func<IQueryable<CourseTaken>, IIncludableQueryable<CourseTaken, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<CourseTaken> AddAsync(CourseTaken courseTaken);
    Task<CourseTaken> UpdateAsync(CourseTaken courseTaken);
    Task<CourseTaken> DeleteAsync(CourseTaken courseTaken, bool permanent = false);
}
