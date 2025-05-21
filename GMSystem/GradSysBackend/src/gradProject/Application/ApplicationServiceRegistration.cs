using System.Reflection;
using Application.Services.AuthenticatorService;
using Application.Services.AuthService;
using Application.Services.UsersService;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using NArchitecture.Core.Application.Pipelines.Authorization;
using NArchitecture.Core.Application.Pipelines.Caching;
using NArchitecture.Core.Application.Pipelines.Logging;
using NArchitecture.Core.Application.Pipelines.Transaction;
using NArchitecture.Core.Application.Pipelines.Validation;
using NArchitecture.Core.Application.Rules;
using NArchitecture.Core.CrossCuttingConcerns.Logging.Abstraction;
using NArchitecture.Core.CrossCuttingConcerns.Logging.Configurations;
using NArchitecture.Core.CrossCuttingConcerns.Logging.Serilog.File;
using NArchitecture.Core.ElasticSearch;
using NArchitecture.Core.ElasticSearch.Models;
using NArchitecture.Core.Localization.Resource.Yaml.DependencyInjection;
using NArchitecture.Core.Mailing;
using NArchitecture.Core.Mailing.MailKit;
using NArchitecture.Core.Security.DependencyInjection;
using NArchitecture.Core.Security.JWT;
using Application.Services.ValidationCodes;
using Application.Services.CourseTakens;
using Application.Services.Notifications;
using Application.Services.RequirementMandatoryCourses;
using Application.Services.TranscriptDatas;
using Application.Services.EligibilityCheckResults;
using Application.Services.Staffs;
using Application.Services.Courses;
using Application.Services.Students;
using Application.Services.RankingListEntries;
using Application.Services.Faculties;
using Application.Services.Departments;
using Application.Services.RankingLists;
using Application.Services.RankingListCriterias;
using Application.Services.GraduationRequirementSets;
using Application.Services.GraduationProcesses;
using Application.Services.FileAttachments;

using Application.Services.MailLogs;


namespace Application;

public static class ApplicationServiceRegistration
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
        MailSettings mailSettings,
        FileLogConfiguration fileLogConfiguration,
        ElasticSearchConfig elasticSearchConfig,
        TokenOptions tokenOptions
    )
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddMediatR(configuration =>
        {
            configuration.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
            configuration.AddOpenBehavior(typeof(AuthorizationBehavior<,>));
            configuration.AddOpenBehavior(typeof(CachingBehavior<,>));
            configuration.AddOpenBehavior(typeof(CacheRemovingBehavior<,>));
            configuration.AddOpenBehavior(typeof(LoggingBehavior<,>));
            configuration.AddOpenBehavior(typeof(RequestValidationBehavior<,>));
            configuration.AddOpenBehavior(typeof(TransactionScopeBehavior<,>));
        });

        services.AddSubClassesOfType(Assembly.GetExecutingAssembly(), typeof(BaseBusinessRules));

        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        services.AddSingleton<IMailService, MailKitMailService>(_ => new MailKitMailService(mailSettings));
        services.AddSingleton<ILogger, SerilogFileLogger>(_ => new SerilogFileLogger(fileLogConfiguration));
        services.AddSingleton<IElasticSearch, ElasticSearchManager>(_ => new ElasticSearchManager(elasticSearchConfig));

        services.AddScoped<IAuthService, AuthManager>();
        services.AddScoped<IAuthenticatorService, AuthenticatorManager>();
        services.AddScoped<IUserService, UserManager>();

        services.AddYamlResourceLocalization();

        services.AddSecurityServices<Guid, Guid, Guid>(tokenOptions);

        services.AddScoped<IValidationCodeService, ValidationCodeManager>();
        services.AddScoped<IMailLogService, MailLogManager>();
        services.AddScoped<ICourseTakenService, CourseTakenManager>();
        services.AddScoped<INotificationService, NotificationManager>();
        services.AddScoped<IRequirementMandatoryCourseService, RequirementMandatoryCourseManager>();
        services.AddScoped<ITranscriptDataService, TranscriptDataManager>();
        services.AddScoped<IEligibilityCheckResultService, EligibilityCheckResultManager>();
        services.AddScoped<IStaffService, StaffManager>();
        services.AddScoped<IStaffService, StaffManager>();
        services.AddScoped<ICourseService, CourseManager>();
        services.AddScoped<IStudentService, StudentManager>();
        services.AddScoped<IStudentService, StudentManager>();
        services.AddScoped<IRankingListEntryService, RankingListEntryManager>();
        services.AddScoped<IFacultyService, FacultyManager>();
        services.AddScoped<IDepartmentService, DepartmentManager>();
        services.AddScoped<IRankingListService, RankingListManager>();
        services.AddScoped<IRankingListCriteriaService, RankingListCriteriaManager>();
        services.AddScoped<IGraduationRequirementSetService, GraduationRequirementSetManager>();
        services.AddScoped<IGraduationProcessService, GraduationProcessManager>();
        services.AddScoped<IFileAttachmentService, FileAttachmentManager>();
        return services;
    }

    public static IServiceCollection AddSubClassesOfType(
        this IServiceCollection services,
        Assembly assembly,
        Type type,
        Func<IServiceCollection, Type, IServiceCollection>? addWithLifeCycle = null
    )
    {
        var types = assembly.GetTypes().Where(t => t.IsSubclassOf(type) && type != t).ToList();
        foreach (Type? item in types)
            if (addWithLifeCycle == null)
                services.AddScoped(item);
            else
                addWithLifeCycle(services, type);
        return services;
    }
}
