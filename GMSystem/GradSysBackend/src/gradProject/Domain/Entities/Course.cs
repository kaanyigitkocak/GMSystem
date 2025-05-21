using NArchitecture.Core.Persistence.Repositories;
using Domain.Enums; // Namespace düzeltildi
using System.Collections.Generic; // HashSet için eklendi

namespace Domain.Entities; // Namespace düzeltildi

public class Course : Entity<Guid> // courseId olacak primary key
{
    // courseId (Guid, Primary Key) -> Id
    public string CourseCode { get; set; } // PascalCase
    public string CourseName { get; set; } // PascalCase
    public Guid? DepartmentId { get; set; } // _fk kaldırıldı, PascalCase
    public int Ects { get; set; } // PascalCase
    public CourseType CourseType { get; set; } // PascalCase

    // Navigation Properties
    public virtual Department? Department { get; set; }
    public virtual ICollection<RequirementMandatoryCourse> RequirementMandatoryCourses { get; set; } = new HashSet<RequirementMandatoryCourse>();
    public virtual ICollection<CourseTaken> CourseTakens { get; set; } = new HashSet<CourseTaken>();

    
    public Course() { }

    public Course(Guid id, string courseCode, string courseName, int ects, CourseType courseType, Guid? departmentId = null)
    {
        Id = id;
        CourseCode = courseCode;
        CourseName = courseName;
        DepartmentId = departmentId;
        Ects = ects;
        CourseType = courseType;
        RequirementMandatoryCourses = new HashSet<RequirementMandatoryCourse>();
        CourseTakens = new HashSet<CourseTaken>();
    }
} 