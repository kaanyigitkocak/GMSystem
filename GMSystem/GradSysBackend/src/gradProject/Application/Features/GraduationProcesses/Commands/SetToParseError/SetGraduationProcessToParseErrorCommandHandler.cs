using Application.Services.Repositories;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.GraduationProcesses.Commands.SetToParseError;

public class SetGraduationProcessToParseErrorCommandHandler : IRequestHandler<SetGraduationProcessToParseErrorCommand, SetGraduationProcessToParseErrorResponse>
{
    private readonly IGraduationProcessRepository _graduationProcessRepository;
    private readonly IStudentRepository _studentRepository;

    public SetGraduationProcessToParseErrorCommandHandler(
        IGraduationProcessRepository graduationProcessRepository, 
        IStudentRepository studentRepository)
    {
        _graduationProcessRepository = graduationProcessRepository;
        _studentRepository = studentRepository;
    }

    public async Task<SetGraduationProcessToParseErrorResponse> Handle(SetGraduationProcessToParseErrorCommand request, CancellationToken cancellationToken)
    {
        var response = new SetGraduationProcessToParseErrorResponse();

        if (request.StudentUserIds == null || !request.StudentUserIds.Any())
        {
            response.Message = "StudentUserIds list cannot be null or empty.";
            return response;
        }
        response.TotalStudentIdsInRequest = request.StudentUserIds.Distinct().Count();

        List<GraduationProcess> processesToUpdate = new List<GraduationProcess>();
        List<Student> studentsToUpdate = new List<Student>();

        foreach (var studentId in request.StudentUserIds.Distinct())
        {
            var student = await _studentRepository.GetAsync(
                predicate: s => s.Id == studentId, // Assuming Student.UserId exists
                cancellationToken: cancellationToken);

            if (student == null)
            {
                response.NotFoundStudentUserIds.Add(studentId);
                continue;
            }

            var graduationProcess = await _graduationProcessRepository.GetAsync(
                predicate: gp => gp.StudentUserId == studentId, // Assuming GraduationProcess.IsActive exists
                cancellationToken: cancellationToken);

            if (graduationProcess == null)
            {
                response.NotFoundStudentUserIds.Add(studentId); // Student found, but no active process
                continue;
            }

            if (graduationProcess.Status == GraduationProcessStatus.TRANSCRIPT_PARSE_ERROR_AWAITING_REUPLOAD)
            {
                response.AlreadyInTargetStateStudentUserIds.Add(studentId);
                continue;
            }

            graduationProcess.Status = GraduationProcessStatus.TRANSCRIPT_PARSE_ERROR_AWAITING_REUPLOAD;
            graduationProcess.LastUpdateDate = DateTime.UtcNow;
            // graduationProcess.LastUpdatedByUserId = request.ProcessedByUserId; // Optional
            if (!string.IsNullOrEmpty(request.ErrorReason))
            {
                // Assuming GraduationProcess entity has an 'ErrorDetails' or similar field
                // graduationProcess.ErrorDetails = request.ErrorReason; 
            }
            processesToUpdate.Add(graduationProcess);

            student.GraduationStatus = StudentGraduationStatus.GRADUATION_PROCESS_INITIATED_AWAITING_TRANSCRIPT;
            // student.LastUpdatedByUserId = request.ProcessedByUserId; // Optional
            // student.LastUpdatedDate = DateTime.UtcNow; // Optional
            studentsToUpdate.Add(student);
            
            response.SuccessfullyProcessedCount++;
        }

        if (processesToUpdate.Any())
        {
            await _graduationProcessRepository.UpdateRangeAsync(processesToUpdate);
        }

        if (studentsToUpdate.Any())
        {
            await _studentRepository.UpdateRangeAsync(studentsToUpdate);
        }
        
        if (response.SuccessfullyProcessedCount > 0 || response.FailedToProcessCount > 0 || response.AlreadyInTargetStateStudentUserIds.Any())
        {
            response.Message = $"Set to Parse Error process completed. Processed: {response.SuccessfullyProcessedCount}, Failed/Not Applicable: {response.FailedToProcessCount + response.AlreadyInTargetStateStudentUserIds.Count}. See ID lists for details.";
        }
        else
        {
            response.Message = "No students were processed. The list might have been empty or no students matched the criteria.";
        }

        return response;
    }
} 