using Application.Features.FileAttachments.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.FileAttachments.Commands.Create;

public class CreateFileAttachmentCommand : IRequest<CreatedFileAttachmentResponse>
{
    public string FileName { get; set; }
    public string FilePath { get; set; }
    public StorageType StorageType { get; set; }
    public long FileSize { get; set; }
    public FileType FileType { get; set; }
    public string MimeType { get; set; }
    public DateTime UploadDate { get; set; }
    public Guid UploaderUserId { get; set; }
    public Guid? StudentUserId { get; set; }
    public Guid? ProcessId { get; set; }

    public class CreateFileAttachmentCommandHandler : IRequestHandler<CreateFileAttachmentCommand, CreatedFileAttachmentResponse>
    {
        private readonly IMapper _mapper;
        private readonly IFileAttachmentRepository _fileAttachmentRepository;
        private readonly FileAttachmentBusinessRules _fileAttachmentBusinessRules;

        public CreateFileAttachmentCommandHandler(IMapper mapper, IFileAttachmentRepository fileAttachmentRepository,
                                         FileAttachmentBusinessRules fileAttachmentBusinessRules)
        {
            _mapper = mapper;
            _fileAttachmentRepository = fileAttachmentRepository;
            _fileAttachmentBusinessRules = fileAttachmentBusinessRules;
        }

        public async Task<CreatedFileAttachmentResponse> Handle(CreateFileAttachmentCommand request, CancellationToken cancellationToken)
        {
            FileAttachment fileAttachment = _mapper.Map<FileAttachment>(request);

            await _fileAttachmentRepository.AddAsync(fileAttachment);

            CreatedFileAttachmentResponse response = _mapper.Map<CreatedFileAttachmentResponse>(fileAttachment);
            return response;
        }
    }
}