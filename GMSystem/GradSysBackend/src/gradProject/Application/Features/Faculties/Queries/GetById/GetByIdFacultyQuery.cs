using Application.Features.Faculties.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.Faculties.Queries.GetById;

public class GetByIdFacultyQuery : IRequest<GetByIdFacultyResponse>
{
    public Guid Id { get; set; }

    public class GetByIdFacultyQueryHandler : IRequestHandler<GetByIdFacultyQuery, GetByIdFacultyResponse>
    {
        private readonly IMapper _mapper;
        private readonly IFacultyRepository _facultyRepository;
        private readonly FacultyBusinessRules _facultyBusinessRules;

        public GetByIdFacultyQueryHandler(IMapper mapper, IFacultyRepository facultyRepository, FacultyBusinessRules facultyBusinessRules)
        {
            _mapper = mapper;
            _facultyRepository = facultyRepository;
            _facultyBusinessRules = facultyBusinessRules;
        }

        public async Task<GetByIdFacultyResponse> Handle(GetByIdFacultyQuery request, CancellationToken cancellationToken)
        {
            Faculty? faculty = await _facultyRepository.GetAsync(predicate: f => f.Id == request.Id, cancellationToken: cancellationToken);
            await _facultyBusinessRules.FacultyShouldExistWhenSelected(faculty);

            GetByIdFacultyResponse response = _mapper.Map<GetByIdFacultyResponse>(faculty);
            return response;
        }
    }
}