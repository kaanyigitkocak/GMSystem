using NArchitecture.Core.Application.Responses;

namespace Application.Features.EligibilityCheckResults.Commands.Delete;

public class DeletedEligibilityCheckResultResponse : IResponse
{
    public Guid Id { get; set; }
}