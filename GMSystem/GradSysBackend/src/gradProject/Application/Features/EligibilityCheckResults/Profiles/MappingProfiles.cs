using Application.Features.EligibilityCheckResults.Commands.Create;
using Application.Features.EligibilityCheckResults.Commands.Delete;
using Application.Features.EligibilityCheckResults.Commands.Update;
using Application.Features.EligibilityCheckResults.Queries.GetById;
using Application.Features.EligibilityCheckResults.Queries.GetList;
using Application.Features.EligibilityCheckResults.Queries.GetByStudentId;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.EligibilityCheckResults.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<EligibilityCheckResult, CreateEligibilityCheckResultCommand>().ReverseMap();
        CreateMap<EligibilityCheckResult, CreatedEligibilityCheckResultResponse>().ReverseMap();
        CreateMap<EligibilityCheckResult, UpdateEligibilityCheckResultCommand>().ReverseMap();
        CreateMap<EligibilityCheckResult, UpdatedEligibilityCheckResultResponse>().ReverseMap();
        CreateMap<EligibilityCheckResult, DeleteEligibilityCheckResultCommand>().ReverseMap();
        CreateMap<EligibilityCheckResult, DeletedEligibilityCheckResultResponse>().ReverseMap();
        CreateMap<EligibilityCheckResult, GetByIdEligibilityCheckResultResponse>().ReverseMap();
        CreateMap<EligibilityCheckResult, GetListEligibilityCheckResultListItemDto>().ReverseMap();
        CreateMap<IPaginate<EligibilityCheckResult>, GetListResponse<GetListEligibilityCheckResultListItemDto>>().ReverseMap();
        
        // GetByStudentId mappings
        CreateMap<EligibilityCheckResult, GetByStudentIdEligibilityCheckResultListItemDto>().ReverseMap();
        CreateMap<IPaginate<EligibilityCheckResult>, GetListResponse<GetByStudentIdEligibilityCheckResultListItemDto>>().ReverseMap();
    }
}