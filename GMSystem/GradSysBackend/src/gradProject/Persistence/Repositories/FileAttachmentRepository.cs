using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class FileAttachmentRepository : EfRepositoryBase<FileAttachment, Guid, BaseDbContext>, IFileAttachmentRepository
{
    public FileAttachmentRepository(BaseDbContext context) : base(context)
    {
    }
}