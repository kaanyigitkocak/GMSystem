using NArchitecture.Core.Application.Responses;

namespace Application.Features.RequirementMandatoryCourses.Commands.Create;

public class CreatedRequirementMandatoryCourseResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid RequirementSetId { get; set; }
    public Guid CourseId { get; set; }
}