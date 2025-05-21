using MediatR;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetStudentAffairsApproved;

public class SetStudentAffairsApprovedCommand : IRequest<SetStudentAffairsApprovedResponse>
{
    public List<Guid> StudentUserIds { get; set; } = new List<Guid>();
    public Guid StudentAffairsUserId { get; set; } // The User ID of the Student Affairs staff making the decision
    // public string? Notes { get; set; } // Optional: if staff wants to add a note even on approval
} 