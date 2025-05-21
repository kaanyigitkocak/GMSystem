using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class RankingListCriteriaRepository : EfRepositoryBase<RankingListCriteria, Guid, BaseDbContext>, IRankingListCriteriaRepository
{
    public RankingListCriteriaRepository(BaseDbContext context) : base(context)
    {
    }
}