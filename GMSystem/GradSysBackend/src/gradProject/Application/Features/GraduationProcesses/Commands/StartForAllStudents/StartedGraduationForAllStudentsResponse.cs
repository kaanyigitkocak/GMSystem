using NArchitecture.Core.Application.Responses;

namespace Application.Features.GraduationProcesses.Commands.StartForAllStudents;

public class StartedGraduationForAllStudentsResponse : IResponse
{
    public int ProcessedStudentCount { get; set; }
    public string Message { get; set; }
} 