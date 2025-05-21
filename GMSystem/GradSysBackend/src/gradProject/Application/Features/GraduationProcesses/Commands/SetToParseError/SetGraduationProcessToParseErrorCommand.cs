using MediatR;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetToParseError;

public class SetGraduationProcessToParseErrorCommand : IRequest<SetGraduationProcessToParseErrorResponse>
{
    public List<Guid> StudentUserIds { get; set; }
    public Guid ProcessedByUserId { get; set; } // Action triggered by user
    public string? ErrorReason { get; set; } // Optional reason for the error

    public SetGraduationProcessToParseErrorCommand()
    {
        StudentUserIds = new List<Guid>();
    }
} 