using Application.Features.RankingLists.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.RankingLists.Commands.Update;

public class UpdateRankingListCommand : IRequest<UpdatedRankingListResponse>
{
    public Guid Id { get; set; }
    public RankingListType ListType { get; set; }
    public Guid? ScopeDepartmentId { get; set; }
    public Guid? ScopeFacultyId { get; set; }
    public string AcademicTerm { get; set; }
    public DateTime GenerationDate { get; set; }
    public Guid GeneratedByUserId { get; set; }
    public string PrimarySortField { get; set; }
    public string SortOrder { get; set; }
    public decimal? MinGpaForInclusion { get; set; }

    public class UpdateRankingListCommandHandler : IRequestHandler<UpdateRankingListCommand, UpdatedRankingListResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListRepository _rankingListRepository;
        private readonly RankingListBusinessRules _rankingListBusinessRules;

        public UpdateRankingListCommandHandler(IMapper mapper, IRankingListRepository rankingListRepository,
                                         RankingListBusinessRules rankingListBusinessRules)
        {
            _mapper = mapper;
            _rankingListRepository = rankingListRepository;
            _rankingListBusinessRules = rankingListBusinessRules;
        }

        public async Task<UpdatedRankingListResponse> Handle(UpdateRankingListCommand request, CancellationToken cancellationToken)
        {
            RankingList? rankingList = await _rankingListRepository.GetAsync(predicate: rl => rl.Id == request.Id, cancellationToken: cancellationToken);
            await _rankingListBusinessRules.RankingListShouldExistWhenSelected(rankingList);
            rankingList = _mapper.Map(request, rankingList);

            await _rankingListRepository.UpdateAsync(rankingList!);

            UpdatedRankingListResponse response = _mapper.Map<UpdatedRankingListResponse>(rankingList);
            return response;
        }
    }
}