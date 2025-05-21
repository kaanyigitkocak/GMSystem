using Application.Features.TranscriptDatas.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.TranscriptDatas;

public class TranscriptDataManager : ITranscriptDataService
{
    private readonly ITranscriptDataRepository _transcriptDataRepository;
    private readonly TranscriptDataBusinessRules _transcriptDataBusinessRules;

    public TranscriptDataManager(ITranscriptDataRepository transcriptDataRepository, TranscriptDataBusinessRules transcriptDataBusinessRules)
    {
        _transcriptDataRepository = transcriptDataRepository;
        _transcriptDataBusinessRules = transcriptDataBusinessRules;
    }

    public async Task<TranscriptData?> GetAsync(
        Expression<Func<TranscriptData, bool>> predicate,
        Func<IQueryable<TranscriptData>, IIncludableQueryable<TranscriptData, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        TranscriptData? transcriptData = await _transcriptDataRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return transcriptData;
    }

    public async Task<IPaginate<TranscriptData>?> GetListAsync(
        Expression<Func<TranscriptData, bool>>? predicate = null,
        Func<IQueryable<TranscriptData>, IOrderedQueryable<TranscriptData>>? orderBy = null,
        Func<IQueryable<TranscriptData>, IIncludableQueryable<TranscriptData, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<TranscriptData> transcriptDataList = await _transcriptDataRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return transcriptDataList;
    }

    public async Task<TranscriptData> AddAsync(TranscriptData transcriptData)
    {
        TranscriptData addedTranscriptData = await _transcriptDataRepository.AddAsync(transcriptData);

        return addedTranscriptData;
    }

    public async Task<TranscriptData> UpdateAsync(TranscriptData transcriptData)
    {
        TranscriptData updatedTranscriptData = await _transcriptDataRepository.UpdateAsync(transcriptData);

        return updatedTranscriptData;
    }

    public async Task<TranscriptData> DeleteAsync(TranscriptData transcriptData, bool permanent = false)
    {
        TranscriptData deletedTranscriptData = await _transcriptDataRepository.DeleteAsync(transcriptData);

        return deletedTranscriptData;
    }
}
