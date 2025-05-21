using Domain.Enums;
using NArchitecture.Core.Application.Responses;

namespace Application.Features.GraduationProcesses.Queries.GetById;

public class GetByIdGraduationProcessResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid StudentUserId { get; set; }
    public string AcademicTerm { get; set; }
    public DateTime InitiationDate { get; set; }
    public GraduationProcessStatus Status { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public string? Notes { get; set; }
    public Guid? AdvisorUserId { get; set; }
    public DateTime? AdvisorReviewDate { get; set; }
    public Guid? DeptSecretaryUserId { get; set; }
    public DateTime? DeptSecretaryReviewDate { get; set; }
    public Guid? DeansOfficeUserId { get; set; }
    public DateTime? DeansOfficeReviewDate { get; set; }
    public Guid? StudentAffairsUserId { get; set; }
    public DateTime? StudentAffairsReviewDate { get; set; }
}