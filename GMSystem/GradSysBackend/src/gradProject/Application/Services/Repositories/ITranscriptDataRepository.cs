using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;

namespace Application.Services.Repositories;

public interface ITranscriptDataRepository : IAsyncRepository<TranscriptData, Guid>, IRepository<TranscriptData, Guid>
{
}