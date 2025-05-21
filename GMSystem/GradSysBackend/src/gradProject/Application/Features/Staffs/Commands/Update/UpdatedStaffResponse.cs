using NArchitecture.Core.Application.Responses;

namespace Application.Features.Staffs.Commands.Update;

public class UpdatedStaffResponse : IResponse
{
    public Guid Id { get; set; }
    public string? StaffIdentificationNumber { get; set; }
    public string? Title { get; set; }
    public Guid? DepartmentId { get; set; }
    public Guid? FacultyId { get; set; }
}