using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;

namespace Application.Services.Repositories;

public interface IRequirementMandatoryCourseRepository : IAsyncRepository<RequirementMandatoryCourse, Guid>, IRepository<RequirementMandatoryCourse, Guid>
{
}