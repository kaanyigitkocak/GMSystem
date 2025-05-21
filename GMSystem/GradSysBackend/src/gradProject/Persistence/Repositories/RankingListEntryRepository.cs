using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class RankingListEntryRepository : EfRepositoryBase<RankingListEntry, Guid, BaseDbContext>, IRankingListEntryRepository
{
    public RankingListEntryRepository(BaseDbContext context) : base(context)
    {
    }
}