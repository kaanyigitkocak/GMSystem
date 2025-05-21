using Application.Features.EligibilityCheckResults.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.EligibilityCheckResults;

public class EligibilityCheckResultManager : IEligibilityCheckResultService
{
    private readonly IEligibilityCheckResultRepository _eligibilityCheckResultRepository;
    private readonly EligibilityCheckResultBusinessRules _eligibilityCheckResultBusinessRules;

    public EligibilityCheckResultManager(IEligibilityCheckResultRepository eligibilityCheckResultRepository, EligibilityCheckResultBusinessRules eligibilityCheckResultBusinessRules)
    {
        _eligibilityCheckResultRepository = eligibilityCheckResultRepository;
        _eligibilityCheckResultBusinessRules = eligibilityCheckResultBusinessRules;
    }

    public async Task<EligibilityCheckResult?> GetAsync(
        Expression<Func<EligibilityCheckResult, bool>> predicate,
        Func<IQueryable<EligibilityCheckResult>, IIncludableQueryable<EligibilityCheckResult, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        EligibilityCheckResult? eligibilityCheckResult = await _eligibilityCheckResultRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return eligibilityCheckResult;
    }

    public async Task<IPaginate<EligibilityCheckResult>?> GetListAsync(
        Expression<Func<EligibilityCheckResult, bool>>? predicate = null,
        Func<IQueryable<EligibilityCheckResult>, IOrderedQueryable<EligibilityCheckResult>>? orderBy = null,
        Func<IQueryable<EligibilityCheckResult>, IIncludableQueryable<EligibilityCheckResult, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<EligibilityCheckResult> eligibilityCheckResultList = await _eligibilityCheckResultRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return eligibilityCheckResultList;
    }

    public async Task<EligibilityCheckResult> AddAsync(EligibilityCheckResult eligibilityCheckResult)
    {
        EligibilityCheckResult addedEligibilityCheckResult = await _eligibilityCheckResultRepository.AddAsync(eligibilityCheckResult);

        return addedEligibilityCheckResult;
    }

    public async Task<EligibilityCheckResult> UpdateAsync(EligibilityCheckResult eligibilityCheckResult)
    {
        EligibilityCheckResult updatedEligibilityCheckResult = await _eligibilityCheckResultRepository.UpdateAsync(eligibilityCheckResult);

        return updatedEligibilityCheckResult;
    }

    public async Task<EligibilityCheckResult> DeleteAsync(EligibilityCheckResult eligibilityCheckResult, bool permanent = false)
    {
        EligibilityCheckResult deletedEligibilityCheckResult = await _eligibilityCheckResultRepository.DeleteAsync(eligibilityCheckResult);

        return deletedEligibilityCheckResult;
    }
}
