using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;

namespace Application.Features.Staffs.Queries.GetList;

public class GetListStaffQuery : IRequest<GetListResponse<GetListStaffListItemDto>>
{
    public PageRequest PageRequest { get; set; }

    public class GetListStaffQueryHandler : IRequestHandler<GetListStaffQuery, GetListResponse<GetListStaffListItemDto>>
    {
        private readonly IStaffRepository _staffRepository;
        private readonly IMapper _mapper;

        public GetListStaffQueryHandler(IStaffRepository staffRepository, IMapper mapper)
        {
            _staffRepository = staffRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListStaffListItemDto>> Handle(GetListStaffQuery request, CancellationToken cancellationToken)
        {
            IPaginate<Staff> staffs = await _staffRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListStaffListItemDto> response = _mapper.Map<GetListResponse<GetListStaffListItemDto>>(staffs);
            return response;
        }
    }
}