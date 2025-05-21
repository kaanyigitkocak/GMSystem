using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Security.Enums;
using NArchitecture.Core.Security.JWT;
using System.Collections.Generic;
using Domain.Entities;

namespace Application.Features.Auth.Commands.Login;

public class LoggedResponse : IResponse
{
    public AccessToken? AccessToken { get; set; }
    public Domain.Entities.RefreshToken? RefreshToken { get; set; }
    public AuthenticatorType? RequiredAuthenticatorType { get; set; }
    public string? UserRole { get; set; }

    public LoggedHttpResponse ToHttpResponse()
    {
        return new() 
        { 
            AccessToken = AccessToken, 
            RequiredAuthenticatorType = RequiredAuthenticatorType,
            UserRole = UserRole
        };
    }

    public class LoggedHttpResponse
    {
        public AccessToken? AccessToken { get; set; }
        public AuthenticatorType? RequiredAuthenticatorType { get; set; }
        public string? UserRole { get; set; }
    }
}
