using FluentValidation;

namespace Application.Features.CourseTakens.Commands.Create;

public class CreateCourseTakenCommandValidator : AbstractValidator<CreateCourseTakenCommand>
{
    public CreateCourseTakenCommandValidator()
    {
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