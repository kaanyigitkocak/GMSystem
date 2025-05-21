using Application.Features.RankingListCriterias.Commands.Create;
using Application.Features.RankingListCriterias.Commands.Delete;
using Application.Features.RankingListCriterias.Commands.Update;
using Application.Features.RankingListCriterias.Queries.GetById;
using Application.Features.RankingListCriterias.Queries.GetList;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RankingListCriteriasController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CreateRankingListCriteriaCommand createRankingListCriteriaCommand)
    {
        CreatedRankingListCriteriaResponse response = await Mediator.Send(createRankingListCriteriaCommand);

        return Created(uri: "", response);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateRankingListCriteriaCommand updateRankingListCriteriaCommand)
    {
        UpdatedRankingListCriteriaResponse response = await Mediator.Send(updateRankingListCriteriaCommand);

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        DeletedRankingListCriteriaResponse response = await Mediator.Send(new DeleteRankingListCriteriaCommand { Id = id });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdRankingListCriteriaResponse response = await Mediator.Send(new GetByIdRankingListCriteriaQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListRankingListCriteriaQuery getListRankingListCriteriaQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListRankingListCriteriaListItemDto> response = await Mediator.Send(getListRankingListCriteriaQuery);
        return Ok(response);
    }
}