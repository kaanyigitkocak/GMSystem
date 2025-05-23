using Domain.Entities;
using Domain.Enums;
using Persistence.Seeds;
using System;
using System.Collections.Generic;

namespace Persistence.Seeds
{
    public static class StudentSeeds
    {
        // Grade letter and GPA mapping for calculation
        private static readonly Dictionary<string, double> GradeGpaMapping = new()
        {
            { "AA", 4.0 }, { "BA", 3.5 }, { "BB", 3.0 }, { "CB", 2.5 }, 
            { "CC", 2.0 }, { "DC", 1.5 }, { "DD", 1.0 }, { "FF", 0.0 }
        };

        public static IEnumerable<Student> GetSeeds()
        {
            var students = new List<Student>();
            // var departmentIds = new List<Guid> // Bu satırı ve aşağıdaki listeyi kaldırıyoruz
            // {
            //     DepartmentSeeds.ComputerEngineeringId,
            //     DepartmentSeeds.ElectricalEngineeringId,
            //     DepartmentSeeds.MechanicalEngineeringId,
            //     DepartmentSeeds.CivilEngineeringId,
            //     DepartmentSeeds.EnvironmentalEngineeringId,
            //     DepartmentSeeds.ChemicalEngineeringId,
            //     DepartmentSeeds.FoodEngineeringId,
            //     DepartmentSeeds.MaterialsScienceId,
            //     DepartmentSeeds.BioengineeringId,
            //     DepartmentSeeds.EnergySystemsEngineeringId,
            //     DepartmentSeeds.PhotonicsId,
            //     DepartmentSeeds.PhysicsId,
            //     DepartmentSeeds.ChemistryId,
            //     DepartmentSeeds.MathematicsId,
            //     DepartmentSeeds.MolecularBiologyId,
            //     DepartmentSeeds.ArchitectureId,
            //     DepartmentSeeds.CityPlanningId,
            //     DepartmentSeeds.IndustrialDesignId,
            //     // Add more department IDs if needed for variety
            // };

            var random = new Random(12345); // Same seed as CourseTaken for consistency

            for (int i = 1; i <= 80; i++)
            {
                // Determine if this is a "problematic" student
                bool isMissingMandatory = i == 77; // Student 77: Missing mandatory course
                bool hasLowGPA = i == 78; // Student 78: GPA < 2.0
                bool hasLowCredits = i == 79; // Student 79: Credits < 240
                bool hasInsufficientTechnical = i == 80; // Student 80: < 6 technical electives
                bool hasInsufficientNonTechnical = i == 76; // Student 76: < 3 non-technical electives

                // Calculate appropriate GPA and ECTS based on the student's profile
                decimal? currentGpa = null;
                int? currentEctsCompleted = null;

                if (hasLowGPA)
                {
                    // GPA below 2.0 - between 1.5 and 1.9
                    currentGpa = (decimal)(1.5 + random.NextDouble() * 0.4);
                    currentEctsCompleted = random.Next(240, 280); // Normal credits but low GPA
                }
                else if (hasLowCredits)
                {
                    // Credits below 240 - between 180 and 230
                    currentGpa = (decimal)(2.2 + random.NextDouble() * 1.5); // Good GPA but low credits
                    currentEctsCompleted = random.Next(180, 235);
                }
                else if (isMissingMandatory)
                {
                    // Missing mandatory course - missing 8 ECTS from CENG 415
                    currentGpa = (decimal)(2.5 + random.NextDouble() * 1.2); // Good GPA
                    currentEctsCompleted = random.Next(235, 245); // Slightly lower due to missing course
                }
                else if (hasInsufficientTechnical)
                {
                    // Insufficient technical electives - only 4 instead of 6 (missing 6 ECTS)
                    currentGpa = (decimal)(2.3 + random.NextDouble() * 1.4); // Good GPA
                    currentEctsCompleted = random.Next(238, 248); // Slightly lower due to missing electives
                }
                else if (hasInsufficientNonTechnical)
                {
                    // Insufficient non-technical electives - only 2 instead of 3 (missing 3 ECTS)
                    currentGpa = (decimal)(2.4 + random.NextDouble() * 1.3); // Good GPA
                    currentEctsCompleted = random.Next(240, 250); // Slightly lower due to missing elective
                }
                else
                {
                    // Normal student - meets all requirements
                    currentGpa = (decimal)(2.0 + random.NextDouble() * 2.0); // GPA between 2.0 and 4.0
                    currentEctsCompleted = random.Next(240, 280); // Credits between 240 and 280
                }

                students.Add(new Student(
                    userId: UserSeeds.StudentUser1Id, // This will be corrected below
                    studentNumber: $"2024{i:D5}", 
                    departmentId: DepartmentSeeds.ComputerEngineeringId, 
                    programName: "Undergraduate Program", 
                    enrollDate: DateTime.Now.AddYears(-random.Next(1, 5)).AddMonths(-random.Next(0,12)),
                    graduationStatus: StudentGraduationStatus.PASSIVE, // Default for all, can be adjusted
                    currentGpa: currentGpa,
                    currentEctsCompleted: currentEctsCompleted,
                    assignedAdvisorUserId: null 
                ));
            }
            
            // Ensure unique UserId for each student by iterating through the predefined UserSeed Guids
            // This is a bit manual, a more dynamic approach might be better if UserSeeds grows significantly
            students[0].Id = UserSeeds.StudentUser1Id;
            students[1].Id = UserSeeds.StudentUser2Id;
            students[2].Id = UserSeeds.StudentUser3Id;
            students[3].Id = UserSeeds.StudentUser4Id;
            students[4].Id = UserSeeds.StudentUser5Id;
            students[5].Id = UserSeeds.StudentUser6Id;
            students[6].Id = UserSeeds.StudentUser7Id;
            students[7].Id = UserSeeds.StudentUser8Id;
            students[8].Id = UserSeeds.StudentUser9Id;
            students[9].Id = UserSeeds.StudentUser10Id;
            students[10].Id = UserSeeds.StudentUser11Id;
            students[11].Id = UserSeeds.StudentUser12Id;
            students[12].Id = UserSeeds.StudentUser13Id;
            students[13].Id = UserSeeds.StudentUser14Id;
            students[14].Id = UserSeeds.StudentUser15Id;
            students[15].Id = UserSeeds.StudentUser16Id;
            students[16].Id = UserSeeds.StudentUser17Id;
            students[17].Id = UserSeeds.StudentUser18Id;
            students[18].Id = UserSeeds.StudentUser19Id;
            students[19].Id = UserSeeds.StudentUser20Id;
            students[20].Id = UserSeeds.StudentUser21Id;
            students[21].Id = UserSeeds.StudentUser22Id;
            students[22].Id = UserSeeds.StudentUser23Id;
            students[23].Id = UserSeeds.StudentUser24Id;
            students[24].Id = UserSeeds.StudentUser25Id;
            students[25].Id = UserSeeds.StudentUser26Id;
            students[26].Id = UserSeeds.StudentUser27Id;
            students[27].Id = UserSeeds.StudentUser28Id;
            students[28].Id = UserSeeds.StudentUser29Id;
            students[29].Id = UserSeeds.StudentUser30Id;
            students[30].Id = UserSeeds.StudentUser31Id;
            students[31].Id = UserSeeds.StudentUser32Id;
            students[32].Id = UserSeeds.StudentUser33Id;
            students[33].Id = UserSeeds.StudentUser34Id;
            students[34].Id = UserSeeds.StudentUser35Id;
            students[35].Id = UserSeeds.StudentUser36Id;
            students[36].Id = UserSeeds.StudentUser37Id;
            students[37].Id = UserSeeds.StudentUser38Id;
            students[38].Id = UserSeeds.StudentUser39Id;
            students[39].Id = UserSeeds.StudentUser40Id;

            // Assign Ids for the new 40 students
            students[40].Id = UserSeeds.StudentUser41Id;
            students[41].Id = UserSeeds.StudentUser42Id;
            students[42].Id = UserSeeds.StudentUser43Id;
            students[43].Id = UserSeeds.StudentUser44Id;
            students[44].Id = UserSeeds.StudentUser45Id;
            students[45].Id = UserSeeds.StudentUser46Id;
            students[46].Id = UserSeeds.StudentUser47Id;
            students[47].Id = UserSeeds.StudentUser48Id;
            students[48].Id = UserSeeds.StudentUser49Id;
            students[49].Id = UserSeeds.StudentUser50Id;
            students[50].Id = UserSeeds.StudentUser51Id;
            students[51].Id = UserSeeds.StudentUser52Id;
            students[52].Id = UserSeeds.StudentUser53Id;
            students[53].Id = UserSeeds.StudentUser54Id;
            students[54].Id = UserSeeds.StudentUser55Id;
            students[55].Id = UserSeeds.StudentUser56Id;
            students[56].Id = UserSeeds.StudentUser57Id;
            students[57].Id = UserSeeds.StudentUser58Id;
            students[58].Id = UserSeeds.StudentUser59Id;
            students[59].Id = UserSeeds.StudentUser60Id;
            students[60].Id = UserSeeds.StudentUser61Id;
            students[61].Id = UserSeeds.StudentUser62Id;
            students[62].Id = UserSeeds.StudentUser63Id;
            students[63].Id = UserSeeds.StudentUser64Id;
            students[64].Id = UserSeeds.StudentUser65Id;
            students[65].Id = UserSeeds.StudentUser66Id;
            students[66].Id = UserSeeds.StudentUser67Id;
            students[67].Id = UserSeeds.StudentUser68Id;
            students[68].Id = UserSeeds.StudentUser69Id;
            students[69].Id = UserSeeds.StudentUser70Id;
            students[70].Id = UserSeeds.StudentUser71Id;
            students[71].Id = UserSeeds.StudentUser72Id;
            students[72].Id = UserSeeds.StudentUser73Id;
            students[73].Id = UserSeeds.StudentUser74Id;
            students[74].Id = UserSeeds.StudentUser75Id;
            students[75].Id = UserSeeds.StudentUser76Id;
            students[76].Id = UserSeeds.StudentUser77Id;
            students[77].Id = UserSeeds.StudentUser78Id;
            students[78].Id = UserSeeds.StudentUser79Id;
            students[79].Id = UserSeeds.StudentUser80Id;

            // Assign Computer Engineering advisors to more students if available
            var compEngAdvisorIds = new List<Guid?> { UserSeeds.StaffUser1Id, UserSeeds.StaffUser10Id }; // StaffUser10Id is CompEng Head, can also advise
            int advisorIndex = 0;
            for(int k=0; k < students.Count; k++)
            {
                if(students[k].DepartmentId == DepartmentSeeds.ComputerEngineeringId && students[k].AssignedAdvisorUserId == null)
                {
                    students[k].AssignedAdvisorUserId = compEngAdvisorIds[advisorIndex % compEngAdvisorIds.Count];
                    advisorIndex++;
                }
            }

            return students;
        }
    }
} 