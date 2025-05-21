using Application.Features.RankingLists.Constants;
using Application.Features.RankingLists.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RankingLists.Commands.Delete;

public class DeleteRankingListCommand : IRequest<DeletedRankingListResponse>
{
    public Guid Id { get; set; }

    public class DeleteRankingListCommandHandler : IRequestHandler<DeleteRankingListCommand, DeletedRankingListResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListRepository _rankingListRepository;
        private readonly RankingListBusinessRules _rankingListBusinessRules;

        public DeleteRankingListCommandHandler(IMapper mapper, IRankingListRepository rankingListRepository,
                                         RankingListBusinessRules rankingListBusinessRules)
        {
            _mapper = mapper;
            _rankingListRepository = rankingListRepository;
            _rankingListBusinessRules = rankingListBusinessRules;
        }

        public async Task<DeletedRankingListResponse> Handle(DeleteRankingListCommand request, CancellationToken cancellationToken)
        {
            RankingList? rankingList = await _rankingListRepository.GetAsync(predicate: rl => rl.Id == request.Id, cancellationToken: cancellationToken);
            await _rankingListBusinessRules.RankingListShouldExistWhenSelected(rankingList);

            await _rankingListRepository.DeleteAsync(rankingList!);

            DeletedRankingListResponse response = _mapper.Map<DeletedRankingListResponse>(rankingList);
            return response;
        }
    }
}