namespace Application.SubServices.StorageService
{
    public interface IStorageService : IStorage
    {
        public string StorageName { get; }
    }
} 