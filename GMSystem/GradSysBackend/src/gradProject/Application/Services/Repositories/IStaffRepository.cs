using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;

namespace Application.Services.Repositories;

public interface IStaffRepository : IAsyncRepository<Staff, Guid>, IRepository<Staff, Guid>
{
}