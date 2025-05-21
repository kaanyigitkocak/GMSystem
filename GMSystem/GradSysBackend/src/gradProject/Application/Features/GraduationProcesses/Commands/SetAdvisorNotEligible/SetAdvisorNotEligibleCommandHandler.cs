using Application.Services.Repositories;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.GraduationProcesses.Commands.SetAdvisorNotEligible;

public class SetAdvisorNotEligibleCommandHandler : IRequestHandler<SetAdvisorNotEligibleCommand, SetAdvisorNotEligibleResponse>
{
    private readonly IGraduationProcessRepository _graduationProcessRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly INotificationRepository _notificationRepository;

    public SetAdvisorNotEligibleCommandHandler(
        IGraduationProcessRepository graduationProcessRepository, 
        IStudentRepository studentRepository,
        INotificationRepository notificationRepository)
    {
        _graduationProcessRepository = graduationProcessRepository;
        _studentRepository = studentRepository;
        _notificationRepository = notificationRepository;
    }

    public async Task<SetAdvisorNotEligibleResponse> Handle(SetAdvisorNotEligibleCommand request, CancellationToken cancellationToken)
    {
        var response = new SetAdvisorNotEligibleResponse
        {
            TotalStudentsInRequest = request.StudentUserIds.Distinct().Count()
        };

        if (!request.StudentUserIds.Any())
        {
            response.OverallMessage = "StudentUserIds list cannot be empty.";
            return response;
        }

        foreach (var studentId in request.StudentUserIds.Distinct())
        {
            var summary = new StudentProcessSummary { StudentUserId = studentId }; 
            try
            {
                GraduationProcess? graduationProcess = await _graduationProcessRepository.GetAsync(
                    predicate: gp => gp.StudentUserId == studentId && 
                                     gp.Status == GraduationProcessStatus.TRANSCRIPT_PARSE_SUCCESSFUL_PENDING_ADVISOR_CHECK,
                    cancellationToken: cancellationToken
                );

                if (graduationProcess == null)
                {
                    summary.Success = false;
                    summary.Message = $"Graduation process not found or not in the expected state (TRANSCRIPT_PARSE_SUCCESSFUL_PENDING_ADVISOR_CHECK).";
                    response.FailedToProcessCount++;
                    response.ProcessSummaries.Add(summary);
                    continue;
                }
                summary.GraduationProcessId = graduationProcess.Id;

                Student? student = await _studentRepository.GetAsync(
                    predicate: s => s.Id == studentId,
                    cancellationToken: cancellationToken
                );

                if (student == null)
                {
                    summary.Success = false;
                    summary.Message = $"Student profile not found.";
                    response.FailedToProcessCount++;
                    response.ProcessSummaries.Add(summary);
                    continue;
                }

                // Update GraduationProcess
                graduationProcess.Status = GraduationProcessStatus.ADVISOR_NOT_ELIGIBLE;
                graduationProcess.Notes = request.RejectionReason;
                graduationProcess.LastUpdateDate = DateTime.UtcNow;
                graduationProcess.AdvisorUserId = request.AdvisorUserId;
                graduationProcess.AdvisorReviewDate = DateTime.UtcNow;
                await _graduationProcessRepository.UpdateAsync(graduationProcess);
                summary.NewGraduationProcessStatus = graduationProcess.Status;

                // Update Student
                student.GraduationStatus = StudentGraduationStatus.PENDING_ELIGIBILITY_REVIEW_BY_ADVISOR; 
                student.UpdatedDate = DateTime.UtcNow;
                await _studentRepository.UpdateAsync(student);
                summary.NewStudentGraduationStatus = student.GraduationStatus;

                // Create Notification for student
                Notification notEligibleNotification = new Notification
                {
                    Id = Guid.NewGuid(),
                    RecipientUserId = studentId,
                    Title = "Graduation Process Update: Advisor Rejection",
                    Message = $"Your graduation process has been reviewed by your advisor and was not found eligible. Reason: '{request.RejectionReason}'. The process status has been updated to '{graduationProcess.Status.ToString()}'. Your student graduation status is '{student.GraduationStatus.ToString()}'. Please make necessary corrections and restart the process or contact your advisor.",
                    CreationDate = DateTime.UtcNow,
                    IsRead = false,
                    RelatedProcessId = graduationProcess.Id
                };
                await _notificationRepository.AddAsync(notEligibleNotification);

                summary.Success = true;
                summary.Message = $"Successfully marked as not eligible by advisor. Notification sent. Reason: {request.RejectionReason}. Process: {graduationProcess.Status.ToString()}, Student: {student.GraduationStatus.ToString()}.";
                response.SuccessfullyProcessedCount++;
            }
            catch (Exception ex)
            {
                // Log ex here if a logger is available
                summary.Success = false;
                summary.Message = $"An unexpected error occurred: {ex.Message}";
                response.FailedToProcessCount++;
            }
            response.ProcessSummaries.Add(summary);
        }

        response.OverallMessage = $"Set Advisor Not Eligible batch process completed. Total: {response.TotalStudentsInRequest}, Succeeded: {response.SuccessfullyProcessedCount}, Failed: {response.FailedToProcessCount}.";
        return response;
    }
} 