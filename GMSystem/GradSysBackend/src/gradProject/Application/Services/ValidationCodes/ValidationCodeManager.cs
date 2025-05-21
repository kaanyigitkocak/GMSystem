using Application.Features.ValidationCodes.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.ValidationCodes;

public class ValidationCodeManager : IValidationCodeService
{
    private readonly IValidationCodeRepository _validationCodeRepository;
    private readonly ValidationCodeBusinessRules _validationCodeBusinessRules;

    public ValidationCodeManager(IValidationCodeRepository validationCodeRepository, ValidationCodeBusinessRules validationCodeBusinessRules)
    {
        _validationCodeRepository = validationCodeRepository;
        _validationCodeBusinessRules = validationCodeBusinessRules;
    }

    public async Task<ValidationCode?> GetAsync(
        Expression<Func<ValidationCode, bool>> predicate,
        Func<IQueryable<ValidationCode>, IIncludableQueryable<ValidationCode, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        ValidationCode? validationCode = await _validationCodeRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return validationCode;
    }

    public async Task<IPaginate<ValidationCode>?> GetListAsync(
        Expression<Func<ValidationCode, bool>>? predicate = null,
        Func<IQueryable<ValidationCode>, IOrderedQueryable<ValidationCode>>? orderBy = null,
        Func<IQueryable<ValidationCode>, IIncludableQueryable<ValidationCode, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<ValidationCode> validationCodeList = await _validationCodeRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return validationCodeList;
    }

    public async Task<ValidationCode> AddAsync(ValidationCode validationCode)
    {
        ValidationCode addedValidationCode = await _validationCodeRepository.AddAsync(validationCode);

        return addedValidationCode;
    }

    public async Task<ValidationCode> UpdateAsync(ValidationCode validationCode)
    {
        ValidationCode updatedValidationCode = await _validationCodeRepository.UpdateAsync(validationCode);

        return updatedValidationCode;
    }

    public async Task<ValidationCode> DeleteAsync(ValidationCode validationCode, bool permanent = false)
    {
        ValidationCode deletedValidationCode = await _validationCodeRepository.DeleteAsync(validationCode);

        return deletedValidationCode;
    }
}
