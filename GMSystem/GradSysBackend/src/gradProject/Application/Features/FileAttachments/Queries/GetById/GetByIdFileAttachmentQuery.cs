using Application.Features.FileAttachments.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.FileAttachments.Queries.GetById;

public class GetByIdFileAttachmentQuery : IRequest<GetByIdFileAttachmentResponse>
{
    public Guid Id { get; set; }

    public class GetByIdFileAttachmentQueryHandler : IRequestHandler<GetByIdFileAttachmentQuery, GetByIdFileAttachmentResponse>
    {
        private readonly IMapper _mapper;
        private readonly IFileAttachmentRepository _fileAttachmentRepository;
        private readonly FileAttachmentBusinessRules _fileAttachmentBusinessRules;

        public GetByIdFileAttachmentQueryHandler(IMapper mapper, IFileAttachmentRepository fileAttachmentRepository, FileAttachmentBusinessRules fileAttachmentBusinessRules)
        {
            _mapper = mapper;
            _fileAttachmentRepository = fileAttachmentRepository;
            _fileAttachmentBusinessRules = fileAttachmentBusinessRules;
        }

        public async Task<GetByIdFileAttachmentResponse> Handle(GetByIdFileAttachmentQuery request, CancellationToken cancellationToken)
        {
            FileAttachment? fileAttachment = await _fileAttachmentRepository.GetAsync(predicate: fa => fa.Id == request.Id, cancellationToken: cancellationToken);
            await _fileAttachmentBusinessRules.FileAttachmentShouldExistWhenSelected(fileAttachment);

            GetByIdFileAttachmentResponse response = _mapper.Map<GetByIdFileAttachmentResponse>(fileAttachment);
            return response;
        }
    }
}