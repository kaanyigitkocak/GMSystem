
using Application.Features.GraduationProcesses.Queries.GetById;
using Application.Features.GraduationProcesses.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.GraduationProcesses.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {

        CreateMap<GraduationProcess, GetByIdGraduationProcessResponse>().ReverseMap();
        CreateMap<GraduationProcess, GetListGraduationProcessListItemDto>().ReverseMap();
        CreateMap<IPaginate<GraduationProcess>, GetListResponse<GetListGraduationProcessListItemDto>>().ReverseMap();
    }
}