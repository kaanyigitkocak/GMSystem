using NArchitecture.Core.Application.Responses;

namespace Application.Features.Auth.Commands.SendEmailValidation;

public class SendEmailValidationResponse : IResponse
{
    public string Message { get; set; }
    public bool IsSuccess { get; set; } = true;
    public DateTime ExpireDate { get; set; }
} 