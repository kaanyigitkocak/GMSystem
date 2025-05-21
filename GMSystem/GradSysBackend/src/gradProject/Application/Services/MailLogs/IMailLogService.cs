using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.MailLogs;

public interface IMailLogService
{
    Task<MailLog?> GetAsync(
        Expression<Func<MailLog, bool>> predicate,
        Func<IQueryable<MailLog>, IIncludableQueryable<MailLog, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<MailLog>?> GetListAsync(
        Expression<Func<MailLog, bool>>? predicate = null,
        Func<IQueryable<MailLog>, IOrderedQueryable<MailLog>>? orderBy = null,
        Func<IQueryable<MailLog>, IIncludableQueryable<MailLog, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<MailLog> AddAsync(MailLog mailLog);
    Task<MailLog> UpdateAsync(MailLog mailLog);
    Task<MailLog> DeleteAsync(MailLog mailLog, bool permanent = false);
}
