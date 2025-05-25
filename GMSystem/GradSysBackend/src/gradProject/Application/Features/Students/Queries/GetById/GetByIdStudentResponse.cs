using Domain.Enums;
using NArchitecture.Core.Application.Responses;

namespace Application.Features.Students.Queries.GetById;

public class GetByIdStudentResponse : IResponse
{
    public Guid Id { get; set; }
    public string StudentNumber { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public Guid DepartmentId { get; set; }
    public string ProgramName { get; set; }
    public DateTime EnrollDate { get; set; }
    public decimal? CurrentGpa { get; set; }
    public int? CurrentEctsCompleted { get; set; }
    public StudentGraduationStatus GraduationStatus { get; set; }
    public Guid? AssignedAdvisorUserId { get; set; }
    
    // Graduation Process Information
    public GraduationProcessInfo? GraduationProcess { get; set; }
}

public class GraduationProcessInfo
{
    public Guid Id { get; set; }
    public GraduationProcessStatus Status { get; set; }
    public string AcademicTerm { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime? LastUpdateDate { get; set; }
    public string? Notes { get; set; }
    
    // Review Information
    public Guid? AdvisorUserId { get; set; }
    public DateTime? AdvisorReviewDate { get; set; }
    public Guid? DeptSecretaryUserId { get; set; }
    public DateTime? DeptSecretaryReviewDate { get; set; }
    public Guid? DeansOfficeUserId { get; set; }
    public DateTime? DeansOfficeReviewDate { get; set; }
    public Guid? StudentAffairsUserId { get; set; }
    public DateTime? StudentAffairsReviewDate { get; set; }
}