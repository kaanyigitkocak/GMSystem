using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;

namespace Application.Features.RankingListEntries.Queries.GetList;

public class GetListRankingListEntryQuery : IRequest<GetListResponse<GetListRankingListEntryListItemDto>>
{
    public PageRequest PageRequest { get; set; }

    public class GetListRankingListEntryQueryHandler : IRequestHandler<GetListRankingListEntryQuery, GetListResponse<GetListRankingListEntryListItemDto>>
    {
        private readonly IRankingListEntryRepository _rankingListEntryRepository;
        private readonly IMapper _mapper;

        public GetListRankingListEntryQueryHandler(IRankingListEntryRepository rankingListEntryRepository, IMapper mapper)
        {
            _rankingListEntryRepository = rankingListEntryRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListRankingListEntryListItemDto>> Handle(GetListRankingListEntryQuery request, CancellationToken cancellationToken)
        {
            IPaginate<RankingListEntry> rankingListEntries = await _rankingListEntryRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListRankingListEntryListItemDto> response = _mapper.Map<GetListResponse<GetListRankingListEntryListItemDto>>(rankingListEntries);
            return response;
        }
    }
}