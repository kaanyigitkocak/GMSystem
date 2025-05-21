using NArchitecture.Core.Application.Responses;

namespace Application.Features.TranscriptDatas.Commands.Update;

public class UpdatedTranscriptDataResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid StudentUserId { get; set; }
    public Guid SourceDocumentId { get; set; }
    public DateTime ParsingDate { get; set; }
    public decimal ParsedGpa { get; set; }
    public int ParsedEcts { get; set; }
    public bool IsValidForProcessing { get; set; }
}