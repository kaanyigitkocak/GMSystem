using Application.Features.RankingListCriterias.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.RankingListCriterias;

public class RankingListCriteriaManager : IRankingListCriteriaService
{
    private readonly IRankingListCriteriaRepository _rankingListCriteriaRepository;
    private readonly RankingListCriteriaBusinessRules _rankingListCriteriaBusinessRules;

    public RankingListCriteriaManager(IRankingListCriteriaRepository rankingListCriteriaRepository, RankingListCriteriaBusinessRules rankingListCriteriaBusinessRules)
    {
        _rankingListCriteriaRepository = rankingListCriteriaRepository;
        _rankingListCriteriaBusinessRules = rankingListCriteriaBusinessRules;
    }

    public async Task<RankingListCriteria?> GetAsync(
        Expression<Func<RankingListCriteria, bool>> predicate,
        Func<IQueryable<RankingListCriteria>, IIncludableQueryable<RankingListCriteria, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        RankingListCriteria? rankingListCriteria = await _rankingListCriteriaRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return rankingListCriteria;
    }

    public async Task<IPaginate<RankingListCriteria>?> GetListAsync(
        Expression<Func<RankingListCriteria, bool>>? predicate = null,
        Func<IQueryable<RankingListCriteria>, IOrderedQueryable<RankingListCriteria>>? orderBy = null,
        Func<IQueryable<RankingListCriteria>, IIncludableQueryable<RankingListCriteria, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<RankingListCriteria> rankingListCriteriaList = await _rankingListCriteriaRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return rankingListCriteriaList;
    }

    public async Task<RankingListCriteria> AddAsync(RankingListCriteria rankingListCriteria)
    {
        RankingListCriteria addedRankingListCriteria = await _rankingListCriteriaRepository.AddAsync(rankingListCriteria);

        return addedRankingListCriteria;
    }

    public async Task<RankingListCriteria> UpdateAsync(RankingListCriteria rankingListCriteria)
    {
        RankingListCriteria updatedRankingListCriteria = await _rankingListCriteriaRepository.UpdateAsync(rankingListCriteria);

        return updatedRankingListCriteria;
    }

    public async Task<RankingListCriteria> DeleteAsync(RankingListCriteria rankingListCriteria, bool permanent = false)
    {
        RankingListCriteria deletedRankingListCriteria = await _rankingListCriteriaRepository.DeleteAsync(rankingListCriteria);

        return deletedRankingListCriteria;
    }
}
