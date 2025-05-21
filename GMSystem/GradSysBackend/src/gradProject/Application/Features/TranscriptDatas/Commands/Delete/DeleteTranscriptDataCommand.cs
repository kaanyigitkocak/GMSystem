using Application.Features.TranscriptDatas.Constants;
using Application.Features.TranscriptDatas.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.TranscriptDatas.Commands.Delete;

public class DeleteTranscriptDataCommand : IRequest<DeletedTranscriptDataResponse>
{
    public Guid Id { get; set; }

    public class DeleteTranscriptDataCommandHandler : IRequestHandler<DeleteTranscriptDataCommand, DeletedTranscriptDataResponse>
    {
        private readonly IMapper _mapper;
        private readonly ITranscriptDataRepository _transcriptDataRepository;
        private readonly TranscriptDataBusinessRules _transcriptDataBusinessRules;

        public DeleteTranscriptDataCommandHandler(IMapper mapper, ITranscriptDataRepository transcriptDataRepository,
                                         TranscriptDataBusinessRules transcriptDataBusinessRules)
        {
            _mapper = mapper;
            _transcriptDataRepository = transcriptDataRepository;
            _transcriptDataBusinessRules = transcriptDataBusinessRules;
        }

        public async Task<DeletedTranscriptDataResponse> Handle(DeleteTranscriptDataCommand request, CancellationToken cancellationToken)
        {
            TranscriptData? transcriptData = await _transcriptDataRepository.GetAsync(predicate: td => td.Id == request.Id, cancellationToken: cancellationToken);
            await _transcriptDataBusinessRules.TranscriptDataShouldExistWhenSelected(transcriptData);

            await _transcriptDataRepository.DeleteAsync(transcriptData!);

            DeletedTranscriptDataResponse response = _mapper.Map<DeletedTranscriptDataResponse>(transcriptData);
            return response;
        }
    }
}