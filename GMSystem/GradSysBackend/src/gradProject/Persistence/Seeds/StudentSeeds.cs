using Domain.Entities;
using Domain.Enums;
using Persistence.Seeds;
using System;
using System.Collections.Generic;

namespace Persistence.Seeds
{
    public static class StudentSeeds
    {
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

            var random = new Random();

            for (int i = 1; i <= 40; i++)
            {
                students.Add(new Student(
                    userId: UserSeeds.StudentUser1Id, // This will be corrected below to assign unique User IDs
                    studentNumber: $"2024{i:D5}", 
                    departmentId: DepartmentSeeds.ComputerEngineeringId, // Assign all students to Computer Engineering
                    programName: "Undergraduate Program", 
                    enrollDate: DateTime.Now.AddYears(-random.Next(1, 5)).AddMonths(-random.Next(0,12)),
                    graduationStatus: StudentGraduationStatus.PASSIVE,
                    currentGpa: null,
                    currentEctsCompleted: null,
                    assignedAdvisorUserId: null // Can be assigned later or based on department
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