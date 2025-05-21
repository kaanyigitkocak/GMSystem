using NArchitecture.Core.Persistence.Repositories;

namespace Domain.Entities;

public class Notification : Entity<Guid> // notificationId olacak primary key
{
    // notificationId (Guid, Primary Key) -> Id
    public Guid RecipientUserId { get; set; }
    public string Title { get; set; }
    public string Message { get; set; }
    public bool IsRead { get; set; } = false;
    public DateTime CreationDate { get; set; } // Timestamp
    public Guid? RelatedProcessId { get; set; }

    // Navigation Properties
    public virtual User RecipientUser { get; set; }
    public virtual GraduationProcess? RelatedProcess { get; set; }

    public Notification() { }

    public Notification(Guid id, Guid recipientUserId, string title, string message, DateTime creationDate, bool isRead = false, Guid? relatedProcessId = null)
    {
        Id = id;
        RecipientUserId = recipientUserId;
        Title = title;
        Message = message;
        IsRead = isRead;
        CreationDate = creationDate;
        RelatedProcessId = relatedProcessId;

    }
} 