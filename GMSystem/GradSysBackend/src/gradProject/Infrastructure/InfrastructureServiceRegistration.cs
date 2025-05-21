using Application.Services.ImageService;
using Application.SubServices.MailService;
using Application.SubServices.StorageService;
using Infrastructure.Adapters.ImageService;
using Infrastructure.Adapters.Storage;
using Infrastructure.Mailing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ImageServiceBase, CloudinaryImageServiceAdapter>();
        
        // SmtpMailSettings yapılandırmasını ekle
        services.Configure<SmtpMailSettings>(options => configuration.GetSection("SmtpMailSettings").Bind(options));
        services.AddScoped<IMailService, MailService>();
        services.AddScoped<IStorage, AzureStorage>();
        services.AddScoped<IAzureStorage, AzureStorage>();
        return services;
    }
}
