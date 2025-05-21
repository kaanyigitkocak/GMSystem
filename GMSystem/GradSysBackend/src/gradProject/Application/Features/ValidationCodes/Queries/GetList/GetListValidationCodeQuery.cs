using Application.Features.ValidationCodes.Constants;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Pipelines.Authorization;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;
using static Application.Features.ValidationCodes.Constants.ValidationCodesOperationClaims;

namespace Application.Features.ValidationCodes.Queries.GetList;

public class GetListValidationCodeQuery : IRequest<GetListResponse<GetListValidationCodeListItemDto>>, ISecuredRequest
{
    public PageRequest PageRequest { get; set; }

    public string[] Roles => [Admin, Read];

    public class GetListValidationCodeQueryHandler : IRequestHandler<GetListValidationCodeQuery, GetListResponse<GetListValidationCodeListItemDto>>
    {
        private readonly IValidationCodeRepository _validationCodeRepository;
        private readonly IMapper _mapper;

        public GetListValidationCodeQueryHandler(IValidationCodeRepository validationCodeRepository, IMapper mapper)
        {
            _validationCodeRepository = validationCodeRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListValidationCodeListItemDto>> Handle(GetListValidationCodeQuery request, CancellationToken cancellationToken)
        {
            IPaginate<ValidationCode> validationCodes = await _validationCodeRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListValidationCodeListItemDto> response = _mapper.Map<GetListResponse<GetListValidationCodeListItemDto>>(validationCodes);
            return response;
        }
    }
}