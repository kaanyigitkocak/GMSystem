using Application.Features.RankingListEntries.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.RankingListEntries.Commands.Update;

public class UpdateRankingListEntryCommand : IRequest<UpdatedRankingListEntryResponse>
{
    public Guid Id { get; set; }
    public Guid RankingListId { get; set; }
    public Guid StudentUserId { get; set; }
    public int Rank { get; set; }
    public decimal GpaAtRanking { get; set; }
    public HonourStatus HonourStatus { get; set; }

    public class UpdateRankingListEntryCommandHandler : IRequestHandler<UpdateRankingListEntryCommand, UpdatedRankingListEntryResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListEntryRepository _rankingListEntryRepository;
        private readonly RankingListEntryBusinessRules _rankingListEntryBusinessRules;

        public UpdateRankingListEntryCommandHandler(IMapper mapper, IRankingListEntryRepository rankingListEntryRepository,
                                         RankingListEntryBusinessRules rankingListEntryBusinessRules)
        {
            _mapper = mapper;
            _rankingListEntryRepository = rankingListEntryRepository;
            _rankingListEntryBusinessRules = rankingListEntryBusinessRules;
        }

        public async Task<UpdatedRankingListEntryResponse> Handle(UpdateRankingListEntryCommand request, CancellationToken cancellationToken)
        {
            RankingListEntry? rankingListEntry = await _rankingListEntryRepository.GetAsync(predicate: rle => rle.Id == request.Id, cancellationToken: cancellationToken);
            await _rankingListEntryBusinessRules.RankingListEntryShouldExistWhenSelected(rankingListEntry);
            rankingListEntry = _mapper.Map(request, rankingListEntry);

            await _rankingListEntryRepository.UpdateAsync(rankingListEntry!);

            UpdatedRankingListEntryResponse response = _mapper.Map<UpdatedRankingListEntryResponse>(rankingListEntry);
            return response;
        }
    }
}