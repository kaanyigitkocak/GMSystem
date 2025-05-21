using Application.Features.Faculties.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Faculties.Commands.Update;

public class UpdateFacultyCommand : IRequest<UpdatedFacultyResponse>
{
    public Guid Id { get; set; }
    public string Name { get; set; }

    public class UpdateFacultyCommandHandler : IRequestHandler<UpdateFacultyCommand, UpdatedFacultyResponse>
    {
        private readonly IMapper _mapper;
        private readonly IFacultyRepository _facultyRepository;
        private readonly FacultyBusinessRules _facultyBusinessRules;

        public UpdateFacultyCommandHandler(IMapper mapper, IFacultyRepository facultyRepository,
                                         FacultyBusinessRules facultyBusinessRules)
        {
            _mapper = mapper;
            _facultyRepository = facultyRepository;
            _facultyBusinessRules = facultyBusinessRules;
        }

        public async Task<UpdatedFacultyResponse> Handle(UpdateFacultyCommand request, CancellationToken cancellationToken)
        {
            Faculty? faculty = await _facultyRepository.GetAsync(predicate: f => f.Id == request.Id, cancellationToken: cancellationToken);
            await _facultyBusinessRules.FacultyShouldExistWhenSelected(faculty);
            faculty = _mapper.Map(request, faculty);

            await _facultyRepository.UpdateAsync(faculty!);

            UpdatedFacultyResponse response = _mapper.Map<UpdatedFacultyResponse>(faculty);
            return response;
        }
    }
}