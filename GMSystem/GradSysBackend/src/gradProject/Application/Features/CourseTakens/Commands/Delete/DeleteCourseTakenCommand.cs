using Application.Features.CourseTakens.Constants;
using Application.Features.CourseTakens.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.CourseTakens.Commands.Delete;

public class DeleteCourseTakenCommand : IRequest<DeletedCourseTakenResponse>
{
    public Guid Id { get; set; }

    public class DeleteCourseTakenCommandHandler : IRequestHandler<DeleteCourseTakenCommand, DeletedCourseTakenResponse>
    {
        private readonly IMapper _mapper;
        private readonly ICourseTakenRepository _courseTakenRepository;
        private readonly CourseTakenBusinessRules _courseTakenBusinessRules;

        public DeleteCourseTakenCommandHandler(IMapper mapper, ICourseTakenRepository courseTakenRepository,
                                         CourseTakenBusinessRules courseTakenBusinessRules)
        {
            _mapper = mapper;
            _courseTakenRepository = courseTakenRepository;
            _courseTakenBusinessRules = courseTakenBusinessRules;
        }

        public async Task<DeletedCourseTakenResponse> Handle(DeleteCourseTakenCommand request, CancellationToken cancellationToken)
        {
            CourseTaken? courseTaken = await _courseTakenRepository.GetAsync(predicate: ct => ct.Id == request.Id, cancellationToken: cancellationToken);
            await _courseTakenBusinessRules.CourseTakenShouldExistWhenSelected(courseTaken);

            await _courseTakenRepository.DeleteAsync(courseTaken!);

            DeletedCourseTakenResponse response = _mapper.Map<DeletedCourseTakenResponse>(courseTaken);
            return response;
        }
    }
}