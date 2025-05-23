using Domain.Entities;
using Domain.Enums;
using Persistence.Seeds;
using System;
using System.Collections.Generic;

namespace Persistence.Seeds
{
    public static class CourseSeeds
    {
        // Mandatory Courses
        public static readonly Guid Math141Id = new("30000000-0000-0000-0000-000000000001");
        public static readonly Guid Phys121Id = new("30000000-0000-0000-0000-000000000002");
        public static readonly Guid Ceng111Id = new("30000000-0000-0000-0000-000000000003");
        public static readonly Guid Ceng113Id = new("30000000-0000-0000-0000-000000000004");
        public static readonly Guid Ceng115Id = new("30000000-0000-0000-0000-000000000005");
        public static readonly Guid Eng101Id = new("30000000-0000-0000-0000-000000000006");
        public static readonly Guid Math142Id = new("30000000-0000-0000-0000-000000000007");
        public static readonly Guid Phys122Id = new("30000000-0000-0000-0000-000000000008");
        public static readonly Guid Math144Id = new("30000000-0000-0000-0000-000000000009");
        public static readonly Guid Ceng112Id = new("30000000-0000-0000-0000-000000000010");
        public static readonly Guid Econ106Id = new("30000000-0000-0000-0000-000000000011");
        public static readonly Guid Eng102Id = new("30000000-0000-0000-0000-000000000012");
        public static readonly Guid Gcc101Id = new("30000000-0000-0000-0000-000000000013");
        public static readonly Guid Ceng211Id = new("30000000-0000-0000-0000-000000000014");
        public static readonly Guid Ceng213Id = new("30000000-0000-0000-0000-000000000015");
        public static readonly Guid Ceng215Id = new("30000000-0000-0000-0000-000000000016");
        public static readonly Guid Math255Id = new("30000000-0000-0000-0000-000000000017");
        public static readonly Guid Hist201Id = new("30000000-0000-0000-0000-000000000018");
        public static readonly Guid Turk201Id = new("30000000-0000-0000-0000-000000000019");
        public static readonly Guid Hist203Id = new("30000000-0000-0000-0000-000000000020");
        public static readonly Guid Turk203Id = new("30000000-0000-0000-0000-000000000021");
        public static readonly Guid Ceng212Id = new("30000000-0000-0000-0000-000000000022");
        public static readonly Guid Ceng214Id = new("30000000-0000-0000-0000-000000000023");
        public static readonly Guid Ceng216Id = new("30000000-0000-0000-0000-000000000024");
        public static readonly Guid Ceng218Id = new("30000000-0000-0000-0000-000000000025");
        public static readonly Guid Ceng222Id = new("30000000-0000-0000-0000-000000000026");
        public static readonly Guid Hist202Id = new("30000000-0000-0000-0000-000000000027");
        public static readonly Guid Turk202Id = new("30000000-0000-0000-0000-000000000028");
        public static readonly Guid Hist204Id = new("30000000-0000-0000-0000-000000000029");
        public static readonly Guid Turk204Id = new("30000000-0000-0000-0000-000000000030");
        public static readonly Guid Ceng311Id = new("30000000-0000-0000-0000-000000000031");
        public static readonly Guid Ceng315Id = new("30000000-0000-0000-0000-000000000032");
        public static readonly Guid Ceng312Id = new("30000000-0000-0000-0000-000000000033");
        public static readonly Guid Ceng316Id = new("30000000-0000-0000-0000-000000000034");
        public static readonly Guid Ceng318Id = new("30000000-0000-0000-0000-000000000035");
        public static readonly Guid Ceng322Id = new("30000000-0000-0000-0000-000000000036");
        public static readonly Guid Ceng411Id = new("30000000-0000-0000-0000-000000000037");
        public static readonly Guid Ceng415Id = new("30000000-0000-0000-0000-000000000038");
        public static readonly Guid Ceng416Id = new("30000000-0000-0000-0000-000000000039");

