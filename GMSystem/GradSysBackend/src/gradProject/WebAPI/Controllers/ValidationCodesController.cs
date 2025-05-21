
using Application.Features.ValidationCodes.Queries.GetById;
using Application.Features.ValidationCodes.Queries.GetList;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ValidationCodesController : BaseController
{
  

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdValidationCodeResponse response = await Mediator.Send(new GetByIdValidationCodeQuery { Id = id });
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListValidationCodeQuery getListValidationCodeQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListValidationCodeListItemDto> response = await Mediator.Send(getListValidationCodeQuery);
        return Ok(response);
    }
}