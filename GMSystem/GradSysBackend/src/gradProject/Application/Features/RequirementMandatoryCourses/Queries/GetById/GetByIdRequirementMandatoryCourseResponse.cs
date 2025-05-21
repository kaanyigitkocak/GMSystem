using NArchitecture.Core.Application.Responses;

namespace Application.Features.RequirementMandatoryCourses.Queries.GetById;

public class GetByIdRequirementMandatoryCourseResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid RequirementSetId { get; set; }
    public Guid CourseId { get; set; }
}