        // Technical Elective Courses
        public static readonly Guid Ceng370Id = new("30000000-0000-0000-0000-000000000040");
        public static readonly Guid Ceng381Id = new("30000000-0000-0000-0000-000000000041");
        public static readonly Guid Ceng382Id = new("30000000-0000-0000-0000-000000000042");
        public static readonly Guid Ceng383Id = new("30000000-0000-0000-0000-000000000043");
        public static readonly Guid Ceng384Id = new("30000000-0000-0000-0000-000000000044");
        public static readonly Guid Ceng385Id = new("30000000-0000-0000-0000-000000000045");
        public static readonly Guid Ceng386Id = new("30000000-0000-0000-0000-000000000046");
        public static readonly Guid Ceng388Id = new("30000000-0000-0000-0000-000000000047");
        public static readonly Guid Ceng389Id = new("30000000-0000-0000-0000-000000000048");
        public static readonly Guid Ceng390Id = new("30000000-0000-0000-0000-000000000049");
        public static readonly Guid Ceng391Id = new("30000000-0000-0000-0000-000000000050");
        public static readonly Guid Ceng421Id = new("30000000-0000-0000-0000-000000000051");
        public static readonly Guid Ceng422Id = new("30000000-0000-0000-0000-000000000052");
        public static readonly Guid Ceng431Id = new("30000000-0000-0000-0000-000000000053");
        public static readonly Guid Ceng432Id = new("30000000-0000-0000-0000-000000000054");
        public static readonly Guid Ceng433Id = new("30000000-0000-0000-0000-000000000055");
        public static readonly Guid Ceng434Id = new("30000000-0000-0000-0000-000000000056");
        public static readonly Guid Ceng435Id = new("30000000-0000-0000-0000-000000000057");
        public static readonly Guid Ceng436Id = new("30000000-0000-0000-0000-000000000058");
        public static readonly Guid Ceng437Id = new("30000000-0000-0000-0000-000000000059");
        public static readonly Guid Ceng441Id = new("30000000-0000-0000-0000-000000000060");
        public static readonly Guid Ceng442Id = new("30000000-0000-0000-0000-000000000061");
        public static readonly Guid Ceng443Id = new("30000000-0000-0000-0000-000000000062");
        public static readonly Guid Ceng444Id = new("30000000-0000-0000-0000-000000000063");
        public static readonly Guid Ceng451Id = new("30000000-0000-0000-0000-000000000064");
        public static readonly Guid Ceng452Id = new("30000000-0000-0000-0000-000000000065");
        public static readonly Guid Ceng461Id = new("30000000-0000-0000-0000-000000000066");
        public static readonly Guid Ceng462Id = new("30000000-0000-0000-0000-000000000067");
        public static readonly Guid Ceng463Id = new("30000000-0000-0000-0000-000000000068");
        public static readonly Guid Ceng464Id = new("30000000-0000-0000-0000-000000000069");
        public static readonly Guid Ceng465Id = new("30000000-0000-0000-0000-000000000070");
        public static readonly Guid Ceng471Id = new("30000000-0000-0000-0000-000000000071");
        public static readonly Guid Ceng472Id = new("30000000-0000-0000-0000-000000000072");
        public static readonly Guid Ceng473Id = new("30000000-0000-0000-0000-000000000073");
        public static readonly Guid Ceng481Id = new("30000000-0000-0000-0000-000000000074");
        public static readonly Guid Ceng482Id = new("30000000-0000-0000-0000-000000000075");
        public static readonly Guid Ceng483Id = new("30000000-0000-0000-0000-000000000076");
        public static readonly Guid Ceng484Id = new("30000000-0000-0000-0000-000000000077");
        public static readonly Guid Ceng485Id = new("30000000-0000-0000-0000-000000000078");
        public static readonly Guid Ceng486Id = new("30000000-0000-0000-0000-000000000079");
        public static readonly Guid Ceng487Id = new("30000000-0000-0000-0000-000000000080");
        public static readonly Guid Ceng488Id = new("30000000-0000-0000-0000-000000000081");

