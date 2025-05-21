using Application.Services.Repositories;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.GraduationProcesses.Commands.SetDeptSecretaryRejected;

public class SetDeptSecretaryRejectedCommandHandler : IRequestHandler<SetDeptSecretaryRejectedCommand, SetDeptSecretaryRejectedResponse>
{
    private readonly IGraduationProcessRepository _graduationProcessRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly INotificationRepository _notificationRepository;

    public SetDeptSecretaryRejectedCommandHandler(
        IGraduationProcessRepository graduationProcessRepository,
        IStudentRepository studentRepository,
        INotificationRepository notificationRepository)
    {
        _graduationProcessRepository = graduationProcessRepository;
        _studentRepository = studentRepository;
        _notificationRepository = notificationRepository;
    }

    public async Task<SetDeptSecretaryRejectedResponse> Handle(SetDeptSecretaryRejectedCommand request, CancellationToken cancellationToken)
    {
        var response = new SetDeptSecretaryRejectedResponse
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
                                     gp.Status == GraduationProcessStatus.PENDING_DEPT_SECRETARY_APPROVAL,
                    cancellationToken: cancellationToken
                );

                if (graduationProcess == null)
                {
                    summary.Success = false;
                    summary.Message = $"Graduation process not found for student {studentId} or not in the expected state (PENDING_DEPT_SECRETARY_APPROVAL).";
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

                // Update GraduationProcess
                graduationProcess.Status = GraduationProcessStatus.DEPT_SECRETARY_REJECTED_PROCESS;
                graduationProcess.LastUpdateDate = DateTime.UtcNow;
                graduationProcess.DeptSecretaryUserId = request.DeptSecretaryUserId;
                graduationProcess.DeptSecretaryReviewDate = DateTime.UtcNow;
                graduationProcess.Notes = request.RejectionReason; 
                await _graduationProcessRepository.UpdateAsync(graduationProcess);
                summary.NewGraduationProcessStatus = graduationProcess.Status;

                // Update Student Status
                // If Dept Secretary rejects, the process likely needs re-evaluation from advisor stage or student needs to correct fundamental issues.
                student.GraduationStatus = StudentGraduationStatus.PENDING_ELIGIBILITY_REVIEW_BY_ADVISOR; 
                student.UpdatedDate = DateTime.UtcNow;
                await _studentRepository.UpdateAsync(student);
                summary.NewStudentGraduationStatus = student.GraduationStatus;

                // Create Notification
                Notification notification = new Notification
                {
                    Id = Guid.NewGuid(),
                    RecipientUserId = studentId,
                    Title = "Graduation Process Update: Department Secretary Rejected",
                    Message = $"Your graduation process has been rejected by the Department Secretary. Reason: '{request.RejectionReason}'. Process status: '{graduationProcess.Status.ToString()}'. Student status: '{student.GraduationStatus.ToString()}'. Please contact the department secretary or your advisor for next steps.",
                    CreationDate = DateTime.UtcNow,
                    IsRead = false,
                    RelatedProcessId = graduationProcess.Id
                };
                await _notificationRepository.AddAsync(notification);

                summary.Success = true;
                summary.Message = $"Successfully rejected by Department Secretary. Notification sent. Reason: {request.RejectionReason}. Process: {graduationProcess.Status.ToString()}, Student: {student.GraduationStatus.ToString()}.";
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

        response.OverallMessage = $"Set Department Secretary Rejected batch process completed. Total: {response.TotalStudentsInRequest}, Succeeded: {response.SuccessfullyProcessedCount}, Failed: {response.FailedToProcessCount}.";
        return response;
    }
} 