using Application.Features.Auth.Commands.EnableEmailAuthenticator;
using Application.Features.Auth.Commands.EnableOtpAuthenticator;
using Application.Features.Auth.Commands.Login;
using Application.Features.Auth.Commands.RefreshToken;
using Application.Features.Auth.Commands.Register;
using Application.Features.Auth.Commands.RevokeToken;
using Application.Features.Auth.Commands.VerifyEmailAuthenticator;
using Application.Features.Auth.Commands.VerifyOtpAuthenticator;
using Application.Features.Auth.Commands.SendEmailValidation;
using Application.Features.Auth.Commands.SendPasswordResetCode;
using Application.Features.Auth.Commands.VerifyCode;
using Application.Features.Auth.Commands.ResetPassword;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : BaseController
{
    private readonly WebApiConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        const string configurationSection = "WebAPIConfiguration";
        _configuration =
            configuration.GetSection(configurationSection).Get<WebApiConfiguration>()
            ?? throw new NullReferenceException($"\"{configurationSection}\" section cannot found in configuration.");
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] Application.Features.Auth.Commands.Login.UserForLoginDto userForLoginDto)
    {
        LoginCommand loginCommand = new() { UserForLoginDto = userForLoginDto, IpAddress = getIpAddress() };
        LoggedResponse result = await Mediator.Send(loginCommand);

        if (result.RefreshToken is not null)
            setRefreshTokenToCookie(result.RefreshToken);

        return Ok(result.ToHttpResponse());
    }

    public class StudentRegisterRequest
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Password { get; set; } = string.Empty;
        
        [Required]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        public string LastName { get; set; } = string.Empty;
        
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;
        
        [Required]
        public string StudentNumber { get; set; } = string.Empty;
        
        [Required]
        public Guid DepartmentId { get; set; }
        
        [Required]
        public Guid FacultyId { get; set; }
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] StudentRegisterRequest request)
    {
        // DTO'ya dönüştür
        var userForRegisterDto = new Application.Features.Auth.Commands.Register.UserForRegisterDto
        {
            Email = request.Email,
            Password = request.Password,
            FirstName = request.FirstName,
            LastName = request.LastName,
            PhoneNumber = request.PhoneNumber,
            StudentNumber = request.StudentNumber,
            DepartmentId = request.DepartmentId,
            FacultyId = request.FacultyId
        };
        
        RegisterCommand registerCommand = new() { UserForRegisterDto = userForRegisterDto, IpAddress = getIpAddress() };
        RegisteredResponse result = await Mediator.Send(registerCommand);
        setRefreshTokenToCookie(result.RefreshToken);
        return Created(uri: "", result.AccessToken);
    }

    [HttpGet("RefreshToken")]
    public async Task<IActionResult> RefreshToken()
    {
        RefreshTokenCommand refreshTokenCommand =
            new() { RefreshToken = getRefreshTokenFromCookies(), IpAddress = getIpAddress() };
        RefreshedTokensResponse result = await Mediator.Send(refreshTokenCommand);
        setRefreshTokenToCookie(result.RefreshToken);
        return Created(uri: "", result.AccessToken);
    }

    [HttpPut("RevokeToken")]
    public async Task<IActionResult> RevokeToken([FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)] string? refreshToken)
    {
        RevokeTokenCommand revokeTokenCommand =
            new() { Token = refreshToken ?? getRefreshTokenFromCookies(), IpAddress = getIpAddress() };
        RevokedTokenResponse result = await Mediator.Send(revokeTokenCommand);
        return Ok(result);
    }
    //[HttpGet("EnableEmailAuthenticator")]
    //public async Task<IActionResult> EnableEmailAuthenticator()
    //{
    //    EnableEmailAuthenticatorCommand enableEmailAuthenticatorCommand =
    //        new()
    //        {
    //            UserId = getUserIdFromRequest(),
    //            VerifyEmailUrlPrefix = $"{_configuration.ApiDomain}/Auth/VerifyEmailAuthenticator"
    //        };
    //    await Mediator.Send(enableEmailAuthenticatorCommand);

    //    return Ok();
    //}

    //[HttpGet("EnableOtpAuthenticator")]
    //public async Task<IActionResult> EnableOtpAuthenticator()
    //{
    //    EnableOtpAuthenticatorCommand enableOtpAuthenticatorCommand = new() { UserId = getUserIdFromRequest() };
    //    EnabledOtpAuthenticatorResponse result = await Mediator.Send(enableOtpAuthenticatorCommand);

    //    return Ok(result);
    //}

    //[HttpGet("VerifyEmailAuthenticator")]
    //public async Task<IActionResult> VerifyEmailAuthenticator(
    //    [FromQuery] VerifyEmailAuthenticatorCommand verifyEmailAuthenticatorCommand
    //)
    //{
    //    await Mediator.Send(verifyEmailAuthenticatorCommand);
    //    return Ok();
    //}

    //[HttpPost("VerifyOtpAuthenticator")]
    //public async Task<IActionResult> VerifyOtpAuthenticator([FromBody] string authenticatorCode)
    //{
    //    VerifyOtpAuthenticatorCommand verifyEmailAuthenticatorCommand =
    //        new() { UserId = getUserIdFromRequest(), ActivationCode = authenticatorCode };

    //    await Mediator.Send(verifyEmailAuthenticatorCommand);
    //    return Ok();
    //}
    [HttpPost("send-email-validation")]
    public async Task<IActionResult> SendEmailValidation([FromBody] SendEmailValidationCommand command)
    {
        var response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("send-password-reset")]
    public async Task<IActionResult> SendPasswordReset([FromBody] SendPasswordResetCodeCommand command)
    {
        var response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("verify-code")]
    public async Task<IActionResult> VerifyCode([FromBody] VerifyCodeCommand command)
    {
        var response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command)
    {
        var response = await Mediator.Send(command);
        return Ok(response);
    }

    private string getRefreshTokenFromCookies()
    {
        return Request.Cookies["refreshToken"] ?? throw new ArgumentException("Refresh token is not found in request cookies.");
    }

    private void setRefreshTokenToCookie(RefreshToken refreshToken)
    {
        CookieOptions cookieOptions = new() { HttpOnly = true, Expires = DateTime.UtcNow.AddDays(7) };
        Response.Cookies.Append(key: "refreshToken", refreshToken.Token, cookieOptions);
    }
}
