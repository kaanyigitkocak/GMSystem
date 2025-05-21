using Application.Features.TranscriptDatas.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.TranscriptDatas.Queries.GetById;

public class GetByIdTranscriptDataQuery : IRequest<GetByIdTranscriptDataResponse>
{
    public Guid Id { get; set; }

    public class GetByIdTranscriptDataQueryHandler : IRequestHandler<GetByIdTranscriptDataQuery, GetByIdTranscriptDataResponse>
    {
        private readonly IMapper _mapper;
        private readonly ITranscriptDataRepository _transcriptDataRepository;
        private readonly TranscriptDataBusinessRules _transcriptDataBusinessRules;

        public GetByIdTranscriptDataQueryHandler(IMapper mapper, ITranscriptDataRepository transcriptDataRepository, TranscriptDataBusinessRules transcriptDataBusinessRules)
        {
            _mapper = mapper;
            _transcriptDataRepository = transcriptDataRepository;
            _transcriptDataBusinessRules = transcriptDataBusinessRules;
        }

        public async Task<GetByIdTranscriptDataResponse> Handle(GetByIdTranscriptDataQuery request, CancellationToken cancellationToken)
        {
            TranscriptData? transcriptData = await _transcriptDataRepository.GetAsync(predicate: td => td.Id == request.Id, cancellationToken: cancellationToken);
            await _transcriptDataBusinessRules.TranscriptDataShouldExistWhenSelected(transcriptData);

            GetByIdTranscriptDataResponse response = _mapper.Map<GetByIdTranscriptDataResponse>(transcriptData);
            return response;
        }
    }
}