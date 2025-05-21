using Application.SubServices.StorageService;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Adapters.Storage
{
    public class StorageService : IStorageService
    {
        readonly IStorage _storage;

        public StorageService(IStorage storage)
        {
            _storage = storage;
        }

        public string StorageName => _storage.GetType().Name;

        public async Task DeleteAsync(string pathOrContainerName)
            => await _storage.DeleteAsync(pathOrContainerName);

        // public List<string> GetFiles(string pathOrContainerName)
        //     => _storage.GetFiles(pathOrContainerName);

        public bool HasFile(string pathOrContainerName)
            => _storage.HasFile(pathOrContainerName);

        public Task<(string fileName, string filePath, long fileSize)> UploadAsync(string pathOrContainerName, IFormFile file)
            => _storage.UploadAsync(pathOrContainerName, file);

        // İndirme metodunu ekliyoruz
        public Task<Stream> DownloadAsync(string pathOrContainerName)
            => _storage.DownloadAsync(pathOrContainerName);


        // GetFileAsync method added    
        public Task<IFormFile> GetFileAsync(string pathOrContainerName, string fileName)
            => _storage.GetFileAsync(pathOrContainerName, fileName);    
    }
} 