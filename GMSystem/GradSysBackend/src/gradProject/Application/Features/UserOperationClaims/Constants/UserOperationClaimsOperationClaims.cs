using Application.Constants;

namespace Application.Features.UserOperationClaims.Constants;

public static class UserOperationClaimsOperationClaims
{
    private const string _section = "UserOperationClaims";

    public const string Admin = BaseOperationClaims.Admin;
    public const string Student = BaseOperationClaims.Student;

    public const string Read = $"{_section}.Read";
    public const string Write = $"{_section}.Write";

    public const string Create = $"{_section}.Create";
    public const string Update = $"{_section}.Update";
    public const string Delete = $"{_section}.Delete";
}
