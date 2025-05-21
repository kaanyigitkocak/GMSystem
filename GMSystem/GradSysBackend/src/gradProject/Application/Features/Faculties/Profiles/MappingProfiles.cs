using Application.Features.Faculties.Commands.Create;
using Application.Features.Faculties.Commands.Delete;
using Application.Features.Faculties.Commands.Update;
using Application.Features.Faculties.Queries.GetById;
using Application.Features.Faculties.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.Faculties.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Faculty, CreateFacultyCommand>().ReverseMap();
        CreateMap<Faculty, CreatedFacultyResponse>().ReverseMap();
        CreateMap<Faculty, UpdateFacultyCommand>().ReverseMap();
        CreateMap<Faculty, UpdatedFacultyResponse>().ReverseMap();
        CreateMap<Faculty, DeleteFacultyCommand>().ReverseMap();
        CreateMap<Faculty, DeletedFacultyResponse>().ReverseMap();
        CreateMap<Faculty, GetByIdFacultyResponse>().ReverseMap();
        CreateMap<Faculty, GetListFacultyListItemDto>().ReverseMap();
        CreateMap<IPaginate<Faculty>, GetListResponse<GetListFacultyListItemDto>>().ReverseMap();
    }
}