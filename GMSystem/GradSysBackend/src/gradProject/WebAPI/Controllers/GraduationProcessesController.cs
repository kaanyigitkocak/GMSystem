using Application.Features.GraduationProcesses.Commands.PerformSystemEligibilityChecks;
using Application.Features.GraduationProcesses.Commands.SetAdvisorEligible;
using Application.Features.GraduationProcesses.Commands.SetAdvisorNotEligible;
using Application.Features.GraduationProcesses.Commands.SetDeansOfficeApproved;
using Application.Features.GraduationProcesses.Commands.SetDeansOfficeRejected;
using Application.Features.GraduationProcesses.Commands.SetDeptSecretaryApproved;
using Application.Features.GraduationProcesses.Commands.SetDeptSecretaryRejected;
using Application.Features.GraduationProcesses.Commands.SetStudentAffairsApproved;
using Application.Features.GraduationProcesses.Commands.SetStudentAffairsRejected;
using Application.Features.GraduationProcesses.Commands.SetToParseError;
using Application.Features.GraduationProcesses.Commands.SetToParseSuccessful;
using Application.Features.GraduationProcesses.Commands.StartForAllStudents;
using Application.Features.GraduationProcesses.Queries.GetById;
using Application.Features.GraduationProcesses.Queries.GetList;
using Microsoft.AspNetCore.Mvc;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GraduationProcessesController : BaseController
{

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        GetByIdGraduationProcessResponse response = await Mediator.Send(new GetByIdGraduationProcessQuery { Id = id });
        return Ok(response);
    }

    [HttpPost("StartForAllStudents")]
    public async Task<IActionResult> StartForAllStudents([FromBody] StartGraduationForAllStudentsCommand command)
    {
        StartedGraduationForAllStudentsResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("PerformSystemEligibilityChecks")]
    public async Task<IActionResult> PerformSystemEligibilityChecks([FromBody] PerformSystemEligibilityChecksCommand command)
    {
        PerformedSystemEligibilityChecksResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("SetAdvisorEligible")]
    public async Task<IActionResult> SetAdvisorEligible([FromBody] SetAdvisorEligibleCommand command)
    {
        SetAdvisorEligibleResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("SetAdvisorNotEligible")]
    public async Task<IActionResult> SetAdvisorNotEligible([FromBody] SetAdvisorNotEligibleCommand command)
    {
        SetAdvisorNotEligibleResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("SetDeansOfficeApproved")]
    public async Task<IActionResult> SetDeansOfficeApproved([FromBody] SetDeansOfficeApprovedCommand command)
    {
        SetDeansOfficeApprovedResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("SetDeansOfficeRejected")]
    public async Task<IActionResult> SetDeansOfficeRejected([FromBody] SetDeansOfficeRejectedCommand command)
    {
        SetDeansOfficeRejectedResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("SetDeptSecretaryApproved")]
    public async Task<IActionResult> SetDeptSecretaryApproved([FromBody] SetDeptSecretaryApprovedCommand command)
    {
        SetDeptSecretaryApprovedResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("SetDeptSecretaryRejected")]
    public async Task<IActionResult> SetDeptSecretaryRejected([FromBody] SetDeptSecretaryRejectedCommand command)
    {
        SetDeptSecretaryRejectedResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("SetStudentAffairsApproved")]
    public async Task<IActionResult> SetStudentAffairsApproved([FromBody] SetStudentAffairsApprovedCommand command)
    {
        SetStudentAffairsApprovedResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("SetStudentAffairsRejected")]
    public async Task<IActionResult> SetStudentAffairsRejected([FromBody] SetStudentAffairsRejectedCommand command)
    {
        SetStudentAffairsRejectedResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("SetToParseError")]
    public async Task<IActionResult> SetToParseError([FromBody] SetGraduationProcessToParseErrorCommand command)
    {
        SetGraduationProcessToParseErrorResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpPost("SetToParseSuccessful")]
    public async Task<IActionResult> SetToParseSuccessful([FromBody] SetGraduationProcessToParseSuccessfulCommand command)
    {
        SetGraduationProcessToParseSuccessfulResponse response = await Mediator.Send(command);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] PageRequest pageRequest)
    {
        GetListGraduationProcessQuery getListGraduationProcessQuery = new() { PageRequest = pageRequest };
        GetListResponse<GetListGraduationProcessListItemDto> response = await Mediator.Send(getListGraduationProcessQuery);
        return Ok(response);
    }
}