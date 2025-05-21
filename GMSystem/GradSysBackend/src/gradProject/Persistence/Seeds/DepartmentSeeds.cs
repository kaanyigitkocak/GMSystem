using Domain.Entities;
using System;
using System.Collections.Generic;

namespace Persistence.Seeds
{
    public static class DepartmentSeeds
    {
        // Engineering Faculty Departments
        public static readonly Guid ComputerEngineeringId = new("20000000-0000-0000-0000-000000000001");
        public static readonly Guid ElectricalEngineeringId = new("20000000-0000-0000-0000-000000000002");
        public static readonly Guid MechanicalEngineeringId = new("20000000-0000-0000-0000-000000000003");
        public static readonly Guid CivilEngineeringId = new("20000000-0000-0000-0000-000000000004");
        public static readonly Guid EnvironmentalEngineeringId = new("20000000-0000-0000-0000-000000000005");
        public static readonly Guid ChemicalEngineeringId = new("20000000-0000-0000-0000-000000000006");
        public static readonly Guid FoodEngineeringId = new("20000000-0000-0000-0000-000000000007");
        public static readonly Guid MaterialsScienceId = new("20000000-0000-0000-0000-000000000008");
        public static readonly Guid BioengineeringId = new("20000000-0000-0000-0000-000000000009");
        public static readonly Guid EnergySystemsEngineeringId = new("20000000-0000-0000-0000-000000000010");
        public static readonly Guid PhotonicsId = new("20000000-0000-0000-0000-000000000011");
        
        // Science Faculty Departments
        public static readonly Guid PhysicsId = new("20000000-0000-0000-0000-000000000012");
        public static readonly Guid ChemistryId = new("20000000-0000-0000-0000-000000000013");
        public static readonly Guid MathematicsId = new("20000000-0000-0000-0000-000000000014");
        public static readonly Guid MolecularBiologyId = new("20000000-0000-0000-0000-000000000015");
        
        // Architecture Faculty Departments
        public static readonly Guid ArchitectureId = new("20000000-0000-0000-0000-000000000016");
        public static readonly Guid CityPlanningId = new("20000000-0000-0000-0000-000000000017");
        public static readonly Guid IndustrialDesignId = new("20000000-0000-0000-0000-000000000018");

        // School of Foreign Languages Departments
        public static readonly Guid ForeignLanguagesId = new("20000000-0000-0000-0000-000000000019");

        // Faculty of General Studies Departments
        public static readonly Guid GeneralCultureCoursesId = new("20000000-0000-0000-0000-000000000020");

        public static IEnumerable<Department> GetSeeds()
        {
            return new List<Department>
            {
                // Engineering Faculty Departments
                new Department
                {
                    Id = ComputerEngineeringId,
                    Name = "Computer Engineering",
                    FacultyId = FacultySeeds.EngineeringFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = ElectricalEngineeringId,
                    Name = "Electrical-Electronics Engineering",
                    FacultyId = FacultySeeds.EngineeringFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = MechanicalEngineeringId,
                    Name = "Mechanical Engineering",
                    FacultyId = FacultySeeds.EngineeringFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = CivilEngineeringId,
                    Name = "Civil Engineering",
                    FacultyId = FacultySeeds.EngineeringFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = EnvironmentalEngineeringId,
                    Name = "Environmental Engineering",
                    FacultyId = FacultySeeds.EngineeringFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = ChemicalEngineeringId,
                    Name = "Chemical Engineering",
                    FacultyId = FacultySeeds.EngineeringFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = FoodEngineeringId,
                    Name = "Food Engineering",
                    FacultyId = FacultySeeds.EngineeringFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = MaterialsScienceId,
                    Name = "Materials Science and Engineering",
                    FacultyId = FacultySeeds.EngineeringFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = BioengineeringId,
                    Name = "Bioengineering",
                    FacultyId = FacultySeeds.EngineeringFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = EnergySystemsEngineeringId,
                    Name = "Energy Systems Engineering",
                    FacultyId = FacultySeeds.EngineeringFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = PhotonicsId,
                    Name = "Photonics",
                    FacultyId = FacultySeeds.EngineeringFacultyId,
                    CreatedDate = DateTime.Now
                },
                
                // Science Faculty Departments
                new Department
                {
                    Id = PhysicsId,
                    Name = "Physics",
                    FacultyId = FacultySeeds.ScienceFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = ChemistryId,
                    Name = "Chemistry",
                    FacultyId = FacultySeeds.ScienceFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = MathematicsId,
                    Name = "Mathematics",
                    FacultyId = FacultySeeds.ScienceFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = MolecularBiologyId,
                    Name = "Molecular Biology and Genetics",
                    FacultyId = FacultySeeds.ScienceFacultyId,
                    CreatedDate = DateTime.Now
                },
                
                // Architecture Faculty Departments
                new Department
                {
                    Id = ArchitectureId,
                    Name = "Architecture",
                    FacultyId = FacultySeeds.ArchitectureFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = CityPlanningId,
                    Name = "Urban and Regional Planning",
                    FacultyId = FacultySeeds.ArchitectureFacultyId,
                    CreatedDate = DateTime.Now
                },
                new Department
                {
                    Id = IndustrialDesignId,
                    Name = "Industrial Design",
                    FacultyId = FacultySeeds.ArchitectureFacultyId,
                    CreatedDate = DateTime.Now
                },

                // School of Foreign Languages Departments
                new Department
                {
                    Id = ForeignLanguagesId,
                    Name = "Foreign Languages",
                    FacultyId = FacultySeeds.SchoolOfForeignLanguagesFacultyId,
                    CreatedDate = DateTime.Now
                },

                // Faculty of General Studies Departments
                new Department
                {
                    Id = GeneralCultureCoursesId,
                    Name = "General Culture Courses",
                    FacultyId = FacultySeeds.FacultyOfGeneralStudiesId,
                    CreatedDate = DateTime.Now
                }
            };
        }
    }
} 