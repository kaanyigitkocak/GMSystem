using Application.Features.EligibilityCheckResults.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.EligibilityCheckResults.Commands.Update;

public class UpdateEligibilityCheckResultCommand : IRequest<UpdatedEligibilityCheckResultResponse>
{
    public Guid Id { get; set; }
    public Guid ProcessId { get; set; }
    public EligibilityCheckType CheckType { get; set; }
    public bool IsMet { get; set; }
    public string ActualValue { get; set; }
    public string RequiredValue { get; set; }
    public string? NotesOrMissingItems { get; set; }
    public DateTime CheckDate { get; set; }

    public class UpdateEligibilityCheckResultCommandHandler : IRequestHandler<UpdateEligibilityCheckResultCommand, UpdatedEligibilityCheckResultResponse>
    {
        private readonly IMapper _mapper;
        private readonly IEligibilityCheckResultRepository _eligibilityCheckResultRepository;
        private readonly EligibilityCheckResultBusinessRules _eligibilityCheckResultBusinessRules;

        public UpdateEligibilityCheckResultCommandHandler(IMapper mapper, IEligibilityCheckResultRepository eligibilityCheckResultRepository,
                                         EligibilityCheckResultBusinessRules eligibilityCheckResultBusinessRules)
        {
            _mapper = mapper;
            _eligibilityCheckResultRepository = eligibilityCheckResultRepository;
            _eligibilityCheckResultBusinessRules = eligibilityCheckResultBusinessRules;
        }

        public async Task<UpdatedEligibilityCheckResultResponse> Handle(UpdateEligibilityCheckResultCommand request, CancellationToken cancellationToken)
        {
            EligibilityCheckResult? eligibilityCheckResult = await _eligibilityCheckResultRepository.GetAsync(predicate: ecr => ecr.Id == request.Id, cancellationToken: cancellationToken);
            await _eligibilityCheckResultBusinessRules.EligibilityCheckResultShouldExistWhenSelected(eligibilityCheckResult);
            eligibilityCheckResult = _mapper.Map(request, eligibilityCheckResult);

            await _eligibilityCheckResultRepository.UpdateAsync(eligibilityCheckResult!);

            UpdatedEligibilityCheckResultResponse response = _mapper.Map<UpdatedEligibilityCheckResultResponse>(eligibilityCheckResult);
            return response;
        }
    }
}