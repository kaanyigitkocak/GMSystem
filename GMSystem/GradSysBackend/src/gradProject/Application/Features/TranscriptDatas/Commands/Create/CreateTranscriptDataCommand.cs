using Application.Features.TranscriptDatas.Rules;
using Application.Services.Repositories;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Features.TranscriptDatas.Commands.Create;

public class CreateTranscriptDataCommand : IRequest<CreatedTranscriptDataResponse>
{
    public Guid StudentUserId { get; set; }
    public decimal ParsedGpa { get; set; }
    public int ParsedEcts { get; set; }
    public bool IsValidForProcessing { get; set; } = true;

    public class CreateTranscriptDataCommandHandler : IRequestHandler<CreateTranscriptDataCommand, CreatedTranscriptDataResponse>
    {
        private readonly IMapper _mapper;
        private readonly ITranscriptDataRepository _transcriptDataRepository;
        private readonly IStudentRepository _studentRepository;
        private readonly TranscriptDataBusinessRules _transcriptDataBusinessRules;

        public CreateTranscriptDataCommandHandler(IMapper mapper, ITranscriptDataRepository transcriptDataRepository,
                                         IStudentRepository studentRepository,
                                         TranscriptDataBusinessRules transcriptDataBusinessRules)
        {
            _mapper = mapper;
            _transcriptDataRepository = transcriptDataRepository;
            _studentRepository = studentRepository;
            _transcriptDataBusinessRules = transcriptDataBusinessRules;
        }

        public async Task<CreatedTranscriptDataResponse> Handle(CreateTranscriptDataCommand request, CancellationToken cancellationToken)
        {
            TranscriptData transcriptData = _mapper.Map<TranscriptData>(request);

            await _transcriptDataRepository.AddAsync(transcriptData);

            Student? student = await _studentRepository.GetAsync(s => s.Id == request.StudentUserId, cancellationToken: cancellationToken);
            if (student != null)
            {
                student.CurrentGpa = request.ParsedGpa;
                student.CurrentEctsCompleted = request.ParsedEcts;
                await _studentRepository.UpdateAsync(student);
            }

            CreatedTranscriptDataResponse response = _mapper.Map<CreatedTranscriptDataResponse>(transcriptData);
            return response;
        }
    }
}