using NArchitecture.Core.Persistence.Repositories;

namespace Domain.Entities;

public class RankingListCriteria : Entity<Guid> // rankingListCriteriaId olacak primary key
{
    // rankingListCriteriaId (Guid, Primary Key) -> Id
    public Guid RankingListId { get; set; }
    public string CriteriaName { get; set; }
    public string CriteriaValue { get; set; }

    // Navigation Properties
    public virtual RankingList RankingList { get; set; }

    public RankingListCriteria() { }

    public RankingListCriteria(Guid id, Guid rankingListId, string criteriaName, string criteriaValue)
    {
        Id = id;
        RankingListId = rankingListId;
        CriteriaName = criteriaName;
        CriteriaValue = criteriaValue;
    }
} 