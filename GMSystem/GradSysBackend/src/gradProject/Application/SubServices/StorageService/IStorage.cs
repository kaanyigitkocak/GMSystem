using Microsoft.AspNetCore.Http;

namespace Application.SubServices.StorageService
{
    public interface IStorage
    {
        Task<(string fileName, string filePath, long fileSize)> UploadAsync(string pathOrContainerName, IFormFile file);
        Task DeleteAsync(string filePath);
        //List<string> GetFiles(string pathOrContainerName);
        bool HasFile(string filePath);
        Task<Stream> DownloadAsync(string filePath);
        Task<IFormFile> GetFileAsync(string pathOrContainerName, string fileName);
    }
} 