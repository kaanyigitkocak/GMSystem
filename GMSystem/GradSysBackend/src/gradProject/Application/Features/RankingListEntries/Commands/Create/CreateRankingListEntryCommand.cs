using Application.Features.RankingListEntries.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.RankingListEntries.Commands.Create;

public class CreateRankingListEntryCommand : IRequest<CreatedRankingListEntryResponse>
{
    public Guid RankingListId { get; set; }
    public Guid StudentUserId { get; set; }
    public int Rank { get; set; }
    public decimal GpaAtRanking { get; set; }
    public HonourStatus HonourStatus { get; set; }

    public class CreateRankingListEntryCommandHandler : IRequestHandler<CreateRankingListEntryCommand, CreatedRankingListEntryResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListEntryRepository _rankingListEntryRepository;
        private readonly RankingListEntryBusinessRules _rankingListEntryBusinessRules;

        public CreateRankingListEntryCommandHandler(IMapper mapper, IRankingListEntryRepository rankingListEntryRepository,
                                         RankingListEntryBusinessRules rankingListEntryBusinessRules)
        {
            _mapper = mapper;
            _rankingListEntryRepository = rankingListEntryRepository;
            _rankingListEntryBusinessRules = rankingListEntryBusinessRules;
        }

        public async Task<CreatedRankingListEntryResponse> Handle(CreateRankingListEntryCommand request, CancellationToken cancellationToken)
        {
            RankingListEntry rankingListEntry = _mapper.Map<RankingListEntry>(request);

            await _rankingListEntryRepository.AddAsync(rankingListEntry);

            CreatedRankingListEntryResponse response = _mapper.Map<CreatedRankingListEntryResponse>(rankingListEntry);
            return response;
        }
    }
}