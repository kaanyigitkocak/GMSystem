using System;
using Domain.Enums; // GraduationProcessStatus için

namespace Application.Features.GraduationProcesses.Queries.GetList;

public class GetListGraduationProcessListItemDto
{
    public Guid Id { get; set; }
    public Guid StudentUserId { get; set; }
    public string AcademicTerm { get; set; }
    public DateTime InitiationDate { get; set; }
    public GraduationProcessStatus Status { get; set; }
    public DateTime LastUpdateDate { get; set; }
    // İleride öğrenci adı gibi ek bilgiler eklenebilir.
    // public string StudentFullName { get; set; }
} 