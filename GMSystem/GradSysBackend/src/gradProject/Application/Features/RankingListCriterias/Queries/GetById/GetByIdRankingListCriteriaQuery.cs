using Application.Features.RankingListCriterias.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RankingListCriterias.Queries.GetById;

public class GetByIdRankingListCriteriaQuery : IRequest<GetByIdRankingListCriteriaResponse>
{
    public Guid Id { get; set; }

    public class GetByIdRankingListCriteriaQueryHandler : IRequestHandler<GetByIdRankingListCriteriaQuery, GetByIdRankingListCriteriaResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListCriteriaRepository _rankingListCriteriaRepository;
        private readonly RankingListCriteriaBusinessRules _rankingListCriteriaBusinessRules;

        public GetByIdRankingListCriteriaQueryHandler(IMapper mapper, IRankingListCriteriaRepository rankingListCriteriaRepository, RankingListCriteriaBusinessRules rankingListCriteriaBusinessRules)
        {
            _mapper = mapper;
            _rankingListCriteriaRepository = rankingListCriteriaRepository;
            _rankingListCriteriaBusinessRules = rankingListCriteriaBusinessRules;
        }

        public async Task<GetByIdRankingListCriteriaResponse> Handle(GetByIdRankingListCriteriaQuery request, CancellationToken cancellationToken)
        {
            RankingListCriteria? rankingListCriteria = await _rankingListCriteriaRepository.GetAsync(predicate: rlc => rlc.Id == request.Id, cancellationToken: cancellationToken);
            await _rankingListCriteriaBusinessRules.RankingListCriteriaShouldExistWhenSelected(rankingListCriteria);

            GetByIdRankingListCriteriaResponse response = _mapper.Map<GetByIdRankingListCriteriaResponse>(rankingListCriteria);
            return response;
        }
    }
}