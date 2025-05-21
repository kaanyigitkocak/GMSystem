using NArchitecture.Core.Persistence.Repositories;

namespace Domain.Entities;

public class RequirementMandatoryCourse : Entity<Guid> // reqMandatoryCourseId olacak primary key
{
    // reqMandatoryCourseId (Guid, Primary Key) -> Id
    public Guid RequirementSetId { get; set; }
    public Guid CourseId { get; set; }

    // Navigation Properties
    public virtual GraduationRequirementSet GraduationRequirementSet { get; set; }
    public virtual Course Course { get; set; }

    public RequirementMandatoryCourse() { }

    public RequirementMandatoryCourse(Guid id, Guid requirementSetId, Guid courseId)
    {
        Id = id;
        RequirementSetId = requirementSetId;
        CourseId = courseId;
    }
} 