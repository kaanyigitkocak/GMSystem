using Domain.Entities;
using NArchitecture.Core.Security.Hashing;
using System;
using System.Collections.Generic;

namespace Persistence.Seeds
{
    public static class UserSeeds
    {
        private static readonly byte[] DefaultPasswordSalt;
        private static readonly byte[] DefaultPasswordHash;

        // Örnek Türkçe İsimler (Daha fazla çeşitlendirilebilir)
        private static readonly List<string> TurkishMaleFirstNames = new List<string> { "Ahmet", "Mehmet", "Mustafa", "Ali", "Hüseyin", "Veli", "Can", "Emre", "Burak", "Murat" };
        private static readonly List<string> TurkishFemaleFirstNames = new List<string> { "Ayşe", "Fatma", "Zeynep", "Elif", "Hatice", "Merve", "Selin", "Deniz", "Ebru", "Gamze" };
        private static readonly List<string> TurkishLastNames = new List<string> { "Yılmaz", "Kaya", "Demir", "Çelik", "Şahin", "Yıldız", "Öztürk", "Aydın", "Arslan", "Doğan" };

        static UserSeeds()
        {
            // Örnek bir şifre için salt ve hash oluşturma (Gerçek uygulamada güvenli bir yöntem kullanılmalı)
            HashingHelper.CreatePasswordHash("Password123!", out DefaultPasswordSalt, out DefaultPasswordHash);
        }

        // Students - User IDs (First 40 for students)
        public static readonly Guid StudentUser1Id = new("40000000-0000-0000-0000-000000000001");
        public static readonly Guid StudentUser2Id = new("40000000-0000-0000-0000-000000000002");
        public static readonly Guid StudentUser3Id = new("40000000-0000-0000-0000-000000000003");
        public static readonly Guid StudentUser4Id = new("40000000-0000-0000-0000-000000000004");
        public static readonly Guid StudentUser5Id = new("40000000-0000-0000-0000-000000000005");
        public static readonly Guid StudentUser6Id = new("40000000-0000-0000-0000-000000000006");
        public static readonly Guid StudentUser7Id = new("40000000-0000-0000-0000-000000000007");
        public static readonly Guid StudentUser8Id = new("40000000-0000-0000-0000-000000000008");
        public static readonly Guid StudentUser9Id = new("40000000-0000-0000-0000-000000000009");
        public static readonly Guid StudentUser10Id = new("40000000-0000-0000-0000-000000000010");
        public static readonly Guid StudentUser11Id = new("40000000-0000-0000-0000-000000000011");
        public static readonly Guid StudentUser12Id = new("40000000-0000-0000-0000-000000000012");
        public static readonly Guid StudentUser13Id = new("40000000-0000-0000-0000-000000000013");
        public static readonly Guid StudentUser14Id = new("40000000-0000-0000-0000-000000000014");
        public static readonly Guid StudentUser15Id = new("40000000-0000-0000-0000-000000000015");
        public static readonly Guid StudentUser16Id = new("40000000-0000-0000-0000-000000000016");
        public static readonly Guid StudentUser17Id = new("40000000-0000-0000-0000-000000000017");
        public static readonly Guid StudentUser18Id = new("40000000-0000-0000-0000-000000000018");
        public static readonly Guid StudentUser19Id = new("40000000-0000-0000-0000-000000000019");
        public static readonly Guid StudentUser20Id = new("40000000-0000-0000-0000-000000000020");
        public static readonly Guid StudentUser21Id = new("40000000-0000-0000-0000-000000000021");
        public static readonly Guid StudentUser22Id = new("40000000-0000-0000-0000-000000000022");
        public static readonly Guid StudentUser23Id = new("40000000-0000-0000-0000-000000000023");
        public static readonly Guid StudentUser24Id = new("40000000-0000-0000-0000-000000000024");
        public static readonly Guid StudentUser25Id = new("40000000-0000-0000-0000-000000000025");
        public static readonly Guid StudentUser26Id = new("40000000-0000-0000-0000-000000000026");
        public static readonly Guid StudentUser27Id = new("40000000-0000-0000-0000-000000000027");
        public static readonly Guid StudentUser28Id = new("40000000-0000-0000-0000-000000000028");
        public static readonly Guid StudentUser29Id = new("40000000-0000-0000-0000-000000000029");
        public static readonly Guid StudentUser30Id = new("40000000-0000-0000-0000-000000000030");
        public static readonly Guid StudentUser31Id = new("40000000-0000-0000-0000-000000000031");
        public static readonly Guid StudentUser32Id = new("40000000-0000-0000-0000-000000000032");
        public static readonly Guid StudentUser33Id = new("40000000-0000-0000-0000-000000000033");
        public static readonly Guid StudentUser34Id = new("40000000-0000-0000-0000-000000000034");
        public static readonly Guid StudentUser35Id = new("40000000-0000-0000-0000-000000000035");
        public static readonly Guid StudentUser36Id = new("40000000-0000-0000-0000-000000000036");
        public static readonly Guid StudentUser37Id = new("40000000-0000-0000-0000-000000000037");
        public static readonly Guid StudentUser38Id = new("40000000-0000-0000-0000-000000000038");
        public static readonly Guid StudentUser39Id = new("40000000-0000-0000-0000-000000000039");
        public static readonly Guid StudentUser40Id = new("40000000-0000-0000-0000-000000000040");

