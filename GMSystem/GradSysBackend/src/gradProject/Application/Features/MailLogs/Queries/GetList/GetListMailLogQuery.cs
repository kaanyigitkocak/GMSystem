using Application.Features.MailLogs.Constants;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Pipelines.Authorization;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;
using static Application.Features.MailLogs.Constants.MailLogsOperationClaims;

namespace Application.Features.MailLogs.Queries.GetList;

public class GetListMailLogQuery : IRequest<GetListResponse<GetListMailLogListItemDto>>, ISecuredRequest
{
    public PageRequest PageRequest { get; set; }

    public string[] Roles => [Admin, Read];

    public class GetListMailLogQueryHandler : IRequestHandler<GetListMailLogQuery, GetListResponse<GetListMailLogListItemDto>>
    {
        private readonly IMailLogRepository _mailLogRepository;
        private readonly IMapper _mapper;

        public GetListMailLogQueryHandler(IMailLogRepository mailLogRepository, IMapper mapper)
        {
            _mailLogRepository = mailLogRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListMailLogListItemDto>> Handle(GetListMailLogQuery request, CancellationToken cancellationToken)
        {
            IPaginate<MailLog> mailLogs = await _mailLogRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListMailLogListItemDto> response = _mapper.Map<GetListResponse<GetListMailLogListItemDto>>(mailLogs);
            return response;
        }
    }
}