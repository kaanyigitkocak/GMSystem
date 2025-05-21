using MediatR;
using System;
using System.Collections.Generic;
using NArchitecture.Core.Application.Responses; // For IResponse if the response class itself is not deriving from it.

namespace Application.Features.GraduationProcesses.Commands.SetAdvisorEligible;

public class SetAdvisorEligibleCommand : IRequest<SetAdvisorEligibleResponse>
{
    public List<Guid> StudentUserIds { get; set; } = new List<Guid>();
    public Guid AdvisorUserId { get; set; } // The User ID of the advisor making the decision
    // public string? Notes { get; set; } // Optional notes if any for eligibility, usually not needed for positive case.
} 