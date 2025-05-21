using Application.Features.RankingLists.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RankingLists.Queries.GetById;

public class GetByIdRankingListQuery : IRequest<GetByIdRankingListResponse>
{
    public Guid Id { get; set; }

    public class GetByIdRankingListQueryHandler : IRequestHandler<GetByIdRankingListQuery, GetByIdRankingListResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListRepository _rankingListRepository;
        private readonly RankingListBusinessRules _rankingListBusinessRules;

        public GetByIdRankingListQueryHandler(IMapper mapper, IRankingListRepository rankingListRepository, RankingListBusinessRules rankingListBusinessRules)
        {
            _mapper = mapper;
            _rankingListRepository = rankingListRepository;
            _rankingListBusinessRules = rankingListBusinessRules;
        }

        public async Task<GetByIdRankingListResponse> Handle(GetByIdRankingListQuery request, CancellationToken cancellationToken)
        {
            RankingList? rankingList = await _rankingListRepository.GetAsync(predicate: rl => rl.Id == request.Id, cancellationToken: cancellationToken);
            await _rankingListBusinessRules.RankingListShouldExistWhenSelected(rankingList);

            GetByIdRankingListResponse response = _mapper.Map<GetByIdRankingListResponse>(rankingList);
            return response;
        }
    }
}