using Application.Services.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NArchitecture.Core.Persistence.DependencyInjection;
using Persistence.Contexts;
using Persistence.Repositories;

namespace Persistence;

public static class PersistenceServiceRegistration
{
    public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<BaseDbContext>(options =>
        {
            // PostgreSQL bağlantı dizesini kullanmak için UseNpgsql metodunu kullanıyoruz.
            options.UseNpgsql(configuration.GetConnectionString("BaseDb123"), npgsqlOptions => 
            {
                npgsqlOptions.CommandTimeout(120);
                npgsqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorCodesToAdd: null
                );
            });
            options.EnableSensitiveDataLogging();
        });
        services.AddDbMigrationApplier(buildServices => buildServices.GetRequiredService<BaseDbContext>());

        services.AddScoped<IEmailAuthenticatorRepository, EmailAuthenticatorRepository>();
        services.AddScoped<IOperationClaimRepository, OperationClaimRepository>();
        services.AddScoped<IOtpAuthenticatorRepository, OtpAuthenticatorRepository>();
        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserOperationClaimRepository, UserOperationClaimRepository>();

        services.AddScoped<IValidationCodeRepository, ValidationCodeRepository>();
        services.AddScoped<IStudentRepository, StudentRepository>();
        services.AddScoped<IFacultyRepository, FacultyRepository>();
        services.AddScoped<IDepartmentRepository, DepartmentRepository>();
        services.AddScoped<IMailLogRepository, MailLogRepository>();
        services.AddScoped<ICourseTakenRepository, CourseTakenRepository>();
        services.AddScoped<INotificationRepository, NotificationRepository>();
        services.AddScoped<IRequirementMandatoryCourseRepository, RequirementMandatoryCourseRepository>();
        services.AddScoped<ITranscriptDataRepository, TranscriptDataRepository>();
        services.AddScoped<IEligibilityCheckResultRepository, EligibilityCheckResultRepository>();
        services.AddScoped<IStaffRepository, StaffRepository>();
        services.AddScoped<IStaffRepository, StaffRepository>();
        services.AddScoped<ICourseRepository, CourseRepository>();
        services.AddScoped<IStudentRepository, StudentRepository>();
        services.AddScoped<IStudentRepository, StudentRepository>();
        services.AddScoped<IRankingListEntryRepository, RankingListEntryRepository>();
        services.AddScoped<IFacultyRepository, FacultyRepository>();
        services.AddScoped<IDepartmentRepository, DepartmentRepository>();
        services.AddScoped<IRankingListRepository, RankingListRepository>();
        services.AddScoped<IRankingListCriteriaRepository, RankingListCriteriaRepository>();
        services.AddScoped<IGraduationRequirementSetRepository, GraduationRequirementSetRepository>();
        services.AddScoped<IGraduationProcessRepository, GraduationProcessRepository>();
        services.AddScoped<IFileAttachmentRepository, FileAttachmentRepository>();
        return services;
    }
}
