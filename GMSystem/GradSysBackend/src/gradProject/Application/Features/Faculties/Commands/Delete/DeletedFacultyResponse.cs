using NArchitecture.Core.Application.Responses;

namespace Application.Features.Faculties.Commands.Delete;

public class DeletedFacultyResponse : IResponse
{
    public Guid Id { get; set; }
}