        // Students - User IDs (Next 40 for students with GPA/ECTS)
        public static readonly Guid StudentUser41Id = new("40000000-0000-0000-0000-000000000041");
        public static readonly Guid StudentUser42Id = new("40000000-0000-0000-0000-000000000042");
        public static readonly Guid StudentUser43Id = new("40000000-0000-0000-0000-000000000043");
        public static readonly Guid StudentUser44Id = new("40000000-0000-0000-0000-000000000044");
        public static readonly Guid StudentUser45Id = new("40000000-0000-0000-0000-000000000045");
        public static readonly Guid StudentUser46Id = new("40000000-0000-0000-0000-000000000046");
        public static readonly Guid StudentUser47Id = new("40000000-0000-0000-0000-000000000047");
        public static readonly Guid StudentUser48Id = new("40000000-0000-0000-0000-000000000048");
        public static readonly Guid StudentUser49Id = new("40000000-0000-0000-0000-000000000049");
        public static readonly Guid StudentUser50Id = new("40000000-0000-0000-0000-000000000050");
        public static readonly Guid StudentUser51Id = new("40000000-0000-0000-0000-000000000051");
        public static readonly Guid StudentUser52Id = new("40000000-0000-0000-0000-000000000052");
        public static readonly Guid StudentUser53Id = new("40000000-0000-0000-0000-000000000053");
        public static readonly Guid StudentUser54Id = new("40000000-0000-0000-0000-000000000054");
        public static readonly Guid StudentUser55Id = new("40000000-0000-0000-0000-000000000055");
        public static readonly Guid StudentUser56Id = new("40000000-0000-0000-0000-000000000056");
        public static readonly Guid StudentUser57Id = new("40000000-0000-0000-0000-000000000057");
        public static readonly Guid StudentUser58Id = new("40000000-0000-0000-0000-000000000058");
        public static readonly Guid StudentUser59Id = new("40000000-0000-0000-0000-000000000059");
        public static readonly Guid StudentUser60Id = new("40000000-0000-0000-0000-000000000060");
        public static readonly Guid StudentUser61Id = new("40000000-0000-0000-0000-000000000061");
        public static readonly Guid StudentUser62Id = new("40000000-0000-0000-0000-000000000062");
        public static readonly Guid StudentUser63Id = new("40000000-0000-0000-0000-000000000063");
        public static readonly Guid StudentUser64Id = new("40000000-0000-0000-0000-000000000064");
        public static readonly Guid StudentUser65Id = new("40000000-0000-0000-0000-000000000065");
        public static readonly Guid StudentUser66Id = new("40000000-0000-0000-0000-000000000066");
        public static readonly Guid StudentUser67Id = new("40000000-0000-0000-0000-000000000067");
        public static readonly Guid StudentUser68Id = new("40000000-0000-0000-0000-000000000068");
        public static readonly Guid StudentUser69Id = new("40000000-0000-0000-0000-000000000069");
        public static readonly Guid StudentUser70Id = new("40000000-0000-0000-0000-000000000070");
        public static readonly Guid StudentUser71Id = new("40000000-0000-0000-0000-000000000071");
        public static readonly Guid StudentUser72Id = new("40000000-0000-0000-0000-000000000072");
        public static readonly Guid StudentUser73Id = new("40000000-0000-0000-0000-000000000073");
        public static readonly Guid StudentUser74Id = new("40000000-0000-0000-0000-000000000074");
        public static readonly Guid StudentUser75Id = new("40000000-0000-0000-0000-000000000075");
        public static readonly Guid StudentUser76Id = new("40000000-0000-0000-0000-000000000076");
        public static readonly Guid StudentUser77Id = new("40000000-0000-0000-0000-000000000077");
        public static readonly Guid StudentUser78Id = new("40000000-0000-0000-0000-000000000078");
        public static readonly Guid StudentUser79Id = new("40000000-0000-0000-0000-000000000079");
        public static readonly Guid StudentUser80Id = new("40000000-0000-0000-0000-000000000080");

