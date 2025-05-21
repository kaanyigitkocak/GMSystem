using NArchitecture.Core.Application.Responses;

namespace Application.Features.GraduationRequirementSets.Commands.Update;

public class UpdatedGraduationRequirementSetResponse : IResponse
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
    public DateTime CreationDate { get; set; }
    public DateTime LastModificationDate { get; set; }
}