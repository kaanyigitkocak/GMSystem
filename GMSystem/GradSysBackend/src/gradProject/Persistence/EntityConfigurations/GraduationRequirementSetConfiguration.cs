using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class GraduationRequirementSetConfiguration : IEntityTypeConfiguration<GraduationRequirementSet>
{
    public void Configure(EntityTypeBuilder<GraduationRequirementSet> builder)
    {
        builder.ToTable("GraduationRequirementSets").HasKey(grs => grs.Id);

        builder.Property(grs => grs.Id).HasColumnName("Id").IsRequired();
        builder.Property(grs => grs.DepartmentId).HasColumnName("DepartmentId");
        builder.Property(grs => grs.MinGpa).HasColumnName("MinGpa");
        builder.Property(grs => grs.TotalMinEcts).HasColumnName("TotalMinEcts");
        builder.Property(grs => grs.MinTechnicalElectiveCoursesCount).HasColumnName("MinTechnicalElectiveCoursesCount");
        builder.Property(grs => grs.MinNonTechnicalElectiveCoursesCount).HasColumnName("MinNonTechnicalElectiveCoursesCount");
        builder.Property(grs => grs.MinUniversityElectiveCoursesCount).HasColumnName("MinUniversityElectiveCoursesCount");
        builder.Property(grs => grs.Description).HasColumnName("Description");
        builder.Property(grs => grs.CreatedByUserId).HasColumnName("CreatedByUserId");
        builder.Property(grs => grs.LastModifiedByUserId).HasColumnName("LastModifiedByUserId");
        builder.Property(grs => grs.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(grs => grs.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(grs => grs.DeletedDate).HasColumnName("DeletedDate");

        builder.HasQueryFilter(grs => !grs.DeletedDate.HasValue);
    }
}