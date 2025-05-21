using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class StaffConfiguration : IEntityTypeConfiguration<Staff>
{
    public void Configure(EntityTypeBuilder<Staff> builder)
    {
        builder.ToTable("Staffs").HasKey(s => s.Id);

        builder.Property(s => s.Id).HasColumnName("Id").IsRequired();
        builder.Property(s => s.StaffIdentificationNumber).HasColumnName("StaffIdentificationNumber");
        builder.Property(s => s.Title).HasColumnName("Title");
        builder.Property(s => s.DepartmentId).HasColumnName("DepartmentId");
        builder.Property(s => s.FacultyId).HasColumnName("FacultyId");
        builder.Property(s => s.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(s => s.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(s => s.DeletedDate).HasColumnName("DeletedDate");

        // User ile bire bir ilişki (Staff, User'a bağımlı ve Id'si User.Id'ye FK)
        builder.HasOne(s => s.User)
               .WithOne(u => u.StaffProfile)
               .HasForeignKey<Staff>(s => s.Id);

        builder.HasQueryFilter(s => !s.DeletedDate.HasValue);
    }
}