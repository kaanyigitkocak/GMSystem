using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class StaffRepository : EfRepositoryBase<Staff, Guid, BaseDbContext>, IStaffRepository
{
    public StaffRepository(BaseDbContext context) : base(context)
    {
    }
}