using Application.SubServices.StorageService;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Adapters.Storage
{
    public class AzureStorage : Storage, IAzureStorage
    {
        private readonly string _connectionString;
        private readonly string _containerName;
        private BlobContainerClient _blobContainerClient;

        // IConfiguration üzerinden appsettings.json içinde tanımladığınızı varsayıyoruz
        // Ör: "AzureStorage": { "ConnectionString": "DefaultEndpointsProtocol=...", "ContainerName": "checklistfiles" }
        public AzureStorage(IConfiguration configuration)
        {
            _connectionString = configuration.GetSection("AzureStorage:ConnectionString").Value;
            _containerName = configuration.GetSection("AzureStorage:ContainerName").Value;

            InitializeBlobContainer();
        }

        private void InitializeBlobContainer()
        {
            // BlobServiceClient üzerinden container referansını oluşturuyoruz
            BlobServiceClient blobServiceClient = new BlobServiceClient(_connectionString);
            _blobContainerClient = blobServiceClient.GetBlobContainerClient(_containerName);

            // Container yoksa oluşturabilirsiniz (isteğe bağlı)
            // _blobContainerClient.CreateIfNotExists();
        }


        public async Task DeleteAsync(string filePath)
        {
            BlobClient blobClient = _blobContainerClient.GetBlobClient(filePath);
            await blobClient.DeleteIfExistsAsync();
        }

        /// <summary>
        /// Container içindeki dosyaları listeler
        /// pathOrContainerName bir "prefix" görevi görebilir.
        /// </summary>
        // public List<string> GetFiles(string pathOrContainerName)
        // {
        //     var fileList = new List<string>(); 

        //     // pathOrContainerName prefix olarak kullanılır
        //     var blobItems = _blobContainerClient.GetBlobsAsync(
        //         prefix: string.IsNullOrEmpty(pathOrContainerName) ? null : pathOrContainerName
        //     );

        //     // Senkron listelemek isterseniz, AsEnumerable().Result vs. kullanılabilir ama
        //     // asenkron döngü (await foreach) daha modern bir yaklaşım
        //     var task = Task.Run(async () =>
        //     {
        //         await foreach (var blobItem in blobItems)
        //         {
        //             // blobItem.Name içerisinde "Klasör/Dosya" şeklinde gelebilir
        //             fileList.Add(blobItem.Name);
        //         }
        //     });
        //     task.Wait();

        //     return fileList;
        // }


        public new bool HasFile(string filePath)
        {

            BlobClient blobClient = _blobContainerClient.GetBlobClient(filePath);
            return blobClient.Exists().Value;
        }


        //pathOrContainerName cvs, certificates, courses, diplomas etc.
        public async Task<(string fileName, string filePath, long fileSize)> UploadAsync(string pathOrContainerName, IFormFile file)
        {
            string fileNewName = await FileRenameAsync(pathOrContainerName, file.FileName, HasFile);

            string blobName = $"{pathOrContainerName}/{fileNewName}";

            BlobClient blobClient = _blobContainerClient.GetBlobClient(blobName);

            using (Stream uploadStream = file.OpenReadStream())
            {
                await blobClient.UploadAsync(uploadStream, overwrite: true);
            }

            return (fileNewName, blobName, file.Length);
        }

        public async Task<Stream> DownloadAsync(string filePath)
        {

            BlobClient blobClient = _blobContainerClient.GetBlobClient(filePath);

            if (await blobClient.ExistsAsync())
            {
                var downloadInfo = await blobClient.DownloadAsync();
                return downloadInfo.Value.Content;
            }
            else
            {
                throw new FileNotFoundException($"Blob '{filePath}' was not found.");
            }
        }


        // GetFileAsync method added
        public async Task<IFormFile> GetFileAsync(string filePath, string fileName)
        {


            BlobClient blobClient = _blobContainerClient.GetBlobClient(filePath);
            if (await blobClient.ExistsAsync())
            {
                var downloadInfo = await blobClient.DownloadAsync();
                return new FormFile(downloadInfo.Value.Content, 0, downloadInfo.Value.Content.Length, "File", fileName);
            }
            else
            {
                throw new FileNotFoundException($"Blob '{filePath}' was not found.");
            }
        }






    }
}