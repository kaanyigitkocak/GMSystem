using MediatR;
using Application.Services.Repositories;
using Domain.Entities;
using Domain.Enums; // Enumlar için eklendi
using System;
using System.Linq; // GetListAsync sonrası ToList için
using System.Threading;
using System.Threading.Tasks;
using NArchitecture.Core.Persistence.Paging; // IPaginate için
using System.Collections.Generic; // List için eklendi

namespace Application.Features.GraduationProcesses.Commands.StartForAllStudents;

public class StartGraduationForAllStudentsCommand : IRequest<StartedGraduationForAllStudentsResponse>
{
    public string AcademicTerm { get; set; }
    public Guid InitiatedByUserId { get; set; } // Süreci başlatan ÖİDB personeli ID'si

    public class StartGraduationForAllStudentsCommandHandler : IRequestHandler<StartGraduationForAllStudentsCommand, StartedGraduationForAllStudentsResponse>
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IGraduationProcessRepository _graduationProcessRepository;
        private readonly INotificationRepository _notificationRepository;
        private readonly IUserRepository _userRepository; // Roller ve kullanıcı detayları için

        public StartGraduationForAllStudentsCommandHandler(
            IStudentRepository studentRepository, 
            IGraduationProcessRepository graduationProcessRepository, 
            INotificationRepository notificationRepository,
            IUserRepository userRepository)
        {
            _studentRepository = studentRepository;
            _graduationProcessRepository = graduationProcessRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
        }

        public async Task<StartedGraduationForAllStudentsResponse> Handle(StartGraduationForAllStudentsCommand request, CancellationToken cancellationToken)
        {
            IPaginate<Student> students = await _studentRepository.GetListAsync(
                predicate: s => s.User != null, // Removed s.User.IsActive check
                cancellationToken: cancellationToken
            );

            int processedCount = 0;
            List<Notification> notificationsToSend = new List<Notification>();

            foreach (var student in students.Items)
            {
                GraduationProcess newGraduationProcess = new GraduationProcess(
                    id: Guid.NewGuid(),
                    studentUserId: student.Id,
                    term: request.AcademicTerm,
                    initDate: DateTime.UtcNow,
                    initialStatus: GraduationProcessStatus.AWAITING_DEPT_SECRETARY_TRANSCRIPT_UPLOAD,
                    lastUpdate: DateTime.UtcNow
                );
                await _graduationProcessRepository.AddAsync(newGraduationProcess);

                student.GraduationStatus = StudentGraduationStatus.GRADUATION_PROCESS_INITIATED_AWAITING_TRANSCRIPT;
                await _studentRepository.UpdateAsync(student);
                processedCount++;

                // Notification to Student
                notificationsToSend.Add(CreateNotification(
                    recipientUserId: student.Id, 
                    title: "Graduation Process Started", 
                    message: $"Dear {student.User?.FirstName} {student.User?.LastName}, your graduation process for the {request.AcademicTerm} term has been initiated. The first step is for your department secretary to upload your transcript.",
                    relatedProcessId: newGraduationProcess.Id
                ));

                // Notification to Advisor (if any)
                if (student.AssignedAdvisorUserId.HasValue)
                {
                    notificationsToSend.Add(CreateNotification(
                        recipientUserId: student.AssignedAdvisorUserId.Value,
                        title: "Student Graduation Process Started",
                        message: $"The graduation process for your advisee {student.User?.FirstName} {student.User?.LastName} ({student.StudentNumber}) for the {request.AcademicTerm} term has been initiated.",
                        relatedProcessId: newGraduationProcess.Id
                    ));
                }

                // TODO: Notification to Department Secretary 
                // (Requires fetching secretary based on student.DepartmentId and specific role)
            }
            
            // General Notification to all active users (excluding the initiator if desired)
            IPaginate<User> allActiveUsers = await _userRepository.GetListAsync(
                predicate: u => u.IsActive && u.Id != request.InitiatedByUserId, // Exclude the user who initiated the process
                cancellationToken: cancellationToken
            );

            foreach (var user in allActiveUsers.Items)
            {
                notificationsToSend.Add(CreateNotification(
                    recipientUserId: user.Id,
                    title: "System-Wide: Graduation Processes Initiated",
                    message: $"Graduation processes for the {request.AcademicTerm} term have been initiated for eligible students. Please check relevant sections for any pending tasks or information.",
                    relatedProcessId: null // General notification, not tied to a specific process
                ));
            }

            if(notificationsToSend.Any())
                await _notificationRepository.AddRangeAsync(notificationsToSend);

            return new StartedGraduationForAllStudentsResponse 
            { 
                ProcessedStudentCount = processedCount, 
                Message = $"Graduation process successfully started for {processedCount} students. Relevant notifications have been generated."
            };
        }

        private Notification CreateNotification(Guid recipientUserId, string title, string message, Guid? relatedProcessId)
        {
            return new Notification
            {
                Id = Guid.NewGuid(),
                RecipientUserId = recipientUserId,
                Title = title,
                Message = message,
                IsRead = false,
                CreationDate = DateTime.UtcNow,
                RelatedProcessId = relatedProcessId
            };
        }


    }
} 