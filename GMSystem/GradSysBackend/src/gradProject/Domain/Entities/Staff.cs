using NArchitecture.Core.Persistence.Repositories;

namespace Domain.Entities;

public class Staff : Entity<Guid> // UserId olacak primary key ve User'a FK
{
    // UserId (Guid, Primary Key, FK to User.Id) - Entity<Guid> Id olarak bunu kullanır.
    // Bu yüzden Id alanı User.Id ile aynı değere sahip olmalı.
    public string? StaffIdentificationNumber { get; set; }
    public string? Title { get; set; }
    public Guid? DepartmentId { get; set; }
    public Guid? FacultyId { get; set; }

    // İlişki (Navigation Property)
    public virtual User User { get; set; }
    public virtual Department? Department { get; set; }
    public virtual Faculty? Faculty { get; set; }

    public Staff() { }

    public Staff(Guid userId, string? staffIdentificationNumber = null, string? title = null, Guid? departmentId = null, Guid? facultyId = null)
    {
        Id = userId; // Set the Id to UserId for TPT
        StaffIdentificationNumber = staffIdentificationNumber;
        Title = title;
        DepartmentId = departmentId;
        FacultyId = facultyId;
    }
} 