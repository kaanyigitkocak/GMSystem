using Application.Features.Faculties.Commands.Create;
using Application.Features.Faculties.Commands.Delete;
using Application.Features.Faculties.Commands.Update;
using Application.Features.Faculties.Queries.GetById;
using Application.Features.Faculties.Queries.GetList;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FacultiesController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CreateFacultyCommand createFacultyCommand)
    {
        CreatedFacultyResponse response = await Mediator.Send(createFacultyCommand);

        return Created(uri: "", response);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateFacultyCommand updateFacultyCommand)
    {
        UpdatedFacultyResponse response = await Mediator.Send(updateFacultyCommand);

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        DeletedFacultyResponse response = await Mediator.Send(new DeleteFacultyCommand { Id = id });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdFacultyResponse response = await Mediator.Send(new GetByIdFacultyQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListFacultyQuery getListFacultyQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListFacultyListItemDto> response = await Mediator.Send(getListFacultyQuery);
        return Ok(response);
    }
}