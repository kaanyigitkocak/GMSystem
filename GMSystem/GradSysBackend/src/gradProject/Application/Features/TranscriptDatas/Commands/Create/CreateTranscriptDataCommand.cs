using Application.Features.TranscriptDatas.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.TranscriptDatas.Commands.Create;

public class CreateTranscriptDataCommand : IRequest<CreatedTranscriptDataResponse>
{
    public Guid StudentUserId { get; set; }
    public Guid SourceDocumentId { get; set; }
    public DateTime ParsingDate { get; set; }
    public decimal ParsedGpa { get; set; }
    public int ParsedEcts { get; set; }
    public bool IsValidForProcessing { get; set; }

    public class CreateTranscriptDataCommandHandler : IRequestHandler<CreateTranscriptDataCommand, CreatedTranscriptDataResponse>
    {
        private readonly IMapper _mapper;
        private readonly ITranscriptDataRepository _transcriptDataRepository;
        private readonly TranscriptDataBusinessRules _transcriptDataBusinessRules;

        public CreateTranscriptDataCommandHandler(IMapper mapper, ITranscriptDataRepository transcriptDataRepository,
                                         TranscriptDataBusinessRules transcriptDataBusinessRules)
        {
            _mapper = mapper;
            _transcriptDataRepository = transcriptDataRepository;
            _transcriptDataBusinessRules = transcriptDataBusinessRules;
        }

        public async Task<CreatedTranscriptDataResponse> Handle(CreateTranscriptDataCommand request, CancellationToken cancellationToken)
        {
            TranscriptData transcriptData = _mapper.Map<TranscriptData>(request);

            await _transcriptDataRepository.AddAsync(transcriptData);

            CreatedTranscriptDataResponse response = _mapper.Map<CreatedTranscriptDataResponse>(transcriptData);
            return response;
        }
    }
}