using Application.Features.TranscriptDatas.Commands.Create;
using Application.Features.TranscriptDatas.Commands.Delete;
using Application.Features.TranscriptDatas.Commands.Update;
using Application.Features.TranscriptDatas.Queries.GetById;
using Application.Features.TranscriptDatas.Queries.GetList;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TranscriptDatasController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CreateTranscriptDataCommand createTranscriptDataCommand)
    {
        CreatedTranscriptDataResponse response = await Mediator.Send(createTranscriptDataCommand);

        return Created(uri: "", response);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateTranscriptDataCommand updateTranscriptDataCommand)
    {
        UpdatedTranscriptDataResponse response = await Mediator.Send(updateTranscriptDataCommand);

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        DeletedTranscriptDataResponse response = await Mediator.Send(new DeleteTranscriptDataCommand { Id = id });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdTranscriptDataResponse response = await Mediator.Send(new GetByIdTranscriptDataQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListTranscriptDataQuery getListTranscriptDataQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListTranscriptDataListItemDto> response = await Mediator.Send(getListTranscriptDataQuery);
        return Ok(response);
    }
}