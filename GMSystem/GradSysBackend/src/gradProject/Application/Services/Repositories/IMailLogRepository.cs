using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;

namespace Application.Services.Repositories;

public interface IMailLogRepository : IAsyncRepository<MailLog, Guid>, IRepository<MailLog, Guid>
{
}