using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;

namespace Application.Features.RankingListCriterias.Queries.GetList;

public class GetListRankingListCriteriaQuery : IRequest<GetListResponse<GetListRankingListCriteriaListItemDto>>
{
    public PageRequest PageRequest { get; set; }

    public class GetListRankingListCriteriaQueryHandler : IRequestHandler<GetListRankingListCriteriaQuery, GetListResponse<GetListRankingListCriteriaListItemDto>>
    {
        private readonly IRankingListCriteriaRepository _rankingListCriteriaRepository;
        private readonly IMapper _mapper;

        public GetListRankingListCriteriaQueryHandler(IRankingListCriteriaRepository rankingListCriteriaRepository, IMapper mapper)
        {
            _rankingListCriteriaRepository = rankingListCriteriaRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListRankingListCriteriaListItemDto>> Handle(GetListRankingListCriteriaQuery request, CancellationToken cancellationToken)
        {
            IPaginate<RankingListCriteria> rankingListCriterias = await _rankingListCriteriaRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListRankingListCriteriaListItemDto> response = _mapper.Map<GetListResponse<GetListRankingListCriteriaListItemDto>>(rankingListCriterias);
            return response;
        }
    }
}