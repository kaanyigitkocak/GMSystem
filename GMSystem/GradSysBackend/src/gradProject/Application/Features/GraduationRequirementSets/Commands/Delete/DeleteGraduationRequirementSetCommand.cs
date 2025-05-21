using Application.Features.GraduationRequirementSets.Constants;
using Application.Features.GraduationRequirementSets.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.GraduationRequirementSets.Commands.Delete;

public class DeleteGraduationRequirementSetCommand : IRequest<DeletedGraduationRequirementSetResponse>
{
    public Guid Id { get; set; }

    public class DeleteGraduationRequirementSetCommandHandler : IRequestHandler<DeleteGraduationRequirementSetCommand, DeletedGraduationRequirementSetResponse>
    {
        private readonly IMapper _mapper;
        private readonly IGraduationRequirementSetRepository _graduationRequirementSetRepository;
        private readonly GraduationRequirementSetBusinessRules _graduationRequirementSetBusinessRules;

        public DeleteGraduationRequirementSetCommandHandler(IMapper mapper, IGraduationRequirementSetRepository graduationRequirementSetRepository,
                                         GraduationRequirementSetBusinessRules graduationRequirementSetBusinessRules)
        {
            _mapper = mapper;
            _graduationRequirementSetRepository = graduationRequirementSetRepository;
            _graduationRequirementSetBusinessRules = graduationRequirementSetBusinessRules;
        }

        public async Task<DeletedGraduationRequirementSetResponse> Handle(DeleteGraduationRequirementSetCommand request, CancellationToken cancellationToken)
        {
            GraduationRequirementSet? graduationRequirementSet = await _graduationRequirementSetRepository.GetAsync(predicate: grs => grs.Id == request.Id, cancellationToken: cancellationToken);
            await _graduationRequirementSetBusinessRules.GraduationRequirementSetShouldExistWhenSelected(graduationRequirementSet);

            await _graduationRequirementSetRepository.DeleteAsync(graduationRequirementSet!);

            DeletedGraduationRequirementSetResponse response = _mapper.Map<DeletedGraduationRequirementSetResponse>(graduationRequirementSet);
            return response;
        }
    }
}