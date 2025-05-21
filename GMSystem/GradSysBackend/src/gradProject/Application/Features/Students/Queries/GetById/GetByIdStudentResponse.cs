using Domain.Enums;
using NArchitecture.Core.Application.Responses;

namespace Application.Features.Students.Queries.GetById;

public class GetByIdStudentResponse : IResponse
{
    public Guid Id { get; set; }
    public string StudentNumber { get; set; }
    public Guid DepartmentId { get; set; }
    public string ProgramName { get; set; }
    public DateTime EnrollDate { get; set; }
    public decimal? CurrentGpa { get; set; }
    public int? CurrentEctsCompleted { get; set; }
    public StudentGraduationStatus GraduationStatus { get; set; }
    public Guid? AssignedAdvisorUserId { get; set; }
}