using Application.Features.RankingLists.Commands.Create;
using Application.Features.RankingLists.Commands.Delete;
using Application.Features.RankingLists.Commands.Update;
using Application.Features.RankingLists.Queries.GetById;
using Application.Features.RankingLists.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.RankingLists.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<RankingList, CreateRankingListCommand>().ReverseMap();
        CreateMap<RankingList, CreatedRankingListResponse>().ReverseMap();
        CreateMap<RankingList, UpdateRankingListCommand>().ReverseMap();
        CreateMap<RankingList, UpdatedRankingListResponse>().ReverseMap();
        CreateMap<RankingList, DeleteRankingListCommand>().ReverseMap();
        CreateMap<RankingList, DeletedRankingListResponse>().ReverseMap();
        CreateMap<RankingList, GetByIdRankingListResponse>().ReverseMap();
        CreateMap<RankingList, GetListRankingListListItemDto>().ReverseMap();
        CreateMap<IPaginate<RankingList>, GetListResponse<GetListRankingListListItemDto>>().ReverseMap();
    }
}