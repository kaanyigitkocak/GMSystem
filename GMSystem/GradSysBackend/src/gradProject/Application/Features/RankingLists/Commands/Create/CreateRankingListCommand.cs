using Application.Features.RankingLists.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.RankingLists.Commands.Create;

public class CreateRankingListCommand : IRequest<CreatedRankingListResponse>
{
    public RankingListType ListType { get; set; }
    public Guid? ScopeDepartmentId { get; set; }
    public Guid? ScopeFacultyId { get; set; }
    public string AcademicTerm { get; set; }
    public DateTime GenerationDate { get; set; }
    public Guid GeneratedByUserId { get; set; }
    public string PrimarySortField { get; set; }
    public string SortOrder { get; set; }
    public decimal? MinGpaForInclusion { get; set; }

    public class CreateRankingListCommandHandler : IRequestHandler<CreateRankingListCommand, CreatedRankingListResponse>
    {
        private readonly IMapper _mapper;
        private readonly IRankingListRepository _rankingListRepository;
        private readonly RankingListBusinessRules _rankingListBusinessRules;

        public CreateRankingListCommandHandler(IMapper mapper, IRankingListRepository rankingListRepository,
                                         RankingListBusinessRules rankingListBusinessRules)
        {
            _mapper = mapper;
            _rankingListRepository = rankingListRepository;
            _rankingListBusinessRules = rankingListBusinessRules;
        }

        public async Task<CreatedRankingListResponse> Handle(CreateRankingListCommand request, CancellationToken cancellationToken)
        {
            RankingList rankingList = _mapper.Map<RankingList>(request);

            await _rankingListRepository.AddAsync(rankingList);

            CreatedRankingListResponse response = _mapper.Map<CreatedRankingListResponse>(rankingList);
            return response;
        }
    }
}