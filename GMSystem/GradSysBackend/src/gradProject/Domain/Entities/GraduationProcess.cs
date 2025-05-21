using NArchitecture.Core.Persistence.Repositories;
using Domain.Enums; // Namespace düzeltildi
using System.Collections.Generic; // HashSet için eklendi

namespace Domain.Entities; // Namespace düzeltildi

public class GraduationProcess : Entity<Guid> // processId olacak primary key
{
    // processId (Guid, Primary Key) -> Id
    public Guid StudentUserId { get; set; } // _fk kaldırıldı, PascalCase
    public string AcademicTerm { get; set; } // PascalCase
    public DateTime InitiationDate { get; set; } // PascalCase
    public GraduationProcessStatus Status { get; set; } // PascalCase
    public DateTime LastUpdateDate { get; set; } // PascalCase
    public string? Notes { get; set; } // PascalCase
    public Guid? AdvisorUserId { get; set; } // _fk kaldırıldı, PascalCase
    public DateTime? AdvisorReviewDate { get; set; } // PascalCase
    public Guid? DeptSecretaryUserId { get; set; } // _fk kaldırıldı, PascalCase
    public DateTime? DeptSecretaryReviewDate { get; set; } // PascalCase
    public Guid? DeansOfficeUserId { get; set; } // _fk kaldırıldı, PascalCase
    public DateTime? DeansOfficeReviewDate { get; set; } // PascalCase
    public Guid? StudentAffairsUserId { get; set; } // _fk kaldırıldı, PascalCase
    public DateTime? StudentAffairsReviewDate { get; set; } // PascalCase

    // Navigation Properties
    public virtual User StudentUser { get; set; }
    public virtual User? AdvisorUser { get; set; }
    public virtual User? DeptSecretaryUser { get; set; }
    public virtual User? DeansOfficeUser { get; set; }
    public virtual User? StudentAffairsUser { get; set; }
    public virtual ICollection<EligibilityCheckResult> EligibilityCheckResults { get; set; } = new HashSet<EligibilityCheckResult>();
    public virtual ICollection<FileAttachment> FileAttachments { get; set; } = new HashSet<FileAttachment>();
    public virtual ICollection<Notification> Notifications { get; set; } = new HashSet<Notification>();


    public GraduationProcess() { }

    public GraduationProcess(Guid id, Guid studentUserId, string term, DateTime initDate, GraduationProcessStatus initialStatus, DateTime lastUpdate)
    {
        Id = id;
        StudentUserId = studentUserId;
        AcademicTerm = term;
        InitiationDate = initDate;
        Status = initialStatus;
        LastUpdateDate = lastUpdate;
        EligibilityCheckResults = new HashSet<EligibilityCheckResult>();
        FileAttachments = new HashSet<FileAttachment>();
        Notifications = new HashSet<Notification>();
    }
} 