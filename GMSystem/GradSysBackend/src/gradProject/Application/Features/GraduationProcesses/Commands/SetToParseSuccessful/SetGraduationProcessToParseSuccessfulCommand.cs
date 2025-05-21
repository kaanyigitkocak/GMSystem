using MediatR;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetToParseSuccessful;

public class SetGraduationProcessToParseSuccessfulCommand : IRequest<SetGraduationProcessToParseSuccessfulResponse>
{
    public List<Guid> StudentUserIds { get; set; }
    public Guid ProcessedByUserId { get; set; } // Action triggered by user

    public SetGraduationProcessToParseSuccessfulCommand()
    {
        StudentUserIds = new List<Guid>();
    }
} 