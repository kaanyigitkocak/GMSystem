using NArchitecture.Core.Application.Responses;

namespace Application.Features.Faculties.Commands.Update;

public class UpdatedFacultyResponse : IResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}