using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class GraduationProcessConfiguration : IEntityTypeConfiguration<GraduationProcess>
{
    public void Configure(EntityTypeBuilder<GraduationProcess> builder)
    {
        builder.ToTable("GraduationProcesses").HasKey(gp => gp.Id);

        builder.Property(gp => gp.Id).HasColumnName("Id").IsRequired();
        builder.Property(gp => gp.StudentUserId).HasColumnName("StudentUserId");
        builder.Property(gp => gp.AcademicTerm).HasColumnName("AcademicTerm");
        builder.Property(gp => gp.InitiationDate).HasColumnName("InitiationDate");
        builder.Property(gp => gp.Status).HasColumnName("Status");
        builder.Property(gp => gp.LastUpdateDate).HasColumnName("LastUpdateDate");
        builder.Property(gp => gp.Notes).HasColumnName("Notes");
        builder.Property(gp => gp.AdvisorUserId).HasColumnName("AdvisorUserId");
        builder.Property(gp => gp.AdvisorReviewDate).HasColumnName("AdvisorReviewDate");
        builder.Property(gp => gp.DeptSecretaryUserId).HasColumnName("DeptSecretaryUserId");
        builder.Property(gp => gp.DeptSecretaryReviewDate).HasColumnName("DeptSecretaryReviewDate");
        builder.Property(gp => gp.DeansOfficeUserId).HasColumnName("DeansOfficeUserId");
        builder.Property(gp => gp.DeansOfficeReviewDate).HasColumnName("DeansOfficeReviewDate");
        builder.Property(gp => gp.StudentAffairsUserId).HasColumnName("StudentAffairsUserId");
        builder.Property(gp => gp.StudentAffairsReviewDate).HasColumnName("StudentAffairsReviewDate");
        builder.Property(gp => gp.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(gp => gp.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(gp => gp.DeletedDate).HasColumnName("DeletedDate");

        // Relationships
        builder.HasMany(gp => gp.EligibilityCheckResults)
               .WithOne(ecr => ecr.GraduationProcess)
               .HasForeignKey(ecr => ecr.ProcessId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasQueryFilter(gp => !gp.DeletedDate.HasValue);
    }
}