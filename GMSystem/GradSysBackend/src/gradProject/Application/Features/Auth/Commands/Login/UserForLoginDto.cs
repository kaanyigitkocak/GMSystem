using NArchitecture.Core.Application.Dtos;

namespace Application.Features.Auth.Commands.Login;

public class UserForLoginDto : IDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? AuthenticatorCode { get; set; }
} 