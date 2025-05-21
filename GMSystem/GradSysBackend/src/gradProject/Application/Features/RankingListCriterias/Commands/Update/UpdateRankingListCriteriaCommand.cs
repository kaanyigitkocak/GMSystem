using Application.Features.RankingListCriterias.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RankingListCriterias.Commands.Update;

public class UpdateRankingListCriteriaCommand : IRequest<UpdatedRankingListCriteriaResponse>
{
    public Guid Id { get; set; }
    public Guid RankingListId { get; set; }
    public string CriteriaName { get; set; }
    public string CriteriaValue { get; set; }

    public class UpdateRankingListCriteriaCommandHandler : IRequestHandler<UpdateRankingListCriteriaCommand, UpdatedRankingListCriteriaResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListCriteriaRepository _rankingListCriteriaRepository;
        private readonly RankingListCriteriaBusinessRules _rankingListCriteriaBusinessRules;

        public UpdateRankingListCriteriaCommandHandler(IMapper mapper, IRankingListCriteriaRepository rankingListCriteriaRepository,
                                         RankingListCriteriaBusinessRules rankingListCriteriaBusinessRules)
        {
            _mapper = mapper;
            _rankingListCriteriaRepository = rankingListCriteriaRepository;
            _rankingListCriteriaBusinessRules = rankingListCriteriaBusinessRules;
        }

        public async Task<UpdatedRankingListCriteriaResponse> Handle(UpdateRankingListCriteriaCommand request, CancellationToken cancellationToken)
        {
            RankingListCriteria? rankingListCriteria = await _rankingListCriteriaRepository.GetAsync(predicate: rlc => rlc.Id == request.Id, cancellationToken: cancellationToken);
            await _rankingListCriteriaBusinessRules.RankingListCriteriaShouldExistWhenSelected(rankingListCriteria);
            rankingListCriteria = _mapper.Map(request, rankingListCriteria);

            await _rankingListCriteriaRepository.UpdateAsync(rankingListCriteria!);

            UpdatedRankingListCriteriaResponse response = _mapper.Map<UpdatedRankingListCriteriaResponse>(rankingListCriteria);
            return response;
        }
    }
}