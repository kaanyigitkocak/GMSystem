using Domain.Enums;
using NArchitecture.Core.Application.Responses;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetAdvisorEligible;

public class StudentProcessSummary
{
    public Guid StudentUserId { get; set; }
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public Guid? GraduationProcessId { get; set; }
    public GraduationProcessStatus? NewGraduationProcessStatus { get; set; }
    public StudentGraduationStatus? NewStudentGraduationStatus { get; set; }
}

public class SetAdvisorEligibleResponse : IResponse
{
    public int TotalStudentsInRequest { get; set; }
    public int SuccessfullyProcessedCount { get; set; }
    public int FailedToProcessCount { get; set; } // Includes not found, wrong state, or other errors
    public List<StudentProcessSummary> ProcessSummaries { get; set; } = new List<StudentProcessSummary>();
    public string OverallMessage { get; set; } = string.Empty;
} 