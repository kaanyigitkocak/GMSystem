using NArchitecture.Core.Persistence.Repositories;

namespace Domain.Entities;

public class CourseTaken : Entity<Guid> // courseTakenId olacak primary key
{
    // courseTakenId (Guid, Primary Key) -> Id
    public Guid StudentUserId { get; set; } // _fk kaldırıldı, PascalCase
    public string CourseCodeInTranscript { get; set; } // PascalCase
    public string CourseNameInTranscript { get; set; } // PascalCase
    public Guid? MatchedCourseId { get; set; } // _fk kaldırıldı, PascalCase
    public string Grade { get; set; } // PascalCase
    public string SemesterTaken { get; set; } // PascalCase
    public int CreditsEarned { get; set; } // PascalCase
    public bool IsSuccessfullyCompleted { get; set; } // PascalCase

    // Navigation Properties
    public virtual User StudentUser { get; set; }
    public virtual Course? MatchedCourse { get; set; }

    public CourseTaken() { }

    public CourseTaken(Guid id, Guid studentUserId, string courseCodeInTranscript, string courseNameInTranscript, string grade, string semesterTaken, int creditsEarned, bool isSuccessfullyCompleted, Guid? matchedCourseId = null)
    {
        Id = id;
        StudentUserId = studentUserId;
        CourseCodeInTranscript = courseCodeInTranscript;
        CourseNameInTranscript = courseNameInTranscript;
        MatchedCourseId = matchedCourseId;
        Grade = grade;
        SemesterTaken = semesterTaken;
        CreditsEarned = creditsEarned;
        IsSuccessfullyCompleted = isSuccessfullyCompleted;
    }
} 