using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class EligibilityCheckResultRepository : EfRepositoryBase<EligibilityCheckResult, Guid, BaseDbContext>, IEligibilityCheckResultRepository
{
    public EligibilityCheckResultRepository(BaseDbContext context) : base(context)
    {
    }
}