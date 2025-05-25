using Application.Features.EligibilityCheckResults.Commands.Create;
using Application.Features.EligibilityCheckResults.Commands.Delete;
using Application.Features.EligibilityCheckResults.Commands.Update;
using Application.Features.EligibilityCheckResults.Queries.GetById;
using Application.Features.EligibilityCheckResults.Queries.GetList;
using Application.Features.EligibilityCheckResults.Queries.GetByStudentId;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EligibilityCheckResultsController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CreateEligibilityCheckResultCommand createEligibilityCheckResultCommand)
    {
        CreatedEligibilityCheckResultResponse response = await Mediator.Send(createEligibilityCheckResultCommand);

        return Created(uri: "", response);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateEligibilityCheckResultCommand updateEligibilityCheckResultCommand)
    {
        UpdatedEligibilityCheckResultResponse response = await Mediator.Send(updateEligibilityCheckResultCommand);

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        DeletedEligibilityCheckResultResponse response = await Mediator.Send(new DeleteEligibilityCheckResultCommand { Id = id });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdEligibilityCheckResultResponse response = await Mediator.Send(new GetByIdEligibilityCheckResultQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListEligibilityCheckResultQuery getListEligibilityCheckResultQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListEligibilityCheckResultListItemDto> response = await Mediator.Send(getListEligibilityCheckResultQuery);
        return Ok(response);
    }

    [HttpGet("student/{studentUserId}")]
    public async Task<IActionResult> GetByStudentId([FromRoute] Guid studentUserId, [FromQuery] PageRequest pageRequest)
    {
        GetByStudentIdEligibilityCheckResultQuery getByStudentIdQuery = new() 
        { 
            StudentUserId = studentUserId,
            PageRequest = pageRequest 
        };
        GetListResponse<GetByStudentIdEligibilityCheckResultListItemDto> response = await Mediator.Send(getByStudentIdQuery);
        return Ok(response);
    }
}