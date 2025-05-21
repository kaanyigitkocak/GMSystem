using NArchitecture.Core.Persistence.Repositories;
using Domain.Enums; // Namespace düzeltildi

namespace Domain.Entities; // Namespace düzeltildi

public class EligibilityCheckResult : Entity<Guid> // checkResultId olacak primary key
{
    // checkResultId (Guid, Primary Key) -> Id
    public Guid ProcessId { get; set; } // _fk kaldırıldı, PascalCase
    public EligibilityCheckType CheckType { get; set; } // PascalCase
    public bool IsMet { get; set; } // PascalCase
    public string ActualValue { get; set; } // PascalCase
    public string RequiredValue { get; set; } // PascalCase
    public string? NotesOrMissingItems { get; set; } // PascalCase
    public DateTime CheckDate { get; set; } // PascalCase

    // Navigation Property
    public virtual GraduationProcess GraduationProcess { get; set; }

    public EligibilityCheckResult() { }

    public EligibilityCheckResult(Guid id, Guid processId, EligibilityCheckType type, bool met, string actual, string required, DateTime date, string? notes = null)
    {
        Id = id;
        ProcessId = processId;
        CheckType = type;
        IsMet = met;
        ActualValue = actual;
        RequiredValue = required;
        CheckDate = date;
        NotesOrMissingItems = notes;
    }
} 