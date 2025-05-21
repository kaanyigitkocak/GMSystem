using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;

namespace Application.Services.Repositories;

public interface IRankingListCriteriaRepository : IAsyncRepository<RankingListCriteria, Guid>, IRepository<RankingListCriteria, Guid>
{
}