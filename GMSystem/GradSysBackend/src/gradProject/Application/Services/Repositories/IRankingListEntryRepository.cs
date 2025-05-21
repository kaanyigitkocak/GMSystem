using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;

namespace Application.Services.Repositories;

public interface IRankingListEntryRepository : IAsyncRepository<RankingListEntry, Guid>, IRepository<RankingListEntry, Guid>
{
}