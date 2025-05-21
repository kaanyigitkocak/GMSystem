using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations
{
    public class OperationClaimConfiguration : IEntityTypeConfiguration<OperationClaim>
    {
        // Sabit GUID'ler
        public static Guid SystemAdminId { get; } = new Guid("00000000-0000-0000-0000-000000000001");
        public static Guid StudentId { get; } = new Guid("00000000-0000-0000-0000-000000000002");
        public static Guid StudentAffairsStaffId { get; } = new Guid("00000000-0000-0000-0000-000000000003");
        public static Guid AdvisorId { get; } = new Guid("00000000-0000-0000-0000-000000000004");
        public static Guid DepartmentSecretaryId { get; } = new Guid("00000000-0000-0000-0000-000000000005");
        public static Guid DeansOfficeStaffId { get; } = new Guid("00000000-0000-0000-0000-000000000006");

        public void Configure(EntityTypeBuilder<OperationClaim> builder)
        {
            builder.ToTable("OperationClaims").HasKey(oc => oc.Id);

            builder.Property(oc => oc.Id)
                   .HasColumnName("Id")
                   .IsRequired();

            builder.Property(oc => oc.Name)
                   .HasColumnName("Name")
                   .IsRequired();

            builder.Property(oc => oc.CreatedDate)
                   .HasColumnName("CreatedDate")
                   .IsRequired();

            builder.Property(oc => oc.UpdatedDate)
                   .HasColumnName("UpdatedDate");

            builder.Property(oc => oc.DeletedDate)
                   .HasColumnName("DeletedDate");

            builder.HasQueryFilter(oc => !oc.DeletedDate.HasValue);

            builder.HasData(GetSeeds());
        }

        private IEnumerable<OperationClaim> GetSeeds()
        {
            return new List<OperationClaim>
            {
                new OperationClaim
                {
                    Id = SystemAdminId,
                    Name = "SYSTEM_ADMIN", // İngilizce rol adı
                    CreatedDate = new DateTime(2024, 1, 1)
                },
                new OperationClaim
                {
                    Id = StudentId,
                    Name = "STUDENT", // İngilizce rol adı
                    CreatedDate = new DateTime(2024, 1, 1)
                },
                new OperationClaim
                {
                    Id = StudentAffairsStaffId,
                    Name = "STUDENT_AFFAIRS_STAFF", // İngilizce rol adı
                    CreatedDate = new DateTime(2024, 1, 1)
                },
                new OperationClaim
                {
                    Id = AdvisorId,
                    Name = "ADVISOR", // İngilizce rol adı
                    CreatedDate = new DateTime(2024, 1, 1)
                },
                new OperationClaim
                {
                    Id = DepartmentSecretaryId,
                    Name = "DEPARTMENT_SECRETARY", // İngilizce rol adı
                    CreatedDate = new DateTime(2024, 1, 1)
                },
                new OperationClaim
                {
                    Id = DeansOfficeStaffId,
                    Name = "DEANS_OFFICE_STAFF", // İngilizce rol adı
                    CreatedDate = new DateTime(2024, 1, 1)
                }
            };
        }
    }
}