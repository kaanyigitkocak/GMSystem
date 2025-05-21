using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;

namespace Application.Features.FileAttachments.Queries.GetList;

public class GetListFileAttachmentQuery : IRequest<GetListResponse<GetListFileAttachmentListItemDto>>
{
    public PageRequest PageRequest { get; set; }

    public class GetListFileAttachmentQueryHandler : IRequestHandler<GetListFileAttachmentQuery, GetListResponse<GetListFileAttachmentListItemDto>>
    {
        private readonly IFileAttachmentRepository _fileAttachmentRepository;
        private readonly IMapper _mapper;

        public GetListFileAttachmentQueryHandler(IFileAttachmentRepository fileAttachmentRepository, IMapper mapper)
        {
            _fileAttachmentRepository = fileAttachmentRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListFileAttachmentListItemDto>> Handle(GetListFileAttachmentQuery request, CancellationToken cancellationToken)
        {
            IPaginate<FileAttachment> fileAttachments = await _fileAttachmentRepository.GetListAsync(
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize, 
                cancellationToken: cancellationToken
            );

            GetListResponse<GetListFileAttachmentListItemDto> response = _mapper.Map<GetListResponse<GetListFileAttachmentListItemDto>>(fileAttachments);
            return response;
        }
    }
}