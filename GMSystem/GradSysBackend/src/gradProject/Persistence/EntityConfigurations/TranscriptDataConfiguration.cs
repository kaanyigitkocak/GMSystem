using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class TranscriptDataConfiguration : IEntityTypeConfiguration<TranscriptData>
{
    public void Configure(EntityTypeBuilder<TranscriptData> builder)
    {
        builder.ToTable("TranscriptDatas").HasKey(td => td.Id);

        builder.Property(td => td.Id).HasColumnName("Id").IsRequired();
        builder.Property(td => td.StudentUserId).HasColumnName("StudentUserId");
        builder.Property(td => td.ParsingDate).HasColumnName("ParsingDate");
        builder.Property(td => td.ParsedGpa).HasColumnName("ParsedGpa");
        builder.Property(td => td.ParsedEcts).HasColumnName("ParsedEcts");
        builder.Property(td => td.IsValidForProcessing).HasColumnName("IsValidForProcessing");
        builder.Property(td => td.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(td => td.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(td => td.DeletedDate).HasColumnName("DeletedDate");


        builder.HasQueryFilter(td => !td.DeletedDate.HasValue);
    }
}