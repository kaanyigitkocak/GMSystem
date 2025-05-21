using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;

namespace Application.Features.GraduationRequirementSets.Queries.GetList;

public class GetListGraduationRequirementSetQuery : IRequest<GetListResponse<GetListGraduationRequirementSetListItemDto>>
{
    public PageRequest PageRequest { get; set; }

    public class GetListGraduationRequirementSetQueryHandler : IRequestHandler<GetListGraduationRequirementSetQuery, GetListResponse<GetListGraduationRequirementSetListItemDto>>
    {
        private readonly IGraduationRequirementSetRepository _graduationRequirementSetRepository;
        private readonly IMapper _mapper;

        public GetListGraduationRequirementSetQueryHandler(IGraduationRequirementSetRepository graduationRequirementSetRepository, IMapper mapper)
        {
            _graduationRequirementSetRepository = graduationRequirementSetRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListGraduationRequirementSetListItemDto>> Handle(GetListGraduationRequirementSetQuery request, CancellationToken cancellationToken)
        {
            IPaginate<GraduationRequirementSet> graduationRequirementSets = await _graduationRequirementSetRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListGraduationRequirementSetListItemDto> response = _mapper.Map<GetListResponse<GetListGraduationRequirementSetListItemDto>>(graduationRequirementSets);
            return response;
        }
    }
}