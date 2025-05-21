using NArchitecture.Core.Persistence.Repositories;
using Domain.Enums; // Namespace düzeltildi

namespace Domain.Entities; // Namespace düzeltildi

public class RankingListEntry : Entity<Guid> // listEntryId olacak primary key
{
    // listEntryId (Guid, Primary Key) -> Id
    public Guid RankingListId { get; set; }
    public Guid StudentUserId { get; set; } // User with StudentProfile
    public int Rank { get; set; }
    public decimal GpaAtRanking { get; set; }
    public HonourStatus HonourStatus { get; set; }

    // Navigation Properties
    public virtual RankingList RankingList { get; set; }
    public virtual User StudentUser { get; set; }

    public RankingListEntry() { }

    public RankingListEntry(Guid id, Guid rankingListId, Guid studentUserId, int rank, decimal gpaAtRanking, HonourStatus honourStatus)
    {
        Id = id;
        RankingListId = rankingListId;
        StudentUserId = studentUserId;
        Rank = rank;
        GpaAtRanking = gpaAtRanking;
        HonourStatus = honourStatus;
    }
} 