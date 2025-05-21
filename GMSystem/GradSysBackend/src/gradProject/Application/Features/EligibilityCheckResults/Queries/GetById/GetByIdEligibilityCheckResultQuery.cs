using Application.Features.EligibilityCheckResults.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.EligibilityCheckResults.Queries.GetById;

public class GetByIdEligibilityCheckResultQuery : IRequest<GetByIdEligibilityCheckResultResponse>
{
    public Guid Id { get; set; }

    public class GetByIdEligibilityCheckResultQueryHandler : IRequestHandler<GetByIdEligibilityCheckResultQuery, GetByIdEligibilityCheckResultResponse>
    {
        private readonly IMapper _mapper;
        private readonly IEligibilityCheckResultRepository _eligibilityCheckResultRepository;
        private readonly EligibilityCheckResultBusinessRules _eligibilityCheckResultBusinessRules;

        public GetByIdEligibilityCheckResultQueryHandler(IMapper mapper, IEligibilityCheckResultRepository eligibilityCheckResultRepository, EligibilityCheckResultBusinessRules eligibilityCheckResultBusinessRules)
        {
            _mapper = mapper;
            _eligibilityCheckResultRepository = eligibilityCheckResultRepository;
            _eligibilityCheckResultBusinessRules = eligibilityCheckResultBusinessRules;
        }

        public async Task<GetByIdEligibilityCheckResultResponse> Handle(GetByIdEligibilityCheckResultQuery request, CancellationToken cancellationToken)
        {
            EligibilityCheckResult? eligibilityCheckResult = await _eligibilityCheckResultRepository.GetAsync(predicate: ecr => ecr.Id == request.Id, cancellationToken: cancellationToken);
            await _eligibilityCheckResultBusinessRules.EligibilityCheckResultShouldExistWhenSelected(eligibilityCheckResult);

            GetByIdEligibilityCheckResultResponse response = _mapper.Map<GetByIdEligibilityCheckResultResponse>(eligibilityCheckResult);
            return response;
        }
    }
}