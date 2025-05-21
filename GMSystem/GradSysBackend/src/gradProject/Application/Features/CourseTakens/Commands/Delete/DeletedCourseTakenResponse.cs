using NArchitecture.Core.Application.Responses;

namespace Application.Features.CourseTakens.Commands.Delete;

public class DeletedCourseTakenResponse : IResponse
{
    public Guid Id { get; set; }
}