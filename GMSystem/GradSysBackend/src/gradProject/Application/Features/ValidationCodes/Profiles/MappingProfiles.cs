
using Application.Features.ValidationCodes.Queries.GetById;
using Application.Features.ValidationCodes.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.ValidationCodes.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {

        CreateMap<ValidationCode, GetByIdValidationCodeResponse>().ReverseMap();
        CreateMap<ValidationCode, GetListValidationCodeListItemDto>().ReverseMap();
        CreateMap<IPaginate<ValidationCode>, GetListResponse<GetListValidationCodeListItemDto>>().ReverseMap();
    }
}