using Application.Features.Faculties.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Faculties.Commands.Create;

public class CreateFacultyCommand : IRequest<CreatedFacultyResponse>
{
    public string Name { get; set; }

    public class CreateFacultyCommandHandler : IRequestHandler<CreateFacultyCommand, CreatedFacultyResponse>
    {
        private readonly IMapper _mapper;
        private readonly IFacultyRepository _facultyRepository;
        private readonly FacultyBusinessRules _facultyBusinessRules;

        public CreateFacultyCommandHandler(IMapper mapper, IFacultyRepository facultyRepository,
                                         FacultyBusinessRules facultyBusinessRules)
        {
            _mapper = mapper;
            _facultyRepository = facultyRepository;
            _facultyBusinessRules = facultyBusinessRules;
        }

        public async Task<CreatedFacultyResponse> Handle(CreateFacultyCommand request, CancellationToken cancellationToken)
        {
            Faculty faculty = _mapper.Map<Faculty>(request);

            await _facultyRepository.AddAsync(faculty);

            CreatedFacultyResponse response = _mapper.Map<CreatedFacultyResponse>(faculty);
            return response;
        }
    }
}