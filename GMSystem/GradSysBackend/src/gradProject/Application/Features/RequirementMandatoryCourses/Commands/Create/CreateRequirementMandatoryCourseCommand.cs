using Application.Features.RequirementMandatoryCourses.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RequirementMandatoryCourses.Commands.Create;

public class CreateRequirementMandatoryCourseCommand : IRequest<CreatedRequirementMandatoryCourseResponse>
{
    public Guid RequirementSetId { get; set; }
    public Guid CourseId { get; set; }

    public class CreateRequirementMandatoryCourseCommandHandler : IRequestHandler<CreateRequirementMandatoryCourseCommand, CreatedRequirementMandatoryCourseResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRequirementMandatoryCourseRepository _requirementMandatoryCourseRepository;
        private readonly RequirementMandatoryCourseBusinessRules _requirementMandatoryCourseBusinessRules;

        public CreateRequirementMandatoryCourseCommandHandler(IMapper mapper, IRequirementMandatoryCourseRepository requirementMandatoryCourseRepository,
                                         RequirementMandatoryCourseBusinessRules requirementMandatoryCourseBusinessRules)
        {
            _mapper = mapper;
            _requirementMandatoryCourseRepository = requirementMandatoryCourseRepository;
            _requirementMandatoryCourseBusinessRules = requirementMandatoryCourseBusinessRules;
        }

        public async Task<CreatedRequirementMandatoryCourseResponse> Handle(CreateRequirementMandatoryCourseCommand request, CancellationToken cancellationToken)
        {
            RequirementMandatoryCourse requirementMandatoryCourse = _mapper.Map<RequirementMandatoryCourse>(request);

            await _requirementMandatoryCourseRepository.AddAsync(requirementMandatoryCourse);

            CreatedRequirementMandatoryCourseResponse response = _mapper.Map<CreatedRequirementMandatoryCourseResponse>(requirementMandatoryCourse);
            return response;
        }
    }
}