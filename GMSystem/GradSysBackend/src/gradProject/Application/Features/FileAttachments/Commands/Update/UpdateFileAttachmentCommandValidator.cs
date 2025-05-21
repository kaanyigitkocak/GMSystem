using FluentValidation;

namespace Application.Features.FileAttachments.Commands.Update;

public class UpdateFileAttachmentCommandValidator : AbstractValidator<UpdateFileAttachmentCommand>
{
    public UpdateFileAttachmentCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
        RuleFor(c => c.FileName).NotEmpty();
        RuleFor(c => c.FilePath).NotEmpty();
        RuleFor(c => c.StorageType).NotEmpty();
        RuleFor(c => c.FileSize).NotEmpty();
        RuleFor(c => c.FileType).NotEmpty();
        RuleFor(c => c.MimeType).NotEmpty();
        RuleFor(c => c.UploadDate).NotEmpty();
        RuleFor(c => c.UploaderUserId).NotEmpty();
        RuleFor(c => c.StudentUserId).NotEmpty();
        RuleFor(c => c.ProcessId).NotEmpty();
    }
}