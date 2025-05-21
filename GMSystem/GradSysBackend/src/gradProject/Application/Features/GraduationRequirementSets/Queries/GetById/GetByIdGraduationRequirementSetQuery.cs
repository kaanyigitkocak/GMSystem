using Application.Features.GraduationRequirementSets.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.GraduationRequirementSets.Queries.GetById;

public class GetByIdGraduationRequirementSetQuery : IRequest<GetByIdGraduationRequirementSetResponse>
{
    public Guid Id { get; set; }

    public class GetByIdGraduationRequirementSetQueryHandler : IRequestHandler<GetByIdGraduationRequirementSetQuery, GetByIdGraduationRequirementSetResponse>
    {
        private readonly IMapper _mapper;
        private readonly IGraduationRequirementSetRepository _graduationRequirementSetRepository;
        private readonly GraduationRequirementSetBusinessRules _graduationRequirementSetBusinessRules;

        public GetByIdGraduationRequirementSetQueryHandler(IMapper mapper, IGraduationRequirementSetRepository graduationRequirementSetRepository, GraduationRequirementSetBusinessRules graduationRequirementSetBusinessRules)
        {
            _mapper = mapper;
            _graduationRequirementSetRepository = graduationRequirementSetRepository;
            _graduationRequirementSetBusinessRules = graduationRequirementSetBusinessRules;
        }

        public async Task<GetByIdGraduationRequirementSetResponse> Handle(GetByIdGraduationRequirementSetQuery request, CancellationToken cancellationToken)
        {
            GraduationRequirementSet? graduationRequirementSet = await _graduationRequirementSetRepository.GetAsync(predicate: grs => grs.Id == request.Id, cancellationToken: cancellationToken);
            await _graduationRequirementSetBusinessRules.GraduationRequirementSetShouldExistWhenSelected(graduationRequirementSet);

            GetByIdGraduationRequirementSetResponse response = _mapper.Map<GetByIdGraduationRequirementSetResponse>(graduationRequirementSet);
            return response;
        }
    }
}