using NArchitecture.Core.Application.Responses;

namespace Application.Features.RankingListCriterias.Commands.Delete;

public class DeletedRankingListCriteriaResponse : IResponse
{
    public Guid Id { get; set; }
}