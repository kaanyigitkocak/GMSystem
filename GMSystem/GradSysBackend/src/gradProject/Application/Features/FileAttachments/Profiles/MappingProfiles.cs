using Application.Features.FileAttachments.Commands.Create;
using Application.Features.FileAttachments.Commands.Delete;
using Application.Features.FileAttachments.Commands.Update;
using Application.Features.FileAttachments.Queries.GetById;
using Application.Features.FileAttachments.Queries.GetList;
using AutoMapper;
using NArchitecture.Core.Application.Responses;
using Domain.Entities;
using NArchitecture.Core.Persistence.Paging;

namespace Application.Features.FileAttachments.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<FileAttachment, CreateFileAttachmentCommand>().ReverseMap();
        CreateMap<FileAttachment, CreatedFileAttachmentResponse>().ReverseMap();
        CreateMap<FileAttachment, UpdateFileAttachmentCommand>().ReverseMap();
        CreateMap<FileAttachment, UpdatedFileAttachmentResponse>().ReverseMap();
        CreateMap<FileAttachment, DeleteFileAttachmentCommand>().ReverseMap();
        CreateMap<FileAttachment, DeletedFileAttachmentResponse>().ReverseMap();
        CreateMap<FileAttachment, GetByIdFileAttachmentResponse>().ReverseMap();
        CreateMap<FileAttachment, GetListFileAttachmentListItemDto>().ReverseMap();
        CreateMap<IPaginate<FileAttachment>, GetListResponse<GetListFileAttachmentListItemDto>>().ReverseMap();
    }
}