using NArchitecture.Core.Application.Responses;

namespace Application.Features.RequirementMandatoryCourses.Commands.Delete;

public class DeletedRequirementMandatoryCourseResponse : IResponse
{
    public Guid Id { get; set; }
}