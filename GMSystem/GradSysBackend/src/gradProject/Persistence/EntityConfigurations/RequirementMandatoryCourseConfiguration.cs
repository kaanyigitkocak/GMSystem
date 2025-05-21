using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class RequirementMandatoryCourseConfiguration : IEntityTypeConfiguration<RequirementMandatoryCourse>
{
    public void Configure(EntityTypeBuilder<RequirementMandatoryCourse> builder)
    {
        builder.ToTable("RequirementMandatoryCourses").HasKey(rmc => rmc.Id);

        builder.Property(rmc => rmc.Id).HasColumnName("Id").IsRequired();
        builder.Property(rmc => rmc.RequirementSetId).HasColumnName("RequirementSetId");
        builder.Property(rmc => rmc.CourseId).HasColumnName("CourseId");
        builder.Property(rmc => rmc.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(rmc => rmc.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(rmc => rmc.DeletedDate).HasColumnName("DeletedDate");

        builder.HasQueryFilter(rmc => !rmc.DeletedDate.HasValue);
    }
}