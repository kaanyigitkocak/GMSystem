using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class GraduationRequirementSetRepository : EfRepositoryBase<GraduationRequirementSet, Guid, BaseDbContext>, IGraduationRequirementSetRepository
{
    public GraduationRequirementSetRepository(BaseDbContext context) : base(context)
    {
    }
}