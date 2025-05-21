using Application.Features.RankingListEntries.Constants;
using Application.Features.RankingListEntries.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.RankingListEntries.Commands.Delete;

public class DeleteRankingListEntryCommand : IRequest<DeletedRankingListEntryResponse>
{
    public Guid Id { get; set; }

    public class DeleteRankingListEntryCommandHandler : IRequestHandler<DeleteRankingListEntryCommand, DeletedRankingListEntryResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListEntryRepository _rankingListEntryRepository;
        private readonly RankingListEntryBusinessRules _rankingListEntryBusinessRules;

        public DeleteRankingListEntryCommandHandler(IMapper mapper, IRankingListEntryRepository rankingListEntryRepository,
                                         RankingListEntryBusinessRules rankingListEntryBusinessRules)
        {
            _mapper = mapper;
            _rankingListEntryRepository = rankingListEntryRepository;
            _rankingListEntryBusinessRules = rankingListEntryBusinessRules;
        }

        public async Task<DeletedRankingListEntryResponse> Handle(DeleteRankingListEntryCommand request, CancellationToken cancellationToken)
        {
            RankingListEntry? rankingListEntry = await _rankingListEntryRepository.GetAsync(predicate: rle => rle.Id == request.Id, cancellationToken: cancellationToken);
            await _rankingListEntryBusinessRules.RankingListEntryShouldExistWhenSelected(rankingListEntry);

            await _rankingListEntryRepository.DeleteAsync(rankingListEntry!);

            DeletedRankingListEntryResponse response = _mapper.Map<DeletedRankingListEntryResponse>(rankingListEntry);
            return response;
        }
    }
}