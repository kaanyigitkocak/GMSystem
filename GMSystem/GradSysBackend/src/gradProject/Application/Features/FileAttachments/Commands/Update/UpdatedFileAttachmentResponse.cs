using Domain.Enums;
using NArchitecture.Core.Application.Responses;

namespace Application.Features.FileAttachments.Commands.Update;

public class UpdatedFileAttachmentResponse : IResponse
{
    public Guid Id { get; set; }
    public string FileName { get; set; }
    public string FilePath { get; set; }
    public StorageType StorageType { get; set; }
    public long FileSize { get; set; }
    public FileType FileType { get; set; }
    public string MimeType { get; set; }
    public DateTime UploadDate { get; set; }
    public Guid UploaderUserId { get; set; }
    public Guid? StudentUserId { get; set; }
    public Guid? ProcessId { get; set; }
}