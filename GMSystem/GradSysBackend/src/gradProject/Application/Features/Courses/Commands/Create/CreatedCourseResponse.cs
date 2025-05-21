using Domain.Enums;
using NArchitecture.Core.Application.Responses;

namespace Application.Features.Courses.Commands.Create;

public class CreatedCourseResponse : IResponse
{
    public Guid Id { get; set; }
    public string CourseCode { get; set; }
    public string CourseName { get; set; }
    public Guid? DepartmentId { get; set; }
    public int Ects { get; set; }
    public CourseType CourseType { get; set; }
}