using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;

namespace Application.Services.Repositories;

public interface IFacultyRepository : IAsyncRepository<Faculty, Guid>, IRepository<Faculty, Guid>
{
}