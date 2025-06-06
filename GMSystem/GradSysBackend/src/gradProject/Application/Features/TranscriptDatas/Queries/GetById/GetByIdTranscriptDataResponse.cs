using NArchitecture.Core.Application.Responses;

namespace Application.Features.TranscriptDatas.Queries.GetById;

public class GetByIdTranscriptDataResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid StudentUserId { get; set; }
    public Guid SourceDocumentId { get; set; }
    public DateTime ParsingDate { get; set; }
    public decimal ParsedGpa { get; set; }
    public int ParsedEcts { get; set; }
    public bool IsValidForProcessing { get; set; }
}