using Application.Features.ValidationCodes.Constants;
using Application.Features.ValidationCodes.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Pipelines.Authorization;
using MediatR;
using static Application.Features.ValidationCodes.Constants.ValidationCodesOperationClaims;

namespace Application.Features.ValidationCodes.Queries.GetById;

public class GetByIdValidationCodeQuery : IRequest<GetByIdValidationCodeResponse>, ISecuredRequest
{
    public Guid Id { get; set; }

    public string[] Roles => [Admin, Read];

    public class GetByIdValidationCodeQueryHandler : IRequestHandler<GetByIdValidationCodeQuery, GetByIdValidationCodeResponse>
    {
        private readonly IMapper _mapper;
        private readonly IValidationCodeRepository _validationCodeRepository;
        private readonly ValidationCodeBusinessRules _validationCodeBusinessRules;

        public GetByIdValidationCodeQueryHandler(IMapper mapper, IValidationCodeRepository validationCodeRepository, ValidationCodeBusinessRules validationCodeBusinessRules)
        {
            _mapper = mapper;
            _validationCodeRepository = validationCodeRepository;
            _validationCodeBusinessRules = validationCodeBusinessRules;
        }

        public async Task<GetByIdValidationCodeResponse> Handle(GetByIdValidationCodeQuery request, CancellationToken cancellationToken)
        {
            ValidationCode? validationCode = await _validationCodeRepository.GetAsync(predicate: vc => vc.Id == request.Id, cancellationToken: cancellationToken);
            await _validationCodeBusinessRules.ValidationCodeShouldExistWhenSelected(validationCode);

            GetByIdValidationCodeResponse response = _mapper.Map<GetByIdValidationCodeResponse>(validationCode);
            return response;
        }
    }
}