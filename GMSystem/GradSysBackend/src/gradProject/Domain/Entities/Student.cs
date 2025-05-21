using NArchitecture.Core.Persistence.Repositories;
using Domain.Enums; // Namespace düzeltildi
using System.ComponentModel.DataAnnotations.Schema; // ForeignKey attribute'u için eklendi

namespace Domain.Entities; // Namespace düzeltildi

public class Student : Entity<Guid> // UserId olacak primary key ve User'a FK
{
    // UserId (Guid, Primary Key, FK to User.Id) - Entity<Guid> Id olarak bunu kullanır.
    // Bu yüzden Id alanı User.Id ile aynı değere sahip olmalı.
    public string StudentNumber { get; set; }
    public Guid DepartmentId { get; set; } // _fk kaldırıldı, PascalCase
    public string ProgramName { get; set; }
    public DateTime EnrollDate { get; set; } // Date yerine DateTime kullandım, gerekirse DateOnly'ye çevrilebilir.
    public decimal? CurrentGpa { get; set; }
    public int? CurrentEctsCompleted { get; set; }
    public StudentGraduationStatus GraduationStatus { get; set; }
    public Guid? AssignedAdvisorUserId { get; set; } // _fk kaldırıldı, PascalCase

    // İlişki (Navigation Property)
    public virtual User User { get; set; }
    public virtual Department Department { get; set; }

    [ForeignKey("AssignedAdvisorUserId")]
    public virtual User? AssignedAdvisor { get; set; }

    public Student()
    {
    }

    public Student(Guid userId, string studentNumber, Guid departmentId, string programName, DateTime enrollDate, StudentGraduationStatus graduationStatus, decimal? currentGpa = null, int? currentEctsCompleted = null, Guid? assignedAdvisorUserId = null)
    {
        Id = userId; // Set the Id to UserId for TPT
        StudentNumber = studentNumber;
        DepartmentId = departmentId;
        ProgramName = programName;
        EnrollDate = enrollDate;
        GraduationStatus = graduationStatus;
        CurrentGpa = currentGpa;
        CurrentEctsCompleted = currentEctsCompleted;
        AssignedAdvisorUserId = assignedAdvisorUserId;
    }
} 