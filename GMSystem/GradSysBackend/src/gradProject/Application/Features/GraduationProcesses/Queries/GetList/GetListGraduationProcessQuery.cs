using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.GraduationProcesses.Queries.GetList;

public class GetListGraduationProcessQuery : IRequest<GetListResponse<GetListGraduationProcessListItemDto>>
{
    public PageRequest PageRequest { get; set; }

    public class GetListGraduationProcessQueryHandler : IRequestHandler<GetListGraduationProcessQuery, GetListResponse<GetListGraduationProcessListItemDto>>
    {
        private readonly IGraduationProcessRepository _graduationProcessRepository;
        private readonly IMapper _mapper;

        public GetListGraduationProcessQueryHandler(IGraduationProcessRepository graduationProcessRepository, IMapper mapper)
        {
            _graduationProcessRepository = graduationProcessRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListGraduationProcessListItemDto>> Handle(GetListGraduationProcessQuery request, CancellationToken cancellationToken)
        {
            IPaginate<GraduationProcess> graduationProcesses = await _graduationProcessRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListGraduationProcessListItemDto> response = _mapper.Map<GetListResponse<GetListGraduationProcessListItemDto>>(graduationProcesses);
            return response;
        }
    }
} 