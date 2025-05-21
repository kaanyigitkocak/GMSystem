using Application.Features.RankingLists.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.RankingLists;

public class RankingListManager : IRankingListService
{
    private readonly IRankingListRepository _rankingListRepository;
    private readonly RankingListBusinessRules _rankingListBusinessRules;

    public RankingListManager(IRankingListRepository rankingListRepository, RankingListBusinessRules rankingListBusinessRules)
    {
        _rankingListRepository = rankingListRepository;
        _rankingListBusinessRules = rankingListBusinessRules;
    }

    public async Task<RankingList?> GetAsync(
        Expression<Func<RankingList, bool>> predicate,
        Func<IQueryable<RankingList>, IIncludableQueryable<RankingList, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        RankingList? rankingList = await _rankingListRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return rankingList;
    }

    public async Task<IPaginate<RankingList>?> GetListAsync(
        Expression<Func<RankingList, bool>>? predicate = null,
        Func<IQueryable<RankingList>, IOrderedQueryable<RankingList>>? orderBy = null,
        Func<IQueryable<RankingList>, IIncludableQueryable<RankingList, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<RankingList> rankingListList = await _rankingListRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return rankingListList;
    }

    public async Task<RankingList> AddAsync(RankingList rankingList)
    {
        RankingList addedRankingList = await _rankingListRepository.AddAsync(rankingList);

        return addedRankingList;
    }

    public async Task<RankingList> UpdateAsync(RankingList rankingList)
    {
        RankingList updatedRankingList = await _rankingListRepository.UpdateAsync(rankingList);

        return updatedRankingList;
    }

    public async Task<RankingList> DeleteAsync(RankingList rankingList, bool permanent = false)
    {
        RankingList deletedRankingList = await _rankingListRepository.DeleteAsync(rankingList);

        return deletedRankingList;
    }
}
