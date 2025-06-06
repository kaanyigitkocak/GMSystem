using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.CourseTakens.Queries.GetList;

public class GetListCourseTakenQuery : IRequest<GetListResponse<GetListCourseTakenListItemDto>>
{
    public PageRequest PageRequest { get; set; }
    public Guid? StudentUserId { get; set; }

    public class GetListCourseTakenQueryHandler : IRequestHandler<GetListCourseTakenQuery, GetListResponse<GetListCourseTakenListItemDto>>
    {
        private readonly ICourseTakenRepository _courseTakenRepository;
        private readonly IMapper _mapper;

        public GetListCourseTakenQueryHandler(ICourseTakenRepository courseTakenRepository, IMapper mapper)
        {
            _courseTakenRepository = courseTakenRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListCourseTakenListItemDto>> Handle(GetListCourseTakenQuery request, CancellationToken cancellationToken)
        {
            IPaginate<CourseTaken> courseTakens = await _courseTakenRepository.GetListAsync(
                predicate: request.StudentUserId.HasValue ? ct => ct.StudentUserId == request.StudentUserId.Value : null,
                include: ct => ct.Include(x => x.MatchedCourse),
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize,
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListCourseTakenListItemDto> response = _mapper.Map<GetListResponse<GetListCourseTakenListItemDto>>(courseTakens);
            return response;
        }
    }
}