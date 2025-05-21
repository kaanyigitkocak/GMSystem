using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class RankingListEntryConfiguration : IEntityTypeConfiguration<RankingListEntry>
{
    public void Configure(EntityTypeBuilder<RankingListEntry> builder)
    {
        builder.ToTable("RankingListEntries").HasKey(rle => rle.Id);

        builder.Property(rle => rle.Id).HasColumnName("Id").IsRequired();
        builder.Property(rle => rle.RankingListId).HasColumnName("RankingListId");
        builder.Property(rle => rle.StudentUserId).HasColumnName("StudentUserId");
        builder.Property(rle => rle.Rank).HasColumnName("Rank");
        builder.Property(rle => rle.GpaAtRanking).HasColumnName("GpaAtRanking");
        builder.Property(rle => rle.HonourStatus).HasColumnName("HonourStatus");
        builder.Property(rle => rle.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(rle => rle.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(rle => rle.DeletedDate).HasColumnName("DeletedDate");

        builder.HasQueryFilter(rle => !rle.DeletedDate.HasValue);
    }
}