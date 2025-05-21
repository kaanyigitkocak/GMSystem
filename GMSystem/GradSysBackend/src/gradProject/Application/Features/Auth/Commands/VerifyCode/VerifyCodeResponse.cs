using NArchitecture.Core.Application.Responses;

namespace Application.Features.Auth.Commands.VerifyCode;

public class VerifyCodeResponse : IResponse
{
    public bool IsVerified { get; set; }
    public bool IsSuccess { get; set; } = true;
    public string Message { get; set; }
} 