using Domain.Entities;
using Domain.Enums;
using Persistence.Seeds;
using System;
using System.Collections.Generic;
using System.Linq;

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

        // Tüm student user ID'lerini sıralı bir listede tutuyoruz
        private static readonly List<Guid> StudentUserIds = new List<Guid>
        {
            UserSeeds.StudentUser1Id, UserSeeds.StudentUser2Id, UserSeeds.StudentUser3Id, UserSeeds.StudentUser4Id, UserSeeds.StudentUser5Id,
            UserSeeds.StudentUser6Id, UserSeeds.StudentUser7Id, UserSeeds.StudentUser8Id, UserSeeds.StudentUser9Id, UserSeeds.StudentUser10Id,
            UserSeeds.StudentUser11Id, UserSeeds.StudentUser12Id, UserSeeds.StudentUser13Id, UserSeeds.StudentUser14Id, UserSeeds.StudentUser15Id,
            UserSeeds.StudentUser16Id, UserSeeds.StudentUser17Id, UserSeeds.StudentUser18Id, UserSeeds.StudentUser19Id, UserSeeds.StudentUser20Id,
            UserSeeds.StudentUser21Id, UserSeeds.StudentUser22Id, UserSeeds.StudentUser23Id, UserSeeds.StudentUser24Id, UserSeeds.StudentUser25Id,
            UserSeeds.StudentUser26Id, UserSeeds.StudentUser27Id, UserSeeds.StudentUser28Id, UserSeeds.StudentUser29Id, UserSeeds.StudentUser30Id,
            UserSeeds.StudentUser31Id, UserSeeds.StudentUser32Id, UserSeeds.StudentUser33Id, UserSeeds.StudentUser34Id, UserSeeds.StudentUser35Id,
            UserSeeds.StudentUser36Id, UserSeeds.StudentUser37Id, UserSeeds.StudentUser38Id, UserSeeds.StudentUser39Id, UserSeeds.StudentUser40Id,
            UserSeeds.StudentUser41Id, UserSeeds.StudentUser42Id, UserSeeds.StudentUser43Id, UserSeeds.StudentUser44Id, UserSeeds.StudentUser45Id,
            UserSeeds.StudentUser46Id, UserSeeds.StudentUser47Id, UserSeeds.StudentUser48Id, UserSeeds.StudentUser49Id, UserSeeds.StudentUser50Id,
            UserSeeds.StudentUser51Id, UserSeeds.StudentUser52Id, UserSeeds.StudentUser53Id, UserSeeds.StudentUser54Id, UserSeeds.StudentUser55Id,
            UserSeeds.StudentUser56Id, UserSeeds.StudentUser57Id, UserSeeds.StudentUser58Id, UserSeeds.StudentUser59Id, UserSeeds.StudentUser60Id,
            UserSeeds.StudentUser61Id, UserSeeds.StudentUser62Id, UserSeeds.StudentUser63Id, UserSeeds.StudentUser64Id, UserSeeds.StudentUser65Id,
            UserSeeds.StudentUser66Id, UserSeeds.StudentUser67Id, UserSeeds.StudentUser68Id, UserSeeds.StudentUser69Id, UserSeeds.StudentUser70Id,
            UserSeeds.StudentUser71Id, UserSeeds.StudentUser72Id, UserSeeds.StudentUser73Id, UserSeeds.StudentUser74Id, UserSeeds.StudentUser75Id,
            UserSeeds.StudentUser76Id, UserSeeds.StudentUser77Id, UserSeeds.StudentUser78Id, UserSeeds.StudentUser79Id, UserSeeds.StudentUser80Id,
            // Inactive students
            UserSeeds.StudentUser81Id, UserSeeds.StudentUser82Id, UserSeeds.StudentUser83Id
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
                    userId: StudentUserIds[i - 1], // Doğru user ID'yi kullanıyoruz
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
            
            // Add 3 additional successful students manually
            students.Add(new Student(
                userId: UserSeeds.StudentUser81Id,
                studentNumber: "202400081",
                departmentId: DepartmentSeeds.ComputerEngineeringId,
                programName: "Undergraduate Program",
                enrollDate: DateTime.Now.AddYears(-4),
                graduationStatus: StudentGraduationStatus.ACTIVE_STUDENT,
                currentGpa: 3.5m,
                currentEctsCompleted: 250,
                assignedAdvisorUserId: null
            ));

            students.Add(new Student(
                userId: UserSeeds.StudentUser82Id,
                studentNumber: "202400082",
                departmentId: DepartmentSeeds.ComputerEngineeringId,
                programName: "Undergraduate Program",
                enrollDate: DateTime.Now.AddYears(-4),
                graduationStatus: StudentGraduationStatus.ACTIVE_STUDENT,
                currentGpa: 3.8m,
                currentEctsCompleted: 245,
                assignedAdvisorUserId: null
            ));

            students.Add(new Student(
                userId: UserSeeds.StudentUser83Id,
                studentNumber: "202400083",
                departmentId: DepartmentSeeds.ComputerEngineeringId,
                programName: "Undergraduate Program",
                enrollDate: DateTime.Now.AddYears(-4),
                graduationStatus: StudentGraduationStatus.ACTIVE_STUDENT,
                currentGpa: 3.7m,
                currentEctsCompleted: 255,
                assignedAdvisorUserId: null
            ));
            
            // Assign advisor to the new 3 successful students
            foreach (var student in students.Where(s => s.StudentNumber.StartsWith("202400")))
            {
                student.AssignedAdvisorUserId = UserSeeds.StaffUser1Id; // Computer Engineering Advisor
            }

            return students;
        }
    }
} 