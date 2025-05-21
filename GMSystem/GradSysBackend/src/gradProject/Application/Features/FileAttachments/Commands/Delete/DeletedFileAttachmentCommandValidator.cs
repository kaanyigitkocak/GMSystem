using FluentValidation;

namespace Application.Features.FileAttachments.Commands.Delete;

public class DeleteFileAttachmentCommandValidator : AbstractValidator<DeleteFileAttachmentCommand>
{
    public DeleteFileAttachmentCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
    }
}