using Application.Features.CourseTakens.Commands.Create;
using Application.Features.CourseTakens.Commands.Delete;
using Application.Features.CourseTakens.Commands.Update;
using Application.Features.CourseTakens.Queries.GetById;
using Application.Features.CourseTakens.Queries.GetList;
using Application.Features.CourseTakens.Queries.GetStudentCourseIds;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CourseTakensController : BaseController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CreateCourseTakenCommand createCourseTakenCommand)
    {
        CreatedCourseTakenResponse response = await Mediator.Send(createCourseTakenCommand);

        return Created(uri: "", response);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateCourseTakenCommand updateCourseTakenCommand)
    {
        UpdatedCourseTakenResponse response = await Mediator.Send(updateCourseTakenCommand);

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        DeletedCourseTakenResponse response = await Mediator.Send(new DeleteCourseTakenCommand { Id = id });

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdCourseTakenResponse response = await Mediator.Send(new GetByIdCourseTakenQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListCourseTakenQuery getListCourseTakenQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListCourseTakenListItemDto> response = await Mediator.Send(getListCourseTakenQuery);
        return Ok(response);
    }

    [HttpGet("by-student/{studentUserId}")]
    public async Task<IActionResult> GetByStudentId([FromRoute] Guid studentUserId, [FromQuery] PageRequest pageRequest)
    {
        GetListCourseTakenQuery getListCourseTakenQuery = new() 
        { 
            PageRequest = pageRequest,
            StudentUserId = studentUserId 
        };
        GetListResponse<GetListCourseTakenListItemDto> response = await Mediator.Send(getListCourseTakenQuery);
        return Ok(response);
    }

    [HttpGet("student-course-ids")]
    public async Task<IActionResult> GetStudentCourseIds()
    {
        GetStudentCourseIdsQuery query = new();
        GetStudentCourseIdsResponse response = await Mediator.Send(query);
        return Ok(response);
    }
}