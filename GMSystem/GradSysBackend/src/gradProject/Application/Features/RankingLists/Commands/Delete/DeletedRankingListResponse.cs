using NArchitecture.Core.Application.Responses;

namespace Application.Features.RankingLists.Commands.Delete;

public class DeletedRankingListResponse : IResponse
{
    public Guid Id { get; set; }
}