using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using NArchitecture.Core.Application.Requests;
using NArchitecture.Core.Application.Responses;
using NArchitecture.Core.Persistence.Paging;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Application.Features.Students.Queries.GetList;

public class GetListStudentQuery : IRequest<GetListResponse<GetListStudentListItemDto>>
{
    public PageRequest PageRequest { get; set; }
    public GraduationProcessStatus? GraduationProcessStatus { get; set; }
    public Guid? DepartmentId { get; set; }
    public Guid? FacultyId { get; set; }

    public class GetListStudentQueryHandler : IRequestHandler<GetListStudentQuery, GetListResponse<GetListStudentListItemDto>>
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IGraduationProcessRepository _graduationProcessRepository;
        private readonly IMapper _mapper;

        public GetListStudentQueryHandler(IStudentRepository studentRepository, IGraduationProcessRepository graduationProcessRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _graduationProcessRepository = graduationProcessRepository;
            _mapper = mapper;
        }

        public async Task<GetListResponse<GetListStudentListItemDto>> Handle(GetListStudentQuery request, CancellationToken cancellationToken)
        {
            // First, handle graduation process status filter if present
            List<Guid>? filteredStudentIds = null;
            if (request.GraduationProcessStatus.HasValue)
            {
                var graduationProcesses = await _graduationProcessRepository.GetListAsync(
                    predicate: gp => gp.Status == request.GraduationProcessStatus.Value,
                    cancellationToken: cancellationToken
                );
                filteredStudentIds = graduationProcesses.Items.Select(gp => gp.StudentUserId).Distinct().ToList();
                
                // If no graduation processes match the status, return empty result
                if (!filteredStudentIds.Any())
                {
                    return new GetListResponse<GetListStudentListItemDto>
                    {
                        Items = new List<GetListStudentListItemDto>(),
                        Index = request.PageRequest.PageIndex,
                        Size = request.PageRequest.PageSize,
                        Count = 0,
                        Pages = 0,
                        HasPrevious = false,
                        HasNext = false
                    };
                }
            }

            // Build predicate based on other filters
            Expression<Func<Student, bool>>? predicate = BuildPredicate(request, filteredStudentIds);

            IPaginate<Student> students = await _studentRepository.GetListAsync(
                predicate: predicate,
                include: s => s.Include(x => x.Department)
                              .ThenInclude(d => d.Faculty)
                              .Include(x => x.User),
                index: request.PageRequest.PageIndex,
                size: request.PageRequest.PageSize,
                cancellationToken: cancellationToken
            );

            // Get active graduation processes for each student
            var studentIds = students.Items.Select(s => s.Id).ToList();
            var activeGraduationProcesses = await _graduationProcessRepository.GetListAsync(
                predicate: gp => studentIds.Contains(gp.StudentUserId),
                orderBy: gp => gp.OrderByDescending(x => x.LastUpdateDate),
                cancellationToken: cancellationToken
            );

            // Group by student and get the latest process for each
            var latestProcessesByStudent = activeGraduationProcesses.Items
                .GroupBy(gp => gp.StudentUserId)
                .ToDictionary(g => g.Key, g => g.OrderByDescending(p => p.LastUpdateDate).First());

            // Map to DTOs and include graduation process information
            var studentDtos = students.Items.Select(student =>
            {
                var dto = _mapper.Map<GetListStudentListItemDto>(student);
                
                // Add active graduation process information if exists
                if (latestProcessesByStudent.TryGetValue(student.Id, out var activeProcess))
                {
                    dto.ActiveGraduationProcessId = activeProcess.Id;
                    dto.ActiveGraduationProcessStatus = activeProcess.Status;
                    dto.ActiveGraduationProcessAcademicTerm = activeProcess.AcademicTerm;
                    dto.ActiveGraduationProcessInitiationDate = activeProcess.InitiationDate;
                    dto.ActiveGraduationProcessLastUpdateDate = activeProcess.LastUpdateDate;
                }
                
                return dto;
            }).ToList();

            return new GetListResponse<GetListStudentListItemDto>
            {
                Items = studentDtos,
                Index = students.Index,
                Size = students.Size,
                Count = students.Count,
                Pages = students.Pages,
                HasPrevious = students.HasPrevious,
                HasNext = students.HasNext
            };
        }

        private Expression<Func<Student, bool>>? BuildPredicate(GetListStudentQuery request, List<Guid>? graduationProcessFilteredStudentIds)
        {
            var predicates = new List<Expression<Func<Student, bool>>>();

            // Filter by graduation process status (if we have filtered student IDs)
            if (graduationProcessFilteredStudentIds != null)
            {
                predicates.Add(s => graduationProcessFilteredStudentIds.Contains(s.Id));
            }

            // Filter by department
            if (request.DepartmentId.HasValue)
            {
                predicates.Add(s => s.DepartmentId == request.DepartmentId.Value);
            }

            // Filter by faculty (through department)
            if (request.FacultyId.HasValue)
            {
                predicates.Add(s => s.Department.FacultyId == request.FacultyId.Value);
            }

            // Combine all predicates with AND logic
            if (!predicates.Any())
                return null;

            Expression<Func<Student, bool>> combinedPredicate = predicates.First();
            foreach (var predicate in predicates.Skip(1))
            {
                var parameter = Expression.Parameter(typeof(Student), "s");
                var left = Expression.Invoke(combinedPredicate, parameter);
                var right = Expression.Invoke(predicate, parameter);
                var andExpression = Expression.AndAlso(left, right);
                combinedPredicate = Expression.Lambda<Func<Student, bool>>(andExpression, parameter);
            }

            return combinedPredicate;
        }
    }
}