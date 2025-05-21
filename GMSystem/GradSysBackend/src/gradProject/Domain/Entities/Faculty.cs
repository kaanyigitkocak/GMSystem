using NArchitecture.Core.Persistence.Repositories;
using System.Collections.Generic;

namespace Domain.Entities;

public class Faculty : Entity<Guid> // facultyId olacak primary key
{
    // facultyId (Guid, Primary Key) -> Id olarak Entity<Guid> tarafından sağlanır.
    public string Name { get; set; }


    // Navigation Property for Departments
    public virtual ICollection<Department> Departments { get; set; } = new HashSet<Department>();

    public Faculty() { }

    public Faculty(Guid id, string facultyName)
    {
        Id = id; // facultyId
        Name = facultyName;
        Departments = new HashSet<Department>();
    }
} 