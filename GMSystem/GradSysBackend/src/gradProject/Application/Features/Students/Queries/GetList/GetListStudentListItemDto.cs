using Domain.Enums;
using NArchitecture.Core.Application.Dtos;

namespace Application.Features.Students.Queries.GetList;

public class GetListStudentListItemDto : IDto
{
    public Guid Id { get; set; }
    public string StudentNumber { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public Guid DepartmentId { get; set; }
    public string DepartmentName { get; set; }
    public Guid FacultyId { get; set; }
    public string FacultyName { get; set; }
    public string ProgramName { get; set; }
    public DateTime EnrollDate { get; set; }
    public decimal? CurrentGpa { get; set; }
    public int? CurrentEctsCompleted { get; set; }
    public StudentGraduationStatus GraduationStatus { get; set; }
    public Guid? AssignedAdvisorUserId { get; set; }
    
    // Active Graduation Process Information
    public Guid? ActiveGraduationProcessId { get; set; }
    public GraduationProcessStatus? ActiveGraduationProcessStatus { get; set; }
    public string? ActiveGraduationProcessAcademicTerm { get; set; }
    public DateTime? ActiveGraduationProcessInitiationDate { get; set; }
    public DateTime? ActiveGraduationProcessLastUpdateDate { get; set; }
}