using MediatR;
using System;
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.SetAdvisorNotEligible;

public class SetAdvisorNotEligibleCommand : IRequest<SetAdvisorNotEligibleResponse>
{
    public List<Guid> StudentUserIds { get; set; } = new List<Guid>();
    public Guid AdvisorUserId { get; set; } // The User ID of the advisor making the decision
    public string RejectionReason { get; set; } = string.Empty;
} 