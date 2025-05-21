using Application.Services.Repositories;
using Domain.Entities;
using NArchitecture.Core.Persistence.Repositories;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class ValidationCodeRepository : EfRepositoryBase<ValidationCode, Guid, BaseDbContext>, IValidationCodeRepository
{
    public ValidationCodeRepository(BaseDbContext context) : base(context)
    {
    }
}