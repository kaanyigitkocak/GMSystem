using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class RankingListRepository : EfRepositoryBase<RankingList, Guid, BaseDbContext>, IRankingListRepository
{
    public RankingListRepository(BaseDbContext context) : base(context)
    {
    }
}