using Domain.Entities;
using System;
using System.Collections.Generic;

namespace Persistence.Seeds
{
    public static class FacultySeeds
    {
        // Sabit fakülte ID'leri
        public static readonly Guid EngineeringFacultyId = new("10000000-0000-0000-0000-000000000001");
        public static readonly Guid ScienceFacultyId = new("10000000-0000-0000-0000-000000000002");
        public static readonly Guid ArchitectureFacultyId = new("10000000-0000-0000-0000-000000000003");
        public static readonly Guid SchoolOfForeignLanguagesFacultyId = new("10000000-0000-0000-0000-000000000004");
        public static readonly Guid FacultyOfGeneralStudiesId = new("10000000-0000-0000-0000-000000000005");

        public static IEnumerable<Faculty> GetSeeds()
        {
            return new List<Faculty>
            {
                new Faculty
                {
                    Id = EngineeringFacultyId,
                    Name = "Faculty of Engineering",
                    CreatedDate = DateTime.Now
                },
                new Faculty
                {
                    Id = ScienceFacultyId,
                    Name = "Faculty of Science",
                    CreatedDate = DateTime.Now
                },
                new Faculty
                {
                    Id = ArchitectureFacultyId,
                    Name = "Faculty of Architecture",
                    CreatedDate = DateTime.Now
                },
                new Faculty
                {
                    Id = SchoolOfForeignLanguagesFacultyId,
                    Name = "School of Foreign Languages",
                    CreatedDate = DateTime.Now
                },
                new Faculty
                {
                    Id = FacultyOfGeneralStudiesId,
                    Name = "Faculty of General Studies",
                    CreatedDate = DateTime.Now
                }
            };
        }
    }
} 