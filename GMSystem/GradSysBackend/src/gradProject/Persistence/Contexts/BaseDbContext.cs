using System.Reflection;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Persistence.Seeds;
using Persistence.EntityConfigurations;

namespace Persistence.Contexts;

public class BaseDbContext : DbContext
{
    protected IConfiguration Configuration { get; set; }
    public DbSet<EmailAuthenticator> EmailAuthenticators { get; set; }
    public DbSet<OperationClaim> OperationClaims { get; set; }
    public DbSet<OtpAuthenticator> OtpAuthenticators { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<UserOperationClaim> UserOperationClaims { get; set; }
    public DbSet<ValidationCode> ValidationCodes { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Faculty> Faculties { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<MailLog> MailLogs { get; set; }
    public DbSet<CourseTaken> CourseTakens { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<RequirementMandatoryCourse> RequirementMandatoryCourses { get; set; }
    public DbSet<TranscriptData> TranscriptDatas { get; set; }
    public DbSet<EligibilityCheckResult> EligibilityCheckResults { get; set; }
    public DbSet<Staff> Staffs { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<RankingListEntry> RankingListEntries { get; set; }
    public DbSet<RankingList> RankingLists { get; set; }
    public DbSet<RankingListCriteria> RankingListCriterias { get; set; }
    public DbSet<GraduationRequirementSet> GraduationRequirementSets { get; set; }
    public DbSet<GraduationProcess> GraduationProcesses { get; set; }
    public DbSet<FileAttachment> FileAttachments { get; set; }

    public BaseDbContext(DbContextOptions dbContextOptions, IConfiguration configuration)
        : base(dbContextOptions)
    {
        Configuration = configuration;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(BaseDbContext).Assembly);

        // Seed Data
        modelBuilder.Entity<Faculty>().HasData(FacultySeeds.GetSeeds());
        modelBuilder.Entity<Department>().HasData(DepartmentSeeds.GetSeeds());
        modelBuilder.Entity<User>().HasData(UserSeeds.GetSeeds());
        modelBuilder.Entity<Student>().HasData(StudentSeeds.GetSeeds());
        modelBuilder.Entity<Staff>().HasData(StaffSeeds.GetSeeds());
        modelBuilder.Entity<Course>().HasData(CourseSeeds.GetSeeds());

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var properties = entityType.GetProperties().Where(p => p.ClrType == typeof(Guid));
            foreach (var property in properties)
            {
                property.SetColumnType("uuid");
            }
        }
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var properties = entityType.GetProperties().Where(p => p.ClrType == typeof(DateTime));
            foreach (var property in properties)
            {
                property.SetValueConverter(
                    new ValueConverter<DateTime, DateTime>(v => DateTime.SpecifyKind(v, DateTimeKind.Utc), v => v)
                );
            }
        }
    }
}
