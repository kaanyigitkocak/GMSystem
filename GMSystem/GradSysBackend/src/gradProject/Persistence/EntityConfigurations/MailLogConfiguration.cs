using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class MailLogConfiguration : IEntityTypeConfiguration<MailLog>
{
    public void Configure(EntityTypeBuilder<MailLog> builder)
    {
        builder.ToTable("MailLogs").HasKey(ml => ml.Id);

        builder.Property(ml => ml.Id).HasColumnName("Id").IsRequired();
        builder.Property(ml => ml.SentDate).HasColumnName("SentDate");
        builder.Property(ml => ml.From).HasColumnName("From");
        builder.Property(ml => ml.To).HasColumnName("To");
        builder.Property(ml => ml.Subject).HasColumnName("Subject");
        builder.Property(ml => ml.Body).HasColumnName("Body");
        builder.Property(ml => ml.IsBodyHtml).HasColumnName("IsBodyHtml");
        builder.Property(ml => ml.IsSentSuccessfully).HasColumnName("IsSentSuccessfully");
        builder.Property(ml => ml.ErrorMessage).HasColumnName("ErrorMessage");
        builder.Property(ml => ml.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(ml => ml.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(ml => ml.DeletedDate).HasColumnName("DeletedDate");

        builder.HasQueryFilter(ml => !ml.DeletedDate.HasValue);
    }
}