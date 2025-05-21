using FluentValidation;

namespace Application.Features.CourseTakens.Commands.Update;

public class UpdateCourseTakenCommandValidator : AbstractValidator<UpdateCourseTakenCommand>
{
    public UpdateCourseTakenCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
        RuleFor(c => c.StudentUserId).NotEmpty();
        RuleFor(c => c.CourseCodeInTranscript).NotEmpty();
        RuleFor(c => c.CourseNameInTranscript).NotEmpty();
        RuleFor(c => c.MatchedCourseId).NotEmpty();
        RuleFor(c => c.Grade).NotEmpty();
        RuleFor(c => c.SemesterTaken).NotEmpty();
        RuleFor(c => c.CreditsEarned).NotEmpty();
        RuleFor(c => c.IsSuccessfullyCompleted).NotEmpty();
    }
}