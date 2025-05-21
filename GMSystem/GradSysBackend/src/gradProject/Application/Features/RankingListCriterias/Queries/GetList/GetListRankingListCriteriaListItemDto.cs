using NArchitecture.Core.Application.Dtos;

namespace Application.Features.RankingListCriterias.Queries.GetList;

public class GetListRankingListCriteriaListItemDto : IDto
{
    public Guid Id { get; set; }
    public Guid RankingListId { get; set; }
    public string CriteriaName { get; set; }
    public string CriteriaValue { get; set; }
}