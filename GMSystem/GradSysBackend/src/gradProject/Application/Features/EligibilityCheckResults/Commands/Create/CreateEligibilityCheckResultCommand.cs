using Application.Features.EligibilityCheckResults.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.EligibilityCheckResults.Commands.Create;

public class CreateEligibilityCheckResultCommand : IRequest<CreatedEligibilityCheckResultResponse>
{
    public Guid ProcessId { get; set; }
    public EligibilityCheckType CheckType { get; set; }
    public bool IsMet { get; set; }
    public string ActualValue { get; set; }
    public string RequiredValue { get; set; }
    public string? NotesOrMissingItems { get; set; }
    public DateTime CheckDate { get; set; }

    public class CreateEligibilityCheckResultCommandHandler : IRequestHandler<CreateEligibilityCheckResultCommand, CreatedEligibilityCheckResultResponse>
    {
        private readonly IMapper _mapper;
        private readonly IEligibilityCheckResultRepository _eligibilityCheckResultRepository;
        private readonly EligibilityCheckResultBusinessRules _eligibilityCheckResultBusinessRules;

        public CreateEligibilityCheckResultCommandHandler(IMapper mapper, IEligibilityCheckResultRepository eligibilityCheckResultRepository,
                                         EligibilityCheckResultBusinessRules eligibilityCheckResultBusinessRules)
        {
            _mapper = mapper;
            _eligibilityCheckResultRepository = eligibilityCheckResultRepository;
            _eligibilityCheckResultBusinessRules = eligibilityCheckResultBusinessRules;
        }

        public async Task<CreatedEligibilityCheckResultResponse> Handle(CreateEligibilityCheckResultCommand request, CancellationToken cancellationToken)
        {
            EligibilityCheckResult eligibilityCheckResult = _mapper.Map<EligibilityCheckResult>(request);

            await _eligibilityCheckResultRepository.AddAsync(eligibilityCheckResult);

            CreatedEligibilityCheckResultResponse response = _mapper.Map<CreatedEligibilityCheckResultResponse>(eligibilityCheckResult);
            return response;
        }
    }
}