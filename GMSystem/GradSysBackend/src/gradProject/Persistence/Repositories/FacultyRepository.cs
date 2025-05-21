using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class FacultyRepository : EfRepositoryBase<Faculty, Guid, BaseDbContext>, IFacultyRepository
{
    public FacultyRepository(BaseDbContext context) : base(context)
    {
    }
}