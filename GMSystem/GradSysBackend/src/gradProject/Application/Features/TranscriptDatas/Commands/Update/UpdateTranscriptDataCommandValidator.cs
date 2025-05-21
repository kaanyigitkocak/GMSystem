using FluentValidation;

namespace Application.Features.TranscriptDatas.Commands.Update;

public class UpdateTranscriptDataCommandValidator : AbstractValidator<UpdateTranscriptDataCommand>
{
    public UpdateTranscriptDataCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
        RuleFor(c => c.StudentUserId).NotEmpty();
        RuleFor(c => c.SourceDocumentId).NotEmpty();
        RuleFor(c => c.ParsingDate).NotEmpty();
        RuleFor(c => c.ParsedGpa).NotEmpty();
        RuleFor(c => c.ParsedEcts).NotEmpty();
        RuleFor(c => c.IsValidForProcessing).NotEmpty();
    }
}