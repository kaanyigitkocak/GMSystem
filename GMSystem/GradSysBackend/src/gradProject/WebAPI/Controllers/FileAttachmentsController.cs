using Application.Features.FileAttachments.Commands.Create;
using Application.Features.FileAttachments.Commands.Delete;
using Application.Features.FileAttachments.Commands.Update;
using Application.Features.FileAttachments.Queries.GetById;
using Application.Features.FileAttachments.Queries.GetList;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FileAttachmentsController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CreateFileAttachmentCommand createFileAttachmentCommand)
    {
        CreatedFileAttachmentResponse response = await Mediator.Send(createFileAttachmentCommand);

        return Created(uri: "", response);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateFileAttachmentCommand updateFileAttachmentCommand)
    {
        UpdatedFileAttachmentResponse response = await Mediator.Send(updateFileAttachmentCommand);

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        DeletedFileAttachmentResponse response = await Mediator.Send(new DeleteFileAttachmentCommand { Id = id });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdFileAttachmentResponse response = await Mediator.Send(new GetByIdFileAttachmentQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListFileAttachmentQuery getListFileAttachmentQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListFileAttachmentListItemDto> response = await Mediator.Send(getListFileAttachmentQuery);
        return Ok(response);
    }
}