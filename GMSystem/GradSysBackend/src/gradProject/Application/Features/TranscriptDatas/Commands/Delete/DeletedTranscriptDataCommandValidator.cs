using FluentValidation;

namespace Application.Features.TranscriptDatas.Commands.Delete;

public class DeleteTranscriptDataCommandValidator : AbstractValidator<DeleteTranscriptDataCommand>
{
    public DeleteTranscriptDataCommandValidator()
    {
        RuleFor(c => c.Id).NotEmpty();
    }
}