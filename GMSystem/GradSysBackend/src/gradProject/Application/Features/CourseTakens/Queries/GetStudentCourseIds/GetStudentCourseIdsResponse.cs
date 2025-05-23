using Domain.Entities;

namespace Application.Features.CourseTakens.Queries.GetStudentCourseIds;

public class GetStudentCourseIdsResponse
{
    public List<Guid> CourseIds { get; set; } = new();
    public int TotalCourseCount { get; set; }
    public Guid StudentUserId { get; set; }
    public List<CourseTaken> CourseTakenRecords { get; set; } = new();
    public Student UpdatedStudent { get; set; }
    public TranscriptData TranscriptData { get; set; }
    public decimal CalculatedGpa { get; set; }
    public int TotalEctsCompleted { get; set; }
} 