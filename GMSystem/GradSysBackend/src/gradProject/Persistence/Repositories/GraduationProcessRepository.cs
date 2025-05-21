using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class GraduationProcessRepository : EfRepositoryBase<GraduationProcess, Guid, BaseDbContext>, IGraduationProcessRepository
{
    public GraduationProcessRepository(BaseDbContext context) : base(context)
    {
    }
}