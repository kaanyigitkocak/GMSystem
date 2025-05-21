using Application.Features.RequirementMandatoryCourses.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.RequirementMandatoryCourses;

public class RequirementMandatoryCourseManager : IRequirementMandatoryCourseService
{
    private readonly IRequirementMandatoryCourseRepository _requirementMandatoryCourseRepository;
    private readonly RequirementMandatoryCourseBusinessRules _requirementMandatoryCourseBusinessRules;

    public RequirementMandatoryCourseManager(IRequirementMandatoryCourseRepository requirementMandatoryCourseRepository, RequirementMandatoryCourseBusinessRules requirementMandatoryCourseBusinessRules)
    {
        _requirementMandatoryCourseRepository = requirementMandatoryCourseRepository;
        _requirementMandatoryCourseBusinessRules = requirementMandatoryCourseBusinessRules;
    }

    public async Task<RequirementMandatoryCourse?> GetAsync(
        Expression<Func<RequirementMandatoryCourse, bool>> predicate,
        Func<IQueryable<RequirementMandatoryCourse>, IIncludableQueryable<RequirementMandatoryCourse, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        RequirementMandatoryCourse? requirementMandatoryCourse = await _requirementMandatoryCourseRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return requirementMandatoryCourse;
    }

    public async Task<IPaginate<RequirementMandatoryCourse>?> GetListAsync(
        Expression<Func<RequirementMandatoryCourse, bool>>? predicate = null,
        Func<IQueryable<RequirementMandatoryCourse>, IOrderedQueryable<RequirementMandatoryCourse>>? orderBy = null,
        Func<IQueryable<RequirementMandatoryCourse>, IIncludableQueryable<RequirementMandatoryCourse, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<RequirementMandatoryCourse> requirementMandatoryCourseList = await _requirementMandatoryCourseRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return requirementMandatoryCourseList;
    }

    public async Task<RequirementMandatoryCourse> AddAsync(RequirementMandatoryCourse requirementMandatoryCourse)
    {
        RequirementMandatoryCourse addedRequirementMandatoryCourse = await _requirementMandatoryCourseRepository.AddAsync(requirementMandatoryCourse);

        return addedRequirementMandatoryCourse;
    }

    public async Task<RequirementMandatoryCourse> UpdateAsync(RequirementMandatoryCourse requirementMandatoryCourse)
    {
        RequirementMandatoryCourse updatedRequirementMandatoryCourse = await _requirementMandatoryCourseRepository.UpdateAsync(requirementMandatoryCourse);

        return updatedRequirementMandatoryCourse;
    }

    public async Task<RequirementMandatoryCourse> DeleteAsync(RequirementMandatoryCourse requirementMandatoryCourse, bool permanent = false)
    {
        RequirementMandatoryCourse deletedRequirementMandatoryCourse = await _requirementMandatoryCourseRepository.DeleteAsync(requirementMandatoryCourse);

        return deletedRequirementMandatoryCourse;
    }
}
