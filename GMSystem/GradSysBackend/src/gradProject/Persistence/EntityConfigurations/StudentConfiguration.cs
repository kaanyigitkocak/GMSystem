using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class StudentConfiguration : IEntityTypeConfiguration<Student>
{
    public void Configure(EntityTypeBuilder<Student> builder)
    {
        builder.ToTable("Students").HasKey(s => s.Id);

        builder.Property(s => s.Id).HasColumnName("Id").IsRequired();
        builder.Property(s => s.StudentNumber).HasColumnName("StudentNumber");
        builder.Property(s => s.DepartmentId).HasColumnName("DepartmentId");
        builder.Property(s => s.ProgramName).HasColumnName("ProgramName");
        builder.Property(s => s.EnrollDate).HasColumnName("EnrollDate");
        builder.Property(s => s.CurrentGpa).HasColumnName("CurrentGpa");
        builder.Property(s => s.CurrentEctsCompleted).HasColumnName("CurrentEctsCompleted");
        builder.Property(s => s.GraduationStatus).HasColumnName("GraduationStatus");
        builder.Property(s => s.AssignedAdvisorUserId).HasColumnName("AssignedAdvisorUserId");
        builder.Property(s => s.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(s => s.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(s => s.DeletedDate).HasColumnName("DeletedDate");

        // Danışman ilişkisi
        builder.HasOne(s => s.AssignedAdvisor)
               .WithMany() // User tarafında bir navigation property yoksa bu şekilde bırakılır.
               .HasForeignKey(s => s.AssignedAdvisorUserId)
               .IsRequired(false); // AssignedAdvisorUserId nullable olduğu için false

        // User ile ana bire bir ilişki (Student, User'a bağımlı ve Id'si User.Id'ye FK)
        builder.HasOne(s => s.User)
               .WithOne(u => u.StudentProfile)
               .HasForeignKey<Student>(s => s.Id);

        builder.HasQueryFilter(s => !s.DeletedDate.HasValue);
    }
}