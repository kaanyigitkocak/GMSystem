using MediatR;
using Domain.Entities;
using Domain.Enums;

namespace Application.Features.CourseTakens.Queries.GetStudentCourseIds;

public class GetStudentCourseIdsQuery : IRequest<GetStudentCourseIdsResponse>
{
    public class GetStudentCourseIdsQueryHandler : IRequestHandler<GetStudentCourseIdsQuery, GetStudentCourseIdsResponse>
    {
        public async Task<GetStudentCourseIdsResponse> Handle(GetStudentCourseIdsQuery request, CancellationToken cancellationToken)
        {
            // Hardcoded IDs - Select a random student (using StudentUser5 for this example)
            var selectedStudentUserId = new Guid("40000000-0000-0000-0000-000000000005");
            var computerEngineeringDepartmentId = new Guid("20000000-0000-0000-0000-000000000001");
            var staffAdvisorId = new Guid("40000000-0000-0000-0000-000000000081");
            // Student's taken courses based on the provided transcript - Hardcoded Course IDs
            var takenCourseIds = new List<Guid>
            {
                // 2021-2022 Fall Semester
                new Guid("30000000-0000-0000-0000-000000000003"), // CENG111 - BILGISAYAR MUHENDISLIGI KAVRAMLARI
                new Guid("30000000-0000-0000-0000-000000000004"), // CENG113 - PROGRAMLAMAYA GIRIS
                new Guid("30000000-0000-0000-0000-000000000006"), // ENG101 - INGILIZCE OKUMA VE YAZMA BECERILERII
                new Guid("30000000-0000-0000-0000-000000000001"), // MATH141 - TEMEL ANALIZI
                new Guid("30000000-0000-0000-0000-000000000002"), // PHYS121 - GENEL FIZIK I
                new Guid("30000000-0000-0000-0000-000000000019"), // TURK201 - TÜRK DİLİ DERSLERİ 1
                new Guid("30000000-0000-0000-0000-000000000014"), // CENG211 - PROGRAMLAMANIN TEMELLERI
                new Guid("30000000-0000-0000-0000-000000000015"), // CENG213 - ISLEM TEORISI
                new Guid("30000000-0000-0000-0000-000000000016"), // CENG215 - DEVRELER VE ELEKTRONIK
                new Guid("30000000-0000-0000-0000-000000000158"), // ECON205 - EKONOMININ PRENSIPLERI
                new Guid("30000000-0000-0000-0000-000000000017"), // MATH255 - DIFERANSIYEL DENKLEMLER
                new Guid("30000000-0000-0000-0000-000000000018"), // HIST201 - ATATÜRK İLKELERİ VE İNKILAP TARİHİ
                new Guid("30000000-0000-0000-0000-000000000137"), // MAN216 - PAZARLAMAYA GIRIS

                // 2021-2022 Spring Semester
                new Guid("30000000-0000-0000-0000-000000000010"), // CENG112 - VERI YAPILARI
                new Guid("30000000-0000-0000-0000-000000000012"), // ENG102 - INGILIZCE OKUMA VE YAZMA BECERILERI II
                new Guid("30000000-0000-0000-0000-000000000007"), // MATH142 - TEMEL ANALİZ 11
                new Guid("30000000-0000-0000-0000-000000000009"), // MATH144 - SONLU MATEMATIK
                new Guid("30000000-0000-0000-0000-000000000008"), // PHYS122 - GENEL FIZIK 11
                new Guid("30000000-0000-0000-0000-000000000028"), // TURK202 - TÜRK DİLİ DERSLERİ II
                new Guid("30000000-0000-0000-0000-000000000022"), // CENG212 - PROGRAMLAMA DILLERI KAVRAMI
                new Guid("30000000-0000-0000-0000-000000000023"), // CENG214 - MANTIK TASARIMI
                new Guid("30000000-0000-0000-0000-000000000159"), // CENG246 - SAYISAL HESAPLAMA
                new Guid("30000000-0000-0000-0000-000000000025"), // CENG218 - ALGORITMALARIN ANALİZ VE TASARIMI
                new Guid("30000000-0000-0000-0000-000000000026"), // CENG222 - OLASILIK VE İSTATİSTİK
                new Guid("30000000-0000-0000-0000-000000000027"), // HIST202 - ATATÜRK İLKELERİ VE İNKILAP TARİHİ

                // 2022-2023 Fall Semester
                new Guid("30000000-0000-0000-0000-000000000005"), // CENG115 - AYRIK YAPILAR
                new Guid("30000000-0000-0000-0000-000000000031"), // CENG311 - BILGISAYAR MIMARISI
                new Guid("30000000-0000-0000-0000-000000000032"), // CENG315 - BİLGİ YÖNETIMI
                new Guid("30000000-0000-0000-0000-000000000160"), // CENG323 - PROJE YÖNETİMİ
                new Guid("30000000-0000-0000-0000-000000000050"), // CENG391 - IMGE ANLAMAYA GİRİŞ

                // 2022-2023 Spring Semester
                new Guid("30000000-0000-0000-0000-000000000033"), // CENG312 - BİLGİSAYAR AĞLARI
                new Guid("30000000-0000-0000-0000-000000000034"), // CENG316 - YAZILIM MUHENDISLIGI
                new Guid("30000000-0000-0000-0000-000000000035"), // CENG318 - INSAN BİLGİSAYAR ETKİLEŞİMİ
                new Guid("30000000-0000-0000-0000-000000000036"), // CENG322 - İŞLETİM SİSTEMLERİ
                new Guid("30000000-0000-0000-0000-000000000053"), // CENG431 - YAZILIM SİSTEMLERİ GELİŞTİRİLMESİ
                new Guid("30000000-0000-0000-0000-000000000161"), // MAN223 - YARATICI PROJE YAZIMI VE SUNUMU

                // 2023-2024 Fall Semester
                new Guid("30000000-0000-0000-0000-000000000162"), // CENG400 - YAZ STAJI
                new Guid("30000000-0000-0000-0000-000000000037"), // CENG411 - BİLGİSAYAR MÜHENDİSLİĞİNDE PROFESYONELLİK
                new Guid("30000000-0000-0000-0000-000000000038"), // CENG415 - LISANS TEZİ VE SEMİNERT
                new Guid("30000000-0000-0000-0000-000000000163"), // SPRT211 - SU ÜSTÜ SÖRF SPORLARI
                new Guid("30000000-0000-0000-0000-000000000070"), // CENG465 - VERİ YOĞUN SİSTEMLERİN İLKELERI
                new Guid("30000000-0000-0000-0000-000000000068"), // CENG463 - YAPAY ÖĞRENMEYE GİRİS

                // 2023-2024 Spring Semester
                new Guid("30000000-0000-0000-0000-000000000039"), // CENG416 - LISANS TEZİ VE SEMİNER II
                new Guid("30000000-0000-0000-0000-000000000164"), // CENG418 - BİLGİ GÜVENLİĞİ
                new Guid("30000000-0000-0000-0000-000000000165"), // CENG424 - GÖMÜLÜ BİLGİSAYAR SİSTEMLERİ
                new Guid("30000000-0000-0000-0000-000000000166"), // CENG506 - DERİN ÖĞRENME
                new Guid("30000000-0000-0000-0000-000000000069")  // CENG464 - METİN MADENCİLİĞİNE GİRİŞ
            };

            // Create CourseTaken records for the student
            var courseTakenRecords = CreateCourseTakenRecords(selectedStudentUserId, takenCourseIds);
            
            // Hard coded GPA and ECTS values
            var totalEcts = 258; // Hard coded total ECTS
            var calculatedGpa = 3.64; // Hard coded GPA

            // Update Student information
            var updatedStudent = new Student(
                userId: selectedStudentUserId,
                studentNumber: "20240005",
                departmentId: computerEngineeringDepartmentId,
                programName: "Computer Engineering Undergraduate Program",
                enrollDate: new DateTime(2021, 9, 1),
                graduationStatus: StudentGraduationStatus.PENDING_ELIGIBILITY_REVIEW_BY_ADVISOR,
                currentGpa: (decimal)calculatedGpa,
                currentEctsCompleted: totalEcts,
                assignedAdvisorUserId: staffAdvisorId
            );

            // Create TranscriptData record
            var transcriptData = new TranscriptData
            {
                Id = Guid.NewGuid(),
                StudentUserId = selectedStudentUserId,
                ParsingDate = DateTime.Now,
                ParsedGpa = (decimal)calculatedGpa,
                ParsedEcts = totalEcts,
                IsValidForProcessing = true
            };

            return new GetStudentCourseIdsResponse
            {
                CourseIds = takenCourseIds,
                TotalCourseCount = takenCourseIds.Count,
                StudentUserId = selectedStudentUserId,
                CourseTakenRecords = courseTakenRecords,
                UpdatedStudent = updatedStudent,
                TranscriptData = transcriptData,
                CalculatedGpa = (decimal)calculatedGpa,
                TotalEctsCompleted = totalEcts
            };
        }

