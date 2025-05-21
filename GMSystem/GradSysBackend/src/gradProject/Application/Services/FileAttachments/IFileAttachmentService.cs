using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.FileAttachments;

public interface IFileAttachmentService
{
    Task<FileAttachment?> GetAsync(
        Expression<Func<FileAttachment, bool>> predicate,
        Func<IQueryable<FileAttachment>, IIncludableQueryable<FileAttachment, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<FileAttachment>?> GetListAsync(
        Expression<Func<FileAttachment, bool>>? predicate = null,
        Func<IQueryable<FileAttachment>, IOrderedQueryable<FileAttachment>>? orderBy = null,
        Func<IQueryable<FileAttachment>, IIncludableQueryable<FileAttachment, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<FileAttachment> AddAsync(FileAttachment fileAttachment);
    Task<FileAttachment> UpdateAsync(FileAttachment fileAttachment);
    Task<FileAttachment> DeleteAsync(FileAttachment fileAttachment, bool permanent = false);
}
