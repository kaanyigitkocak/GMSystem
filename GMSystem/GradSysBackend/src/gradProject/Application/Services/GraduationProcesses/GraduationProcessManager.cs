using Application.Features.GraduationProcesses.Rules;
using Application.Services.Repositories;
using NArchitecture.Core.Persistence.Paging;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Application.Services.GraduationProcesses;

public class GraduationProcessManager : IGraduationProcessService
{
    private readonly IGraduationProcessRepository _graduationProcessRepository;
    private readonly GraduationProcessBusinessRules _graduationProcessBusinessRules;

    public GraduationProcessManager(IGraduationProcessRepository graduationProcessRepository, GraduationProcessBusinessRules graduationProcessBusinessRules)
    {
        _graduationProcessRepository = graduationProcessRepository;
        _graduationProcessBusinessRules = graduationProcessBusinessRules;
    }

    public async Task<GraduationProcess?> GetAsync(
        Expression<Func<GraduationProcess, bool>> predicate,
        Func<IQueryable<GraduationProcess>, IIncludableQueryable<GraduationProcess, object>>? include = null,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        GraduationProcess? graduationProcess = await _graduationProcessRepository.GetAsync(predicate, include, withDeleted, enableTracking, cancellationToken);
        return graduationProcess;
    }

    public async Task<IPaginate<GraduationProcess>?> GetListAsync(
        Expression<Func<GraduationProcess, bool>>? predicate = null,
        Func<IQueryable<GraduationProcess>, IOrderedQueryable<GraduationProcess>>? orderBy = null,
        Func<IQueryable<GraduationProcess>, IIncludableQueryable<GraduationProcess, object>>? include = null,
        int index = 0,
        int size = 10,
        bool withDeleted = false,
        bool enableTracking = true,
        CancellationToken cancellationToken = default
    )
    {
        IPaginate<GraduationProcess> graduationProcessList = await _graduationProcessRepository.GetListAsync(
            predicate,
            orderBy,
            include,
            index,
            size,
            withDeleted,
            enableTracking,
            cancellationToken
        );
        return graduationProcessList;
    }

    public async Task<GraduationProcess> AddAsync(GraduationProcess graduationProcess)
    {
        GraduationProcess addedGraduationProcess = await _graduationProcessRepository.AddAsync(graduationProcess);

        return addedGraduationProcess;
    }

    public async Task<GraduationProcess> UpdateAsync(GraduationProcess graduationProcess)
    {
        GraduationProcess updatedGraduationProcess = await _graduationProcessRepository.UpdateAsync(graduationProcess);

        return updatedGraduationProcess;
    }

    public async Task<GraduationProcess> DeleteAsync(GraduationProcess graduationProcess, bool permanent = false)
    {
        GraduationProcess deletedGraduationProcess = await _graduationProcessRepository.DeleteAsync(graduationProcess);

        return deletedGraduationProcess;
    }
}
