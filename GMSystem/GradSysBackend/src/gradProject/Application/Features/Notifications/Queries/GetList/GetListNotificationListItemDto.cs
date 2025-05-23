using NArchitecture.Core.Application.Dtos;

namespace Application.Features.Notifications.Queries.GetList;

public class GetListNotificationListItemDto : IDto
{
    public Guid Id { get; set; }
    public Guid RecipientUserId { get; set; }
    public string RecipientUserName { get; set; }
    public string RecipientUserFullName { get; set; }
    public string Title { get; set; }
    public string Message { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreationDate { get; set; }
    public Guid? RelatedProcessId { get; set; }
    public Guid? RelatedDocumentId { get; set; }
}