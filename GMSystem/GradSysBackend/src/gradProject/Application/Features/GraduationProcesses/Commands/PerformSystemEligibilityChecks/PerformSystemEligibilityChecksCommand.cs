using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Services.Repositories;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore; // Include ve ThenInclude için
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types; // BusinessException için
using System.Collections.Generic;

namespace Application.Features.GraduationProcesses.Commands.PerformSystemEligibilityChecks;

public class PerformSystemEligibilityChecksCommand : IRequest<PerformedSystemEligibilityChecksResponse>
{
    public List<Guid> StudentUserIds { get; set; } // Tekil StudentUserId yerine Liste
    // public Guid TriggeredByUserId { get; set; } // İsteğe bağlı, işlemi tetikleyen sistem/kullanıcı

    public PerformSystemEligibilityChecksCommand()
    {
        StudentUserIds = new List<Guid>();
    }
}

public class PerformSystemEligibilityChecksCommandHandler : IRequestHandler<PerformSystemEligibilityChecksCommand, PerformedSystemEligibilityChecksResponse>
{
    private readonly IGraduationProcessRepository _graduationProcessRepository;
    private readonly IGraduationRequirementSetRepository _graduationRequirementSetRepository;
    private readonly ICourseTakenRepository _courseTakenRepository;
    private readonly IEligibilityCheckResultRepository _eligibilityCheckResultRepository;
    // IStudentRepository ve IRequirementMandatoryCourseRepository'ye direkt ihtiyaç olmayabilir, navigasyonlarla erişilebilir.

    public PerformSystemEligibilityChecksCommandHandler(
        IGraduationProcessRepository graduationProcessRepository, 
        IGraduationRequirementSetRepository graduationRequirementSetRepository, 
        ICourseTakenRepository courseTakenRepository, 
        IEligibilityCheckResultRepository eligibilityCheckResultRepository)
    {
        _graduationProcessRepository = graduationProcessRepository;
        _graduationRequirementSetRepository = graduationRequirementSetRepository;
        _courseTakenRepository = courseTakenRepository;
        _eligibilityCheckResultRepository = eligibilityCheckResultRepository;
    }

