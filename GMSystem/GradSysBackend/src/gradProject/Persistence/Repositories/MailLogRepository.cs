using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class MailLogRepository : EfRepositoryBase<MailLog, Guid, BaseDbContext>, IMailLogRepository
{
    public MailLogRepository(BaseDbContext context) : base(context)
    {
    }
}