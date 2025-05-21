using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetToParseSuccessful;

public class SetGraduationProcessToParseSuccessfulResponse
{
    public int TotalStudentIdsInRequest { get; set; }
    public int SuccessfullyProcessedCount { get; set; }
    public int FailedToProcessCount => TotalStudentIdsInRequest - SuccessfullyProcessedCount;
    public List<Guid> NotFoundOrNotInExpectedStateStudentUserIds { get; set; }
    public List<Guid> AlreadyInTargetStateStudentUserIds { get; set; }
    public string Message { get; set; }

    public SetGraduationProcessToParseSuccessfulResponse()
    {
        NotFoundOrNotInExpectedStateStudentUserIds = new List<Guid>();
        AlreadyInTargetStateStudentUserIds = new List<Guid>();
        Message = string.Empty;
    }
} 