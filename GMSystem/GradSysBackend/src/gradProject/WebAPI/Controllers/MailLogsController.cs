using Application.Features.MailLogs.Queries.GetById;
using Application.Features.MailLogs.Queries.GetList;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;
using Application.SubServices.MailService;
using Application.Constants;
using System;
using System.Threading.Tasks;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MailLogsController : BaseController
{
    private readonly IMailService _mailService;

    public MailLogsController(IMailService mailService)
    {
        _mailService = mailService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdMailLogResponse response = await Mediator.Send(new GetByIdMailLogQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListMailLogQuery getListMailLogQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListMailLogListItemDto> response = await Mediator.Send(getListMailLogQuery);
        return Ok(response);
    }

    [HttpPost("test-mail")]
    public async Task<IActionResult> TestMail([FromBody] TestMailRequest request)
    {
        try
        {
            // E-posta adresinin boş olup olmadığını kontrol et
            if (string.IsNullOrWhiteSpace(request?.EmailAddress))
            {
                return BadRequest(new { Success = false, Message = "E-posta adresi boş olamaz." });
            }

            var mailDto = new MailDto
            {
                To = request.EmailAddress,
                Subject = "E-posta Merhabalar Mesajı",
                Body = $@"
                <div style='font-family: {MailTemplates.Settings.FONT_FAMILY}; font-size: {MailTemplates.Settings.FONT_SIZE};'>
                    <h2>E-posta </h2>
                    <p>Bu bir  e-postasıdır.</p>
                    <p>E-posta adresinizi  etmek için gönderilmiştir.</p>
                    <p>Slema zamanı: {DateTime.UtcNow}</p>
                </div>",
                IsBodyHtml = MailTemplates.Settings.USE_HTML
            };

            await _mailService.SendMailAsync(mailDto);
            
            return Ok(new { Success = true, Message = "Test e-postası başarıyla gönderildi." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Success = false, Message = $"E-posta gönderimi başarısız: {ex.Message}" });
        }
    }
}

public class TestMailRequest
{
    public string EmailAddress { get; set; } = string.Empty;
}