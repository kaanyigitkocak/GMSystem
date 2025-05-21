using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;

namespace Application.Features.RequirementMandatoryCourses.Queries.GetList;

public class GetListRequirementMandatoryCourseQuery : IRequest<GetListResponse<GetListRequirementMandatoryCourseListItemDto>>
{
    public PageRequest PageRequest { get; set; }

    public class GetListRequirementMandatoryCourseQueryHandler : IRequestHandler<GetListRequirementMandatoryCourseQuery, GetListResponse<GetListRequirementMandatoryCourseListItemDto>>
    {
        private readonly IRequirementMandatoryCourseRepository _requirementMandatoryCourseRepository;
        private readonly IMapper _mapper;

        public GetListRequirementMandatoryCourseQueryHandler(IRequirementMandatoryCourseRepository requirementMandatoryCourseRepository, IMapper mapper)
        {
            _requirementMandatoryCourseRepository = requirementMandatoryCourseRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListRequirementMandatoryCourseListItemDto>> Handle(GetListRequirementMandatoryCourseQuery request, CancellationToken cancellationToken)
        {
            IPaginate<RequirementMandatoryCourse> requirementMandatoryCourses = await _requirementMandatoryCourseRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListRequirementMandatoryCourseListItemDto> response = _mapper.Map<GetListResponse<GetListRequirementMandatoryCourseListItemDto>>(requirementMandatoryCourses);
            return response;
        }
    }
}