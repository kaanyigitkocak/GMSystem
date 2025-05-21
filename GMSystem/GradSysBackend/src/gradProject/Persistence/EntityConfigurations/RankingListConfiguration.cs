using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class RankingListConfiguration : IEntityTypeConfiguration<RankingList>
{
    public void Configure(EntityTypeBuilder<RankingList> builder)
    {
        builder.ToTable("RankingLists").HasKey(rl => rl.Id);

        builder.Property(rl => rl.Id).HasColumnName("Id").IsRequired();
        builder.Property(rl => rl.ListType).HasColumnName("ListType");
        builder.Property(rl => rl.ScopeDepartmentId).HasColumnName("ScopeDepartmentId");
        builder.Property(rl => rl.ScopeFacultyId).HasColumnName("ScopeFacultyId");
        builder.Property(rl => rl.AcademicTerm).HasColumnName("AcademicTerm");
        builder.Property(rl => rl.GenerationDate).HasColumnName("GenerationDate");
        builder.Property(rl => rl.GeneratedByUserId).HasColumnName("GeneratedByUserId");
        builder.Property(rl => rl.PrimarySortField).HasColumnName("PrimarySortField");
        builder.Property(rl => rl.SortOrder).HasColumnName("SortOrder");
        builder.Property(rl => rl.MinGpaForInclusion).HasColumnName("MinGpaForInclusion");
        builder.Property(rl => rl.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(rl => rl.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(rl => rl.DeletedDate).HasColumnName("DeletedDate");

        builder.HasQueryFilter(rl => !rl.DeletedDate.HasValue);
    }
}