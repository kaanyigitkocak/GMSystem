using Domain.Enums;
using NArchitecture.Core.Application.Responses;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetDeptSecretaryApproved;

// This summary can be moved to a common DTOs folder later if reused by many commands.
public class StudentProcessSummary // Mirrors the one in SetAdvisorEligibleResponse
{
    public Guid StudentUserId { get; set; }
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public Guid? GraduationProcessId { get; set; }
    public GraduationProcessStatus? NewGraduationProcessStatus { get; set; }
    public StudentGraduationStatus? NewStudentGraduationStatus { get; set; }
}

public class SetDeptSecretaryApprovedResponse : IResponse
{
    public int TotalStudentsInRequest { get; set; }
    public int SuccessfullyProcessedCount { get; set; }
    public int FailedToProcessCount { get; set; }
    public List<StudentProcessSummary> ProcessSummaries { get; set; } = new List<StudentProcessSummary>();
    public string OverallMessage { get; set; } = string.Empty;
} 