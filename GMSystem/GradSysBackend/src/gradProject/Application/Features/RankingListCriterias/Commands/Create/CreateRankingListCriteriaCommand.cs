using Application.Features.RankingListCriterias.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RankingListCriterias.Commands.Create;

public class CreateRankingListCriteriaCommand : IRequest<CreatedRankingListCriteriaResponse>
{
    public Guid RankingListId { get; set; }
    public string CriteriaName { get; set; }
    public string CriteriaValue { get; set; }

    public class CreateRankingListCriteriaCommandHandler : IRequestHandler<CreateRankingListCriteriaCommand, CreatedRankingListCriteriaResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListCriteriaRepository _rankingListCriteriaRepository;
        private readonly RankingListCriteriaBusinessRules _rankingListCriteriaBusinessRules;

        public CreateRankingListCriteriaCommandHandler(IMapper mapper, IRankingListCriteriaRepository rankingListCriteriaRepository,
                                         RankingListCriteriaBusinessRules rankingListCriteriaBusinessRules)
        {
            _mapper = mapper;
            _rankingListCriteriaRepository = rankingListCriteriaRepository;
            _rankingListCriteriaBusinessRules = rankingListCriteriaBusinessRules;
        }

        public async Task<CreatedRankingListCriteriaResponse> Handle(CreateRankingListCriteriaCommand request, CancellationToken cancellationToken)
        {
            RankingListCriteria rankingListCriteria = _mapper.Map<RankingListCriteria>(request);

            await _rankingListCriteriaRepository.AddAsync(rankingListCriteria);

            CreatedRankingListCriteriaResponse response = _mapper.Map<CreatedRankingListCriteriaResponse>(rankingListCriteria);
            return response;
        }
    }
}