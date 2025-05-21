using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetToParseError;

public class SetGraduationProcessToParseErrorResponse
{
    public int TotalStudentIdsInRequest { get; set; }
    public int SuccessfullyProcessedCount { get; set; }
    public int FailedToProcessCount => TotalStudentIdsInRequest - SuccessfullyProcessedCount;
    public List<Guid> NotFoundStudentUserIds { get; set; } // Students or processes not found
    public List<Guid> AlreadyInTargetStateStudentUserIds { get; set; }
    public string Message { get; set; }

    public SetGraduationProcessToParseErrorResponse()
    {
        NotFoundStudentUserIds = new List<Guid>();
        AlreadyInTargetStateStudentUserIds = new List<Guid>();
        Message = string.Empty;
    }
} 