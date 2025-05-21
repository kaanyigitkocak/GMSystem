using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class RequirementMandatoryCourseRepository : EfRepositoryBase<RequirementMandatoryCourse, Guid, BaseDbContext>, IRequirementMandatoryCourseRepository
{
    public RequirementMandatoryCourseRepository(BaseDbContext context) : base(context)
    {
    }
}