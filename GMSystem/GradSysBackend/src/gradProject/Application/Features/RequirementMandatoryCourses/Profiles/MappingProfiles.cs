using Application.Features.RequirementMandatoryCourses.Commands.Create;
using Application.Features.RequirementMandatoryCourses.Commands.Delete;
using Application.Features.RequirementMandatoryCourses.Commands.Update;
using Application.Features.RequirementMandatoryCourses.Queries.GetById;
using Application.Features.RequirementMandatoryCourses.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.RequirementMandatoryCourses.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<RequirementMandatoryCourse, CreateRequirementMandatoryCourseCommand>().ReverseMap();
        CreateMap<RequirementMandatoryCourse, CreatedRequirementMandatoryCourseResponse>().ReverseMap();
        CreateMap<RequirementMandatoryCourse, UpdateRequirementMandatoryCourseCommand>().ReverseMap();
        CreateMap<RequirementMandatoryCourse, UpdatedRequirementMandatoryCourseResponse>().ReverseMap();
        CreateMap<RequirementMandatoryCourse, DeleteRequirementMandatoryCourseCommand>().ReverseMap();
        CreateMap<RequirementMandatoryCourse, DeletedRequirementMandatoryCourseResponse>().ReverseMap();
        CreateMap<RequirementMandatoryCourse, GetByIdRequirementMandatoryCourseResponse>().ReverseMap();
        CreateMap<RequirementMandatoryCourse, GetListRequirementMandatoryCourseListItemDto>().ReverseMap();
        CreateMap<IPaginate<RequirementMandatoryCourse>, GetListResponse<GetListRequirementMandatoryCourseListItemDto>>().ReverseMap();
    }
}