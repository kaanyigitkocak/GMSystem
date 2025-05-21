using FluentValidation;

namespace Application.Features.Notifications.Commands.Create;

public class CreateNotificationCommandValidator : AbstractValidator<CreateNotificationCommand>
{
    public CreateNotificationCommandValidator()
    {
        RuleFor(c => c.RecipientUserId).NotEmpty();
        RuleFor(c => c.Title).NotEmpty();
        RuleFor(c => c.Message).NotEmpty();
        RuleFor(c => c.IsRead).NotEmpty();
        RuleFor(c => c.CreationDate).NotEmpty();
        RuleFor(c => c.RelatedProcessId).NotEmpty();
        RuleFor(c => c.RelatedDocumentId).NotEmpty();
    }
}