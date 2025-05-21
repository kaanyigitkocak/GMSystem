using NArchitecture.Core.Application.Responses;

namespace Application.Features.RankingListCriterias.Queries.GetById;

public class GetByIdRankingListCriteriaResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid RankingListId { get; set; }
    public string CriteriaName { get; set; }
    public string CriteriaValue { get; set; }
}