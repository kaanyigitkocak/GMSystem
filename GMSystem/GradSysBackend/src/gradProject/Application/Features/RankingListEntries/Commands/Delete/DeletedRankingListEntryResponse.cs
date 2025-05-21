using NArchitecture.Core.Application.Responses;

namespace Application.Features.RankingListEntries.Commands.Delete;

public class DeletedRankingListEntryResponse : IResponse
{
    public Guid Id { get; set; }
}