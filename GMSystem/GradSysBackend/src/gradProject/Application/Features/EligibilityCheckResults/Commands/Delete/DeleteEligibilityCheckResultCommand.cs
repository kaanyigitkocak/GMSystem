using Application.Features.EligibilityCheckResults.Constants;
using Application.Features.EligibilityCheckResults.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.EligibilityCheckResults.Commands.Delete;

public class DeleteEligibilityCheckResultCommand : IRequest<DeletedEligibilityCheckResultResponse>
{
    public Guid Id { get; set; }

    public class DeleteEligibilityCheckResultCommandHandler : IRequestHandler<DeleteEligibilityCheckResultCommand, DeletedEligibilityCheckResultResponse>
    {
        private readonly IMapper _mapper;
        private readonly IEligibilityCheckResultRepository _eligibilityCheckResultRepository;
        private readonly EligibilityCheckResultBusinessRules _eligibilityCheckResultBusinessRules;

        public DeleteEligibilityCheckResultCommandHandler(IMapper mapper, IEligibilityCheckResultRepository eligibilityCheckResultRepository,
                                         EligibilityCheckResultBusinessRules eligibilityCheckResultBusinessRules)
        {
            _mapper = mapper;
            _eligibilityCheckResultRepository = eligibilityCheckResultRepository;
            _eligibilityCheckResultBusinessRules = eligibilityCheckResultBusinessRules;
        }

        public async Task<DeletedEligibilityCheckResultResponse> Handle(DeleteEligibilityCheckResultCommand request, CancellationToken cancellationToken)
        {
            EligibilityCheckResult? eligibilityCheckResult = await _eligibilityCheckResultRepository.GetAsync(predicate: ecr => ecr.Id == request.Id, cancellationToken: cancellationToken);
            await _eligibilityCheckResultBusinessRules.EligibilityCheckResultShouldExistWhenSelected(eligibilityCheckResult);

            await _eligibilityCheckResultRepository.DeleteAsync(eligibilityCheckResult!);

            DeletedEligibilityCheckResultResponse response = _mapper.Map<DeletedEligibilityCheckResultResponse>(eligibilityCheckResult);
            return response;
        }
    }
}