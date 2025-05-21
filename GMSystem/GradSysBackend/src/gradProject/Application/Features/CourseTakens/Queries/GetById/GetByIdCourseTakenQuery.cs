using Application.Features.CourseTakens.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.CourseTakens.Queries.GetById;

public class GetByIdCourseTakenQuery : IRequest<GetByIdCourseTakenResponse>
{
    public Guid Id { get; set; }

    public class GetByIdCourseTakenQueryHandler : IRequestHandler<GetByIdCourseTakenQuery, GetByIdCourseTakenResponse>
    {
        private readonly IMapper _mapper;
        private readonly ICourseTakenRepository _courseTakenRepository;
        private readonly CourseTakenBusinessRules _courseTakenBusinessRules;

        public GetByIdCourseTakenQueryHandler(IMapper mapper, ICourseTakenRepository courseTakenRepository, CourseTakenBusinessRules courseTakenBusinessRules)
        {
            _mapper = mapper;
            _courseTakenRepository = courseTakenRepository;
            _courseTakenBusinessRules = courseTakenBusinessRules;
        }

        public async Task<GetByIdCourseTakenResponse> Handle(GetByIdCourseTakenQuery request, CancellationToken cancellationToken)
        {
            CourseTaken? courseTaken = await _courseTakenRepository.GetAsync(predicate: ct => ct.Id == request.Id, cancellationToken: cancellationToken);
            await _courseTakenBusinessRules.CourseTakenShouldExistWhenSelected(courseTaken);

            GetByIdCourseTakenResponse response = _mapper.Map<GetByIdCourseTakenResponse>(courseTaken);
            return response;
        }
    }
}