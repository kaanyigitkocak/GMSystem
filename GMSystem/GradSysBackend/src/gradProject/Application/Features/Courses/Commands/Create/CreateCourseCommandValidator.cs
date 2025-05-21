using FluentValidation;

namespace Application.Features.Courses.Commands.Create;

public class CreateCourseCommandValidator : AbstractValidator<CreateCourseCommand>
{
    public CreateCourseCommandValidator()
    {
        RuleFor(c => c.CourseCode).NotEmpty();
        RuleFor(c => c.CourseName).NotEmpty();
        RuleFor(c => c.DepartmentId).NotEmpty();
        RuleFor(c => c.Ects).NotEmpty();
        RuleFor(c => c.CourseType).NotEmpty();
    }
}