        // Non-Technical Elective Courses
        public static readonly Guid Art201Id = new("30000000-0000-0000-0000-000000000082");
        public static readonly Guid Art202Id = new("30000000-0000-0000-0000-000000000083");
        public static readonly Guid Art203Id = new("30000000-0000-0000-0000-000000000084");
        public static readonly Guid Art204Id = new("30000000-0000-0000-0000-000000000085");
        public static readonly Guid Art205Id = new("30000000-0000-0000-0000-000000000086");
        public static readonly Guid Art206Id = new("30000000-0000-0000-0000-000000000087");
        public static readonly Guid Art210Id = new("30000000-0000-0000-0000-000000000088");
        public static readonly Guid Art211Id = new("30000000-0000-0000-0000-000000000089");
        public static readonly Guid Art212Id = new("30000000-0000-0000-0000-000000000090");
        public static readonly Guid Art230Id = new("30000000-0000-0000-0000-000000000091");
        public static readonly Guid Art231Id = new("30000000-0000-0000-0000-000000000092");
        public static readonly Guid Art232Id = new("30000000-0000-0000-0000-000000000093");
        public static readonly Guid Chn201Id = new("30000000-0000-0000-0000-000000000094");
        public static readonly Guid Fren201Id = new("30000000-0000-0000-0000-000000000095");
        public static readonly Guid Fren202Id = new("30000000-0000-0000-0000-000000000096");
        public static readonly Guid Fren203Id = new("30000000-0000-0000-0000-000000000097");
        public static readonly Guid Ger201Id = new("30000000-0000-0000-0000-000000000098");
        public static readonly Guid Ger202Id = new("30000000-0000-0000-0000-000000000099");
        public static readonly Guid Ger203Id = new("30000000-0000-0000-0000-000000000100");
        public static readonly Guid Ger204Id = new("30000000-0000-0000-0000-000000000101");
        public static readonly Guid Hum203Id = new("30000000-0000-0000-0000-000000000102");
        public static readonly Guid Hum205Id = new("30000000-0000-0000-0000-000000000103");
        public static readonly Guid Hum206Id = new("30000000-0000-0000-0000-000000000104");
        public static readonly Guid Hum207Id = new("30000000-0000-0000-0000-000000000105");
        public static readonly Guid Hum208Id = new("30000000-0000-0000-0000-000000000106");
        public static readonly Guid Hum211Id = new("30000000-0000-0000-0000-000000000107");
        public static readonly Guid Hum213Id = new("30000000-0000-0000-0000-000000000108");
        public static readonly Guid Hum214Id = new("30000000-0000-0000-0000-000000000109");
        public static readonly Guid Hum215Id = new("30000000-0000-0000-0000-000000000110");
        public static readonly Guid Hum216Id = new("30000000-0000-0000-0000-000000000111");
        public static readonly Guid Hum217Id = new("30000000-0000-0000-0000-000000000112");
        public static readonly Guid Hum218Id = new("30000000-0000-0000-0000-000000000113");
        public static readonly Guid Hum219Id = new("30000000-0000-0000-0000-000000000114");
        public static readonly Guid Hum220Id = new("30000000-0000-0000-0000-000000000115");
        public static readonly Guid Hum223Id = new("30000000-0000-0000-0000-000000000116");
        public static readonly Guid Hum226Id = new("30000000-0000-0000-0000-000000000117");
        public static readonly Guid Hum227Id = new("30000000-0000-0000-0000-000000000118");
        public static readonly Guid Hum230Id = new("30000000-0000-0000-0000-000000000119");
        public static readonly Guid Hum231Id = new("30000000-0000-0000-0000-000000000120");
        public static readonly Guid Hum232Id = new("30000000-0000-0000-0000-000000000121");
        public static readonly Guid Hum233Id = new("30000000-0000-0000-0000-000000000122");
        public static readonly Guid Hum240Id = new("30000000-0000-0000-0000-000000000123");
        public static readonly Guid Hum251Id = new("30000000-0000-0000-0000-000000000124");
        public static readonly Guid Hum252Id = new("30000000-0000-0000-0000-000000000125");
        public static readonly Guid Hum255Id = new("30000000-0000-0000-0000-000000000126");
        public static readonly Guid Hum256Id = new("30000000-0000-0000-0000-000000000127");
        public static readonly Guid Jap201Id = new("30000000-0000-0000-0000-000000000128");
        public static readonly Guid Jap202Id = new("30000000-0000-0000-0000-000000000129");
        public static readonly Guid Jap203Id = new("30000000-0000-0000-0000-000000000130");
        public static readonly Guid Man203Id = new("30000000-0000-0000-0000-000000000131");
        public static readonly Guid Man205Id = new("30000000-0000-0000-0000-000000000132");
        public static readonly Guid Man206Id = new("30000000-0000-0000-0000-000000000133");
        public static readonly Guid Man210Id = new("30000000-0000-0000-0000-000000000134");
        public static readonly Guid Man211Id = new("30000000-0000-0000-0000-000000000135");
        public static readonly Guid Man215Id = new("30000000-0000-0000-0000-000000000136");
        public static readonly Guid Man216Id = new("30000000-0000-0000-0000-000000000137");
        public static readonly Guid Man217Id = new("30000000-0000-0000-0000-000000000138");
        public static readonly Guid Man218Id = new("30000000-0000-0000-0000-000000000139");
        public static readonly Guid Man220Id = new("30000000-0000-0000-0000-000000000140");
        public static readonly Guid Man221Id = new("30000000-0000-0000-0000-000000000141");
        public static readonly Guid Man230Id = new("30000000-0000-0000-0000-000000000142");
        public static readonly Guid Man231Id = new("30000000-0000-0000-0000-000000000143");
        public static readonly Guid Rus201Id = new("30000000-0000-0000-0000-000000000144");
        public static readonly Guid Rus202Id = new("30000000-0000-0000-0000-000000000145");
        public static readonly Guid Rus203Id = new("30000000-0000-0000-0000-000000000146");
        public static readonly Guid Rus204Id = new("30000000-0000-0000-0000-000000000147");
        public static readonly Guid Rus205Id = new("30000000-0000-0000-0000-000000000148");
        public static readonly Guid Rus206Id = new("30000000-0000-0000-0000-000000000149");
        public static readonly Guid Span203Id = new("30000000-0000-0000-0000-000000000150");
        public static readonly Guid Span204Id = new("30000000-0000-0000-0000-000000000151");
        public static readonly Guid Sprt201Id = new("30000000-0000-0000-0000-000000000152");
        public static readonly Guid Sprt202Id = new("30000000-0000-0000-0000-000000000153");
        public static readonly Guid Sprt203Id = new("30000000-0000-0000-0000-000000000154");
        public static readonly Guid Sprt204Id = new("30000000-0000-0000-0000-000000000155");
        public static readonly Guid Sprt206Id = new("30000000-0000-0000-0000-000000000156");
        public static readonly Guid Sprt208Id = new("30000000-0000-0000-0000-000000000157");

