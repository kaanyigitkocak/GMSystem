using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;

namespace Application.Features.RankingLists.Queries.GetList;

public class GetListRankingListQuery : IRequest<GetListResponse<GetListRankingListListItemDto>>
{
    public PageRequest PageRequest { get; set; }

    public class GetListRankingListQueryHandler : IRequestHandler<GetListRankingListQuery, GetListResponse<GetListRankingListListItemDto>>
    {
        private readonly IRankingListRepository _rankingListRepository;
        private readonly IMapper _mapper;

        public GetListRankingListQueryHandler(IRankingListRepository rankingListRepository, IMapper mapper)
        {
            _rankingListRepository = rankingListRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListRankingListListItemDto>> Handle(GetListRankingListQuery request, CancellationToken cancellationToken)
        {
            IPaginate<RankingList> rankingLists = await _rankingListRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListRankingListListItemDto> response = _mapper.Map<GetListResponse<GetListRankingListListItemDto>>(rankingLists);
            return response;
        }
    }
}