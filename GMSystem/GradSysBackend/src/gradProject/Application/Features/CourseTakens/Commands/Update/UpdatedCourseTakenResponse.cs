using NArchitecture.Core.Application.Responses;

namespace Application.Features.CourseTakens.Commands.Update;

public class UpdatedCourseTakenResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid StudentUserId { get; set; }
    public string CourseCodeInTranscript { get; set; }
    public string CourseNameInTranscript { get; set; }
    public Guid? MatchedCourseId { get; set; }
    public string Grade { get; set; }
    public string SemesterTaken { get; set; }
    public int CreditsEarned { get; set; }
    public bool IsSuccessfullyCompleted { get; set; }
}