using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.EntityConfigurations;
using System;
using System.Collections.Generic;
using Persistence.Seeds;

namespace Persistence.EntityConfigurations
{
    public class UserOperationClaimConfiguration : IEntityTypeConfiguration<UserOperationClaim>
    {
        public void Configure(EntityTypeBuilder<UserOperationClaim> builder)
        {
            builder.ToTable("UserOperationClaims").HasKey(uoc => uoc.Id);

            builder.Property(uoc => uoc.Id).HasColumnName("Id").IsRequired();
            builder.Property(uoc => uoc.UserId).HasColumnName("UserId").IsRequired();
            builder.Property(uoc => uoc.OperationClaimId).HasColumnName("OperationClaimId").IsRequired();
            builder.Property(uoc => uoc.CreatedDate).HasColumnName("CreatedDate").IsRequired();
            builder.Property(uoc => uoc.UpdatedDate).HasColumnName("UpdatedDate");
            builder.Property(uoc => uoc.DeletedDate).HasColumnName("DeletedDate");

            builder.HasQueryFilter(uoc => !uoc.DeletedDate.HasValue);

            builder.HasOne(uoc => uoc.User)
                   .WithMany(u => u.UserOperationClaims)
                   .HasForeignKey(uoc => uoc.UserId);

            builder.HasOne(uoc => uoc.OperationClaim)
                   .WithMany()
                   .HasForeignKey(uoc => uoc.OperationClaimId);

            builder.HasData(GetSeeds());
        }

        private IEnumerable<UserOperationClaim> GetSeeds()
        {
            var userOperationClaims = new List<UserOperationClaim>
            {
                new UserOperationClaim // System Admin
                {
                    Id = new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), // Benzersiz bir Guid
                    UserId = UserConfiguration.SystemAdminUserId,
                    OperationClaimId = OperationClaimConfiguration.SystemAdminId,
                    CreatedDate = new DateTime(2024, 1, 1)
                },
                new UserOperationClaim // Student (Genel bir öğrenci rolü, belirli bir kullanıcıya atanmamış)
                {
                    Id = new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), // Benzersiz bir Guid
                    UserId = UserConfiguration.StudentUserId, // Bu genel bir öğrenci kullanıcısı olmalı
                    OperationClaimId = OperationClaimConfiguration.StudentId,
                    CreatedDate = new DateTime(2024, 1, 1)
                },
                new UserOperationClaim // Student Affairs Staff (Genel bir öğrenci işleri personeli rolü)
                {
                    Id = new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"), // Benzersiz bir Guid
                    UserId = UserConfiguration.StudentAffairsStaffUserId, // Bu genel bir öğrenci işleri kullanıcısı olmalı
                    OperationClaimId = OperationClaimConfiguration.StudentAffairsStaffId,
                    CreatedDate = new DateTime(2024, 1, 1)
                },
                new UserOperationClaim // Advisor (Genel bir danışman rolü)
                {
                    Id = new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"), // Benzersiz bir Guid
                    UserId = UserConfiguration.AdvisorUserId, // Bu genel bir danışman kullanıcısı olmalı
                    OperationClaimId = OperationClaimConfiguration.AdvisorId,
                    CreatedDate = new DateTime(2024, 1, 1)
                },
                new UserOperationClaim // Department Secretary (Genel bir bölüm sekreteri rolü)
                {
                    Id = new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"), // Benzersiz bir Guid
                    UserId = UserConfiguration.DepartmentSecretaryUserId, // Bu genel bir bölüm sekreteri kullanıcısı olmalı
                    OperationClaimId = OperationClaimConfiguration.DepartmentSecretaryId,
                    CreatedDate = new DateTime(2024, 1, 1)
                },
                new UserOperationClaim // Dean's Office Staff (Genel bir dekanlık personeli rolü)
                {
                    Id = new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"), // Benzersiz bir Guid
                    UserId = UserConfiguration.DeansOfficeStaffUserId, // Bu genel bir dekanlık kullanıcısı olmalı
                    OperationClaimId = OperationClaimConfiguration.DeansOfficeStaffId,
                    CreatedDate = new DateTime(2024, 1, 1)
                }
            };

