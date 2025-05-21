using Domain.Enums;
using NArchitecture.Core.Application.Responses;

namespace Application.Features.ValidationCodes.Queries.GetById;

public class GetByIdValidationCodeResponse : IResponse
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Code { get; set; }
    public DateTime ExpireDate { get; set; }
    public bool IsUsed { get; set; }
    public ValidationPurpose ValidationType { get; set; }
}