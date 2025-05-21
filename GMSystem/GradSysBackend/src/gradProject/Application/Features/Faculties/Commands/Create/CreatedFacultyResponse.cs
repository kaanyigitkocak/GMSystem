using NArchitecture.Core.Application.Responses;

namespace Application.Features.Faculties.Commands.Create;

public class CreatedFacultyResponse : IResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}