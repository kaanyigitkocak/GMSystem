using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;

namespace Application.Services.Repositories;

public interface IGraduationRequirementSetRepository : IAsyncRepository<GraduationRequirementSet, Guid>, IRepository<GraduationRequirementSet, Guid>
{
}