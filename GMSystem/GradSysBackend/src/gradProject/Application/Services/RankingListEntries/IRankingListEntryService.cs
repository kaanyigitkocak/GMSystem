using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.RankingListEntries;

public interface IRankingListEntryService
{
    Task<RankingListEntry?> GetAsync(
        Expression<Func<RankingListEntry, bool>> predicate,
        Func<IQueryable<RankingListEntry>, IIncludableQueryable<RankingListEntry, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<RankingListEntry>?> GetListAsync(
        Expression<Func<RankingListEntry, bool>>? predicate = null,
        Func<IQueryable<RankingListEntry>, IOrderedQueryable<RankingListEntry>>? orderBy = null,
        Func<IQueryable<RankingListEntry>, IIncludableQueryable<RankingListEntry, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<RankingListEntry> AddAsync(RankingListEntry rankingListEntry);
    Task<RankingListEntry> UpdateAsync(RankingListEntry rankingListEntry);
    Task<RankingListEntry> DeleteAsync(RankingListEntry rankingListEntry, bool permanent = false);
}
