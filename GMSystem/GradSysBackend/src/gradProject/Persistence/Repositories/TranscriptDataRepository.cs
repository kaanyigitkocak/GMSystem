using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class TranscriptDataRepository : EfRepositoryBase<TranscriptData, Guid, BaseDbContext>, ITranscriptDataRepository
{
    public TranscriptDataRepository(BaseDbContext context) : base(context)
    {
    }
}