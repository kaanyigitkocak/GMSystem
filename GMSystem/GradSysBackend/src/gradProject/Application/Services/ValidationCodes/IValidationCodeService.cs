using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.ValidationCodes;

public interface IValidationCodeService
{
    Task<ValidationCode?> GetAsync(
        Expression<Func<ValidationCode, bool>> predicate,
        Func<IQueryable<ValidationCode>, IIncludableQueryable<ValidationCode, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<IPaginate<ValidationCode>?> GetListAsync(
        Expression<Func<ValidationCode, bool>>? predicate = null,
        Func<IQueryable<ValidationCode>, IOrderedQueryable<ValidationCode>>? orderBy = null,
        Func<IQueryable<ValidationCode>, IIncludableQueryable<ValidationCode, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    );
    Task<ValidationCode> AddAsync(ValidationCode validationCode);
    Task<ValidationCode> UpdateAsync(ValidationCode validationCode);
    Task<ValidationCode> DeleteAsync(ValidationCode validationCode, bool permanent = false);
}
