using Domain.Enums;
using NArchitecture.Core.Application.Responses;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetAdvisorNotEligible;

// Re-using or defining a similar summary structure as in SetAdvisorEligibleResponse
public class StudentProcessSummary // Can be moved to a common DTOs folder later
{
    public Guid StudentUserId { get; set; }
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public Guid? GraduationProcessId { get; set; }
    public GraduationProcessStatus? NewGraduationProcessStatus { get; set; }
    public StudentGraduationStatus? NewStudentGraduationStatus { get; set; }
}

public class SetAdvisorNotEligibleResponse : IResponse
{
    public int TotalStudentsInRequest { get; set; }
    public int SuccessfullyProcessedCount { get; set; }
    public int FailedToProcessCount { get; set; }
    public List<StudentProcessSummary> ProcessSummaries { get; set; } = new List<StudentProcessSummary>();
    public string OverallMessage { get; set; } = string.Empty;
} 