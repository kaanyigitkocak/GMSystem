using Application.Features.RankingListCriterias.Commands.Create;
using Application.Features.RankingListCriterias.Commands.Delete;
using Application.Features.RankingListCriterias.Commands.Update;
using Application.Features.RankingListCriterias.Queries.GetById;
using Application.Features.RankingListCriterias.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.RankingListCriterias.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<RankingListCriteria, CreateRankingListCriteriaCommand>().ReverseMap();
        CreateMap<RankingListCriteria, CreatedRankingListCriteriaResponse>().ReverseMap();
        CreateMap<RankingListCriteria, UpdateRankingListCriteriaCommand>().ReverseMap();
        CreateMap<RankingListCriteria, UpdatedRankingListCriteriaResponse>().ReverseMap();
        CreateMap<RankingListCriteria, DeleteRankingListCriteriaCommand>().ReverseMap();
        CreateMap<RankingListCriteria, DeletedRankingListCriteriaResponse>().ReverseMap();
        CreateMap<RankingListCriteria, GetByIdRankingListCriteriaResponse>().ReverseMap();
        CreateMap<RankingListCriteria, GetListRankingListCriteriaListItemDto>().ReverseMap();
        CreateMap<IPaginate<RankingListCriteria>, GetListResponse<GetListRankingListCriteriaListItemDto>>().ReverseMap();
    }
}