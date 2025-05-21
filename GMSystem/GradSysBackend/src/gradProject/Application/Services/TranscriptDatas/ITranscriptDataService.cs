using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.TranscriptDatas;

public interface ITranscriptDataService
{
    Task<TranscriptData?> GetAsync(
        Expression<Func<TranscriptData, bool>> predicate,
        Func<IQueryable<TranscriptData>, IIncludableQueryable<TranscriptData, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<TranscriptData>?> GetListAsync(
        Expression<Func<TranscriptData, bool>>? predicate = null,
        Func<IQueryable<TranscriptData>, IOrderedQueryable<TranscriptData>>? orderBy = null,
        Func<IQueryable<TranscriptData>, IIncludableQueryable<TranscriptData, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<TranscriptData> AddAsync(TranscriptData transcriptData);
    Task<TranscriptData> UpdateAsync(TranscriptData transcriptData);
    Task<TranscriptData> DeleteAsync(TranscriptData transcriptData, bool permanent = false);
}
