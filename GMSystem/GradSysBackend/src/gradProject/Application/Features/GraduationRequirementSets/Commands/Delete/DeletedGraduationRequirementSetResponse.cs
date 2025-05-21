using NArchitecture.Core.Application.Responses;

namespace Application.Features.GraduationRequirementSets.Commands.Delete;

public class DeletedGraduationRequirementSetResponse : IResponse
{
    public Guid Id { get; set; }
}