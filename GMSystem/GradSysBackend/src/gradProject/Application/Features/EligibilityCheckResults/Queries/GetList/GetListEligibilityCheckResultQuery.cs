using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;

namespace Application.Features.EligibilityCheckResults.Queries.GetList;

public class GetListEligibilityCheckResultQuery : IRequest<GetListResponse<GetListEligibilityCheckResultListItemDto>>
{
    public PageRequest PageRequest { get; set; }

    public class GetListEligibilityCheckResultQueryHandler : IRequestHandler<GetListEligibilityCheckResultQuery, GetListResponse<GetListEligibilityCheckResultListItemDto>>
    {
        private readonly IEligibilityCheckResultRepository _eligibilityCheckResultRepository;
        private readonly IMapper _mapper;

        public GetListEligibilityCheckResultQueryHandler(IEligibilityCheckResultRepository eligibilityCheckResultRepository, IMapper mapper)
        {
            _eligibilityCheckResultRepository = eligibilityCheckResultRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListEligibilityCheckResultListItemDto>> Handle(GetListEligibilityCheckResultQuery request, CancellationToken cancellationToken)
        {
            IPaginate<EligibilityCheckResult> eligibilityCheckResults = await _eligibilityCheckResultRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListEligibilityCheckResultListItemDto> response = _mapper.Map<GetListResponse<GetListEligibilityCheckResultListItemDto>>(eligibilityCheckResults);
            return response;
        }
    }
}