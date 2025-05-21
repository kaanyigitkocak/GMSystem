using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.GraduationProcesses;

public interface IGraduationProcessService
{
    Task<GraduationProcess?> GetAsync(
        Expression<Func<GraduationProcess, bool>> predicate,
        Func<IQueryable<GraduationProcess>, IIncludableQueryable<GraduationProcess, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<GraduationProcess>?> GetListAsync(
        Expression<Func<GraduationProcess, bool>>? predicate = null,
        Func<IQueryable<GraduationProcess>, IOrderedQueryable<GraduationProcess>>? orderBy = null,
        Func<IQueryable<GraduationProcess>, IIncludableQueryable<GraduationProcess, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<GraduationProcess> AddAsync(GraduationProcess graduationProcess);
    Task<GraduationProcess> UpdateAsync(GraduationProcess graduationProcess);
    Task<GraduationProcess> DeleteAsync(GraduationProcess graduationProcess, bool permanent = false);
}