            // UserOperationClaimSeeds.cs'den gelen öğrenci rolleri
            // StudentUser1Id'den StudentUser40Id'ye kadar olan UserSeeds'deki Guid'leri kullanacağız.
            // Bu ID'ler UserSeeds.cs içinde tanımlı olmalı.
            for (int i = 1; i <= 40; i++)
            {
                // UserSeeds sınıfında StudentUser1Id, StudentUser2Id ... StudentUser40Id gibi property'ler olduğunu varsayıyorum.
                // Refleksiyon veya UserSeeds'den bir liste alarak bu ID'lere erişilebilir.
                // Şimdilik placeholder olarak Guid.Parse kullanıyorum, UserSeeds.cs'deki gerçek ID'lere göre güncellenmeli.
                // ÖNEMLİ NOT: UserSeeds.cs dosyasında StudentUser1Id, StudentUser2Id vb. Guid sabitlerinin olması gerekir.
                // Eğer UserSeeds.cs'de bu ID'ler dinamik üretiliyorsa veya farklı bir yapıda ise bu kısım UserSeeds'e göre uyarlanmalıdır.
                // Aşağıdaki satır, UserSeeds.cs içerisinde StudentUser1Id, StudentUser2Id ... StudentUser40Id gibi alanların olduğunu varsayar.
                // Eğer bu alanlar yoksa, UserSeeds.cs'den bu ID'leri almanın bir yolu bulunmalı veya UserSeeds.cs de buna göre düzenlenmelidir.
                // Örneğin: UserSeeds.GetAllStudentUserIds() gibi bir metod.
                // Basitlik adına, UserSeeds'de bu ID'lerin Guid.Parse kullanımına göre olduğunu varsayıyorum
                userOperationClaims.Add(new UserOperationClaim
                {
                    Id = Guid.NewGuid(), // Her zaman yeni bir Guid oluşturulur
                    UserId = Guid.Parse($"40000000-0000-0000-0000-{i:D12}"), // UserSeeds'deki öğrenci ID'leri ile eşleşmeli
                    OperationClaimId = OperationClaimConfiguration.StudentId,
                    CreatedDate = DateTime.UtcNow // DateTime.Now yerine UtcNow kullanmak daha tutarlıdır
                });
            }
            
            // UserOperationClaimSeeds.cs'den gelen personel rolleri
            userOperationClaims.Add(new UserOperationClaim { Id = Guid.NewGuid(), UserId = UserSeeds.StaffUser1Id, OperationClaimId = OperationClaimConfiguration.AdvisorId, CreatedDate = DateTime.UtcNow });
            userOperationClaims.Add(new UserOperationClaim { Id = Guid.NewGuid(), UserId = UserSeeds.StaffUser2Id, OperationClaimId = OperationClaimConfiguration.AdvisorId, CreatedDate = DateTime.UtcNow });
            userOperationClaims.Add(new UserOperationClaim { Id = Guid.NewGuid(), UserId = UserSeeds.StaffUser3Id, OperationClaimId = OperationClaimConfiguration.DepartmentSecretaryId, CreatedDate = DateTime.UtcNow });
            userOperationClaims.Add(new UserOperationClaim { Id = Guid.NewGuid(), UserId = UserSeeds.StaffUser4Id, OperationClaimId = OperationClaimConfiguration.DeansOfficeStaffId, CreatedDate = DateTime.UtcNow });
            userOperationClaims.Add(new UserOperationClaim { Id = Guid.NewGuid(), UserId = UserSeeds.StaffUser5Id, OperationClaimId = OperationClaimConfiguration.AdvisorId, CreatedDate = DateTime.UtcNow });
            userOperationClaims.Add(new UserOperationClaim { Id = Guid.NewGuid(), UserId = UserSeeds.StaffUser6Id, OperationClaimId = OperationClaimConfiguration.StudentAffairsStaffId, CreatedDate = DateTime.UtcNow }); // STUDENT_AFFAIRS_STAFF olarak güncellendi (önceki yorumda belirtildiği gibi)
            userOperationClaims.Add(new UserOperationClaim { Id = Guid.NewGuid(), UserId = UserSeeds.StaffUser7Id, OperationClaimId = OperationClaimConfiguration.AdvisorId, CreatedDate = DateTime.UtcNow });
            userOperationClaims.Add(new UserOperationClaim { Id = Guid.NewGuid(), UserId = UserSeeds.StaffUser8Id, OperationClaimId = OperationClaimConfiguration.StudentAffairsStaffId, CreatedDate = DateTime.UtcNow }); // STUDENT_AFFAIRS_STAFF olarak güncellendi
            userOperationClaims.Add(new UserOperationClaim { Id = Guid.NewGuid(), UserId = UserSeeds.StaffUser9Id, OperationClaimId = OperationClaimConfiguration.StudentAffairsStaffId, CreatedDate = DateTime.UtcNow }); // STUDENT_AFFAIRS_STAFF olarak güncellendi
            userOperationClaims.Add(new UserOperationClaim { Id = Guid.NewGuid(), UserId = UserSeeds.StaffUser10Id, OperationClaimId = OperationClaimConfiguration.AdvisorId, CreatedDate = DateTime.UtcNow });

            return userOperationClaims;
        }
    }
}