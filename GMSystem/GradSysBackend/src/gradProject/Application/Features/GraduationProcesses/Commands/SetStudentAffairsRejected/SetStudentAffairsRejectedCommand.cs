using MediatR;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetStudentAffairsRejected;

public class SetStudentAffairsRejectedCommand : IRequest<SetStudentAffairsRejectedResponse>
{
    public List<Guid> StudentUserIds { get; set; } = new List<Guid>();
    public Guid StudentAffairsUserId { get; set; } // The User ID of the Student Affairs staff making the decision
    public string RejectionReason { get; set; } = string.Empty; // Reason for rejection
} 