using Domain.Enums;
using NArchitecture.Core.Application.Responses;

namespace Application.Features.EligibilityCheckResults.Commands.Update;

public class UpdatedEligibilityCheckResultResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid ProcessId { get; set; }
    public EligibilityCheckType CheckType { get; set; }
    public bool IsMet { get; set; }
    public string ActualValue { get; set; }
    public string RequiredValue { get; set; }
    public string? NotesOrMissingItems { get; set; }
    public DateTime CheckDate { get; set; }
}