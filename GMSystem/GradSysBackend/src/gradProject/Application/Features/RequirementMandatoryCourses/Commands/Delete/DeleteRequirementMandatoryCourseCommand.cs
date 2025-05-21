using Application.Features.RequirementMandatoryCourses.Constants;
using Application.Features.RequirementMandatoryCourses.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RequirementMandatoryCourses.Commands.Delete;

public class DeleteRequirementMandatoryCourseCommand : IRequest<DeletedRequirementMandatoryCourseResponse>
{
    public Guid Id { get; set; }

    public class DeleteRequirementMandatoryCourseCommandHandler : IRequestHandler<DeleteRequirementMandatoryCourseCommand, DeletedRequirementMandatoryCourseResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRequirementMandatoryCourseRepository _requirementMandatoryCourseRepository;
        private readonly RequirementMandatoryCourseBusinessRules _requirementMandatoryCourseBusinessRules;

        public DeleteRequirementMandatoryCourseCommandHandler(IMapper mapper, IRequirementMandatoryCourseRepository requirementMandatoryCourseRepository,
                                         RequirementMandatoryCourseBusinessRules requirementMandatoryCourseBusinessRules)
        {
            _mapper = mapper;
            _requirementMandatoryCourseRepository = requirementMandatoryCourseRepository;
            _requirementMandatoryCourseBusinessRules = requirementMandatoryCourseBusinessRules;
        }

        public async Task<DeletedRequirementMandatoryCourseResponse> Handle(DeleteRequirementMandatoryCourseCommand request, CancellationToken cancellationToken)
        {
            RequirementMandatoryCourse? requirementMandatoryCourse = await _requirementMandatoryCourseRepository.GetAsync(predicate: rmc => rmc.Id == request.Id, cancellationToken: cancellationToken);
            await _requirementMandatoryCourseBusinessRules.RequirementMandatoryCourseShouldExistWhenSelected(requirementMandatoryCourse);

            await _requirementMandatoryCourseRepository.DeleteAsync(requirementMandatoryCourse!);

            DeletedRequirementMandatoryCourseResponse response = _mapper.Map<DeletedRequirementMandatoryCourseResponse>(requirementMandatoryCourse);
            return response;
        }
    }
}