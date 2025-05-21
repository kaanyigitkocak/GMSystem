using Domain.Enums;
using NArchitecture.Core.Application.Dtos;

namespace Application.Features.RankingListEntries.Queries.GetList;

public class GetListRankingListEntryListItemDto : IDto
{
    public Guid Id { get; set; }
    public Guid RankingListId { get; set; }
    public Guid StudentUserId { get; set; }
    public int Rank { get; set; }
    public decimal GpaAtRanking { get; set; }
    public HonourStatus HonourStatus { get; set; }
}