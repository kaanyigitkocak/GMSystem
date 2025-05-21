using Application.Services.Repositories;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.GraduationProcesses.Commands.SetStudentAffairsApproved;

public class SetStudentAffairsApprovedCommandHandler : IRequestHandler<SetStudentAffairsApprovedCommand, SetStudentAffairsApprovedResponse>
{
    private readonly IGraduationProcessRepository _graduationProcessRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly INotificationRepository _notificationRepository;

    public SetStudentAffairsApprovedCommandHandler(
        IGraduationProcessRepository graduationProcessRepository,
        IStudentRepository studentRepository,
        INotificationRepository notificationRepository)
    {
        _graduationProcessRepository = graduationProcessRepository;
        _studentRepository = studentRepository;
        _notificationRepository = notificationRepository;
    }

    public async Task<SetStudentAffairsApprovedResponse> Handle(SetStudentAffairsApprovedCommand request, CancellationToken cancellationToken)
    {
        var response = new SetStudentAffairsApprovedResponse
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
                                     gp.Status == GraduationProcessStatus.PENDING_STUDENT_AFFAIRS_FINALIZATION,
                    cancellationToken: cancellationToken
                );

                if (graduationProcess == null)
                {
                    summary.Success = false;
                    summary.Message = $"Graduation process not found for student {studentId} or not in the expected state (PENDING_STUDENT_AFFAIRS_FINALIZATION).";
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
                    summary.Message = $"Student profile not found for ID {studentId}.";
                    response.FailedToProcessCount++;
                    response.ProcessSummaries.Add(summary);
                    continue;
                }

                // Update GraduationProcess - Step 1: Mark as Student Affairs Approved
                graduationProcess.Status = GraduationProcessStatus.STUDENT_AFFAIRS_APPROVED;
                graduationProcess.LastUpdateDate = DateTime.UtcNow;
                graduationProcess.StudentAffairsUserId = request.StudentAffairsUserId;
                graduationProcess.StudentAffairsReviewDate = DateTime.UtcNow;
                await _graduationProcessRepository.UpdateAsync(graduationProcess);

                // Update GraduationProcess - Step 2: Mark as Completed Graduated
                graduationProcess.Status = GraduationProcessStatus.COMPLETED_GRADUATED;
                graduationProcess.LastUpdateDate = DateTime.UtcNow; // Update timestamp again
                await _graduationProcessRepository.UpdateAsync(graduationProcess);
                summary.NewGraduationProcessStatus = graduationProcess.Status;

                // Update Student: Mark as Graduated
                student.GraduationStatus = StudentGraduationStatus.GRADUATED; // Assuming this enum value exists
                student.UpdatedDate = DateTime.UtcNow;
                await _studentRepository.UpdateAsync(student);
                summary.NewStudentGraduationStatus = student.GraduationStatus;

                // Create Notification
                Notification notification = new Notification
                {
                    Id = Guid.NewGuid(),
                    RecipientUserId = studentId,
                    Title = "Congratulations! You have Graduated!",
                    Message = $"Your graduation process has been successfully finalized by Student Affairs. You are now officially graduated! Process status: '{graduationProcess.Status.ToString()}'. Student status: '{student.GraduationStatus.ToString()}'.",
                    CreationDate = DateTime.UtcNow,
                    IsRead = false,
                    RelatedProcessId = graduationProcess.Id
                };
                await _notificationRepository.AddAsync(notification);

                summary.Success = true;
                summary.Message = $"Successfully finalized by Student Affairs and marked as graduated. Notification sent. Process: {graduationProcess.Status.ToString()}, Student: {student.GraduationStatus.ToString()}.";
                response.SuccessfullyProcessedCount++;
            }
            catch (Exception ex)
            {
                summary.Success = false;
                summary.Message = $"An unexpected error occurred for student {studentId}: {ex.Message}";
                response.FailedToProcessCount++;
            }
            response.ProcessSummaries.Add(summary);
        }

        response.OverallMessage = $"Set Student Affairs Approved batch process completed. Total: {response.TotalStudentsInRequest}, Succeeded: {response.SuccessfullyProcessedCount}, Failed: {response.FailedToProcessCount}.";
        return response;
    }
} 