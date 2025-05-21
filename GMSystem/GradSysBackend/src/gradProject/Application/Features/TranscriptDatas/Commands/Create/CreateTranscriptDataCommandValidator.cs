using FluentValidation;

namespace Application.Features.TranscriptDatas.Commands.Create;

public class CreateTranscriptDataCommandValidator : AbstractValidator<CreateTranscriptDataCommand>
{
    public CreateTranscriptDataCommandValidator()
    {
        RuleFor(c => c.StudentUserId).NotEmpty();
        RuleFor(c => c.SourceDocumentId).NotEmpty();
        RuleFor(c => c.ParsingDate).NotEmpty();
        RuleFor(c => c.ParsedGpa).NotEmpty();
        RuleFor(c => c.ParsedEcts).NotEmpty();
        RuleFor(c => c.IsValidForProcessing).NotEmpty();
    }
}