    public async Task<PerformedSystemEligibilityChecksResponse> Handle(PerformSystemEligibilityChecksCommand request, CancellationToken cancellationToken)
    {
        var response = new PerformedSystemEligibilityChecksResponse
        {
            TotalProcessesInRequest = request.StudentUserIds.Count
        };

        foreach (var studentId in request.StudentUserIds)
        {
            ProcessCheckSummary currentProcessSummary = new ProcessCheckSummary { StudentUserId = studentId };
            try
            {
                // Öğrencinin TRANSCRIPT_PARSE_SUCCESSFUL_PENDING_ADVISOR_CHECK statüsündeki mezuniyet sürecini bul
                GraduationProcess? graduationProcess = await _graduationProcessRepository.GetAsync(
                    predicate: gp => gp.StudentUserId == studentId && 
                                     gp.Status == GraduationProcessStatus.TRANSCRIPT_PARSE_SUCCESSFUL_PENDING_ADVISOR_CHECK,
                    include: q => q.Include(gp => gp.StudentUser).ThenInclude(u => u.StudentProfile!),
                    cancellationToken: cancellationToken
                );

                if (graduationProcess == null) 
                {
                    currentProcessSummary.IsSuccess = false;
                    currentProcessSummary.Message = $"No active graduation process (pending advisor check) found for student ID {studentId}.";
                    response.ProcessSummaries.Add(currentProcessSummary);
                    response.FailedToProcessCount++;
                    continue; // Bir sonraki öğrenciye geç
                }
                currentProcessSummary.GraduationProcessId = graduationProcess.Id;
                
                if (graduationProcess.StudentUser?.StudentProfile == null)
                {
                    currentProcessSummary.IsSuccess = false;
                    currentProcessSummary.Message = $"Student profile for student ID {studentId} (process ID {graduationProcess.Id}) not found.";
                    response.ProcessSummaries.Add(currentProcessSummary);
                    response.FailedToProcessCount++;
                    continue;
                }

                Student studentProfile = graduationProcess.StudentUser.StudentProfile;
                GraduationRequirementSet? requirementSet = await _graduationRequirementSetRepository.GetAsync(
                    predicate: rs => rs.DepartmentId == studentProfile.DepartmentId && rs.AcademicTerm == graduationProcess.AcademicTerm,
                    include: q => q.Include(rs => rs.MandatoryCourses).ThenInclude(mc => mc.Course),
                    cancellationToken: cancellationToken
                );

                if (requirementSet == null) 
                {
                    currentProcessSummary.IsSuccess = false;
                    currentProcessSummary.Message = $"Graduation requirement set for department {studentProfile.DepartmentId} and term {graduationProcess.AcademicTerm} (student ID {studentId}) not found.";
                    response.ProcessSummaries.Add(currentProcessSummary);
                    response.FailedToProcessCount++;
                    continue;
                }

                List<CourseTaken> coursesTaken = (await _courseTakenRepository.GetListAsync(
                    predicate: ct => ct.StudentUserId == studentProfile.Id && ct.MatchedCourseId != null,
                    include: q => q.Include(ct => ct.MatchedCourse),
                    cancellationToken: cancellationToken
                )).Items.ToList();
                
                List<EligibilityCheckResult> resultsToCreate = new List<EligibilityCheckResult>();
                DateTime checkDate = DateTime.UtcNow;
                bool currentProcessOverallSuccess = true;

                // 1. GPA Check
                bool gpaMet = (studentProfile.CurrentGpa ?? 0) >= requirementSet.MinGpa;
                resultsToCreate.Add(new EligibilityCheckResult(Guid.NewGuid(), graduationProcess.Id, EligibilityCheckType.GPA, gpaMet, (studentProfile.CurrentGpa ?? 0).ToString("F2"), requirementSet.MinGpa.ToString("F2"), checkDate));
                if (!gpaMet) currentProcessOverallSuccess = false;

                // 2. Total ECTS Check
                bool ectsMet = (studentProfile.CurrentEctsCompleted ?? 0) >= requirementSet.TotalMinEcts;
                resultsToCreate.Add(new EligibilityCheckResult(Guid.NewGuid(), graduationProcess.Id, EligibilityCheckType.TOTAL_ECTS, ectsMet, (studentProfile.CurrentEctsCompleted ?? 0).ToString(), requirementSet.TotalMinEcts.ToString(), checkDate));
                if (!ectsMet) currentProcessOverallSuccess = false;
                
                // 3. Mandatory Courses Check
                var requiredMandatoryCourses = requirementSet.MandatoryCourses.Select(mc => mc.CourseId).ToList();
                var passedMandatoryCoursesCount = coursesTaken.Where(ct => ct.IsSuccessfullyCompleted && ct.MatchedCourseId.HasValue && requiredMandatoryCourses.Contains(ct.MatchedCourseId.Value)).DistinctBy(ct => ct.MatchedCourseId).Count();
                List<string> missingMandatoryCodes = requirementSet.MandatoryCourses.Where(mc => !coursesTaken.Any(ct => ct.MatchedCourseId == mc.CourseId && ct.IsSuccessfullyCompleted)).Select(mc => mc.Course?.CourseCode ?? mc.CourseId.ToString()).ToList();
                bool mandatoryMet = missingMandatoryCodes.Count == 0 && passedMandatoryCoursesCount >= requiredMandatoryCourses.Count;
                resultsToCreate.Add(new EligibilityCheckResult(Guid.NewGuid(), graduationProcess.Id, EligibilityCheckType.MANDATORY_COURSES, mandatoryMet, $"{passedMandatoryCoursesCount}/{requiredMandatoryCourses.Count} completed", $"{requiredMandatoryCourses.Count}/{requiredMandatoryCourses.Count} required", checkDate, missingMandatoryCodes.Any() ? "Missing or failed: " + string.Join(", ", missingMandatoryCodes) : null));
                if (!mandatoryMet) currentProcessOverallSuccess = false;

                Func<CourseType, int> countPassedElectives = (courseType) => coursesTaken.Count(ct => ct.IsSuccessfullyCompleted && ct.MatchedCourse?.CourseType == courseType);
                
                // 4. Technical Electives Check
                if (requirementSet.MinTechnicalElectiveCoursesCount.HasValue) 
                {
                    bool techElectivesMet = countPassedElectives(CourseType.ELECTIVE_TECHNICAL) >= requirementSet.MinTechnicalElectiveCoursesCount.Value;
                    resultsToCreate.Add(new EligibilityCheckResult(Guid.NewGuid(), graduationProcess.Id, EligibilityCheckType.TECHNICAL_ELECTIVES, techElectivesMet, countPassedElectives(CourseType.ELECTIVE_TECHNICAL).ToString(), requirementSet.MinTechnicalElectiveCoursesCount.Value.ToString(), checkDate)); 
                    if (!techElectivesMet) currentProcessOverallSuccess = false;
                }

                // 5. Non-Technical Electives Check
                if (requirementSet.MinNonTechnicalElectiveCoursesCount.HasValue) 
                {
                    bool nonTechElectivesMet = countPassedElectives(CourseType.ELECTIVE_NON_TECHNICAL) >= requirementSet.MinNonTechnicalElectiveCoursesCount.Value;
                    resultsToCreate.Add(new EligibilityCheckResult(Guid.NewGuid(), graduationProcess.Id, EligibilityCheckType.NON_TECHNICAL_ELECTIVES, nonTechElectivesMet, countPassedElectives(CourseType.ELECTIVE_NON_TECHNICAL).ToString(), requirementSet.MinNonTechnicalElectiveCoursesCount.Value.ToString(), checkDate));
                    if (!nonTechElectivesMet) currentProcessOverallSuccess = false;
                }
                
                // TODO: University Electives Check (MinUniversityElectiveCoursesCount)
                // if (requirementSet.MinUniversityElectiveCoursesCount.HasValue) { ... if(!univElectivesMet) currentProcessOverallSuccess = false; }

                if (resultsToCreate.Any())
                    await _eligibilityCheckResultRepository.AddRangeAsync(resultsToCreate);
                
                currentProcessSummary.IsSuccess = currentProcessOverallSuccess;
                currentProcessSummary.ChecksPerformedCount = resultsToCreate.Count;
                currentProcessSummary.EligibilityCheckResultIds = resultsToCreate.Select(r => r.Id).ToList();
                currentProcessSummary.Message = currentProcessOverallSuccess 
                    ? $"System eligibility checks performed successfully. {resultsToCreate.Count} checks created."
                    : $"System eligibility checks performed. Some criteria were not met. {resultsToCreate.Count} checks created.";
                response.SuccessfullyProcessedCount++;
            }
            catch (Exception ex) // Catch broader exceptions for robustness in batch
            {
                // Log the exception ex (e.g., using ILogger)
                currentProcessSummary.IsSuccess = false;
                currentProcessSummary.Message = $"An unexpected error occurred for student ID {studentId}: {ex.Message}";
                response.FailedToProcessCount++;
            }
            response.ProcessSummaries.Add(currentProcessSummary);
        }

        response.OverallMessage = $"Batch eligibility check process completed. Total students in request: {response.TotalProcessesInRequest}, Succeeded: {response.SuccessfullyProcessedCount}, Failed: {response.FailedToProcessCount}.";
        return response;
    }
} 