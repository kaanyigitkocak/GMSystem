using NArchitecture.Core.Application.Responses;

namespace Application.Features.Faculties.Queries.GetById;

public class GetByIdFacultyResponse : IResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}