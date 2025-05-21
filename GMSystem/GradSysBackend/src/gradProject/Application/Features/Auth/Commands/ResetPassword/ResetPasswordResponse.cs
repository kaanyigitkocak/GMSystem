using NArchitecture.Core.Application.Responses;

namespace Application.Features.Auth.Commands.ResetPassword;

public class ResetPasswordResponse : IResponse
{
    public string Message { get; set; }
    public bool IsSuccess { get; set; }
} 