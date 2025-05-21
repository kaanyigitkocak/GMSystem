using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;

namespace Application.Features.Faculties.Queries.GetList;

public class GetListFacultyQuery : IRequest<GetListResponse<GetListFacultyListItemDto>>
{
    public PageRequest PageRequest { get; set; }

    public class GetListFacultyQueryHandler : IRequestHandler<GetListFacultyQuery, GetListResponse<GetListFacultyListItemDto>>
    {
        private readonly IFacultyRepository _facultyRepository;
        private readonly IMapper _mapper;

        public GetListFacultyQueryHandler(IFacultyRepository facultyRepository, IMapper mapper)
        {
            _facultyRepository = facultyRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListFacultyListItemDto>> Handle(GetListFacultyQuery request, CancellationToken cancellationToken)
        {
            IPaginate<Faculty> faculties = await _facultyRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListFacultyListItemDto> response = _mapper.Map<GetListResponse<GetListFacultyListItemDto>>(faculties);
            return response;
        }
    }
}