              public static readonly Guid Econ205Id = new("30000000-0000-0000-0000-000000000158");
        public static readonly Guid Ceng246Id = new("30000000-0000-0000-0000-000000000159");
        public static readonly Guid Ceng323Id = new("30000000-0000-0000-0000-000000000160");
        public static readonly Guid Man223Id = new("30000000-0000-0000-0000-000000000161");
        public static readonly Guid Ceng400Id = new("30000000-0000-0000-0000-000000000162");
        public static readonly Guid Sprt211Id = new("30000000-0000-0000-0000-000000000163");
        public static readonly Guid Ceng418Id = new("30000000-0000-0000-0000-000000000164");
        public static readonly Guid Ceng424Id = new("30000000-0000-0000-0000-000000000165");
        public static readonly Guid Ceng506Id = new("30000000-0000-0000-0000-000000000166");

        public static IEnumerable<Course> GetSeeds()
        {
            return new List<Course>
            {
                // Mandatory Courses
                new Course { Id = Math141Id, CourseCode = "MATH 141", CourseName = "Calculus I", DepartmentId = DepartmentSeeds.MathematicsId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Phys121Id, CourseCode = "PHYS 121", CourseName = "Physics I", DepartmentId = DepartmentSeeds.PhysicsId, Ects = 7, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng111Id, CourseCode = "CENG 111", CourseName = "Introduction to Computer Engineering", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng113Id, CourseCode = "CENG 113", CourseName = "Introduction to Programming", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 6, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng115Id, CourseCode = "CENG 115", CourseName = "Discrete Structures", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Eng101Id, CourseCode = "ENG 101", CourseName = "Academic English I", DepartmentId = DepartmentSeeds.ForeignLanguagesId, Ects = 3, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Math142Id, CourseCode = "MATH 142", CourseName = "Calculus II", DepartmentId = DepartmentSeeds.MathematicsId, Ects = 6, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Phys122Id, CourseCode = "PHYS 122", CourseName = "Physics II", DepartmentId = DepartmentSeeds.PhysicsId, Ects = 8, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Math144Id, CourseCode = "MATH 144", CourseName = "Finite Mathematics", DepartmentId = DepartmentSeeds.MathematicsId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng112Id, CourseCode = "CENG 112", CourseName = "Data Structures", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Econ106Id, CourseCode = "ECON 106", CourseName = "Principles of Economics", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Eng102Id, CourseCode = "ENG 102", CourseName = "Academic English II", DepartmentId = DepartmentSeeds.ForeignLanguagesId, Ects = 3, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Gcc101Id, CourseCode = "GCC 101", CourseName = "Career Planning and Development", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 0, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now }, // ECTS null, 0 olarak ayarlandı
                new Course { Id = Ceng211Id, CourseCode = "CENG 211", CourseName = "Fundamentals of Programming", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng213Id, CourseCode = "CENG 213", CourseName = "Theory of Computation", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng215Id, CourseCode = "CENG 215", CourseName = "Circuits and Electronics", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 6, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Math255Id, CourseCode = "MATH 255", CourseName = "Differential Equations", DepartmentId = DepartmentSeeds.MathematicsId, Ects = 6, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Hist201Id, CourseCode = "HIST 201", CourseName = "History of Turkish Republic I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 2, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Turk201Id, CourseCode = "TURK 201", CourseName = "Turkish Language I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 2, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Hist203Id, CourseCode = "HIST 203", CourseName = "History of Turkish Revolution I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 2, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Turk203Id, CourseCode = "TURK 203", CourseName = "Turkish for International Students I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 2, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng212Id, CourseCode = "CENG 212", CourseName = "Programming Language Concepts", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng214Id, CourseCode = "CENG 214", CourseName = "Logic Design", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 6, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng216Id, CourseCode = "CENG 216", CourseName = "Numerical Computing", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng218Id, CourseCode = "CENG 218", CourseName = "Analysis and Design of Algorithms", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng222Id, CourseCode = "CENG 222", CourseName = "Probability and Statistics", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Hist202Id, CourseCode = "HIST 202", CourseName = "History of Turkish Republic II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 2, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Turk202Id, CourseCode = "TURK 202", CourseName = "Turkish Language II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 2, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Hist204Id, CourseCode = "HIST 204", CourseName = "History of Turkish Revolution II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 2, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Turk204Id, CourseCode = "TURK 204", CourseName = "Turkish for International Students II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 2, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng311Id, CourseCode = "CENG 311", CourseName = "Computer Architecture", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 8, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng315Id, CourseCode = "CENG 315", CourseName = "Information Management", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 6, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng312Id, CourseCode = "CENG 312", CourseName = "Computer Networks", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 6, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng316Id, CourseCode = "CENG 316", CourseName = "Software Engineering", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 6, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng318Id, CourseCode = "CENG 318", CourseName = "Human-Computer Interaction", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 6, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng322Id, CourseCode = "CENG 322", CourseName = "Operating Systems", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 8, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng411Id, CourseCode = "CENG 411", CourseName = "Professionalism in Computer Engineering", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 6, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng415Id, CourseCode = "CENG 415", CourseName = "Undergraduate Thesis and Seminar I", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 8, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng416Id, CourseCode = "CENG 416", CourseName = "Undergraduate Thesis and Seminar II", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 8, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                
                // Technical Elective Courses
                new Course { Id = Ceng370Id, CourseCode = "CENG 370", CourseName = "Mainframe Computers", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng381Id, CourseCode = "CENG 381", CourseName = "Stochastic Processes", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng382Id, CourseCode = "CENG 382", CourseName = "Information Theory", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng383Id, CourseCode = "CENG 383", CourseName = "Real-Time Systems", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng384Id, CourseCode = "CENG 384", CourseName = "Microprocessors", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng385Id, CourseCode = "CENG 385", CourseName = "Mathematical Logic", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng386Id, CourseCode = "CENG 386", CourseName = "Fuzzy Logic Systems", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng388Id, CourseCode = "CENG 388", CourseName = "Web Programming", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng389Id, CourseCode = "CENG 389", CourseName = "Mobile Application Development", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng390Id, CourseCode = "CENG 390", CourseName = "Cloud Computing", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng391Id, CourseCode = "CENG 391", CourseName = "Introduction to Image Understanding", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng421Id, CourseCode = "CENG 421", CourseName = "Computer Network Programming", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng422Id, CourseCode = "CENG 422", CourseName = "Computer Network Design and Management", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng431Id, CourseCode = "CENG 431", CourseName = "Software Systems Development", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng432Id, CourseCode = "CENG 432", CourseName = "Fundamentals of Enterprise Application Development", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng433Id, CourseCode = "CENG 433", CourseName = "Scalable Software Development for the Internet", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng434Id, CourseCode = "CENG 434", CourseName = "Enterprise Application Integrations", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng435Id, CourseCode = "CENG 435", CourseName = "Database Management System Design and Implementation", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng436Id, CourseCode = "CENG 436", CourseName = "Distributed Information Management", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng437Id, CourseCode = "CENG 437", CourseName = "Software Quality Management", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng441Id, CourseCode = "CENG 441", CourseName = "Introduction to Parallel Programming", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng442Id, CourseCode = "CENG 442", CourseName = "Multi-Core Architectures and Operating Systems", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng443Id, CourseCode = "CENG 443", CourseName = "Heterogeneous Parallel Programming", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng444Id, CourseCode = "CENG 444", CourseName = "Parallel Programming Patterns", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng451Id, CourseCode = "CENG 451", CourseName = "Advanced Digital System Design", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng452Id, CourseCode = "CENG 452", CourseName = "Software Development for Embedded Systems", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng461Id, CourseCode = "CENG 461", CourseName = "Artificial Intelligence", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng462Id, CourseCode = "CENG 462", CourseName = "Soft Computing", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng463Id, CourseCode = "CENG 463", CourseName = "Introduction to Machine Learning", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng464Id, CourseCode = "CENG 464", CourseName = "Text Mining", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng465Id, CourseCode = "CENG 465", CourseName = "Principles of Data-Intensive Systems", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng471Id, CourseCode = "CENG 471", CourseName = "Cryptography", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng472Id, CourseCode = "CENG 472", CourseName = "Computer Network Security", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng473Id, CourseCode = "CENG 473", CourseName = "Information and Communication Technologies Security", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng481Id, CourseCode = "CENG 481", CourseName = "Theoretical Approaches in Computer Science", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng482Id, CourseCode = "CENG 482", CourseName = "Evolutionary Computation", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng483Id, CourseCode = "CENG 483", CourseName = "Behavioral Robotics", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng484Id, CourseCode = "CENG 484", CourseName = "Data Mining", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng485Id, CourseCode = "CENG 485", CourseName = "Entrepreneurship in Information Technologies", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng486Id, CourseCode = "CENG 486", CourseName = "Entrepreneurship for Smart Businesses", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng487Id, CourseCode = "CENG 487", CourseName = "Introduction to Computer Graphics", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng488Id, CourseCode = "CENG 488", CourseName = "Computer Graphics", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },

                // Non-Technical Elective Courses
                new Course { Id = Art201Id, CourseCode = "ART 201", CourseName = "Drawing-Sketch", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Art202Id, CourseCode = "ART 202", CourseName = "Painting", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Art203Id, CourseCode = "ART 203", CourseName = "Sculpture", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Art204Id, CourseCode = "ART 204", CourseName = "Artistic Ceramics", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Art205Id, CourseCode = "ART 205", CourseName = "Color Photography", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Art206Id, CourseCode = "ART 206", CourseName = "Introduction to Sound Production and Design", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Art210Id, CourseCode = "ART 210", CourseName = "Western Music and Aesthetics", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Art211Id, CourseCode = "ART 211", CourseName = "Music Workshop", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Art212Id, CourseCode = "ART 212", CourseName = "Introduction to Harmony", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Art230Id, CourseCode = "ART 230", CourseName = "Dance Education", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Art231Id, CourseCode = "ART 231", CourseName = "Traditional Folk Dances I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Art232Id, CourseCode = "ART 232", CourseName = "Traditional Folk Dances II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Chn201Id, CourseCode = "CHN 201", CourseName = "Basic Chinese I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Fren201Id, CourseCode = "FREN 201", CourseName = "Basic French I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Fren202Id, CourseCode = "FREN 202", CourseName = "Basic French II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Fren203Id, CourseCode = "FREN 203", CourseName = "Intermediate French I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ger201Id, CourseCode = "GER 201", CourseName = "Basic German I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ger202Id, CourseCode = "GER 202", CourseName = "Basic German II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ger203Id, CourseCode = "GER 203", CourseName = "Intermediate German I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ger204Id, CourseCode = "GER 204", CourseName = "Intermediate German II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum203Id, CourseCode = "HUM 203", CourseName = "Introduction to Social Anthropology", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum205Id, CourseCode = "HUM 205", CourseName = "Current Issues in Turkish Language", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum206Id, CourseCode = "HUM 206", CourseName = "Comparative Cultures", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum207Id, CourseCode = "HUM 207", CourseName = "Ottoman History I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum208Id, CourseCode = "HUM 208", CourseName = "Ottoman History II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum211Id, CourseCode = "HUM 211", CourseName = "Introduction to Russian Culture", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum213Id, CourseCode = "HUM 213", CourseName = "History of Western Civilizations I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum214Id, CourseCode = "HUM 214", CourseName = "History of Western Civilizations II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum215Id, CourseCode = "HUM 215", CourseName = "Mythology", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum216Id, CourseCode = "HUM 216", CourseName = "Analysis of Folklore Texts", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum217Id, CourseCode = "HUM 217", CourseName = "Art History I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum218Id, CourseCode = "HUM 218", CourseName = "Art History II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum219Id, CourseCode = "HUM 219", CourseName = "Art History III", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum220Id, CourseCode = "HUM 220", CourseName = "Introduction to Japanese Culture", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum223Id, CourseCode = "HUM 223", CourseName = "Introduction to French Culture", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum226Id, CourseCode = "HUM 226", CourseName = "Textual Analysis of Contemporary Turkish Literature", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum227Id, CourseCode = "HUM 227", CourseName = "Turkish Language Reform", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum230Id, CourseCode = "HUM 230", CourseName = "Group Dynamics", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum231Id, CourseCode = "HUM 231", CourseName = "Sociology of Work", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum232Id, CourseCode = "HUM 232", CourseName = "Visual Communication Symbols in Art and Daily Life", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum233Id, CourseCode = "HUM 233", CourseName = "Visual Perception in Art", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum240Id, CourseCode = "HUM 240", CourseName = "Introduction to Spanish Culture", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum251Id, CourseCode = "HUM 251", CourseName = "Ottoman Turkish I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum252Id, CourseCode = "HUM 252", CourseName = "Ottoman Turkish II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum255Id, CourseCode = "HUM 255", CourseName = "Latin I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Hum256Id, CourseCode = "HUM 256", CourseName = "Latin II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Jap201Id, CourseCode = "JAP 201", CourseName = "Basic Japanese I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Jap202Id, CourseCode = "JAP 202", CourseName = "Basic Japanese II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Jap203Id, CourseCode = "JAP 203", CourseName = "Intermediate Japanese I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man203Id, CourseCode = "MAN 203", CourseName = "Project Management", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man205Id, CourseCode = "MAN 205", CourseName = "Innovation Management", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man206Id, CourseCode = "MAN 206", CourseName = "Businesses and Business Life", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man210Id, CourseCode = "MAN 210", CourseName = "Corporate Communication and Management Skills", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man211Id, CourseCode = "MAN 211", CourseName = "Communication and Management Skills for Engineers", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man215Id, CourseCode = "MAN 215", CourseName = "Engineering Economy", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man216Id, CourseCode = "MAN 216", CourseName = "Introduction to Marketing", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man217Id, CourseCode = "MAN 217", CourseName = "Fundamentals of Management", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man218Id, CourseCode = "MAN 218", CourseName = "Entrepreneurship", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man220Id, CourseCode = "MAN 220", CourseName = "Leadership", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man221Id, CourseCode = "MAN 221", CourseName = "Organizational and Personal Career Management", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man230Id, CourseCode = "MAN 230", CourseName = "Law in Business Life", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man231Id, CourseCode = "MAN 231", CourseName = "Intellectual and Industrial Property Law", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Rus201Id, CourseCode = "RUS 201", CourseName = "Basic Russian I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Rus202Id, CourseCode = "RUS 202", CourseName = "Basic Russian II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Rus203Id, CourseCode = "RUS 203", CourseName = "Intermediate Russian I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Rus204Id, CourseCode = "RUS 204", CourseName = "Intermediate Russian II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Rus205Id, CourseCode = "RUS 205", CourseName = "Advanced Russian I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Rus206Id, CourseCode = "RUS 206", CourseName = "Advanced Russian II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Span203Id, CourseCode = "SPAN 203", CourseName = "Intermediate Spanish I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Span204Id, CourseCode = "SPAN 204", CourseName = "Intermediate Spanish II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Sprt201Id, CourseCode = "SPRT 201", CourseName = "Tennis I", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Sprt202Id, CourseCode = "SPRT 202", CourseName = "Tennis II", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Sprt203Id, CourseCode = "SPRT 203", CourseName = "Badminton", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Sprt204Id, CourseCode = "SPRT 204", CourseName = "Basketball", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Sprt206Id, CourseCode = "SPRT 206", CourseName = "Table Tennis", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Sprt208Id, CourseCode = "SPRT 208", CourseName = "Basic Fitness Techniques", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Econ205Id, CourseCode = "ECON 205", CourseName = "Principles of Economics", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng246Id, CourseCode = "CENG 246", CourseName = "Numerical Computing", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 5, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Ceng323Id, CourseCode = "CENG 323", CourseName = "Project Management", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Man223Id, CourseCode = "MAN 223", CourseName = "Creative Project Writing and Presentation", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng400Id, CourseCode = "CENG 400", CourseName = "Summer Internship", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 0, CourseType = CourseType.MANDATORY, CreatedDate = DateTime.Now },
                new Course { Id = Sprt211Id, CourseCode = "SPRT 211", CourseName = "Water Surface Sports", DepartmentId = DepartmentSeeds.GeneralCultureCoursesId, Ects = 3, CourseType = CourseType.ELECTIVE_NON_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng418Id, CourseCode = "CENG 418", CourseName = "Information Security", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng424Id, CourseCode = "CENG 424", CourseName = "Embedded Computer Systems", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now },
                new Course { Id = Ceng506Id, CourseCode = "CENG 506", CourseName = "Deep Learning", DepartmentId = DepartmentSeeds.ComputerEngineeringId, Ects = 3, CourseType = CourseType.ELECTIVE_TECHNICAL, CreatedDate = DateTime.Now }

           
           
           
            };
        }
    }
} 