using NArchitecture.Core.Application.Responses;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.PerformSystemEligibilityChecks;

public class PerformedSystemEligibilityChecksResponse : IResponse
{
    public int TotalProcessesInRequest { get; set; }
    public int SuccessfullyProcessedCount { get; set; }
    public int FailedToProcessCount { get; set; }
    public List<ProcessCheckSummary> ProcessSummaries { get; set; }
    public string OverallMessage { get; set; }

    public PerformedSystemEligibilityChecksResponse()
    {
        ProcessSummaries = new List<ProcessCheckSummary>();
    }
}

public class ProcessCheckSummary
{
    public Guid StudentUserId { get; set; } // Hangi öğrenci için olduğu
    public Guid? GraduationProcessId { get; set; } // Eğer süreç bulunduysa ID'si
    public bool IsSuccess { get; set; }
    public int ChecksPerformedCount { get; set; }
    public List<Guid> EligibilityCheckResultIds { get; set; }
    public string Message { get; set; } // Sürece özel mesaj/hata

    public ProcessCheckSummary()
    {
        EligibilityCheckResultIds = new List<Guid>();
    }
} 