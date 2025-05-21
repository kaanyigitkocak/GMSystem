using Application.Features.Faculties.Constants;
using Application.Features.Faculties.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Faculties.Commands.Delete;

public class DeleteFacultyCommand : IRequest<DeletedFacultyResponse>
{
    public Guid Id { get; set; }

    public class DeleteFacultyCommandHandler : IRequestHandler<DeleteFacultyCommand, DeletedFacultyResponse>
    {
        private readonly IMapper _mapper;
        private readonly IFacultyRepository _facultyRepository;
        private readonly FacultyBusinessRules _facultyBusinessRules;

        public DeleteFacultyCommandHandler(IMapper mapper, IFacultyRepository facultyRepository,
                                         FacultyBusinessRules facultyBusinessRules)
        {
            _mapper = mapper;
            _facultyRepository = facultyRepository;
            _facultyBusinessRules = facultyBusinessRules;
        }

        public async Task<DeletedFacultyResponse> Handle(DeleteFacultyCommand request, CancellationToken cancellationToken)
        {
            Faculty? faculty = await _facultyRepository.GetAsync(predicate: f => f.Id == request.Id, cancellationToken: cancellationToken);
            await _facultyBusinessRules.FacultyShouldExistWhenSelected(faculty);

            await _facultyRepository.DeleteAsync(faculty!);

            DeletedFacultyResponse response = _mapper.Map<DeletedFacultyResponse>(faculty);
            return response;
        }
    }
}