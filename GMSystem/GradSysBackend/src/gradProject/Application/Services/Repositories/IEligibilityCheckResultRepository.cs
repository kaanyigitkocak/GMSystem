using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;

namespace Application.Services.Repositories;

public interface IEligibilityCheckResultRepository : IAsyncRepository<EligibilityCheckResult, Guid>, IRepository<EligibilityCheckResult, Guid>
{
}