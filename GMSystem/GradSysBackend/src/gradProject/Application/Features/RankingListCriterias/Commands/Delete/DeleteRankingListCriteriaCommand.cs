using Application.Features.RankingListCriterias.Constants;
using Application.Features.RankingListCriterias.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RankingListCriterias.Commands.Delete;

public class DeleteRankingListCriteriaCommand : IRequest<DeletedRankingListCriteriaResponse>
{
    public Guid Id { get; set; }

    public class DeleteRankingListCriteriaCommandHandler : IRequestHandler<DeleteRankingListCriteriaCommand, DeletedRankingListCriteriaResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListCriteriaRepository _rankingListCriteriaRepository;
        private readonly RankingListCriteriaBusinessRules _rankingListCriteriaBusinessRules;

        public DeleteRankingListCriteriaCommandHandler(IMapper mapper, IRankingListCriteriaRepository rankingListCriteriaRepository,
                                         RankingListCriteriaBusinessRules rankingListCriteriaBusinessRules)
        {
            _mapper = mapper;
            _rankingListCriteriaRepository = rankingListCriteriaRepository;
            _rankingListCriteriaBusinessRules = rankingListCriteriaBusinessRules;
        }

        public async Task<DeletedRankingListCriteriaResponse> Handle(DeleteRankingListCriteriaCommand request, CancellationToken cancellationToken)
        {
            RankingListCriteria? rankingListCriteria = await _rankingListCriteriaRepository.GetAsync(predicate: rlc => rlc.Id == request.Id, cancellationToken: cancellationToken);
            await _rankingListCriteriaBusinessRules.RankingListCriteriaShouldExistWhenSelected(rankingListCriteria);

            await _rankingListCriteriaRepository.DeleteAsync(rankingListCriteria!);

            DeletedRankingListCriteriaResponse response = _mapper.Map<DeletedRankingListCriteriaResponse>(rankingListCriteria);
            return response;
        }
    }
}