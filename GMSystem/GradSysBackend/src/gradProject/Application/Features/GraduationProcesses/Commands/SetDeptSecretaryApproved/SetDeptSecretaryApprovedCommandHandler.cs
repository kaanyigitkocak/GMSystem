using Application.Services.Repositories;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.GraduationProcesses.Commands.SetDeptSecretaryApproved;

public class SetDeptSecretaryApprovedCommandHandler : IRequestHandler<SetDeptSecretaryApprovedCommand, SetDeptSecretaryApprovedResponse>
{
    private readonly IGraduationProcessRepository _graduationProcessRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly INotificationRepository _notificationRepository;

    public SetDeptSecretaryApprovedCommandHandler(
        IGraduationProcessRepository graduationProcessRepository,
        IStudentRepository studentRepository,
        INotificationRepository notificationRepository)
    {
        _graduationProcessRepository = graduationProcessRepository;
        _studentRepository = studentRepository;
        _notificationRepository = notificationRepository;
    }

    public async Task<SetDeptSecretaryApprovedResponse> Handle(SetDeptSecretaryApprovedCommand request, CancellationToken cancellationToken)
    {
        var response = new SetDeptSecretaryApprovedResponse
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
                    summary.Message = $"Graduation process not found for student {studentId}.";
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

                // Update GraduationProcess - Set department secretary as approved
                graduationProcess.Status = GraduationProcessStatus.DEPT_SECRETARY_APPROVED_PENDING_DEAN;
                graduationProcess.LastUpdateDate = DateTime.UtcNow;
                graduationProcess.DeptSecretaryUserId = request.DeptSecretaryUserId;
                graduationProcess.DeptSecretaryReviewDate = DateTime.UtcNow;
                await _graduationProcessRepository.UpdateAsync(graduationProcess);
                summary.NewGraduationProcessStatus = graduationProcess.Status;

                // Update Student
                student.GraduationStatus = StudentGraduationStatus.IN_APPROVAL_PROCESS;
                student.UpdatedDate = DateTime.UtcNow;
                await _studentRepository.UpdateAsync(student);
                summary.NewStudentGraduationStatus = student.GraduationStatus;

                // Create Notification
                Notification notification = new Notification
                {
                    Id = Guid.NewGuid(),
                    RecipientUserId = studentId,
                    Title = "Graduation Process Update: Department Secretary Approved",
                    Message = $"Your graduation process has been approved by the Department Secretary. Process status: '{graduationProcess.Status.ToString()}'. Student status: '{student.GraduationStatus.ToString()}'.",
                    CreationDate = DateTime.UtcNow,
                    IsRead = false,
                    RelatedProcessId = graduationProcess.Id
                };
                await _notificationRepository.AddAsync(notification);

                summary.Success = true;
                summary.Message = $"Successfully approved by Department Secretary. Notification sent. Process: {graduationProcess.Status.ToString()}, Student: {student.GraduationStatus.ToString()}.";
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

        response.OverallMessage = $"Set Department Secretary Approved batch process completed. Total: {response.TotalStudentsInRequest}, Succeeded: {response.SuccessfullyProcessedCount}, Failed: {response.FailedToProcessCount}.";
        return response;
    }
} 