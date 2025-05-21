using Application.Features.RequirementMandatoryCourses.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RequirementMandatoryCourses.Queries.GetById;

public class GetByIdRequirementMandatoryCourseQuery : IRequest<GetByIdRequirementMandatoryCourseResponse>
{
    public Guid Id { get; set; }

    public class GetByIdRequirementMandatoryCourseQueryHandler : IRequestHandler<GetByIdRequirementMandatoryCourseQuery, GetByIdRequirementMandatoryCourseResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRequirementMandatoryCourseRepository _requirementMandatoryCourseRepository;
        private readonly RequirementMandatoryCourseBusinessRules _requirementMandatoryCourseBusinessRules;

        public GetByIdRequirementMandatoryCourseQueryHandler(IMapper mapper, IRequirementMandatoryCourseRepository requirementMandatoryCourseRepository, RequirementMandatoryCourseBusinessRules requirementMandatoryCourseBusinessRules)
        {
            _mapper = mapper;
            _requirementMandatoryCourseRepository = requirementMandatoryCourseRepository;
            _requirementMandatoryCourseBusinessRules = requirementMandatoryCourseBusinessRules;
        }

        public async Task<GetByIdRequirementMandatoryCourseResponse> Handle(GetByIdRequirementMandatoryCourseQuery request, CancellationToken cancellationToken)
        {
            RequirementMandatoryCourse? requirementMandatoryCourse = await _requirementMandatoryCourseRepository.GetAsync(predicate: rmc => rmc.Id == request.Id, cancellationToken: cancellationToken);
            await _requirementMandatoryCourseBusinessRules.RequirementMandatoryCourseShouldExistWhenSelected(requirementMandatoryCourse);

            GetByIdRequirementMandatoryCourseResponse response = _mapper.Map<GetByIdRequirementMandatoryCourseResponse>(requirementMandatoryCourse);
            return response;
        }
    }
}