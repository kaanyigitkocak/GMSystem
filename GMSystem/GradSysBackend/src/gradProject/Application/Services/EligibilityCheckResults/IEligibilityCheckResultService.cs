using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.EligibilityCheckResults;

public interface IEligibilityCheckResultService
{
    Task<EligibilityCheckResult?> GetAsync(
        Expression<Func<EligibilityCheckResult, bool>> predicate,
        Func<IQueryable<EligibilityCheckResult>, IIncludableQueryable<EligibilityCheckResult, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<EligibilityCheckResult>?> GetListAsync(
        Expression<Func<EligibilityCheckResult, bool>>? predicate = null,
        Func<IQueryable<EligibilityCheckResult>, IOrderedQueryable<EligibilityCheckResult>>? orderBy = null,
        Func<IQueryable<EligibilityCheckResult>, IIncludableQueryable<EligibilityCheckResult, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<EligibilityCheckResult> AddAsync(EligibilityCheckResult eligibilityCheckResult);
    Task<EligibilityCheckResult> UpdateAsync(EligibilityCheckResult eligibilityCheckResult);
    Task<EligibilityCheckResult> DeleteAsync(EligibilityCheckResult eligibilityCheckResult, bool permanent = false);
}
