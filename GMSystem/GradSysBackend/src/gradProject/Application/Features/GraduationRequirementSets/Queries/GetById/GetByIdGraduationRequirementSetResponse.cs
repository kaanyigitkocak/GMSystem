using NArchitecture.Core.Application.Responses;

namespace Application.Features.GraduationRequirementSets.Queries.GetById;

public class GetByIdGraduationRequirementSetResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid DepartmentId { get; set; }
    public decimal MinGpa { get; set; }
    public int TotalMinEcts { get; set; }
    public int? MinTechnicalElectiveCoursesCount { get; set; }
    public int? MinNonTechnicalElectiveCoursesCount { get; set; }
    public int? MinUniversityElectiveCoursesCount { get; set; }
    public string? Description { get; set; }
    public Guid CreatedByUserId { get; set; }
    public Guid LastModifiedByUserId { get; set; }

}