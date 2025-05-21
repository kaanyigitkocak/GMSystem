using Application.Features.CourseTakens.Commands.Create;
using Application.Features.CourseTakens.Commands.Delete;
using Application.Features.CourseTakens.Commands.Update;
using Application.Features.CourseTakens.Queries.GetById;
using Application.Features.CourseTakens.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.CourseTakens.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CourseTaken, CreateCourseTakenCommand>().ReverseMap();
        CreateMap<CourseTaken, CreatedCourseTakenResponse>().ReverseMap();
        CreateMap<CourseTaken, UpdateCourseTakenCommand>().ReverseMap();
        CreateMap<CourseTaken, UpdatedCourseTakenResponse>().ReverseMap();
        CreateMap<CourseTaken, DeleteCourseTakenCommand>().ReverseMap();
        CreateMap<CourseTaken, DeletedCourseTakenResponse>().ReverseMap();
        CreateMap<CourseTaken, GetByIdCourseTakenResponse>().ReverseMap();
        CreateMap<CourseTaken, GetListCourseTakenListItemDto>().ReverseMap();
        CreateMap<IPaginate<CourseTaken>, GetListResponse<GetListCourseTakenListItemDto>>().ReverseMap();
    }
}