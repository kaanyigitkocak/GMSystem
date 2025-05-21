using NArchitecture.Core.Persistence.Repositories;

namespace Domain.Entities;

public class MailLog : Entity<Guid>
    {
        public DateTime SentDate { get; set; }
        public string From { get; set; } = string.Empty;
        public string To { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public bool IsBodyHtml { get; set; }
        public bool IsSentSuccessfully { get; set; }
        public string? ErrorMessage { get; set; }
    }