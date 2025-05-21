using NArchitecture.Core.Application.Responses;

namespace Application.Features.FileAttachments.Commands.Delete;

public class DeletedFileAttachmentResponse : IResponse
{
    public Guid Id { get; set; }
}