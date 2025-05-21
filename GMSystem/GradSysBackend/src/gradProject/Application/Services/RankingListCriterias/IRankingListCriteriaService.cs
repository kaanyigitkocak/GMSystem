using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.RankingListCriterias;

public interface IRankingListCriteriaService
{
    Task<RankingListCriteria?> GetAsync(
        Expression<Func<RankingListCriteria, bool>> predicate,
        Func<IQueryable<RankingListCriteria>, IIncludableQueryable<RankingListCriteria, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<RankingListCriteria>?> GetListAsync(
        Expression<Func<RankingListCriteria, bool>>? predicate = null,
        Func<IQueryable<RankingListCriteria>, IOrderedQueryable<RankingListCriteria>>? orderBy = null,
        Func<IQueryable<RankingListCriteria>, IIncludableQueryable<RankingListCriteria, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<RankingListCriteria> AddAsync(RankingListCriteria rankingListCriteria);
    Task<RankingListCriteria> UpdateAsync(RankingListCriteria rankingListCriteria);
    Task<RankingListCriteria> DeleteAsync(RankingListCriteria rankingListCriteria, bool permanent = false);
}
