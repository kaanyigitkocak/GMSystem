using NArchitecture.Core.Application.Dtos;

namespace Application.Features.Staffs.Queries.GetList;

public class GetListStaffListItemDto : IDto
{
    public Guid Id { get; set; }
    public string? StaffIdentificationNumber { get; set; }
    public string? Title { get; set; }
    public Guid? DepartmentId { get; set; }
    public Guid? FacultyId { get; set; }
}