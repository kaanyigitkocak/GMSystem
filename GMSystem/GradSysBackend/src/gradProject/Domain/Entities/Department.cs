using NArchitecture.Core.Persistence.Repositories;
using System.Collections.Generic;

namespace Domain.Entities;

public class Department : Entity<Guid> // departmentId olacak primary key
{
    // departmentId (Guid, Primary Key) -> Id olarak Entity<Guid> tarafından sağlanır.
    public string Name { get; set; }
    public Guid FacultyId { get; set; }

    // Navigation Properties
    public virtual Faculty Faculty { get; set; }
    public virtual ICollection<Student> Students { get; set; } = new HashSet<Student>();
    public virtual ICollection<Staff> StaffMembers { get; set; } = new HashSet<Staff>();
    public virtual GraduationRequirementSet? GraduationRequirementSet { get; set; }


    public Department() { }

    public Department(Guid id, string departmentName, Guid facultyId)
    {
        Id = id; // departmentId
        Name = departmentName;
        FacultyId = facultyId;
        Students = new HashSet<Student>();
        StaffMembers = new HashSet<Staff>();
    }
} 