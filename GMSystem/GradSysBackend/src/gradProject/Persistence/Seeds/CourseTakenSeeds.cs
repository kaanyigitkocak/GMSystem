using Domain.Entities;
using Persistence.Seeds;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Persistence.Seeds
{
    public static class CourseTakenSeeds
    {
        // Grade letter and GPA mapping
        private static readonly Dictionary<string, double> GradeGpaMapping = new()
        {
            { "AA", 4.0 }, { "BA", 3.5 }, { "BB", 3.0 }, { "CB", 2.5 }, 
            { "CC", 2.0 }, { "DC", 1.5 }, { "DD", 1.0 }, { "FF", 0.0 }
        };

        // Mandatory Course IDs with their ECTS
        private static readonly List<(Guid Id, string Code, string Name, int Ects)> MandatoryCourses = new()
        {
            (CourseSeeds.Math141Id, "MATH 141", "Calculus I", 5),
            (CourseSeeds.Phys121Id, "PHYS 121", "Physics I", 7),
            (CourseSeeds.Ceng111Id, "CENG 111", "Introduction to Computer Engineering", 5),
            (CourseSeeds.Ceng113Id, "CENG 113", "Introduction to Programming", 6),
            (CourseSeeds.Ceng115Id, "CENG 115", "Discrete Structures", 5),
            (CourseSeeds.Eng101Id, "ENG 101", "Academic English I", 3),
            (CourseSeeds.Math142Id, "MATH 142", "Calculus II", 6),
            (CourseSeeds.Phys122Id, "PHYS 122", "Physics II", 8),
            (CourseSeeds.Math144Id, "MATH 144", "Finite Mathematics", 5),
            (CourseSeeds.Ceng112Id, "CENG 112", "Data Structures", 5),
            (CourseSeeds.Econ106Id, "ECON 106", "Principles of Economics", 3),
            (CourseSeeds.Eng102Id, "ENG 102", "Academic English II", 3),
            (CourseSeeds.Gcc101Id, "GCC 101", "Career Planning and Development", 0),
            (CourseSeeds.Ceng211Id, "CENG 211", "Fundamentals of Programming", 5),
            (CourseSeeds.Ceng213Id, "CENG 213", "Theory of Computation", 5),
            (CourseSeeds.Ceng215Id, "CENG 215", "Circuits and Electronics", 6),
            (CourseSeeds.Math255Id, "MATH 255", "Differential Equations", 6),
            (CourseSeeds.Hist201Id, "HIST 201", "History of Turkish Republic I", 2),
            (CourseSeeds.Turk201Id, "TURK 201", "Turkish Language I", 2),
            (CourseSeeds.Hist203Id, "HIST 203", "History of Turkish Revolution I", 2),
            (CourseSeeds.Turk203Id, "TURK 203", "Turkish for International Students I", 2),
            (CourseSeeds.Ceng212Id, "CENG 212", "Programming Language Concepts", 5),
            (CourseSeeds.Ceng214Id, "CENG 214", "Logic Design", 6),
            (CourseSeeds.Ceng216Id, "CENG 216", "Numerical Computing", 5),
            (CourseSeeds.Ceng218Id, "CENG 218", "Analysis and Design of Algorithms", 5),
            (CourseSeeds.Ceng222Id, "CENG 222", "Probability and Statistics", 5),
            (CourseSeeds.Hist202Id, "HIST 202", "History of Turkish Republic II", 2),
            (CourseSeeds.Turk202Id, "TURK 202", "Turkish Language II", 2),
            (CourseSeeds.Hist204Id, "HIST 204", "History of Turkish Revolution II", 2),
            (CourseSeeds.Turk204Id, "TURK 204", "Turkish for International Students II", 2),
            (CourseSeeds.Ceng311Id, "CENG 311", "Computer Architecture", 8),
            (CourseSeeds.Ceng315Id, "CENG 315", "Information Management", 6),
            (CourseSeeds.Ceng312Id, "CENG 312", "Computer Networks", 6),
            (CourseSeeds.Ceng316Id, "CENG 316", "Software Engineering", 6),
            (CourseSeeds.Ceng318Id, "CENG 318", "Human-Computer Interaction", 6),
            (CourseSeeds.Ceng322Id, "CENG 322", "Operating Systems", 8),
            (CourseSeeds.Ceng411Id, "CENG 411", "Professionalism in Computer Engineering", 6),
            (CourseSeeds.Ceng415Id, "CENG 415", "Undergraduate Thesis and Seminar I", 8),
            (CourseSeeds.Ceng416Id, "CENG 416", "Undergraduate Thesis and Seminar II", 8),
            (CourseSeeds.Econ205Id, "ECON 205", "Principles of Economics", 3),
            (CourseSeeds.Ceng246Id, "CENG 246", "Numerical Computing", 5),
            (CourseSeeds.Ceng400Id, "CENG 400", "Summer Internship", 0)
        };

        // Technical Elective Course IDs
        private static readonly List<(Guid Id, string Code, string Name, int Ects)> TechnicalElectives = new()
        {
            (CourseSeeds.Ceng370Id, "CENG 370", "Mainframe Computers", 3),
            (CourseSeeds.Ceng381Id, "CENG 381", "Stochastic Processes", 3),
            (CourseSeeds.Ceng382Id, "CENG 382", "Information Theory", 3),
            (CourseSeeds.Ceng383Id, "CENG 383", "Real-Time Systems", 3),
            (CourseSeeds.Ceng384Id, "CENG 384", "Microprocessors", 3),
            (CourseSeeds.Ceng385Id, "CENG 385", "Mathematical Logic", 3),
            (CourseSeeds.Ceng386Id, "CENG 386", "Fuzzy Logic Systems", 3),
            (CourseSeeds.Ceng388Id, "CENG 388", "Web Programming", 3),
            (CourseSeeds.Ceng389Id, "CENG 389", "Mobile Application Development", 3),
            (CourseSeeds.Ceng390Id, "CENG 390", "Cloud Computing", 3),
            (CourseSeeds.Ceng391Id, "CENG 391", "Introduction to Image Understanding", 3),
            (CourseSeeds.Ceng421Id, "CENG 421", "Computer Network Programming", 3),
            (CourseSeeds.Ceng422Id, "CENG 422", "Computer Network Design and Management", 3),
            (CourseSeeds.Ceng431Id, "CENG 431", "Software Systems Development", 3),
            (CourseSeeds.Ceng432Id, "CENG 432", "Fundamentals of Enterprise Application Development", 3),
            (CourseSeeds.Ceng433Id, "CENG 433", "Scalable Software Development for the Internet", 3),
            (CourseSeeds.Ceng434Id, "CENG 434", "Enterprise Application Integrations", 3),
            (CourseSeeds.Ceng435Id, "CENG 435", "Database Management System Design and Implementation", 3),
            (CourseSeeds.Ceng436Id, "CENG 436", "Distributed Information Management", 3),
            (CourseSeeds.Ceng437Id, "CENG 437", "Software Quality Management", 3),
            (CourseSeeds.Ceng441Id, "CENG 441", "Introduction to Parallel Programming", 3),
            (CourseSeeds.Ceng442Id, "CENG 442", "Multi-Core Architectures and Operating Systems", 3),
            (CourseSeeds.Ceng443Id, "CENG 443", "Heterogeneous Parallel Programming", 3),
            (CourseSeeds.Ceng444Id, "CENG 444", "Parallel Programming Patterns", 3),
            (CourseSeeds.Ceng451Id, "CENG 451", "Advanced Digital System Design", 3),
            (CourseSeeds.Ceng452Id, "CENG 452", "Software Development for Embedded Systems", 3),
            (CourseSeeds.Ceng461Id, "CENG 461", "Artificial Intelligence", 3),
            (CourseSeeds.Ceng462Id, "CENG 462", "Soft Computing", 3),
            (CourseSeeds.Ceng463Id, "CENG 463", "Introduction to Machine Learning", 3),
            (CourseSeeds.Ceng464Id, "CENG 464", "Text Mining", 3),
            (CourseSeeds.Ceng465Id, "CENG 465", "Principles of Data-Intensive Systems", 3),
            (CourseSeeds.Ceng471Id, "CENG 471", "Cryptography", 3),
            (CourseSeeds.Ceng472Id, "CENG 472", "Computer Network Security", 3),
            (CourseSeeds.Ceng473Id, "CENG 473", "Information and Communication Technologies Security", 3),
            (CourseSeeds.Ceng481Id, "CENG 481", "Theoretical Approaches in Computer Science", 3),
            (CourseSeeds.Ceng482Id, "CENG 482", "Evolutionary Computation", 3),
            (CourseSeeds.Ceng483Id, "CENG 483", "Behavioral Robotics", 3),
            (CourseSeeds.Ceng484Id, "CENG 484", "Data Mining", 3),
            (CourseSeeds.Ceng485Id, "CENG 485", "Entrepreneurship in Information Technologies", 3),
            (CourseSeeds.Ceng486Id, "CENG 486", "Entrepreneurship for Smart Businesses", 3),
            (CourseSeeds.Ceng487Id, "CENG 487", "Introduction to Computer Graphics", 3),
            (CourseSeeds.Ceng488Id, "CENG 488", "Computer Graphics", 3),
            (CourseSeeds.Ceng323Id, "CENG 323", "Project Management", 3),
            (CourseSeeds.Ceng418Id, "CENG 418", "Information Security", 3),
            (CourseSeeds.Ceng424Id, "CENG 424", "Embedded Computer Systems", 3),
            (CourseSeeds.Ceng506Id, "CENG 506", "Deep Learning", 3)
        };

        // Non-Technical Elective Course IDs
        private static readonly List<(Guid Id, string Code, string Name, int Ects)> NonTechnicalElectives = new()
        {
            (CourseSeeds.Art201Id, "ART 201", "Drawing-Sketch", 3),
            (CourseSeeds.Art202Id, "ART 202", "Painting", 3),
            (CourseSeeds.Art203Id, "ART 203", "Sculpture", 3),
            (CourseSeeds.Art204Id, "ART 204", "Artistic Ceramics", 3),
            (CourseSeeds.Art205Id, "ART 205", "Color Photography", 3),
            (CourseSeeds.Hum203Id, "HUM 203", "Introduction to Social Anthropology", 3),
            (CourseSeeds.Hum205Id, "HUM 205", "Current Issues in Turkish Language", 3),
            (CourseSeeds.Hum206Id, "HUM 206", "Comparative Cultures", 3),
            (CourseSeeds.Hum207Id, "HUM 207", "Ottoman History I", 3),
            (CourseSeeds.Hum208Id, "HUM 208", "Ottoman History II", 3),
            (CourseSeeds.Hum211Id, "HUM 211", "Introduction to Russian Culture", 3),
            (CourseSeeds.Hum213Id, "HUM 213", "History of Western Civilizations I", 3),
            (CourseSeeds.Hum214Id, "HUM 214", "History of Western Civilizations II", 3),
            (CourseSeeds.Hum215Id, "HUM 215", "Mythology", 3),
            (CourseSeeds.Man203Id, "MAN 203", "Project Management", 3),
            (CourseSeeds.Man205Id, "MAN 205", "Innovation Management", 3),
            (CourseSeeds.Man206Id, "MAN 206", "Businesses and Business Life", 3),
            (CourseSeeds.Man210Id, "MAN 210", "Corporate Communication and Management Skills", 3),
            (CourseSeeds.Man211Id, "MAN 211", "Communication and Management Skills for Engineers", 3),
            (CourseSeeds.Man215Id, "MAN 215", "Engineering Economy", 3),
            (CourseSeeds.Man216Id, "MAN 216", "Introduction to Marketing", 3),
            (CourseSeeds.Man217Id, "MAN 217", "Fundamentals of Management", 3),
            (CourseSeeds.Man218Id, "MAN 218", "Entrepreneurship", 3),
            (CourseSeeds.Man220Id, "MAN 220", "Leadership", 3),
            (CourseSeeds.Man221Id, "MAN 221", "Organizational and Personal Career Management", 3),
            (CourseSeeds.Sprt201Id, "SPRT 201", "Tennis I", 3),
            (CourseSeeds.Sprt202Id, "SPRT 202", "Tennis II", 3),
            (CourseSeeds.Sprt203Id, "SPRT 203", "Badminton", 3),
            (CourseSeeds.Sprt204Id, "SPRT 204", "Basketball", 3),
            (CourseSeeds.Man223Id, "MAN 223", "Creative Project Writing and Presentation", 3),
            (CourseSeeds.Sprt211Id, "SPRT 211", "Water Surface Sports", 3)
        };

        // Student User IDs array for easier access
        private static readonly Guid[] StudentUserIds = 
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
            // Additional successful students
            UserSeeds.StudentUser81Id, UserSeeds.StudentUser82Id, UserSeeds.StudentUser83Id
        };

        // Semesters
        private static readonly string[] Semesters = 
        {
            "2020-2021 Fall", "2020-2021 Spring",
            "2021-2022 Fall", "2021-2022 Spring", 
            "2022-2023 Fall", "2022-2023 Spring",
            "2023-2024 Fall", "2023-2024 Spring",
            "2024-2025 Fall"
        };

        public static IEnumerable<CourseTaken> GetSeeds()
        {
            var courseTakenList = new List<CourseTaken>();
            var random = new Random(12345); // Fixed seed for consistent results
            var courseTakenIdCounter = 1;

            for (int studentIndex = 0; studentIndex < 80; studentIndex++)
            {
                var studentUserId = StudentUserIds[studentIndex];
                var studentCourses = new List<CourseTaken>();

                // Determine if this is a "problematic" student (students 76-79)
                bool isMissingMandatory = studentIndex == 76; // Student 77: Missing mandatory course
                bool hasLowGPA = studentIndex == 77; // Student 78: GPA < 2.0
                bool hasLowCredits = studentIndex == 78; // Student 79: Credits < 240
                bool hasInsufficientTechnical = studentIndex == 79; // Student 80: < 6 technical electives
                bool hasInsufficientNonTechnical = studentIndex == 75; // Student 76: < 3 non-technical electives
                
                // Students 81, 82, 83 are successful students (indexes 80, 81, 82)
                bool isSuccessfulStudent = false; // These will be added manually

                // 1. Add mandatory courses (except for the student missing mandatory)
                foreach (var course in MandatoryCourses)
                {
                    // Skip one mandatory course for the problematic student
                    if (isMissingMandatory && course.Code == "CENG 415") continue;

                    string grade;
                    if (isSuccessfulStudent)
                    {
                        grade = GetRandomGradeForExcellentStudent(random);
                    }
                    else if (hasLowGPA)
                    {
                        grade = GetRandomGradeForLowGPA(random);
                    }
                    else
                    {
                        grade = GetRandomGradeForGoodStudent(random);
                    }
                    
                    string semester = Semesters[random.Next(Semesters.Length)];
                    
                    studentCourses.Add(new CourseTaken(
                        id: Guid.Parse($"50000000-0000-0000-0000-{courseTakenIdCounter:D12}"),
                        studentUserId: studentUserId,
                        courseCodeInTranscript: course.Code,
                        courseNameInTranscript: course.Name,
                        grade: grade,
                        semesterTaken: semester,
                        creditsEarned: course.Ects,
                        isSuccessfullyCompleted: grade != "FF",
                        matchedCourseId: course.Id
                    ));
                    courseTakenIdCounter++;
                }

                // 2. Add technical electives (minimum 6, except for problematic student)
                int technicalElectiveCount;
                if (isSuccessfulStudent)
                {
                    technicalElectiveCount = random.Next(8, 12); // 8-11 for excellent students
                }
                else if (hasInsufficientTechnical)
                {
                    technicalElectiveCount = 4; // 4 for problematic
                }
                else
                {
                    technicalElectiveCount = random.Next(6, 10); // 6-9 for normal
                }
                
                var selectedTechnicalElectives = TechnicalElectives
                    .OrderBy(x => random.Next())
                    .Take(technicalElectiveCount)
                    .ToList();

                foreach (var course in selectedTechnicalElectives)
                {
                    string grade;
                    if (isSuccessfulStudent)
                    {
                        grade = GetRandomGradeForExcellentStudent(random);
                    }
                    else if (hasLowGPA)
                    {
                        grade = GetRandomGradeForLowGPA(random);
                    }
                    else
                    {
                        grade = GetRandomGradeForGoodStudent(random);
                    }
                    
                    string semester = Semesters[random.Next(Semesters.Length)];
                    
                    studentCourses.Add(new CourseTaken(
                        id: Guid.Parse($"50000000-0000-0000-0000-{courseTakenIdCounter:D12}"),
                        studentUserId: studentUserId,
                        courseCodeInTranscript: course.Code,
                        courseNameInTranscript: course.Name,
                        grade: grade,
                        semesterTaken: semester,
                        creditsEarned: course.Ects,
                        isSuccessfullyCompleted: grade != "FF",
                        matchedCourseId: course.Id
                    ));
                    courseTakenIdCounter++;
                }

                // 3. Add non-technical electives (minimum 3, except for problematic student)
                int nonTechnicalElectiveCount;
                if (isSuccessfulStudent)
                {
                    nonTechnicalElectiveCount = random.Next(5, 8); // 5-7 for excellent students
                }
                else if (hasInsufficientNonTechnical)
                {
                    nonTechnicalElectiveCount = 2; // 2 for problematic
                }
                else
                {
                    nonTechnicalElectiveCount = random.Next(3, 6); // 3-5 for normal
                }
                
                var selectedNonTechnicalElectives = NonTechnicalElectives
                    .OrderBy(x => random.Next())
                    .Take(nonTechnicalElectiveCount)
                    .ToList();

                foreach (var course in selectedNonTechnicalElectives)
                {
                    string grade;
                    if (isSuccessfulStudent)
                    {
                        grade = GetRandomGradeForExcellentStudent(random);
                    }
                    else if (hasLowGPA)
                    {
                        grade = GetRandomGradeForLowGPA(random);
                    }
                    else
                    {
                        grade = GetRandomGradeForGoodStudent(random);
                    }
                    
                    string semester = Semesters[random.Next(Semesters.Length)];
                    
                    studentCourses.Add(new CourseTaken(
                        id: Guid.Parse($"50000000-0000-0000-0000-{courseTakenIdCounter:D12}"),
                        studentUserId: studentUserId,
                        courseCodeInTranscript: course.Code,
                        courseNameInTranscript: course.Name,
                        grade: grade,
                        semesterTaken: semester,
                        creditsEarned: course.Ects,
                        isSuccessfullyCompleted: grade != "FF",
                        matchedCourseId: course.Id
                    ));
                    courseTakenIdCounter++;
                }

                // 4. Add extra courses to reach 240+ ECTS (except for low credits student)
                if (!hasLowCredits)
                {
                    int currentCredits = studentCourses.Sum(c => c.CreditsEarned);
                    int neededCredits = 240 - currentCredits;
                    
                    if (neededCredits > 0)
                    {
                        // Add additional electives to reach the credit requirement
                        var additionalCourses = TechnicalElectives.Concat(NonTechnicalElectives)
                            .Where(c => !studentCourses.Any(sc => sc.MatchedCourseId == c.Id))
                            .OrderBy(x => random.Next())
                            .Take((neededCredits / 3) + 1) // Assuming 3 ECTS per elective
                            .ToList();

                        foreach (var course in additionalCourses)
                        {
                            if (studentCourses.Sum(c => c.CreditsEarned) >= 240) break;

                            string grade;
                            if (isSuccessfulStudent)
                            {
                                grade = GetRandomGradeForExcellentStudent(random);
                            }
                            else if (hasLowGPA)
                            {
                                grade = GetRandomGradeForLowGPA(random);
                            }
                            else
                            {
                                grade = GetRandomGradeForGoodStudent(random);
                            }
                            
                            string semester = Semesters[random.Next(Semesters.Length)];
                            
                            studentCourses.Add(new CourseTaken(
                                id: Guid.Parse($"50000000-0000-0000-0000-{courseTakenIdCounter:D12}"),
                                studentUserId: studentUserId,
                                courseCodeInTranscript: course.Code,
                                courseNameInTranscript: course.Name,
                                grade: grade,
                                semesterTaken: semester,
                                creditsEarned: course.Ects,
                                isSuccessfullyCompleted: grade != "FF",
                                matchedCourseId: course.Id
                            ));
                            courseTakenIdCounter++;
                        }
                    }
                }

                courseTakenList.AddRange(studentCourses);
            }

            // Add course taken records for the 3 additional successful students manually
            var successfulStudentIds = new[] { UserSeeds.StudentUser81Id, UserSeeds.StudentUser82Id, UserSeeds.StudentUser83Id };
            
            foreach (var studentUserId in successfulStudentIds)
            {
                var studentCourses = new List<CourseTaken>();

                // 1. Add all mandatory courses with excellent grades
                foreach (var course in MandatoryCourses)
                {
                    string grade = GetRandomGradeForExcellentStudent(random);
                    string semester = Semesters[random.Next(Semesters.Length)];
                    
                    studentCourses.Add(new CourseTaken(
                        id: Guid.Parse($"50000000-0000-0000-0000-{courseTakenIdCounter:D12}"),
                        studentUserId: studentUserId,
                        courseCodeInTranscript: course.Code,
                        courseNameInTranscript: course.Name,
                        grade: grade,
                        semesterTaken: semester,
                        creditsEarned: course.Ects,
                        isSuccessfullyCompleted: grade != "FF",
                        matchedCourseId: course.Id
                    ));
                    courseTakenIdCounter++;
                }

                // 2. Add 8-10 technical electives with excellent grades
                int technicalElectiveCount = random.Next(8, 11);
                var selectedTechnicalElectives = TechnicalElectives
                    .OrderBy(x => random.Next())
                    .Take(technicalElectiveCount)
                    .ToList();

                foreach (var course in selectedTechnicalElectives)
                {
                    string grade = GetRandomGradeForExcellentStudent(random);
                    string semester = Semesters[random.Next(Semesters.Length)];
                    
                    studentCourses.Add(new CourseTaken(
                        id: Guid.Parse($"50000000-0000-0000-0000-{courseTakenIdCounter:D12}"),
                        studentUserId: studentUserId,
                        courseCodeInTranscript: course.Code,
                        courseNameInTranscript: course.Name,
                        grade: grade,
                        semesterTaken: semester,
                        creditsEarned: course.Ects,
                        isSuccessfullyCompleted: grade != "FF",
                        matchedCourseId: course.Id
                    ));
                    courseTakenIdCounter++;
                }

                // 3. Add 5-7 non-technical electives with excellent grades
                int nonTechnicalElectiveCount = random.Next(5, 8);
                var selectedNonTechnicalElectives = NonTechnicalElectives
                    .OrderBy(x => random.Next())
                    .Take(nonTechnicalElectiveCount)
                    .ToList();

                foreach (var course in selectedNonTechnicalElectives)
                {
                    string grade = GetRandomGradeForExcellentStudent(random);
                    string semester = Semesters[random.Next(Semesters.Length)];
                    
                    studentCourses.Add(new CourseTaken(
                        id: Guid.Parse($"50000000-0000-0000-0000-{courseTakenIdCounter:D12}"),
                        studentUserId: studentUserId,
                        courseCodeInTranscript: course.Code,
                        courseNameInTranscript: course.Name,
                        grade: grade,
                        semesterTaken: semester,
                        creditsEarned: course.Ects,
                        isSuccessfullyCompleted: grade != "FF",
                        matchedCourseId: course.Id
                    ));
                    courseTakenIdCounter++;
                }

                courseTakenList.AddRange(studentCourses);
            }

            return courseTakenList;
        }

        private static string GetRandomGradeForGoodStudent(Random random)
        {
            var goodGrades = new[] { "AA", "BA", "BB", "CB", "CC" };
            var weights = new[] { 20, 25, 30, 20, 5 }; // Higher probability for better grades
            
            int totalWeight = weights.Sum();
            int randomNumber = random.Next(totalWeight);
            int cumulativeWeight = 0;
            
            for (int i = 0; i < goodGrades.Length; i++)
            {
                cumulativeWeight += weights[i];
                if (randomNumber < cumulativeWeight)
                    return goodGrades[i];
            }
            
            return "CC"; // fallback
        }

        private static string GetRandomGradeForLowGPA(Random random)
        {
            var grades = new[] { "DC", "DD", "CC", "CB", "FF" };
            var weights = new[] { 30, 25, 20, 15, 10 }; // Higher probability for lower grades
            
            int totalWeight = weights.Sum();
            int randomNumber = random.Next(totalWeight);
            int cumulativeWeight = 0;
            
            for (int i = 0; i < grades.Length; i++)
            {
                cumulativeWeight += weights[i];
                if (randomNumber < cumulativeWeight)
                    return grades[i];
            }
            
            return "DD"; // fallback
        }

        private static string GetRandomGradeForExcellentStudent(Random random)
        {
            var excellentGrades = new[] { "AA", "BA", "BB" };
            var weights = new[] { 40, 30, 30 }; // Higher probability for better grades
            
            int totalWeight = weights.Sum();
            int randomNumber = random.Next(totalWeight);
            int cumulativeWeight = 0;
            
            for (int i = 0; i < excellentGrades.Length; i++)
            {
                cumulativeWeight += weights[i];
                if (randomNumber < cumulativeWeight)
                    return excellentGrades[i];
            }
            
            return "BB"; // fallback
        }
    }
} 