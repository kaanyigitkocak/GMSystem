using Domain.Enums;
using NArchitecture.Core.Persistence.Repositories;


namespace Domain.Entities
{
    public class ValidationCode : Entity<Guid>
    {
        public Guid? UserId { get; set; }
        public string Code { get; set; } = string.Empty;
        public DateTime ExpireDate { get; set; }
        public bool IsUsed { get; set; }
        public ValidationPurpose ValidationType { get; set; }
        
        public virtual User? User { get; set; }
    }
} 

