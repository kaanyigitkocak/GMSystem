using MediatR;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetDeansOfficeRejected;

public class SetDeansOfficeRejectedCommand : IRequest<SetDeansOfficeRejectedResponse>
{
    public List<Guid> StudentUserIds { get; set; } = new List<Guid>();
    public Guid DeansOfficeUserId { get; set; } // The User ID of the Dean's Office staff making the decision
    public string RejectionReason { get; set; } = string.Empty; // Reason for rejection
} 