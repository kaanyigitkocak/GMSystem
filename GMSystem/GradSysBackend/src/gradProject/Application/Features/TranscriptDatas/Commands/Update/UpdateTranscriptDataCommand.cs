using Application.Features.TranscriptDatas.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.TranscriptDatas.Commands.Update;

public class UpdateTranscriptDataCommand : IRequest<UpdatedTranscriptDataResponse>
{
    public Guid Id { get; set; }
    public Guid StudentUserId { get; set; }
    public Guid SourceDocumentId { get; set; }
    public DateTime ParsingDate { get; set; }
    public decimal ParsedGpa { get; set; }
    public int ParsedEcts { get; set; }
    public bool IsValidForProcessing { get; set; }

    public class UpdateTranscriptDataCommandHandler : IRequestHandler<UpdateTranscriptDataCommand, UpdatedTranscriptDataResponse>
    {
        private readonly IMapper _mapper;
        private readonly ITranscriptDataRepository _transcriptDataRepository;
        private readonly TranscriptDataBusinessRules _transcriptDataBusinessRules;

        public UpdateTranscriptDataCommandHandler(IMapper mapper, ITranscriptDataRepository transcriptDataRepository,
                                         TranscriptDataBusinessRules transcriptDataBusinessRules)
        {
            _mapper = mapper;
            _transcriptDataRepository = transcriptDataRepository;
            _transcriptDataBusinessRules = transcriptDataBusinessRules;
        }

        public async Task<UpdatedTranscriptDataResponse> Handle(UpdateTranscriptDataCommand request, CancellationToken cancellationToken)
        {
            TranscriptData? transcriptData = await _transcriptDataRepository.GetAsync(predicate: td => td.Id == request.Id, cancellationToken: cancellationToken);
            await _transcriptDataBusinessRules.TranscriptDataShouldExistWhenSelected(transcriptData);
            transcriptData = _mapper.Map(request, transcriptData);

            await _transcriptDataRepository.UpdateAsync(transcriptData!);

            UpdatedTranscriptDataResponse response = _mapper.Map<UpdatedTranscriptDataResponse>(transcriptData);
            return response;
        }
    }
}