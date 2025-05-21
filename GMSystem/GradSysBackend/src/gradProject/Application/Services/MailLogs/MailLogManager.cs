using Application.Features.MailLogs.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.MailLogs;

public class MailLogManager : IMailLogService
{
    private readonly IMailLogRepository _mailLogRepository;
    private readonly MailLogBusinessRules _mailLogBusinessRules;

    public MailLogManager(IMailLogRepository mailLogRepository, MailLogBusinessRules mailLogBusinessRules)
    {
        _mailLogRepository = mailLogRepository;
        _mailLogBusinessRules = mailLogBusinessRules;
    }

    public async Task<MailLog?> GetAsync(
        Expression<Func<MailLog, bool>> predicate,
        Func<IQueryable<MailLog>, IIncludableQueryable<MailLog, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        MailLog? mailLog = await _mailLogRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return mailLog;
    }

    public async Task<IPaginate<MailLog>?> GetListAsync(
        Expression<Func<MailLog, bool>>? predicate = null,
        Func<IQueryable<MailLog>, IOrderedQueryable<MailLog>>? orderBy = null,
        Func<IQueryable<MailLog>, IIncludableQueryable<MailLog, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<MailLog> mailLogList = await _mailLogRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return mailLogList;
    }

    public async Task<MailLog> AddAsync(MailLog mailLog)
    {
        MailLog addedMailLog = await _mailLogRepository.AddAsync(mailLog);

        return addedMailLog;
    }

    public async Task<MailLog> UpdateAsync(MailLog mailLog)
    {
        MailLog updatedMailLog = await _mailLogRepository.UpdateAsync(mailLog);

        return updatedMailLog;
    }

    public async Task<MailLog> DeleteAsync(MailLog mailLog, bool permanent = false)
    {
        MailLog deletedMailLog = await _mailLogRepository.DeleteAsync(mailLog);

        return deletedMailLog;
    }
}
