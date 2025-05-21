using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class ValidationCodeConfiguration : IEntityTypeConfiguration<ValidationCode>
{
    public void Configure(EntityTypeBuilder<ValidationCode> builder)
    {
        builder.ToTable("ValidationCodes").HasKey(vc => vc.Id);

        builder.Property(vc => vc.Id).HasColumnName("Id").IsRequired();
        builder.Property(vc => vc.UserId).HasColumnName("UserId");
        builder.Property(vc => vc.Code).HasColumnName("Code");
        builder.Property(vc => vc.ExpireDate).HasColumnName("ExpireDate");
        builder.Property(vc => vc.IsUsed).HasColumnName("IsUsed");
        builder.Property(vc => vc.ValidationType).HasColumnName("ValidationType");
        builder.Property(vc => vc.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(vc => vc.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(vc => vc.DeletedDate).HasColumnName("DeletedDate");

        builder.HasQueryFilter(vc => !vc.DeletedDate.HasValue);
    }
}