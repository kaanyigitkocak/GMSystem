using Domain.Enums;
using NArchitecture.Core.Application.Responses;

namespace Application.Features.RankingLists.Commands.Create;

public class CreatedRankingListResponse : IResponse
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
}