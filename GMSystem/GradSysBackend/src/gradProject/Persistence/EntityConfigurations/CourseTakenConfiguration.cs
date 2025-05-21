using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EntityConfigurations;

public class CourseTakenConfiguration : IEntityTypeConfiguration<CourseTaken>
{
    public void Configure(EntityTypeBuilder<CourseTaken> builder)
    {
        builder.ToTable("CourseTakens").HasKey(ct => ct.Id);

        builder.Property(ct => ct.Id).HasColumnName("Id").IsRequired();
        builder.Property(ct => ct.StudentUserId).HasColumnName("StudentUserId");
        builder.Property(ct => ct.CourseCodeInTranscript).HasColumnName("CourseCodeInTranscript");
        builder.Property(ct => ct.CourseNameInTranscript).HasColumnName("CourseNameInTranscript");
        builder.Property(ct => ct.MatchedCourseId).HasColumnName("MatchedCourseId");
        builder.Property(ct => ct.Grade).HasColumnName("Grade");
        builder.Property(ct => ct.SemesterTaken).HasColumnName("SemesterTaken");
        builder.Property(ct => ct.CreditsEarned).HasColumnName("CreditsEarned");
        builder.Property(ct => ct.IsSuccessfullyCompleted).HasColumnName("IsSuccessfullyCompleted");
        builder.Property(ct => ct.CreatedDate).HasColumnName("CreatedDate").IsRequired();
        builder.Property(ct => ct.UpdatedDate).HasColumnName("UpdatedDate");
        builder.Property(ct => ct.DeletedDate).HasColumnName("DeletedDate");

        builder.HasQueryFilter(ct => !ct.DeletedDate.HasValue);
    }
}