using Application.Features.Students.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Students.Queries.GetById;

public class GetByIdStudentQuery : IRequest<GetByIdStudentResponse>
{
    public Guid Id { get; set; }

    public class GetByIdStudentQueryHandler : IRequestHandler<GetByIdStudentQuery, GetByIdStudentResponse>
    {
        private readonly IMapper _mapper;
        private readonly IStudentRepository _studentRepository;
        private readonly IGraduationProcessRepository _graduationProcessRepository;
        private readonly StudentBusinessRules _studentBusinessRules;

        public GetByIdStudentQueryHandler(IMapper mapper, IStudentRepository studentRepository, IGraduationProcessRepository graduationProcessRepository, StudentBusinessRules studentBusinessRules)
        {
            _mapper = mapper;
            _studentRepository = studentRepository;
            _graduationProcessRepository = graduationProcessRepository;
            _studentBusinessRules = studentBusinessRules;
        }

        public async Task<GetByIdStudentResponse> Handle(GetByIdStudentQuery request, CancellationToken cancellationToken)
        {
            Student? student = await _studentRepository.GetAsync(
                predicate: s => s.Id == request.Id, 
                include: s => s.Include(x => x.User),
                cancellationToken: cancellationToken
            );
            await _studentBusinessRules.StudentShouldExistWhenSelected(student);

            // Get graduation process for this student
            GraduationProcess? graduationProcess = await _graduationProcessRepository.GetAsync(
                predicate: gp => gp.StudentUserId == request.Id,
                cancellationToken: cancellationToken
            );

            GetByIdStudentResponse response = _mapper.Map<GetByIdStudentResponse>(student);
            
            // Map graduation process information if exists
            if (graduationProcess != null)
            {
                response.GraduationProcess = _mapper.Map<GraduationProcessInfo>(graduationProcess);
            }

            return response;
        }
    }
}