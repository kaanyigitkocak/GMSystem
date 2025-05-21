using Application.Features.RankingListEntries.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.RankingListEntries;

public class RankingListEntryManager : IRankingListEntryService
{
    private readonly IRankingListEntryRepository _rankingListEntryRepository;
    private readonly RankingListEntryBusinessRules _rankingListEntryBusinessRules;

    public RankingListEntryManager(IRankingListEntryRepository rankingListEntryRepository, RankingListEntryBusinessRules rankingListEntryBusinessRules)
    {
        _rankingListEntryRepository = rankingListEntryRepository;
        _rankingListEntryBusinessRules = rankingListEntryBusinessRules;
    }

    public async Task<RankingListEntry?> GetAsync(
        Expression<Func<RankingListEntry, bool>> predicate,
        Func<IQueryable<RankingListEntry>, IIncludableQueryable<RankingListEntry, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        RankingListEntry? rankingListEntry = await _rankingListEntryRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return rankingListEntry;
    }

    public async Task<IPaginate<RankingListEntry>?> GetListAsync(
        Expression<Func<RankingListEntry, bool>>? predicate = null,
        Func<IQueryable<RankingListEntry>, IOrderedQueryable<RankingListEntry>>? orderBy = null,
        Func<IQueryable<RankingListEntry>, IIncludableQueryable<RankingListEntry, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<RankingListEntry> rankingListEntryList = await _rankingListEntryRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return rankingListEntryList;
    }

    public async Task<RankingListEntry> AddAsync(RankingListEntry rankingListEntry)
    {
        RankingListEntry addedRankingListEntry = await _rankingListEntryRepository.AddAsync(rankingListEntry);

        return addedRankingListEntry;
    }

    public async Task<RankingListEntry> UpdateAsync(RankingListEntry rankingListEntry)
    {
        RankingListEntry updatedRankingListEntry = await _rankingListEntryRepository.UpdateAsync(rankingListEntry);

        return updatedRankingListEntry;
    }

    public async Task<RankingListEntry> DeleteAsync(RankingListEntry rankingListEntry, bool permanent = false)
    {
        RankingListEntry deletedRankingListEntry = await _rankingListEntryRepository.DeleteAsync(rankingListEntry);

        return deletedRankingListEntry;
    }
}
