using Application.Features.CourseTakens.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.CourseTakens.Commands.Update;

public class UpdateCourseTakenCommand : IRequest<UpdatedCourseTakenResponse>
{
    public Guid Id { get; set; }
    public Guid StudentUserId { get; set; }
    public string CourseCodeInTranscript { get; set; }
    public string CourseNameInTranscript { get; set; }
    public Guid? MatchedCourseId { get; set; }
    public string Grade { get; set; }
    public string SemesterTaken { get; set; }
    public int CreditsEarned { get; set; }
    public bool IsSuccessfullyCompleted { get; set; }

    public class UpdateCourseTakenCommandHandler : IRequestHandler<UpdateCourseTakenCommand, UpdatedCourseTakenResponse>
    {
        private readonly IMapper _mapper;
        private readonly ICourseTakenRepository _courseTakenRepository;
        private readonly CourseTakenBusinessRules _courseTakenBusinessRules;

        public UpdateCourseTakenCommandHandler(IMapper mapper, ICourseTakenRepository courseTakenRepository,
                                         CourseTakenBusinessRules courseTakenBusinessRules)
        {
            _mapper = mapper;
            _courseTakenRepository = courseTakenRepository;
            _courseTakenBusinessRules = courseTakenBusinessRules;
        }

        public async Task<UpdatedCourseTakenResponse> Handle(UpdateCourseTakenCommand request, CancellationToken cancellationToken)
        {
            CourseTaken? courseTaken = await _courseTakenRepository.GetAsync(predicate: ct => ct.Id == request.Id, cancellationToken: cancellationToken);
            await _courseTakenBusinessRules.CourseTakenShouldExistWhenSelected(courseTaken);
            courseTaken = _mapper.Map(request, courseTaken);

            await _courseTakenRepository.UpdateAsync(courseTaken!);

            UpdatedCourseTakenResponse response = _mapper.Map<UpdatedCourseTakenResponse>(courseTaken);
            return response;
        }
    }
}