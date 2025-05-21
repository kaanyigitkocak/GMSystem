using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
    public void Configure(EntityTypeBuilder<Notification> builder)
    {
        builder.ToTable("Notifications").HasKey(n => n.Id);

        builder.Property(n => n.Id).HasColumnName("Id").IsRequired();
        builder.Property(n => n.RecipientUserId).HasColumnName("RecipientUserId");
        builder.Property(n => n.Title).HasColumnName("Title");
        builder.Property(n => n.Message).HasColumnName("Message");
        builder.Property(n => n.IsRead).HasColumnName("IsRead");
        builder.Property(n => n.CreationDate).HasColumnName("CreationDate");
        builder.Property(n => n.RelatedProcessId).HasColumnName("RelatedProcessId");
        builder.Property(n => n.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(n => n.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(n => n.DeletedDate).HasColumnName("DeletedDate");

        builder.HasQueryFilter(n => !n.DeletedDate.HasValue);
    }
}