using Domain.Entities;
using Persistence.Seeds;
using System;
using System.Collections.Generic;

namespace Persistence.Seeds
{
    public static class StaffSeeds
    {
        public static IEnumerable<Staff> GetSeeds()
        {
            return new List<Staff>
            {
                // StaffUser1Id: CompEng Advisor
                new Staff(
                    userId: UserSeeds.StaffUser1Id,
                    title: "Advisor",
                    departmentId: DepartmentSeeds.ComputerEngineeringId,
                    facultyId: FacultySeeds.EngineeringFacultyId,
                    staffIdentificationNumber: "STAFF001"
                ),
                // StaffUser2Id: ElecEng Advisor
                new Staff(
                    userId: UserSeeds.StaffUser2Id,
                    title: "Advisor",
                    departmentId: DepartmentSeeds.ElectricalEngineeringId,
                    facultyId: FacultySeeds.EngineeringFacultyId,
                    staffIdentificationNumber: "STAFF002"
                ),
                // StaffUser3Id: CompEng Dept Secretary
                new Staff(
                    userId: UserSeeds.StaffUser3Id,
                    title: "Department Secretary",
                    departmentId: DepartmentSeeds.ComputerEngineeringId,
                    facultyId: FacultySeeds.EngineeringFacultyId, // Secretaries are often linked to faculty level as well for admin purposes
                    staffIdentificationNumber: "STAFF003"
                ),
                // StaffUser4Id: Engineering Dean's Office
                new Staff(
                    userId: UserSeeds.StaffUser4Id,
                    title: "Dean's Office Staff",
                    facultyId: FacultySeeds.EngineeringFacultyId, // Dean's office is faculty-level
                    departmentId: null, // Typically not department specific unless it's a faculty-level department
                    staffIdentificationNumber: "STAFF004"
                ),
                // StaffUser5Id: Math Advisor
                new Staff(
                    userId: UserSeeds.StaffUser5Id,
                    title: "Advisor",
                    departmentId: DepartmentSeeds.MathematicsId,
                    facultyId: FacultySeeds.ScienceFacultyId,
                    staffIdentificationNumber: "STAFF005"
                ),
                // StaffUser6Id: Physics Academic Staff
                new Staff(
                    userId: UserSeeds.StaffUser6Id,
                    title: "Academic Staff",
                    departmentId: DepartmentSeeds.PhysicsId,
                    facultyId: FacultySeeds.ScienceFacultyId,
                    staffIdentificationNumber: "STAFF006"
                ),
                // StaffUser7Id: Architecture Advisor
                new Staff(
                    userId: UserSeeds.StaffUser7Id,
                    title: "Advisor",
                    departmentId: DepartmentSeeds.ArchitectureId,
                    facultyId: FacultySeeds.ArchitectureFacultyId,
                    staffIdentificationNumber: "STAFF007"
                ),
                // StaffUser8Id: Foreign Languages Instructor
                new Staff(
                    userId: UserSeeds.StaffUser8Id,
                    title: "Instructor",
                    departmentId: DepartmentSeeds.ForeignLanguagesId,
                    facultyId: FacultySeeds.SchoolOfForeignLanguagesFacultyId,
                    staffIdentificationNumber: "STAFF008"
                ),
                // StaffUser9Id: General Culture Coordinator
                new Staff(
                    userId: UserSeeds.StaffUser9Id,
                    title: "Coordinator",
                    departmentId: DepartmentSeeds.GeneralCultureCoursesId,
                    facultyId: FacultySeeds.FacultyOfGeneralStudiesId,
                    staffIdentificationNumber: "STAFF009"
                ),
                 // StaffUser10Id: CompEng Advisor
                new Staff(
                    userId: UserSeeds.StaffUser10Id,
                    title: "Advisor",
                    departmentId: DepartmentSeeds.ComputerEngineeringId,
                    facultyId: FacultySeeds.EngineeringFacultyId,
                    staffIdentificationNumber: "STAFF010"
                )
            };
        }
    }
} 