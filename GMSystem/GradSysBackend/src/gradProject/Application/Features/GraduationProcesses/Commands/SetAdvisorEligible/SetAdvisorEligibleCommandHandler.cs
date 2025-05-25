using Application.Services.Repositories;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NArchitecture.Core.CrossCuttingConcerns.Exception.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.GraduationProcesses.Commands.SetAdvisorEligible;

public class SetAdvisorEligibleCommandHandler : IRequestHandler<SetAdvisorEligibleCommand, SetAdvisorEligibleResponse>
{
    private readonly IGraduationProcessRepository _graduationProcessRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly INotificationRepository _notificationRepository;

    public SetAdvisorEligibleCommandHandler(
        IGraduationProcessRepository graduationProcessRepository, 
        IStudentRepository studentRepository,
        INotificationRepository notificationRepository)
    {
        _graduationProcessRepository = graduationProcessRepository;
        _studentRepository = studentRepository;
        _notificationRepository = notificationRepository;
    }

    public async Task<SetAdvisorEligibleResponse> Handle(SetAdvisorEligibleCommand request, CancellationToken cancellationToken)
    {
        var response = new SetAdvisorEligibleResponse
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
                    predicate: gp => gp.StudentUserId == studentId,
                    cancellationToken: cancellationToken
                );

                if (graduationProcess == null)
                {
                    summary.Success = false;
                    summary.Message = $"Graduation process not found for student.";
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

                // Update GraduationProcess - Set advisor as eligible
                graduationProcess.Status = GraduationProcessStatus.ADVISOR_ELIGIBLE;
                graduationProcess.LastUpdateDate = DateTime.UtcNow;
                graduationProcess.AdvisorUserId = request.AdvisorUserId;
                graduationProcess.AdvisorReviewDate = DateTime.UtcNow;
                await _graduationProcessRepository.UpdateAsync(graduationProcess);
                summary.NewGraduationProcessStatus = graduationProcess.Status;

                // Update Student
                student.GraduationStatus = StudentGraduationStatus.IN_APPROVAL_PROCESS;
                student.UpdatedDate = DateTime.UtcNow;
                await _studentRepository.UpdateAsync(student);
                summary.NewStudentGraduationStatus = student.GraduationStatus;

                // Create Notification for student
                Notification eligibleNotification = new Notification
                {
                    Id = Guid.NewGuid(),
                    RecipientUserId = studentId,
                    Title = "Graduation Process Update: Advisor Approved",
                    Message = $"Your graduation process has been reviewed and approved by your advisor. The process status has been updated to '{graduationProcess.Status.ToString()}'. Your student graduation status has been updated to '{student.GraduationStatus.ToString()}'.",
                    CreationDate = DateTime.UtcNow,
                    IsRead = false,
                    RelatedProcessId = graduationProcess.Id
                };
                await _notificationRepository.AddAsync(eligibleNotification);

                summary.Success = true;
                summary.Message = $"Successfully marked as eligible by advisor. Notification sent. Process: {graduationProcess.Status.ToString()}, Student: {student.GraduationStatus.ToString()}.";
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

        response.OverallMessage = $"Set Advisor Eligible batch process completed. Total: {response.TotalStudentsInRequest}, Succeeded: {response.SuccessfullyProcessedCount}, Failed: {response.FailedToProcessCount}.";
        return response;
    }
} 