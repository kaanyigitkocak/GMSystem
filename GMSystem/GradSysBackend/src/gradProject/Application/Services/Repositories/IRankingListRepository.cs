using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;

namespace Application.Services.Repositories;

public interface IRankingListRepository : IAsyncRepository<RankingList, Guid>, IRepository<RankingList, Guid>
{
}