using Application.Features.Notifications.Commands.Create;
using Application.Features.Notifications.Commands.Delete;
using Application.Features.Notifications.Commands.Update;
using Application.Features.Notifications.Queries.GetById;
using Application.Features.Notifications.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.Notifications.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Notification, CreateNotificationCommand>().ReverseMap();
        CreateMap<Notification, CreatedNotificationResponse>().ReverseMap();
        CreateMap<Notification, UpdateNotificationCommand>().ReverseMap();
        CreateMap<Notification, UpdatedNotificationResponse>().ReverseMap();
        CreateMap<Notification, DeleteNotificationCommand>().ReverseMap();
        CreateMap<Notification, DeletedNotificationResponse>().ReverseMap();
        CreateMap<Notification, GetByIdNotificationResponse>().ReverseMap();
        CreateMap<Notification, GetListNotificationListItemDto>()
            .ForMember(dest => dest.RecipientUserName, opt => opt.MapFrom(src => src.RecipientUser.UserName))
            .ForMember(dest => dest.RecipientUserFullName, opt => opt.MapFrom(src => src.RecipientUser.FirstName + " " + src.RecipientUser.LastName))
            .ReverseMap();
        CreateMap<IPaginate<Notification>, GetListResponse<GetListNotificationListItemDto>>().ReverseMap();
    }
}