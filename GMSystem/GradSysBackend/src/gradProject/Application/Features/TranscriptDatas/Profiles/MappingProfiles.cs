using Application.Features.TranscriptDatas.Commands.Create;
using Application.Features.TranscriptDatas.Commands.Delete;
using Application.Features.TranscriptDatas.Commands.Update;
using Application.Features.TranscriptDatas.Queries.GetById;
using Application.Features.TranscriptDatas.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.TranscriptDatas.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<TranscriptData, CreateTranscriptDataCommand>().ReverseMap();
        CreateMap<TranscriptData, CreatedTranscriptDataResponse>().ReverseMap();
        CreateMap<TranscriptData, UpdateTranscriptDataCommand>().ReverseMap();
        CreateMap<TranscriptData, UpdatedTranscriptDataResponse>().ReverseMap();
        CreateMap<TranscriptData, DeleteTranscriptDataCommand>().ReverseMap();
        CreateMap<TranscriptData, DeletedTranscriptDataResponse>().ReverseMap();
        CreateMap<TranscriptData, GetByIdTranscriptDataResponse>().ReverseMap();
        CreateMap<TranscriptData, GetListTranscriptDataListItemDto>().ReverseMap();
        CreateMap<IPaginate<TranscriptData>, GetListResponse<GetListTranscriptDataListItemDto>>().ReverseMap();
    }
}