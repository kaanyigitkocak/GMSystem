using Application.Features.GraduationRequirementSets.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.GraduationRequirementSets.Commands.Create;

public class CreateGraduationRequirementSetCommand : IRequest<CreatedGraduationRequirementSetResponse>
{
    public Guid DepartmentId { get; set; }
    public decimal MinGpa { get; set; }
    public int TotalMinEcts { get; set; }
    public int? MinTechnicalElectiveCoursesCount { get; set; }
    public int? MinNonTechnicalElectiveCoursesCount { get; set; }
    public int? MinUniversityElectiveCoursesCount { get; set; }
    public string? Description { get; set; }
    public Guid CreatedByUserId { get; set; }


    public class CreateGraduationRequirementSetCommandHandler : IRequestHandler<CreateGraduationRequirementSetCommand, CreatedGraduationRequirementSetResponse>
    {
        private readonly IMapper _mapper;
        private readonly IGraduationRequirementSetRepository _graduationRequirementSetRepository;
        private readonly GraduationRequirementSetBusinessRules _graduationRequirementSetBusinessRules;

        public CreateGraduationRequirementSetCommandHandler(IMapper mapper, IGraduationRequirementSetRepository graduationRequirementSetRepository,
                                         GraduationRequirementSetBusinessRules graduationRequirementSetBusinessRules)
        {
            _mapper = mapper;
            _graduationRequirementSetRepository = graduationRequirementSetRepository;
            _graduationRequirementSetBusinessRules = graduationRequirementSetBusinessRules;
        }

        public async Task<CreatedGraduationRequirementSetResponse> Handle(CreateGraduationRequirementSetCommand request, CancellationToken cancellationToken)
        {
            GraduationRequirementSet graduationRequirementSet = _mapper.Map<GraduationRequirementSet>(request);

            graduationRequirementSet.LastModifiedByUserId = request.CreatedByUserId;
            graduationRequirementSet.CreatedDate = DateTime.UtcNow;
            graduationRequirementSet.UpdatedDate = DateTime.UtcNow;

            await _graduationRequirementSetRepository.AddAsync(graduationRequirementSet);

            CreatedGraduationRequirementSetResponse response = _mapper.Map<CreatedGraduationRequirementSetResponse>(graduationRequirementSet);
            return response;
        }
    }
}