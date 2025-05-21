using Application.Features.FileAttachments.Constants;
using Application.Features.FileAttachments.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.FileAttachments.Commands.Delete;

public class DeleteFileAttachmentCommand : IRequest<DeletedFileAttachmentResponse>
{
    public Guid Id { get; set; }

    public class DeleteFileAttachmentCommandHandler : IRequestHandler<DeleteFileAttachmentCommand, DeletedFileAttachmentResponse>
    {
        private readonly IMapper _mapper;
        private readonly IFileAttachmentRepository _fileAttachmentRepository;
        private readonly FileAttachmentBusinessRules _fileAttachmentBusinessRules;

        public DeleteFileAttachmentCommandHandler(IMapper mapper, IFileAttachmentRepository fileAttachmentRepository,
                                         FileAttachmentBusinessRules fileAttachmentBusinessRules)
        {
            _mapper = mapper;
            _fileAttachmentRepository = fileAttachmentRepository;
            _fileAttachmentBusinessRules = fileAttachmentBusinessRules;
        }

        public async Task<DeletedFileAttachmentResponse> Handle(DeleteFileAttachmentCommand request, CancellationToken cancellationToken)
        {
            FileAttachment? fileAttachment = await _fileAttachmentRepository.GetAsync(predicate: fa => fa.Id == request.Id, cancellationToken: cancellationToken);
            await _fileAttachmentBusinessRules.FileAttachmentShouldExistWhenSelected(fileAttachment);

            await _fileAttachmentRepository.DeleteAsync(fileAttachment!);

            DeletedFileAttachmentResponse response = _mapper.Map<DeletedFileAttachmentResponse>(fileAttachment);
            return response;
        }
    }
}