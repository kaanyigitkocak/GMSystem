using MediatR;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetDeansOfficeApproved;

public class SetDeansOfficeApprovedCommand : IRequest<SetDeansOfficeApprovedResponse>
{
    public List<Guid> StudentUserIds { get; set; } = new List<Guid>();
    public Guid DeansOfficeUserId { get; set; } // The User ID of the Dean's Office staff making the decision
    // public string? Notes { get; set; } // Optional: if staff wants to add a note even on approval
} 