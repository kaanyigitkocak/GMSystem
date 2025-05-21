using Application.Features.GraduationRequirementSets.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.GraduationRequirementSets.Commands.Update;

public class UpdateGraduationRequirementSetCommand : IRequest<UpdatedGraduationRequirementSetResponse>
{
    public Guid Id { get; set; }
    public Guid DepartmentId { get; set; }
    public decimal MinGpa { get; set; }
    public int TotalMinEcts { get; set; }
    public int? MinTechnicalElectiveCoursesCount { get; set; }
    public int? MinNonTechnicalElectiveCoursesCount { get; set; }
    public int? MinUniversityElectiveCoursesCount { get; set; }
    public string? Description { get; set; }
    public Guid LastModifiedByUserId { get; set; }

    public class UpdateGraduationRequirementSetCommandHandler : IRequestHandler<UpdateGraduationRequirementSetCommand, UpdatedGraduationRequirementSetResponse>
    {
        private readonly IMapper _mapper;
        private readonly IGraduationRequirementSetRepository _graduationRequirementSetRepository;
        private readonly GraduationRequirementSetBusinessRules _graduationRequirementSetBusinessRules;

        public UpdateGraduationRequirementSetCommandHandler(IMapper mapper, IGraduationRequirementSetRepository graduationRequirementSetRepository,
                                         GraduationRequirementSetBusinessRules graduationRequirementSetBusinessRules)
        {
            _mapper = mapper;
            _graduationRequirementSetRepository = graduationRequirementSetRepository;
            _graduationRequirementSetBusinessRules = graduationRequirementSetBusinessRules;
        }

        public async Task<UpdatedGraduationRequirementSetResponse> Handle(UpdateGraduationRequirementSetCommand request, CancellationToken cancellationToken)
        {
            GraduationRequirementSet? graduationRequirementSet = await _graduationRequirementSetRepository.GetAsync(predicate: grs => grs.Id == request.Id, cancellationToken: cancellationToken);
            await _graduationRequirementSetBusinessRules.GraduationRequirementSetShouldExistWhenSelected(graduationRequirementSet);
            graduationRequirementSet = _mapper.Map(request, graduationRequirementSet);

            graduationRequirementSet!.UpdatedDate = DateTime.UtcNow;

            await _graduationRequirementSetRepository.UpdateAsync(graduationRequirementSet!);

            UpdatedGraduationRequirementSetResponse response = _mapper.Map<UpdatedGraduationRequirementSetResponse>(graduationRequirementSet);
            return response;
        }
    }
}