        private List<CourseTaken> CreateCourseTakenRecords(Guid studentUserId, List<Guid> courseIds)
        {
            var courseTakenRecords = new List<CourseTaken>();
            var courseData = GetCourseTranscriptData();
            
            foreach (var courseId in courseIds)
            {
                if (courseData.TryGetValue(courseId, out var data))
                {
                    courseTakenRecords.Add(new CourseTaken(
                        id: Guid.NewGuid(),
                        studentUserId: studentUserId,
                        courseCodeInTranscript: data.CourseCode,
                        courseNameInTranscript: data.CourseName,
                        grade: data.Grade,
                        semesterTaken: data.Semester,
                        creditsEarned: data.Credits,
                        isSuccessfullyCompleted: data.IsSuccessful,
                        matchedCourseId: courseId
                    ));
                }
            }
            
            return courseTakenRecords;
        }

        private Dictionary<Guid, (string CourseCode, string CourseName, string Grade, string Semester, int Credits, bool IsSuccessful)> GetCourseTranscriptData()
        {
            return new Dictionary<Guid, (string, string, string, string, int, bool)>
            {
                // 2021-2022 Fall Semester
                { new Guid("30000000-0000-0000-0000-000000000003"), ("CENG111", "BILGISAYAR MUHENDISLIGI KAVRAMLARI", "AA", "2021-2022 Fall", 5, true) },
                { new Guid("30000000-0000-0000-0000-000000000004"), ("CENG113", "PROGRAMLAMAYA GIRIS", "BA", "2021-2022 Fall", 6, true) },
                { new Guid("30000000-0000-0000-0000-000000000006"), ("ENG101", "INGILIZCE OKUMA VE YAZMA BECERILERII", "BB", "2021-2022 Fall", 3, true) },
                { new Guid("30000000-0000-0000-0000-000000000001"), ("MATH141", "TEMEL ANALIZI", "BB", "2021-2022 Fall", 5, true) },
                { new Guid("30000000-0000-0000-0000-000000000002"), ("PHYS121", "GENEL FIZIK I", "CB", "2021-2022 Fall", 7, true) },
                { new Guid("30000000-0000-0000-0000-000000000019"), ("TURK201", "TÜRK DİLİ DERSLERİ 1", "AA", "2021-2022 Fall", 2, true) },
                { new Guid("30000000-0000-0000-0000-000000000014"), ("CENG211", "PROGRAMLAMANIN TEMELLERI", "BA", "2021-2022 Fall", 5, true) },
                { new Guid("30000000-0000-0000-0000-000000000015"), ("CENG213", "ISLEM TEORISI", "BB", "2022-2023 Fall", 5, true) }, // Retaken
                { new Guid("30000000-0000-0000-0000-000000000016"), ("CENG215", "DEVRELER VE ELEKTRONIK", "CC", "2021-2022 Fall", 6, true) },
                { new Guid("30000000-0000-0000-0000-000000000158"), ("ECON205", "EKONOMININ PRENSIPLERI", "BB", "2021-2022 Fall", 3, true) },
                { new Guid("30000000-0000-0000-0000-000000000017"), ("MATH255", "DIFERANSIYEL DENKLEMLER", "CB", "2021-2022 Fall", 6, true) },
                { new Guid("30000000-0000-0000-0000-000000000018"), ("HIST201", "ATATÜRK İLKELERİ VE İNKILAP TARİHİ", "AA", "2021-2022 Fall", 2, true) },
                { new Guid("30000000-0000-0000-0000-000000000137"), ("MAN216", "PAZARLAMAYA GIRIS", "BA", "2021-2022 Fall", 3, true) },

                // 2021-2022 Spring Semester
                { new Guid("30000000-0000-0000-0000-000000000010"), ("CENG112", "VERI YAPILARI", "BB", "2021-2022 Spring", 5, true) },
                { new Guid("30000000-0000-0000-0000-000000000012"), ("ENG102", "INGILIZCE OKUMA VE YAZMA BECERILERI II", "BA", "2021-2022 Spring", 3, true) },
                { new Guid("30000000-0000-0000-0000-000000000007"), ("MATH142", "TEMEL ANALİZ 11", "CB", "2021-2022 Spring", 6, true) },
                { new Guid("30000000-0000-0000-0000-000000000009"), ("MATH144", "SONLU MATEMATIK", "BB", "2021-2022 Spring", 5, true) },
                { new Guid("30000000-0000-0000-0000-000000000008"), ("PHYS122", "GENEL FIZIK 11", "CC", "2021-2022 Spring", 8, true) },
                { new Guid("30000000-0000-0000-0000-000000000028"), ("TURK202", "TÜRK DİLİ DERSLERİ II", "AA", "2021-2022 Spring", 2, true) },
                { new Guid("30000000-0000-0000-0000-000000000022"), ("CENG212", "PROGRAMLAMA DILLERI KAVRAMI", "BA", "2021-2022 Spring", 5, true) },
                { new Guid("30000000-0000-0000-0000-000000000023"), ("CENG214", "MANTIK TASARIMI", "BB", "2021-2022 Spring", 6, true) },
                { new Guid("30000000-0000-0000-0000-000000000159"), ("CENG246", "SAYISAL HESAPLAMA", "CB", "2021-2022 Spring", 5, true) },
                { new Guid("30000000-0000-0000-0000-000000000025"), ("CENG218", "ALGORITMALARIN ANALİZ VE TASARIMI", "BB", "2022-2023 Spring", 5, true) }, // Retaken
                { new Guid("30000000-0000-0000-0000-000000000026"), ("CENG222", "OLASILIK VE İSTATİSTİK", "BA", "2021-2022 Spring", 5, true) },
                { new Guid("30000000-0000-0000-0000-000000000027"), ("HIST202", "ATATÜRK İLKELERİ VE İNKILAP TARİHİ", "AA", "2021-2022 Spring", 2, true) },

                // 2022-2023 Fall Semester
                { new Guid("30000000-0000-0000-0000-000000000005"), ("CENG115", "AYRIK YAPILAR", "BB", "2023-2024 Fall", 5, true) }, // Retaken
                { new Guid("30000000-0000-0000-0000-000000000031"), ("CENG311", "BILGISAYAR MIMARISI", "BA", "2022-2023 Fall", 8, true) },
                { new Guid("30000000-0000-0000-0000-000000000032"), ("CENG315", "BİLGİ YÖNETIMI", "BB", "2022-2023 Fall", 6, true) },
                { new Guid("30000000-0000-0000-0000-000000000160"), ("CENG323", "PROJE YÖNETİMİ", "BA", "2022-2023 Fall", 3, true) },
                { new Guid("30000000-0000-0000-0000-000000000050"), ("CENG391", "IMGE ANLAMAYA GİRİŞ", "AA", "2022-2023 Fall", 3, true) },

                // 2022-2023 Spring Semester
                { new Guid("30000000-0000-0000-0000-000000000033"), ("CENG312", "BİLGİSAYAR AĞLARI", "BA", "2022-2023 Spring", 6, true) },
                { new Guid("30000000-0000-0000-0000-000000000034"), ("CENG316", "YAZILIM MUHENDISLIGI", "BB", "2022-2023 Spring", 6, true) },
                { new Guid("30000000-0000-0000-0000-000000000035"), ("CENG318", "INSAN BİLGİSAYAR ETKİLEŞİMİ", "CB", "2022-2023 Spring", 6, true) },
                { new Guid("30000000-0000-0000-0000-000000000036"), ("CENG322", "İŞLETİM SİSTEMLERİ", "BA", "2022-2023 Spring", 8, true) },
                { new Guid("30000000-0000-0000-0000-000000000053"), ("CENG431", "YAZILIM SİSTEMLERİ GELİŞTİRİLMESİ", "AA", "2022-2023 Spring", 3, true) },
                { new Guid("30000000-0000-0000-0000-000000000161"), ("MAN223", "YARATICI PROJE YAZIMI VE SUNUMU", "BA", "2022-2023 Spring", 3, true) },

                // 2023-2024 Fall Semester
                { new Guid("30000000-0000-0000-0000-000000000162"), ("CENG400", "YAZ STAJI", "P", "2023-2024 Fall", 0, true) }, // Pass/Fail
                { new Guid("30000000-0000-0000-0000-000000000037"), ("CENG411", "BİLGİSAYAR MÜHENDİSLİĞİNDE PROFESYONELLİK", "BA", "2023-2024 Fall", 6, true) },
                { new Guid("30000000-0000-0000-0000-000000000038"), ("CENG415", "LISANS TEZİ VE SEMİNERT", "AA", "2023-2024 Fall", 8, true) },
                { new Guid("30000000-0000-0000-0000-000000000163"), ("SPRT211", "SU ÜSTÜ SÖRF SPORLARI", "AA", "2023-2024 Fall", 3, true) },
                { new Guid("30000000-0000-0000-0000-000000000070"), ("CENG465", "VERİ YOĞUN SİSTEMLERİN İLKELERI", "BA", "2023-2024 Fall", 3, true) },
                { new Guid("30000000-0000-0000-0000-000000000068"), ("CENG463", "YAPAY ÖĞRENMEYE GİRİS", "AA", "2023-2024 Fall", 3, true) },

                // 2023-2024 Spring Semester
                { new Guid("30000000-0000-0000-0000-000000000039"), ("CENG416", "LISANS TEZİ VE SEMİNER II", "AA", "2023-2024 Spring", 8, true) },
                { new Guid("30000000-0000-0000-0000-000000000164"), ("CENG418", "BİLGİ GÜVENLİĞİ", "BA", "2023-2024 Spring", 3, true) },
                { new Guid("30000000-0000-0000-0000-000000000165"), ("CENG424", "GÖMÜLÜ BİLGİSAYAR SİSTEMLERI", "BB", "2023-2024 Spring", 3, true) },
                { new Guid("30000000-0000-0000-0000-000000000166"), ("CENG506", "DERİN ÖĞRENME", "AA", "2023-2024 Spring", 3, true) },
                { new Guid("30000000-0000-0000-0000-000000000069"), ("CENG464", "METİN MADENCİLİĞİNE GİRİŞ", "BA", "2023-2024 Spring", 3, true) }
            };
        }

        private double GetGradePoints(string grade)
        {
            return grade switch
            {
                "AA" => 4.0,
                "BA" => 3.5,
                "BB" => 3.0,
                "CB" => 2.5,
                "CC" => 2.0,
                "DC" => 1.5,
                "DD" => 1.0,
                "FD" => 0.5,
                "FF" => 0.0,
                "P" => 0.0, // Pass/Fail courses don't count towards GPA
                _ => 0.0
            };
        }
    }
} 