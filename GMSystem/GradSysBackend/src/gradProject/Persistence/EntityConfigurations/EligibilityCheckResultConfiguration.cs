using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class EligibilityCheckResultConfiguration : IEntityTypeConfiguration<EligibilityCheckResult>
{
    public void Configure(EntityTypeBuilder<EligibilityCheckResult> builder)
    {
        builder.ToTable("EligibilityCheckResults").HasKey(ecr => ecr.Id);

        builder.Property(ecr => ecr.Id).HasColumnName("Id").IsRequired();
        builder.Property(ecr => ecr.ProcessId).HasColumnName("ProcessId");
        builder.Property(ecr => ecr.CheckType).HasColumnName("CheckType");
        builder.Property(ecr => ecr.IsMet).HasColumnName("IsMet");
        builder.Property(ecr => ecr.ActualValue).HasColumnName("ActualValue");
        builder.Property(ecr => ecr.RequiredValue).HasColumnName("RequiredValue");
        builder.Property(ecr => ecr.NotesOrMissingItems).HasColumnName("NotesOrMissingItems");
        builder.Property(ecr => ecr.CheckDate).HasColumnName("CheckDate");
        builder.Property(ecr => ecr.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(ecr => ecr.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(ecr => ecr.DeletedDate).HasColumnName("DeletedDate");

        builder.HasQueryFilter(ecr => !ecr.DeletedDate.HasValue);
    }
}