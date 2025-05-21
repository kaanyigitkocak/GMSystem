using Application.Features.RankingListEntries.Commands.Create;
using Application.Features.RankingListEntries.Commands.Delete;
using Application.Features.RankingListEntries.Commands.Update;
using Application.Features.RankingListEntries.Queries.GetById;
using Application.Features.RankingListEntries.Queries.GetList;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RankingListEntriesController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CreateRankingListEntryCommand createRankingListEntryCommand)
    {
        CreatedRankingListEntryResponse response = await Mediator.Send(createRankingListEntryCommand);

        return Created(uri: "", response);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateRankingListEntryCommand updateRankingListEntryCommand)
    {
        UpdatedRankingListEntryResponse response = await Mediator.Send(updateRankingListEntryCommand);

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        DeletedRankingListEntryResponse response = await Mediator.Send(new DeleteRankingListEntryCommand { Id = id });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdRankingListEntryResponse response = await Mediator.Send(new GetByIdRankingListEntryQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListRankingListEntryQuery getListRankingListEntryQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListRankingListEntryListItemDto> response = await Mediator.Send(getListRankingListEntryQuery);
        return Ok(response);
    }
}