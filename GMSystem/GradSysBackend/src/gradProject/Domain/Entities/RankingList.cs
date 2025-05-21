using NArchitecture.Core.Persistence.Repositories;
using Domain.Enums; // Namespace düzeltildi
using System.Collections.Generic; // HashSet için eklendi

namespace Domain.Entities; // Namespace düzeltildi

public class RankingList : Entity<Guid> // rankingListId olacak primary key
{
    // rankingListId (Guid, Primary Key) -> Id
    public RankingListType ListType { get; set; } // PascalCase
    public Guid? ScopeDepartmentId { get; set; } // _fk kaldırıldı, PascalCase
    public Guid? ScopeFacultyId { get; set; } // _fk kaldırıldı, PascalCase
    public string AcademicTerm { get; set; } // PascalCase
    public DateTime GenerationDate { get; set; } // PascalCase
    public Guid GeneratedByUserId { get; set; } // _fk kaldırıldı, PascalCase
    public string PrimarySortField { get; set; } // PascalCase
    public string SortOrder { get; set; } // PascalCase
    public decimal? MinGpaForInclusion { get; set; } // PascalCase

    // Navigation Properties
    public virtual Department? ScopeDepartment { get; set; }
    public virtual Faculty? ScopeFaculty { get; set; }
    public virtual User GeneratedByUser { get; set; }
    public virtual ICollection<RankingListCriteria> Criteria { get; set; } = new HashSet<RankingListCriteria>();
    public virtual ICollection<RankingListEntry> Entries { get; set; } = new HashSet<RankingListEntry>();


    public RankingList() { }

    public RankingList(Guid id, RankingListType listType, string academicTerm, DateTime generationDate, Guid generatedByUserId, string primarySortField, string sortOrder)
    {
        Id = id;
        ListType = listType;
        AcademicTerm = academicTerm;
        GenerationDate = generationDate;
        GeneratedByUserId = generatedByUserId;
        PrimarySortField = primarySortField;
        SortOrder = sortOrder;
        Criteria = new HashSet<RankingListCriteria>();
        Entries = new HashSet<RankingListEntry>();
    }
} 