using NArchitecture.Core.Application.Responses;

namespace Application.Features.TranscriptDatas.Commands.Delete;

public class DeletedTranscriptDataResponse : IResponse
{
    public Guid Id { get; set; }
}