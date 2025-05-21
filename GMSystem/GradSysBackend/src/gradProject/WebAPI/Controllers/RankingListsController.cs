using Application.Features.RankingLists.Commands.Create;
using Application.Features.RankingLists.Commands.Delete;
using Application.Features.RankingLists.Commands.Update;
using Application.Features.RankingLists.Queries.GetById;
using Application.Features.RankingLists.Queries.GetList;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RankingListsController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CreateRankingListCommand createRankingListCommand)
    {
        CreatedRankingListResponse response = await Mediator.Send(createRankingListCommand);

        return Created(uri: "", response);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateRankingListCommand updateRankingListCommand)
    {
        UpdatedRankingListResponse response = await Mediator.Send(updateRankingListCommand);

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        DeletedRankingListResponse response = await Mediator.Send(new DeleteRankingListCommand { Id = id });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdRankingListResponse response = await Mediator.Send(new GetByIdRankingListQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListRankingListQuery getListRankingListQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListRankingListListItemDto> response = await Mediator.Send(getListRankingListQuery);
        return Ok(response);
    }
}