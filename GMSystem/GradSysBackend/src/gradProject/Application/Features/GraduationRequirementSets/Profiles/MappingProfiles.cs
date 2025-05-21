using Application.Features.GraduationRequirementSets.Commands.Create;
using Application.Features.GraduationRequirementSets.Commands.Delete;
using Application.Features.GraduationRequirementSets.Commands.Update;
using Application.Features.GraduationRequirementSets.Queries.GetById;
using Application.Features.GraduationRequirementSets.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.GraduationRequirementSets.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<GraduationRequirementSet, CreateGraduationRequirementSetCommand>().ReverseMap();
        CreateMap<GraduationRequirementSet, CreatedGraduationRequirementSetResponse>().ReverseMap();
        CreateMap<GraduationRequirementSet, UpdateGraduationRequirementSetCommand>().ReverseMap();
        CreateMap<GraduationRequirementSet, UpdatedGraduationRequirementSetResponse>().ReverseMap();
        CreateMap<GraduationRequirementSet, DeleteGraduationRequirementSetCommand>().ReverseMap();
        CreateMap<GraduationRequirementSet, DeletedGraduationRequirementSetResponse>().ReverseMap();
        CreateMap<GraduationRequirementSet, GetByIdGraduationRequirementSetResponse>().ReverseMap();
        CreateMap<GraduationRequirementSet, GetListGraduationRequirementSetListItemDto>().ReverseMap();
        CreateMap<IPaginate<GraduationRequirementSet>, GetListResponse<GetListGraduationRequirementSetListItemDto>>().ReverseMap();
    }
}