using NArchitecture.Core.Application.Dtos;

namespace Application.Features.MailLogs.Queries.GetList;

public class GetListMailLogListItemDto : IDto
{
    public Guid Id { get; set; }
    public DateTime SentDate { get; set; }
    public string From { get; set; }
    public string To { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public bool IsBodyHtml { get; set; }
    public bool IsSentSuccessfully { get; set; }
    public string? ErrorMessage { get; set; }
}