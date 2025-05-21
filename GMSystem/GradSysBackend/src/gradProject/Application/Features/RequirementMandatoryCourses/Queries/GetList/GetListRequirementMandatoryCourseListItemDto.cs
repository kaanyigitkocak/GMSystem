using NArchitecture.Core.Application.Dtos;

namespace Application.Features.RequirementMandatoryCourses.Queries.GetList;

public class GetListRequirementMandatoryCourseListItemDto : IDto
{
    public Guid Id { get; set; }
    public Guid RequirementSetId { get; set; }
    public Guid CourseId { get; set; }
}