using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class FileAttachmentConfiguration : IEntityTypeConfiguration<FileAttachment>
{
    public void Configure(EntityTypeBuilder<FileAttachment> builder)
    {
        builder.ToTable("FileAttachments").HasKey(fa => fa.Id);

        builder.Property(fa => fa.Id).HasColumnName("Id").IsRequired();
        builder.Property(fa => fa.FileName).HasColumnName("FileName");
        builder.Property(fa => fa.FilePath).HasColumnName("FilePath");
        builder.Property(fa => fa.StorageType).HasColumnName("StorageType");
        builder.Property(fa => fa.FileSize).HasColumnName("FileSize");
        builder.Property(fa => fa.FileType).HasColumnName("FileType");
        builder.Property(fa => fa.MimeType).HasColumnName("MimeType");
        builder.Property(fa => fa.UploadDate).HasColumnName("UploadDate");
        builder.Property(fa => fa.UploaderUserId).HasColumnName("UploaderUserId");
        builder.Property(fa => fa.StudentUserId).HasColumnName("StudentUserId");
        builder.Property(fa => fa.ProcessId).HasColumnName("ProcessId");
        builder.Property(fa => fa.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(fa => fa.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(fa => fa.DeletedDate).HasColumnName("DeletedDate");

        builder.HasQueryFilter(fa => !fa.DeletedDate.HasValue);
    }
}