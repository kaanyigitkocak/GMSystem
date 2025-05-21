using Application.Constants;

namespace Application.Features.OperationClaims.Constants;

public static class OperationClaimsOperationClaims
{
    private const string _section = "OperationClaims";

    public const string Admin = BaseOperationClaims.Admin;
    public const string Student = BaseOperationClaims.Student;

    public const string Read = $"{_section}.Read";
    public const string Write = $"{_section}.Write";

    public const string Create = $"{_section}.Create";
    public const string Update = $"{_section}.Update";
    public const string Delete = $"{_section}.Delete";
}
