using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class CourseTakenRepository : EfRepositoryBase<CourseTaken, Guid, BaseDbContext>, ICourseTakenRepository
{
    public CourseTakenRepository(BaseDbContext context) : base(context)
    {
    }
}