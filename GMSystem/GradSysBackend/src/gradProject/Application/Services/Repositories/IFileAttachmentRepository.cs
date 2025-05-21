using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;

namespace Application.Services.Repositories;

public interface IFileAttachmentRepository : IAsyncRepository<FileAttachment, Guid>, IRepository<FileAttachment, Guid>
{
}