using FluentValidation;

namespace Application.Features.RankingLists.Commands.Create;

public class CreateRankingListCommandValidator : AbstractValidator<CreateRankingListCommand>
{
    public CreateRankingListCommandValidator()
    {
        RuleFor(c => c.ListType).NotEmpty();
        RuleFor(c => c.ScopeDepartmentId).NotEmpty();
        RuleFor(c => c.ScopeFacultyId).NotEmpty();
        RuleFor(c => c.AcademicTerm).NotEmpty();
        RuleFor(c => c.GenerationDate).NotEmpty();
        RuleFor(c => c.GeneratedByUserId).NotEmpty();
        RuleFor(c => c.PrimarySortField).NotEmpty();
        RuleFor(c => c.SortOrder).NotEmpty();
        RuleFor(c => c.MinGpaForInclusion).NotEmpty();
    }
}