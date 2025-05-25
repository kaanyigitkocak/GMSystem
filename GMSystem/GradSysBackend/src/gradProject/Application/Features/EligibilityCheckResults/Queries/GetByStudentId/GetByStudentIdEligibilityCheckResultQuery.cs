using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;

namespace Application.Features.EligibilityCheckResults.Queries.GetByStudentId;

public class GetByStudentIdEligibilityCheckResultQuery : IRequest<GetListResponse<GetByStudentIdEligibilityCheckResultListItemDto>>
{
    public Guid StudentUserId { get; set; }
    public PageRequest PageRequest { get; set; }

    public class GetByStudentIdEligibilityCheckResultQueryHandler : IRequestHandler<GetByStudentIdEligibilityCheckResultQuery, GetListResponse<GetByStudentIdEligibilityCheckResultListItemDto>>
    {
        private readonly IEligibilityCheckResultRepository _eligibilityCheckResultRepository;
        private readonly IMapper _mapper;

        public GetByStudentIdEligibilityCheckResultQueryHandler(IEligibilityCheckResultRepository eligibilityCheckResultRepository, IMapper mapper)
        {
            _eligibilityCheckResultRepository = eligibilityCheckResultRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetByStudentIdEligibilityCheckResultListItemDto>> Handle(GetByStudentIdEligibilityCheckResultQuery request, CancellationToken cancellationToken)
        {
            IPaginate<EligibilityCheckResult> eligibilityCheckResults = await _eligibilityCheckResultRepository.GetListAsync(
                predicate: ecr => ecr.GraduationProcess.StudentUserId == request.StudentUserId,
                include: query => query.Include(ecr => ecr.GraduationProcess),
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize,
                cancellationToken: cancellationToken
            );

            GetListResponse<GetByStudentIdEligibilityCheckResultListItemDto> response = _mapper.Map<GetListResponse<GetByStudentIdEligibilityCheckResultListItemDto>>(eligibilityCheckResults);
            return response;
        }
    }
} 