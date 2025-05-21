using Application.Features.GraduationRequirementSets.Commands.Create;
using Application.Features.GraduationRequirementSets.Commands.Delete;
using Application.Features.GraduationRequirementSets.Commands.Update;
using Application.Features.GraduationRequirementSets.Queries.GetById;
using Application.Features.GraduationRequirementSets.Queries.GetList;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GraduationRequirementSetsController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CreateGraduationRequirementSetCommand createGraduationRequirementSetCommand)
    {
        CreatedGraduationRequirementSetResponse response = await Mediator.Send(createGraduationRequirementSetCommand);

        return Created(uri: "", response);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateGraduationRequirementSetCommand updateGraduationRequirementSetCommand)
    {
        UpdatedGraduationRequirementSetResponse response = await Mediator.Send(updateGraduationRequirementSetCommand);

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        DeletedGraduationRequirementSetResponse response = await Mediator.Send(new DeleteGraduationRequirementSetCommand { Id = id });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdGraduationRequirementSetResponse response = await Mediator.Send(new GetByIdGraduationRequirementSetQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListGraduationRequirementSetQuery getListGraduationRequirementSetQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListGraduationRequirementSetListItemDto> response = await Mediator.Send(getListGraduationRequirementSetQuery);
        return Ok(response);
    }
}