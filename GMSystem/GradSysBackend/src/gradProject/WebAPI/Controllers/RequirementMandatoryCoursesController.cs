using Application.Features.RequirementMandatoryCourses.Commands.Create;
using Application.Features.RequirementMandatoryCourses.Commands.Delete;
using Application.Features.RequirementMandatoryCourses.Commands.Update;
using Application.Features.RequirementMandatoryCourses.Queries.GetById;
using Application.Features.RequirementMandatoryCourses.Queries.GetList;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RequirementMandatoryCoursesController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CreateRequirementMandatoryCourseCommand createRequirementMandatoryCourseCommand)
    {
        CreatedRequirementMandatoryCourseResponse response = await Mediator.Send(createRequirementMandatoryCourseCommand);

        return Created(uri: "", response);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateRequirementMandatoryCourseCommand updateRequirementMandatoryCourseCommand)
    {
        UpdatedRequirementMandatoryCourseResponse response = await Mediator.Send(updateRequirementMandatoryCourseCommand);

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        DeletedRequirementMandatoryCourseResponse response = await Mediator.Send(new DeleteRequirementMandatoryCourseCommand { Id = id });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdRequirementMandatoryCourseResponse response = await Mediator.Send(new GetByIdRequirementMandatoryCourseQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListRequirementMandatoryCourseQuery getListRequirementMandatoryCourseQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListRequirementMandatoryCourseListItemDto> response = await Mediator.Send(getListRequirementMandatoryCourseQuery);
        return Ok(response);
    }
}