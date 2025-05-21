using Application.Features.CourseTakens.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.CourseTakens.Commands.Create;

public class CreateCourseTakenCommand : IRequest<CreatedCourseTakenResponse>
{
    public Guid StudentUserId { get; set; }
    public string CourseCodeInTranscript { get; set; }
    public string CourseNameInTranscript { get; set; }
    public Guid? MatchedCourseId { get; set; }
    public string Grade { get; set; }
    public string SemesterTaken { get; set; }
    public int CreditsEarned { get; set; }
    public bool IsSuccessfullyCompleted { get; set; }

    public class CreateCourseTakenCommandHandler : IRequestHandler<CreateCourseTakenCommand, CreatedCourseTakenResponse>
    {
        private readonly IMapper _mapper;
        private readonly ICourseTakenRepository _courseTakenRepository;
        private readonly CourseTakenBusinessRules _courseTakenBusinessRules;

        public CreateCourseTakenCommandHandler(IMapper mapper, ICourseTakenRepository courseTakenRepository,
                                         CourseTakenBusinessRules courseTakenBusinessRules)
        {
            _mapper = mapper;
            _courseTakenRepository = courseTakenRepository;
            _courseTakenBusinessRules = courseTakenBusinessRules;
        }

        public async Task<CreatedCourseTakenResponse> Handle(CreateCourseTakenCommand request, CancellationToken cancellationToken)
        {
            CourseTaken courseTaken = _mapper.Map<CourseTaken>(request);

            await _courseTakenRepository.AddAsync(courseTaken);

            CreatedCourseTakenResponse response = _mapper.Map<CreatedCourseTakenResponse>(courseTaken);
            return response;
        }
    }
}