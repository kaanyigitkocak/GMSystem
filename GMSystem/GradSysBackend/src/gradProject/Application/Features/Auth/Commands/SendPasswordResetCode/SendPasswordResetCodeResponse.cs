using NArchitecture.Core.Application.Responses;

namespace Application.Features.Auth.Commands.SendPasswordResetCode;

public class SendPasswordResetCodeResponse : IResponse
{
    public string Message { get; set; }
    public bool IsSuccess { get; set; } = true;
    public DateTime ExpireDate { get; set; }
} 