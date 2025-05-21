using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.RankingLists;

public interface IRankingListService
{
    Task<RankingList?> GetAsync(
        Expression<Func<RankingList, bool>> predicate,
        Func<IQueryable<RankingList>, IIncludableQueryable<RankingList, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<RankingList>?> GetListAsync(
        Expression<Func<RankingList, bool>>? predicate = null,
        Func<IQueryable<RankingList>, IOrderedQueryable<RankingList>>? orderBy = null,
        Func<IQueryable<RankingList>, IIncludableQueryable<RankingList, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<RankingList> AddAsync(RankingList rankingList);
    Task<RankingList> UpdateAsync(RankingList rankingList);
    Task<RankingList> DeleteAsync(RankingList rankingList, bool permanent = false);
}
