using NArchitecture.Core.Application.Responses;

namespace Application.Features.RequirementMandatoryCourses.Commands.Update;

public class UpdatedRequirementMandatoryCourseResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid RequirementSetId { get; set; }
    public Guid CourseId { get; set; }
}