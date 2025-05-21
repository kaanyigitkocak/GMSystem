using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NArchitecture.Core.Security.Hashing;

namespace Persistence.EntityConfigurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users").HasKey(u => u.Id);

            builder.Property(u => u.Id).HasColumnName("Id").IsRequired();
            builder.Property(u => u.Email).HasColumnName("Email").IsRequired();
            builder.Property(u => u.PasswordSalt).HasColumnName("PasswordSalt").IsRequired();
            builder.Property(u => u.PasswordHash).HasColumnName("PasswordHash").IsRequired();
            builder.Property(u => u.AuthenticatorType).HasColumnName("AuthenticatorType").IsRequired();
            builder.Property(u => u.CreatedDate).HasColumnName("CreatedDate").IsRequired();
            builder.Property(u => u.UpdatedDate).HasColumnName("UpdatedDate");
            builder.Property(u => u.DeletedDate).HasColumnName("DeletedDate");

            builder.HasQueryFilter(u => !u.DeletedDate.HasValue);

            builder.HasMany(u => u.UserOperationClaims);
            builder.HasMany(u => u.RefreshTokens);


            builder.HasData(GetSeeds());
        }

        public static Guid SystemAdminUserId { get; } = new Guid("11111111-1111-1111-1111-11111111111A");
        public static Guid StudentUserId { get; } = new Guid("22222222-2222-2222-2222-22222222222A");
        public static Guid StudentAffairsStaffUserId { get; } = new Guid("33333333-3333-3333-3333-33333333333A");
        public static Guid AdvisorUserId { get; } = new Guid("44444444-4444-4444-4444-44444444444A");
        public static Guid DepartmentSecretaryUserId { get; } = new Guid("55555555-5555-5555-5555-55555555555A");
        public static Guid DeansOfficeStaffUserId { get; } = new Guid("66666666-6666-6666-6666-66666666666A");


        private IEnumerable<User> GetSeeds()
        {
            HashingHelper.CreatePasswordHash("SystemAdminPass123!", out byte[] systemAdminHash, out byte[] systemAdminSalt);
            yield return new User
            {
                Id = SystemAdminUserId,
                Email = "systemadmin@university.edu",
                PasswordHash = systemAdminHash,
                PasswordSalt = systemAdminSalt,
                AuthenticatorType = 0,
                CreatedDate = new DateTime(2024, 1, 1),
                FirstName = "System",
                LastName = "Admin",
                PhoneNumber = "1112223344",
                UserName = "systemadmin"
            };

            HashingHelper.CreatePasswordHash("StudentPass123!", out byte[] studentHash, out byte[] studentSalt);
            yield return new User
            {
                Id = StudentUserId,
                Email = "student@std.iyte.edu.tr",
                PasswordHash = studentHash,
                PasswordSalt = studentSalt,
                AuthenticatorType = 0,
                CreatedDate = new DateTime(2024, 1, 1),
                FirstName = "Student",
                LastName = "User",
                PhoneNumber = "2223334455",
                UserName = "studentuser"
            };

            HashingHelper.CreatePasswordHash("StudentAffairsPass123!", out byte[] studentAffairsHash, out byte[] studentAffairsSalt);
            yield return new User
            {
                Id = StudentAffairsStaffUserId,
                Email = "studentaffairs@iyte.edu.tr",
                PasswordHash = studentAffairsHash,
                PasswordSalt = studentAffairsSalt,
                AuthenticatorType = 0,
                CreatedDate = new DateTime(2024, 1, 1),
                FirstName = "StudentAffairs",
                LastName = "Staff",
                PhoneNumber = "3334445566",
                UserName = "studentaffairs"
            };

            HashingHelper.CreatePasswordHash("AdvisorPass123!", out byte[] advisorHash, out byte[] advisorSalt);
            yield return new User
            {
                Id = AdvisorUserId,
                Email = "advisor@iyte.edu.tr",
                PasswordHash = advisorHash,
                PasswordSalt = advisorSalt,
                AuthenticatorType = 0,
                CreatedDate = new DateTime(2024, 1, 1),
                FirstName = "Advisor",
                LastName = "User",
                PhoneNumber = "4445556677",
                UserName = "advisoruser"
            };

            HashingHelper.CreatePasswordHash("DeptSecretaryPass123!", out byte[] deptSecretaryHash, out byte[] deptSecretarySalt);
            yield return new User
            {
                Id = DepartmentSecretaryUserId,
                Email = "deptsecretary@iyte.edu.tr",
                PasswordHash = deptSecretaryHash,
                PasswordSalt = deptSecretarySalt,
                AuthenticatorType = 0,
                CreatedDate = new DateTime(2024, 1, 1),
                FirstName = "Department",
                LastName = "Secretary",
                PhoneNumber = "5556667788",
                UserName = "deptsecretary"
            };

            HashingHelper.CreatePasswordHash("DeansOfficePass123!", out byte[] deansOfficeHash, out byte[] deansOfficeSalt);
            yield return new User
            {
                Id = DeansOfficeStaffUserId,
                Email = "deansoffice@iyte.edu.tr",
                PasswordHash = deansOfficeHash,
                PasswordSalt = deansOfficeSalt,
                AuthenticatorType = 0,
                CreatedDate = new DateTime(2024, 1, 1),
                FirstName = "DeansOffice",
                LastName = "Staff",
                PhoneNumber = "6667778899",
                UserName = "deansoffice"
            };
        }
    }
}