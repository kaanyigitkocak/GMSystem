using Application.Features.GraduationProcesses.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.GraduationProcesses.Queries.GetById;

public class GetByIdGraduationProcessQuery : IRequest<GetByIdGraduationProcessResponse>
{
    public Guid Id { get; set; }

    public class GetByIdGraduationProcessQueryHandler : IRequestHandler<GetByIdGraduationProcessQuery, GetByIdGraduationProcessResponse>
    {
        private readonly IMapper _mapper;
        private readonly IGraduationProcessRepository _graduationProcessRepository;
        private readonly GraduationProcessBusinessRules _graduationProcessBusinessRules;

        public GetByIdGraduationProcessQueryHandler(IMapper mapper, IGraduationProcessRepository graduationProcessRepository, GraduationProcessBusinessRules graduationProcessBusinessRules)
        {
            _mapper = mapper;
            _graduationProcessRepository = graduationProcessRepository;
            _graduationProcessBusinessRules = graduationProcessBusinessRules;
        }

        public async Task<GetByIdGraduationProcessResponse> Handle(GetByIdGraduationProcessQuery request, CancellationToken cancellationToken)
        {
            GraduationProcess? graduationProcess = await _graduationProcessRepository.GetAsync(predicate: gp => gp.Id == request.Id, cancellationToken: cancellationToken);
            await _graduationProcessBusinessRules.GraduationProcessShouldExistWhenSelected(graduationProcess);

            GetByIdGraduationProcessResponse response = _mapper.Map<GetByIdGraduationProcessResponse>(graduationProcess);
            return response;
        }
    }
}