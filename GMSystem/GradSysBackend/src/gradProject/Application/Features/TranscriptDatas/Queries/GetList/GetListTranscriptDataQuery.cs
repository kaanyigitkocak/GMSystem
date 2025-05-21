using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;

namespace Application.Features.TranscriptDatas.Queries.GetList;

public class GetListTranscriptDataQuery : IRequest<GetListResponse<GetListTranscriptDataListItemDto>>
{
    public PageRequest PageRequest { get; set; }

    public class GetListTranscriptDataQueryHandler : IRequestHandler<GetListTranscriptDataQuery, GetListResponse<GetListTranscriptDataListItemDto>>
    {
        private readonly ITranscriptDataRepository _transcriptDataRepository;
        private readonly IMapper _mapper;

        public GetListTranscriptDataQueryHandler(ITranscriptDataRepository transcriptDataRepository, IMapper mapper)
        {
            _transcriptDataRepository = transcriptDataRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListTranscriptDataListItemDto>> Handle(GetListTranscriptDataQuery request, CancellationToken cancellationToken)
        {
            IPaginate<TranscriptData> transcriptDatas = await _transcriptDataRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListTranscriptDataListItemDto> response = _mapper.Map<GetListResponse<GetListTranscriptDataListItemDto>>(transcriptDatas);
            return response;
        }
    }
}