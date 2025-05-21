using MediatR;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetDeptSecretaryApproved;

public class SetDeptSecretaryApprovedCommand : IRequest<SetDeptSecretaryApprovedResponse>
{
    public List<Guid> StudentUserIds { get; set; } = new List<Guid>();
    public Guid DeptSecretaryUserId { get; set; } // The User ID of the department secretary making the decision
    // public string? Notes { get; set; } // Optional: if secretary wants to add a note even on approval
} 