using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.Faculties;

public interface IFacultyService
{
    Task<Faculty?> GetAsync(
        Expression<Func<Faculty, bool>> predicate,
        Func<IQueryable<Faculty>, IIncludableQueryable<Faculty, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<Faculty>?> GetListAsync(
        Expression<Func<Faculty, bool>>? predicate = null,
        Func<IQueryable<Faculty>, IOrderedQueryable<Faculty>>? orderBy = null,
        Func<IQueryable<Faculty>, IIncludableQueryable<Faculty, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<Faculty> AddAsync(Faculty faculty);
    Task<Faculty> UpdateAsync(Faculty faculty);
    Task<Faculty> DeleteAsync(Faculty faculty, bool permanent = false);
}
