using Application.Features.RequirementMandatoryCourses.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RequirementMandatoryCourses.Commands.Update;

public class UpdateRequirementMandatoryCourseCommand : IRequest<UpdatedRequirementMandatoryCourseResponse>
{
    public Guid Id { get; set; }
    public Guid RequirementSetId { get; set; }
    public Guid CourseId { get; set; }

    public class UpdateRequirementMandatoryCourseCommandHandler : IRequestHandler<UpdateRequirementMandatoryCourseCommand, UpdatedRequirementMandatoryCourseResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRequirementMandatoryCourseRepository _requirementMandatoryCourseRepository;
        private readonly RequirementMandatoryCourseBusinessRules _requirementMandatoryCourseBusinessRules;

        public UpdateRequirementMandatoryCourseCommandHandler(IMapper mapper, IRequirementMandatoryCourseRepository requirementMandatoryCourseRepository,
                                         RequirementMandatoryCourseBusinessRules requirementMandatoryCourseBusinessRules)
        {
            _mapper = mapper;
            _requirementMandatoryCourseRepository = requirementMandatoryCourseRepository;
            _requirementMandatoryCourseBusinessRules = requirementMandatoryCourseBusinessRules;
        }

        public async Task<UpdatedRequirementMandatoryCourseResponse> Handle(UpdateRequirementMandatoryCourseCommand request, CancellationToken cancellationToken)
        {
            RequirementMandatoryCourse? requirementMandatoryCourse = await _requirementMandatoryCourseRepository.GetAsync(predicate: rmc => rmc.Id == request.Id, cancellationToken: cancellationToken);
            await _requirementMandatoryCourseBusinessRules.RequirementMandatoryCourseShouldExistWhenSelected(requirementMandatoryCourse);
            requirementMandatoryCourse = _mapper.Map(request, requirementMandatoryCourse);

            await _requirementMandatoryCourseRepository.UpdateAsync(requirementMandatoryCourse!);

            UpdatedRequirementMandatoryCourseResponse response = _mapper.Map<UpdatedRequirementMandatoryCourseResponse>(requirementMandatoryCourse);
            return response;
        }
    }
}