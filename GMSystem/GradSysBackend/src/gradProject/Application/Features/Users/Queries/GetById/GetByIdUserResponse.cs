using NArchitecture.Core.Application.Responses;

namespace Application.Features.Users.Queries.GetById;

public class GetByIdUserResponse : IResponse
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public bool Status { get; set; }
    public string? UserRole { get; set; }
    
    // Student specific fields
    public string? StudentNumber { get; set; }
    public decimal? CurrentGpa { get; set; }
    public int? CurrentEctsCompleted { get; set; }
    
    // Staff specific fields
    public string? StaffIdentificationNumber { get; set; }
    public string? Title { get; set; }
    
    // Common fields for both Staff and Student
    public Guid? DepartmentId { get; set; }
    public string? DepartmentName { get; set; }
    public Guid? FacultyId { get; set; }
    public string? FacultyName { get; set; }

    public GetByIdUserResponse()
    {
        FirstName = string.Empty;
        LastName = string.Empty;
        Email = string.Empty;
    }

    public GetByIdUserResponse(Guid id, string firstName, string lastName, string email, bool status, string? userRole = null)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Status = status;
        UserRole = userRole;
    }
}
