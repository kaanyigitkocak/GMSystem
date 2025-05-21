using Application.Features.RankingListEntries.Commands.Create;
using Application.Features.RankingListEntries.Commands.Delete;
using Application.Features.RankingListEntries.Commands.Update;
using Application.Features.RankingListEntries.Queries.GetById;
using Application.Features.RankingListEntries.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.RankingListEntries.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<RankingListEntry, CreateRankingListEntryCommand>().ReverseMap();
        CreateMap<RankingListEntry, CreatedRankingListEntryResponse>().ReverseMap();
        CreateMap<RankingListEntry, UpdateRankingListEntryCommand>().ReverseMap();
        CreateMap<RankingListEntry, UpdatedRankingListEntryResponse>().ReverseMap();
        CreateMap<RankingListEntry, DeleteRankingListEntryCommand>().ReverseMap();
        CreateMap<RankingListEntry, DeletedRankingListEntryResponse>().ReverseMap();
        CreateMap<RankingListEntry, GetByIdRankingListEntryResponse>().ReverseMap();
        CreateMap<RankingListEntry, GetListRankingListEntryListItemDto>().ReverseMap();
        CreateMap<IPaginate<RankingListEntry>, GetListResponse<GetListRankingListEntryListItemDto>>().ReverseMap();
    }
}