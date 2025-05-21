using Application.Features.FileAttachments.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.FileAttachments;

public class FileAttachmentManager : IFileAttachmentService
{
    private readonly IFileAttachmentRepository _fileAttachmentRepository;
    private readonly FileAttachmentBusinessRules _fileAttachmentBusinessRules;

    public FileAttachmentManager(IFileAttachmentRepository fileAttachmentRepository, FileAttachmentBusinessRules fileAttachmentBusinessRules)
    {
        _fileAttachmentRepository = fileAttachmentRepository;
        _fileAttachmentBusinessRules = fileAttachmentBusinessRules;
    }

    public async Task<FileAttachment?> GetAsync(
        Expression<Func<FileAttachment, bool>> predicate,
        Func<IQueryable<FileAttachment>, IIncludableQueryable<FileAttachment, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        FileAttachment? fileAttachment = await _fileAttachmentRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return fileAttachment;
    }

    public async Task<IPaginate<FileAttachment>?> GetListAsync(
        Expression<Func<FileAttachment, bool>>? predicate = null,
        Func<IQueryable<FileAttachment>, IOrderedQueryable<FileAttachment>>? orderBy = null,
        Func<IQueryable<FileAttachment>, IIncludableQueryable<FileAttachment, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<FileAttachment> fileAttachmentList = await _fileAttachmentRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return fileAttachmentList;
    }

    public async Task<FileAttachment> AddAsync(FileAttachment fileAttachment)
    {
        FileAttachment addedFileAttachment = await _fileAttachmentRepository.AddAsync(fileAttachment);

        return addedFileAttachment;
    }

    public async Task<FileAttachment> UpdateAsync(FileAttachment fileAttachment)
    {
        FileAttachment updatedFileAttachment = await _fileAttachmentRepository.UpdateAsync(fileAttachment);

        return updatedFileAttachment;
    }

    public async Task<FileAttachment> DeleteAsync(FileAttachment fileAttachment, bool permanent = false)
    {
        FileAttachment deletedFileAttachment = await _fileAttachmentRepository.DeleteAsync(fileAttachment);

        return deletedFileAttachment;
    }
}
