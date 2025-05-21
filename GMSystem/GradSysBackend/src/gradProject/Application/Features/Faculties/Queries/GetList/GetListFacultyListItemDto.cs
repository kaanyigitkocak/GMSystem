using NArchitecture.Core.Application.Dtos;

namespace Application.Features.Faculties.Queries.GetList;

public class GetListFacultyListItemDto : IDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}