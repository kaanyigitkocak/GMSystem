using Application.SubServices.StorageService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Infrastructure.Adapters.Storage
{
    public class LocalStorage : Storage, ILocalStorage
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public LocalStorage(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        
        public async Task DeleteAsync(string path)
            => File.Delete(Path.Combine(path));

        public List<string> GetFiles(string path)
        {
            DirectoryInfo directory = new(path);
            return directory.GetFiles().Select(f => f.Name).ToList();
        }

        public new bool HasFile(string path)
            => File.Exists(path);
            
        async Task<bool> CopyFileAsync(string path, IFormFile file)
        {
            try
            {
                await using FileStream fileStream = new(path, FileMode.Create, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync: true);

                await file.CopyToAsync(fileStream);
                await fileStream.FlushAsync();
                return true;
            }
            catch (Exception)
            {
                //todo log!
                throw;
            }
        }

        public async Task<(string fileName, string filePath, long fileSize)> UploadAsync(string path, IFormFile file)
        {
            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, path);

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            string fileNewName = await FileRenameAsync(path, file.FileName, HasFile);

            string filePath = Path.Combine(uploadPath, fileNewName);

            await CopyFileAsync(filePath, file);

            return (fileNewName, filePath, file.Length);
        }

        public async Task<Stream> DownloadAsync(string filePath)
        {
            if (File.Exists(filePath))
            {
                return await Task.FromResult<Stream>(new FileStream(filePath, FileMode.Open, FileAccess.Read));
            }
            
            throw new FileNotFoundException($"Dosya '{filePath}' bulunamadı.");
        }

        public async Task<IFormFile> GetFileAsync(string filePath, string fileName)
        {
            if (File.Exists(filePath))
            {
                return new FormFile(new FileStream(filePath, FileMode.Open, FileAccess.Read), 0, new FileInfo(filePath).Length, "file", fileName);
            }

            throw new FileNotFoundException($"Dosya '{fileName}' bulunamadı.");
        }
    }
}