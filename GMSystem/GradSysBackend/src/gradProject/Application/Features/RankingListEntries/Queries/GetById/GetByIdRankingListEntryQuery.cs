using Application.Features.RankingListEntries.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RankingListEntries.Queries.GetById;

public class GetByIdRankingListEntryQuery : IRequest<GetByIdRankingListEntryResponse>
{
    public Guid Id { get; set; }

    public class GetByIdRankingListEntryQueryHandler : IRequestHandler<GetByIdRankingListEntryQuery, GetByIdRankingListEntryResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListEntryRepository _rankingListEntryRepository;
        private readonly RankingListEntryBusinessRules _rankingListEntryBusinessRules;

        public GetByIdRankingListEntryQueryHandler(IMapper mapper, IRankingListEntryRepository rankingListEntryRepository, RankingListEntryBusinessRules rankingListEntryBusinessRules)
        {
            _mapper = mapper;
            _rankingListEntryRepository = rankingListEntryRepository;
            _rankingListEntryBusinessRules = rankingListEntryBusinessRules;
        }

        public async Task<GetByIdRankingListEntryResponse> Handle(GetByIdRankingListEntryQuery request, CancellationToken cancellationToken)
        {
            RankingListEntry? rankingListEntry = await _rankingListEntryRepository.GetAsync(predicate: rle => rle.Id == request.Id, cancellationToken: cancellationToken);
            await _rankingListEntryBusinessRules.RankingListEntryShouldExistWhenSelected(rankingListEntry);

            GetByIdRankingListEntryResponse response = _mapper.Map<GetByIdRankingListEntryResponse>(rankingListEntry);
            return response;
        }
    }
}