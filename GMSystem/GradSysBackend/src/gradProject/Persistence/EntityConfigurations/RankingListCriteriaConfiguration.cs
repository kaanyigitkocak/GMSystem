using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class RankingListCriteriaConfiguration : IEntityTypeConfiguration<RankingListCriteria>
{
    public void Configure(EntityTypeBuilder<RankingListCriteria> builder)
    {
        builder.ToTable("RankingListCriterias").HasKey(rlc => rlc.Id);

        builder.Property(rlc => rlc.Id).HasColumnName("Id").IsRequired();
        builder.Property(rlc => rlc.RankingListId).HasColumnName("RankingListId");
        builder.Property(rlc => rlc.CriteriaName).HasColumnName("CriteriaName");
        builder.Property(rlc => rlc.CriteriaValue).HasColumnName("CriteriaValue");
        builder.Property(rlc => rlc.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(rlc => rlc.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(rlc => rlc.DeletedDate).HasColumnName("DeletedDate");

        builder.HasQueryFilter(rlc => !rlc.DeletedDate.HasValue);
    }
}