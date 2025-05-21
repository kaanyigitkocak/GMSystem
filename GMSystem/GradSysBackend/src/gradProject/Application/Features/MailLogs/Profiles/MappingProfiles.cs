
using Application.Features.MailLogs.Queries.GetById;
using Application.Features.MailLogs.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.MailLogs.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {

        CreateMap<MailLog, GetByIdMailLogResponse>().ReverseMap();
        CreateMap<MailLog, GetListMailLogListItemDto>().ReverseMap();
        CreateMap<IPaginate<MailLog>, GetListResponse<GetListMailLogListItemDto>>().ReverseMap();
    }
}