        // Staff - User IDs (Next 10 for staff)
        // Note: Staff IDs start after student IDs to avoid conflicts if student count changes.
        // Adjusted staff IDs to start from ...0081 to avoid overlap with new students.
        public static readonly Guid StaffUser1Id = new("40000000-0000-0000-0000-000000000081"); // CompEng Advisor
        public static readonly Guid StaffUser2Id = new("40000000-0000-0000-0000-000000000082"); // ElecEng Advisor
        public static readonly Guid StaffUser3Id = new("40000000-0000-0000-0000-000000000083"); // CompEng Dept Secretary
        public static readonly Guid StaffUser4Id = new("40000000-0000-0000-0000-000000000084"); // Engineering Dean's Office
        public static readonly Guid StaffUser5Id = new("40000000-0000-0000-0000-000000000085"); // Math Advisor
        public static readonly Guid StaffUser6Id = new("40000000-0000-0000-0000-000000000086"); // Physics Academic Staff
        public static readonly Guid StaffUser7Id = new("40000000-0000-0000-0000-000000000087"); // Architecture Advisor
        public static readonly Guid StaffUser8Id = new("40000000-0000-0000-0000-000000000088"); // Foreign Languages Instructor
        public static readonly Guid StaffUser9Id = new("40000000-0000-0000-0000-000000000089"); // General Culture Coordinator
        public static readonly Guid StaffUser10Id = new("40000000-0000-0000-0000-000000000090"); // CompEng Advisor

        public static IEnumerable<User> GetSeeds()
        {
            var userList = new List<User>();
            var random = new Random();

            // Student Users
            for (int i = 1; i <= 80; i++) // Increased to 80
            {
                string firstName = (i % 2 == 0) ? TurkishMaleFirstNames[random.Next(TurkishMaleFirstNames.Count)] : TurkishFemaleFirstNames[random.Next(TurkishFemaleFirstNames.Count)];
                string lastName = TurkishLastNames[random.Next(TurkishLastNames.Count)];
                string userName = $"{firstName.ToLower().Replace('ı', 'i').Replace('ö', 'o').Replace('ü', 'u').Replace('ş', 's').Replace('ç', 'c').Replace('ğ', 'g')}.{lastName.ToLower().Replace('ı', 'i').Replace('ö', 'o').Replace('ü', 'u').Replace('ş', 's').Replace('ç', 'c').Replace('ğ', 'g')}.s{i}";

                userList.Add(new User(
                    id: Guid.Parse($"40000000-0000-0000-0000-{i:D12}"),
                    userName: userName,
                    email: $"{userName}@std.iyte.edu.tr",
                    firstName: firstName,
                    lastName: lastName,
                    passwordSalt: DefaultPasswordSalt,
                    passwordHash: DefaultPasswordHash,
                    isActive: true, // Students are not active as per request
                    isEmailVerified: true // Student emails are not verified by default
                ));
            }

            // Staff Users - Using Turkish names. Role descriptions below are for local reference and match updated StaffSeeds.
            var staffUsersData = new List<(Guid id, string userNamePrefix, string firstName, string lastName, string roleDescription)> 
            {
                (StaffUser1Id, "ayse.yilmaz", "Ayşe", "Yılmaz", "Computer Engineering Advisor"),
                (StaffUser2Id, "mehmet.kaya", "Mehmet", "Kaya", "Electrical Engineering Advisor"),
                (StaffUser3Id, "zeynep.demir", "Zeynep", "Demir", "Computer Engineering Department Secretary"),
                (StaffUser4Id, "ahmet.celik", "Ahmet", "Çelik", "Engineering Faculty Dean's Office Staff"),
                (StaffUser5Id, "mustafa.sahin", "Mustafa", "Şahin", "Mathematics Department Advisor"),
                (StaffUser6Id, "fatma.ozturk", "Fatma", "Öztürk", "Physics Academic Staff"),
                (StaffUser7Id, "ali.yildiz", "Ali", "Yıldız", "Architecture Department Advisor"),
                (StaffUser8Id, "huseyin.aydin", "Hüseyin", "Aydın", "Foreign Languages Instructor"),
                (StaffUser9Id, "elif.arslan", "Elif", "Arslan", "General Culture Courses Coordinator"),
                (StaffUser10Id, "veli.dogan", "Veli", "Doğan", "Computer Engineering Advisor")
            };

            int staffCounter = 1;
            foreach (var staffData in staffUsersData)
            {
                string userName = $"{staffData.userNamePrefix}.p{staffCounter}"; 
                staffCounter++;
                userList.Add(new User(
                    id: staffData.id,
                    userName: userName,
                    email: $"{userName}@iyte.edu.tr",
                    firstName: staffData.firstName,
                    lastName: staffData.lastName,
                    passwordSalt: DefaultPasswordSalt,
                    passwordHash: DefaultPasswordHash,
                    isActive: true, // Staff users are active by default
                    isEmailVerified: true
                ));
            }
            
            return userList;
        }
    }
} 