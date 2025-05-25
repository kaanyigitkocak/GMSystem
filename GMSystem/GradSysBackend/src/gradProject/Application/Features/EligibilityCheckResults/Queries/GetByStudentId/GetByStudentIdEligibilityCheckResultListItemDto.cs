using Domain.Enums;
using NArchitecture.Core.Application.Dtos;

namespace Application.Features.EligibilityCheckResults.Queries.GetByStudentId;

public class GetByStudentIdEligibilityCheckResultListItemDto : IDto
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