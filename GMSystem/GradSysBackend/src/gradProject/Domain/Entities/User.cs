using NArchitecture.Core.Security.Entities; // For User base
using NArchitecture.Core.Persistence.Repositories; // For Entity<Guid> if not using User from NArchitecture.Core.Security
using NArchitecture.Core.Security.Enums; // For AuthenticatorType

namespace Domain.Entities;

public class User : NArchitecture.Core.Security.Entities.User<Guid> // Assuming NArchitecture.Core.Security.Entities.User<TId> is used
{
    // Id, Email, PasswordSalt, PasswordHash, AuthenticatorType are inherited from NArchitecture.Core.Security.Entities.User
    // CreatedDate, UpdatedDate, DeletedDate are inherited if Entity<Guid> is the base, or part of NArchitecture.Core.Security.Entities.User

    public string UserName { get; set; }
    // Email is inherited
    // PasswordHash is inherited
    // PasswordSalt is inherited
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public bool IsActive { get; set; } = true; // Default value
    public bool IsEmailVerified { get; set; } = false; // Default value
    // AuthenticatorType is inherited

    // İlişkiler (Navigation Properties)
    public virtual ICollection<UserOperationClaim> UserOperationClaims { get; set; } = new HashSet<UserOperationClaim>();
    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new HashSet<RefreshToken>();
    public virtual Student? StudentProfile { get; set; }
    public virtual Staff? StaffProfile { get; set; }

    public User()
    {
        UserOperationClaims = new HashSet<UserOperationClaim>();
        RefreshTokens = new HashSet<RefreshToken>();
    }

    public User(Guid id, string userName, string email, string firstName, string lastName, byte[] passwordSalt, byte[] passwordHash, bool isActive = true, bool isEmailVerified = false, string? phoneNumber = null) : this()
    {
        Id = id;
        UserName = userName;
        Email = email; // Set inherited property
        FirstName = firstName;
        LastName = lastName;
        PasswordSalt = passwordSalt; // Set inherited property
        PasswordHash = passwordHash; // Set inherited property
        IsActive = isActive;
        IsEmailVerified = isEmailVerified;
        PhoneNumber = phoneNumber;
    }
}
