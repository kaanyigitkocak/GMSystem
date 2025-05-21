using MediatR;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetDeptSecretaryRejected;

public class SetDeptSecretaryRejectedCommand : IRequest<SetDeptSecretaryRejectedResponse>
{
    public List<Guid> StudentUserIds { get; set; } = new List<Guid>();
    public Guid DeptSecretaryUserId { get; set; } // The User ID of the department secretary making the decision
    public string RejectionReason { get; set; } = string.Empty; // Reason for rejection
} 