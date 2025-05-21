using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Faculties",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faculties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MailLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    From = table.Column<string>(type: "text", nullable: false),
                    To = table.Column<string>(type: "text", nullable: false),
                    Subject = table.Column<string>(type: "text", nullable: false),
                    Body = table.Column<string>(type: "text", nullable: false),
                    IsBodyHtml = table.Column<bool>(type: "boolean", nullable: false),
                    IsSentSuccessfully = table.Column<bool>(type: "boolean", nullable: false),
                    ErrorMessage = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MailLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OperationClaims",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsEmailVerified = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "bytea", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "bytea", nullable: false),
                    AuthenticatorType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    FacultyId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Departments_Faculties_FacultyId",
                        column: x => x.FacultyId,
                        principalTable: "Faculties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmailAuthenticators",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ActivationKey = table.Column<string>(type: "text", nullable: true),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailAuthenticators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmailAuthenticators_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GraduationProcesses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    StudentUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    AcademicTerm = table.Column<string>(type: "text", nullable: false),
                    InitiationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    LastUpdateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    AdvisorUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    AdvisorReviewDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeptSecretaryUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    DeptSecretaryReviewDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeansOfficeUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    DeansOfficeReviewDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    StudentAffairsUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    StudentAffairsReviewDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GraduationProcesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GraduationProcesses_Users_AdvisorUserId",
                        column: x => x.AdvisorUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GraduationProcesses_Users_DeansOfficeUserId",
                        column: x => x.DeansOfficeUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GraduationProcesses_Users_DeptSecretaryUserId",
                        column: x => x.DeptSecretaryUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GraduationProcesses_Users_StudentAffairsUserId",
                        column: x => x.StudentAffairsUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GraduationProcesses_Users_StudentUserId",
                        column: x => x.StudentUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OtpAuthenticators",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    SecretKey = table.Column<byte[]>(type: "bytea", nullable: false),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtpAuthenticators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OtpAuthenticators_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Token = table.Column<string>(type: "text", nullable: false),
                    ExpiresDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedByIp = table.Column<string>(type: "text", nullable: false),
                    RevokedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RevokedByIp = table.Column<string>(type: "text", nullable: true),
                    ReplacedByToken = table.Column<string>(type: "text", nullable: true),
                    ReasonRevoked = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TranscriptDatas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    StudentUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ParsingDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ParsedGpa = table.Column<decimal>(type: "numeric", nullable: false),
                    ParsedEcts = table.Column<int>(type: "integer", nullable: false),
                    IsValidForProcessing = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TranscriptDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TranscriptDatas_Users_StudentUserId",
                        column: x => x.StudentUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserOperationClaims",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    OperationClaimId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserOperationClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserOperationClaims_OperationClaims_OperationClaimId",
                        column: x => x.OperationClaimId,
                        principalTable: "OperationClaims",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserOperationClaims_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ValidationCodes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: false),
                    ExpireDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsUsed = table.Column<bool>(type: "boolean", nullable: false),
                    ValidationType = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValidationCodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ValidationCodes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CourseCode = table.Column<string>(type: "text", nullable: false),
                    CourseName = table.Column<string>(type: "text", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uuid", nullable: true),
                    Ects = table.Column<int>(type: "integer", nullable: false),
                    CourseType = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Courses_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "GraduationRequirementSets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uuid", nullable: false),
                    AcademicTerm = table.Column<string>(type: "text", nullable: false),
                    MinGpa = table.Column<decimal>(type: "numeric", nullable: false),
                    TotalMinEcts = table.Column<int>(type: "integer", nullable: false),
                    MinTechnicalElectiveCoursesCount = table.Column<int>(type: "integer", nullable: true),
                    MinNonTechnicalElectiveCoursesCount = table.Column<int>(type: "integer", nullable: true),
                    MinUniversityElectiveCoursesCount = table.Column<int>(type: "integer", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CreatedByUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    LastModifiedByUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GraduationRequirementSets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GraduationRequirementSets_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GraduationRequirementSets_Users_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GraduationRequirementSets_Users_LastModifiedByUserId",
                        column: x => x.LastModifiedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RankingLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ListType = table.Column<int>(type: "integer", nullable: false),
                    ScopeDepartmentId = table.Column<Guid>(type: "uuid", nullable: true),
                    ScopeFacultyId = table.Column<Guid>(type: "uuid", nullable: true),
                    AcademicTerm = table.Column<string>(type: "text", nullable: false),
                    GenerationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GeneratedByUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    PrimarySortField = table.Column<string>(type: "text", nullable: false),
                    SortOrder = table.Column<string>(type: "text", nullable: false),
                    MinGpaForInclusion = table.Column<decimal>(type: "numeric", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RankingLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RankingLists_Departments_ScopeDepartmentId",
                        column: x => x.ScopeDepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RankingLists_Faculties_ScopeFacultyId",
                        column: x => x.ScopeFacultyId,
                        principalTable: "Faculties",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RankingLists_Users_GeneratedByUserId",
                        column: x => x.GeneratedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Staffs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    StaffIdentificationNumber = table.Column<string>(type: "text", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    DepartmentId = table.Column<Guid>(type: "uuid", nullable: true),
                    FacultyId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staffs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Staffs_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Staffs_Faculties_FacultyId",
                        column: x => x.FacultyId,
                        principalTable: "Faculties",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Staffs_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    StudentNumber = table.Column<string>(type: "text", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProgramName = table.Column<string>(type: "text", nullable: false),
                    EnrollDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CurrentGpa = table.Column<decimal>(type: "numeric", nullable: true),
                    CurrentEctsCompleted = table.Column<int>(type: "integer", nullable: true),
                    GraduationStatus = table.Column<int>(type: "integer", nullable: false),
                    AssignedAdvisorUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Students_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Students_Users_AssignedAdvisorUserId",
                        column: x => x.AssignedAdvisorUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Students_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EligibilityCheckResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProcessId = table.Column<Guid>(type: "uuid", nullable: false),
                    CheckType = table.Column<int>(type: "integer", nullable: false),
                    IsMet = table.Column<bool>(type: "boolean", nullable: false),
                    ActualValue = table.Column<string>(type: "text", nullable: false),
                    RequiredValue = table.Column<string>(type: "text", nullable: false),
                    NotesOrMissingItems = table.Column<string>(type: "text", nullable: true),
                    CheckDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GraduationProcessId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EligibilityCheckResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EligibilityCheckResults_GraduationProcesses_GraduationProce~",
                        column: x => x.GraduationProcessId,
                        principalTable: "GraduationProcesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RecipientUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RelatedProcessId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_GraduationProcesses_RelatedProcessId",
                        column: x => x.RelatedProcessId,
                        principalTable: "GraduationProcesses",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notifications_Users_RecipientUserId",
                        column: x => x.RecipientUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FileAttachments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FileName = table.Column<string>(type: "text", nullable: false),
                    FilePath = table.Column<string>(type: "text", nullable: false),
                    StorageType = table.Column<int>(type: "integer", nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    FileType = table.Column<int>(type: "integer", nullable: false),
                    MimeType = table.Column<string>(type: "text", nullable: false),
                    UploadDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UploaderUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    StudentUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    ProcessId = table.Column<Guid>(type: "uuid", nullable: true),
                    GraduationProcessId = table.Column<Guid>(type: "uuid", nullable: true),
                    TranscriptDataId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FileAttachments_GraduationProcesses_GraduationProcessId",
                        column: x => x.GraduationProcessId,
                        principalTable: "GraduationProcesses",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FileAttachments_TranscriptDatas_TranscriptDataId",
                        column: x => x.TranscriptDataId,
                        principalTable: "TranscriptDatas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FileAttachments_Users_StudentUserId",
                        column: x => x.StudentUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FileAttachments_Users_UploaderUserId",
                        column: x => x.UploaderUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseTakens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    StudentUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CourseCodeInTranscript = table.Column<string>(type: "text", nullable: false),
                    CourseNameInTranscript = table.Column<string>(type: "text", nullable: false),
                    MatchedCourseId = table.Column<Guid>(type: "uuid", nullable: true),
                    Grade = table.Column<string>(type: "text", nullable: false),
                    SemesterTaken = table.Column<string>(type: "text", nullable: false),
                    CreditsEarned = table.Column<int>(type: "integer", nullable: false),
                    IsSuccessfullyCompleted = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseTakens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseTakens_Courses_MatchedCourseId",
                        column: x => x.MatchedCourseId,
                        principalTable: "Courses",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CourseTakens_Users_StudentUserId",
                        column: x => x.StudentUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RequirementMandatoryCourses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RequirementSetId = table.Column<Guid>(type: "uuid", nullable: false),
                    CourseId = table.Column<Guid>(type: "uuid", nullable: false),
                    GraduationRequirementSetId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequirementMandatoryCourses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RequirementMandatoryCourses_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RequirementMandatoryCourses_GraduationRequirementSets_Gradu~",
                        column: x => x.GraduationRequirementSetId,
                        principalTable: "GraduationRequirementSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RankingListCriterias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RankingListId = table.Column<Guid>(type: "uuid", nullable: false),
                    CriteriaName = table.Column<string>(type: "text", nullable: false),
                    CriteriaValue = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RankingListCriterias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RankingListCriterias_RankingLists_RankingListId",
                        column: x => x.RankingListId,
                        principalTable: "RankingLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RankingListEntries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RankingListId = table.Column<Guid>(type: "uuid", nullable: false),
                    StudentUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Rank = table.Column<int>(type: "integer", nullable: false),
                    GpaAtRanking = table.Column<decimal>(type: "numeric", nullable: false),
                    HonourStatus = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RankingListEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RankingListEntries_RankingLists_RankingListId",
                        column: x => x.RankingListId,
                        principalTable: "RankingLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RankingListEntries_Users_StudentUserId",
                        column: x => x.StudentUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Faculties",
                columns: new[] { "Id", "CreatedDate", "DeletedDate", "Name", "UpdatedDate" },
                values: new object[,]
                {
                    { new Guid("10000000-0000-0000-0000-000000000001"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9680), null, "Faculty of Engineering", null },
                    { new Guid("10000000-0000-0000-0000-000000000002"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9720), null, "Faculty of Science", null },
                    { new Guid("10000000-0000-0000-0000-000000000003"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9720), null, "Faculty of Architecture", null },
                    { new Guid("10000000-0000-0000-0000-000000000004"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9720), null, "School of Foreign Languages", null },
                    { new Guid("10000000-0000-0000-0000-000000000005"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9730), null, "Faculty of General Studies", null }
                });

            migrationBuilder.InsertData(
                table: "OperationClaims",
                columns: new[] { "Id", "CreatedDate", "DeletedDate", "Name", "UpdatedDate" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000001"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "SYSTEM_ADMIN", null },
                    { new Guid("00000000-0000-0000-0000-000000000002"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "STUDENT", null },
                    { new Guid("00000000-0000-0000-0000-000000000003"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "STUDENT_AFFAIRS_STAFF", null },
                    { new Guid("00000000-0000-0000-0000-000000000004"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ADVISOR", null },
                    { new Guid("00000000-0000-0000-0000-000000000005"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "DEPARTMENT_SECRETARY", null },
                    { new Guid("00000000-0000-0000-0000-000000000006"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "DEANS_OFFICE_STAFF", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AuthenticatorType", "CreatedDate", "DeletedDate", "Email", "FirstName", "IsActive", "IsEmailVerified", "LastName", "PasswordHash", "PasswordSalt", "PhoneNumber", "UpdatedDate", "UserName" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-11111111111a"), 0, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "systemadmin@university.edu", "System", true, false, "Admin", new byte[] { 136, 186, 106, 177, 70, 145, 132, 157, 209, 109, 161, 205, 156, 178, 12, 86, 64, 175, 115, 193, 169, 181, 113, 126, 246, 159, 175, 186, 74, 62, 115, 216, 22, 60, 164, 212, 94, 131, 136, 206, 1, 72, 23, 175, 153, 252, 238, 107, 41, 178, 204, 139, 2, 5, 35, 42, 171, 208, 160, 43, 176, 34, 53, 39 }, new byte[] { 76, 133, 52, 231, 58, 102, 178, 93, 250, 82, 139, 187, 44, 50, 216, 148, 91, 118, 36, 228, 227, 158, 149, 219, 145, 219, 150, 88, 152, 5, 165, 140, 27, 240, 104, 47, 233, 211, 143, 111, 225, 20, 186, 59, 12, 229, 49, 107, 142, 169, 181, 245, 68, 216, 74, 99, 6, 74, 71, 148, 181, 25, 90, 244, 32, 73, 129, 8, 125, 97, 67, 92, 125, 246, 227, 40, 20, 143, 93, 3, 67, 185, 247, 159, 154, 181, 126, 176, 0, 184, 78, 73, 226, 19, 53, 109, 142, 174, 30, 227, 132, 141, 70, 223, 52, 31, 253, 175, 93, 176, 32, 128, 63, 69, 85, 107, 213, 73, 118, 198, 112, 166, 154, 188, 3, 197, 21, 66 }, "1112223344", null, "systemadmin" },
                    { new Guid("22222222-2222-2222-2222-22222222222a"), 0, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "student@std.iyte.edu.tr", "Student", true, false, "User", new byte[] { 18, 136, 238, 28, 195, 242, 32, 237, 226, 176, 2, 48, 67, 6, 232, 6, 104, 246, 227, 82, 230, 157, 57, 46, 245, 4, 47, 242, 60, 69, 104, 97, 111, 231, 162, 245, 61, 36, 240, 87, 178, 225, 231, 181, 124, 203, 247, 63, 182, 165, 70, 49, 36, 185, 173, 196, 15, 88, 77, 185, 151, 149, 236, 135 }, new byte[] { 255, 251, 89, 205, 38, 86, 64, 213, 223, 28, 53, 40, 140, 118, 213, 216, 213, 48, 46, 254, 245, 154, 40, 44, 130, 212, 12, 19, 46, 252, 235, 18, 41, 177, 94, 239, 189, 232, 5, 149, 171, 190, 180, 24, 175, 240, 207, 104, 33, 57, 251, 99, 20, 136, 155, 114, 17, 120, 145, 100, 41, 51, 96, 44, 175, 189, 30, 246, 203, 77, 180, 170, 216, 23, 184, 242, 244, 153, 28, 195, 131, 71, 171, 157, 108, 138, 44, 233, 112, 138, 159, 46, 153, 182, 210, 192, 208, 253, 77, 12, 97, 142, 246, 48, 167, 146, 130, 99, 45, 103, 45, 24, 97, 46, 145, 86, 148, 26, 13, 92, 191, 127, 212, 102, 25, 186, 179, 4 }, "2223334455", null, "studentuser" },
                    { new Guid("33333333-3333-3333-3333-33333333333a"), 0, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "studentaffairs@iyte.edu.tr", "StudentAffairs", true, false, "Staff", new byte[] { 243, 210, 114, 148, 192, 71, 191, 85, 118, 58, 252, 120, 47, 215, 193, 36, 52, 74, 181, 17, 17, 171, 28, 194, 125, 246, 33, 229, 208, 153, 50, 14, 28, 179, 158, 105, 83, 75, 227, 75, 84, 163, 152, 55, 5, 160, 46, 182, 96, 254, 151, 66, 183, 106, 161, 181, 148, 230, 147, 178, 194, 103, 50, 131 }, new byte[] { 110, 113, 202, 2, 113, 52, 138, 41, 130, 178, 203, 161, 248, 198, 179, 25, 213, 100, 10, 120, 133, 72, 50, 48, 183, 151, 223, 58, 83, 53, 31, 178, 179, 105, 18, 238, 160, 155, 103, 2, 147, 136, 63, 0, 133, 129, 130, 236, 152, 232, 58, 46, 51, 97, 196, 101, 95, 48, 10, 97, 85, 12, 226, 152, 84, 222, 137, 247, 199, 115, 220, 115, 122, 81, 223, 17, 198, 79, 235, 75, 233, 71, 247, 183, 140, 52, 130, 134, 175, 53, 110, 211, 76, 181, 212, 97, 97, 205, 190, 53, 39, 229, 235, 29, 17, 131, 33, 247, 72, 36, 158, 242, 124, 19, 38, 181, 21, 34, 42, 135, 37, 76, 153, 142, 71, 74, 43, 74 }, "3334445566", null, "studentaffairs" },
                    { new Guid("40000000-0000-0000-0000-000000000001"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "deniz.yildiz.s1@std.iyte.edu.tr", "Deniz", false, false, "Yıldız", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "deniz.yildiz.s1" },
                    { new Guid("40000000-0000-0000-0000-000000000002"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "burak.yilmaz.s2@std.iyte.edu.tr", "Burak", false, false, "Yılmaz", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "burak.yilmaz.s2" },
                    { new Guid("40000000-0000-0000-0000-000000000003"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "deniz.yilmaz.s3@std.iyte.edu.tr", "Deniz", false, false, "Yılmaz", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "deniz.yilmaz.s3" },
                    { new Guid("40000000-0000-0000-0000-000000000004"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "can.yilmaz.s4@std.iyte.edu.tr", "Can", false, false, "Yılmaz", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "can.yilmaz.s4" },
                    { new Guid("40000000-0000-0000-0000-000000000005"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "gamze.sahin.s5@std.iyte.edu.tr", "Gamze", false, false, "Şahin", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "gamze.sahin.s5" },
                    { new Guid("40000000-0000-0000-0000-000000000006"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "mustafa.sahin.s6@std.iyte.edu.tr", "Mustafa", false, false, "Şahin", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "mustafa.sahin.s6" },
                    { new Guid("40000000-0000-0000-0000-000000000007"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "elif.sahin.s7@std.iyte.edu.tr", "Elif", false, false, "Şahin", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "elif.sahin.s7" },
                    { new Guid("40000000-0000-0000-0000-000000000008"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "mehmet.ozturk.s8@std.iyte.edu.tr", "Mehmet", false, false, "Öztürk", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "mehmet.ozturk.s8" },
                    { new Guid("40000000-0000-0000-0000-000000000009"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "zeynep.demir.s9@std.iyte.edu.tr", "Zeynep", false, false, "Demir", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "zeynep.demir.s9" },
                    { new Guid("40000000-0000-0000-0000-000000000010"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "mehmet.yilmaz.s10@std.iyte.edu.tr", "Mehmet", false, false, "Yılmaz", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "mehmet.yilmaz.s10" },
                    { new Guid("40000000-0000-0000-0000-000000000011"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ayse.ozturk.s11@std.iyte.edu.tr", "Ayşe", false, false, "Öztürk", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ayse.ozturk.s11" },
                    { new Guid("40000000-0000-0000-0000-000000000012"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "can.arslan.s12@std.iyte.edu.tr", "Can", false, false, "Arslan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "can.arslan.s12" },
                    { new Guid("40000000-0000-0000-0000-000000000013"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ayse.sahin.s13@std.iyte.edu.tr", "Ayşe", false, false, "Şahin", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ayse.sahin.s13" },
                    { new Guid("40000000-0000-0000-0000-000000000014"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ahmet.kaya.s14@std.iyte.edu.tr", "Ahmet", false, false, "Kaya", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ahmet.kaya.s14" },
                    { new Guid("40000000-0000-0000-0000-000000000015"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "gamze.kaya.s15@std.iyte.edu.tr", "Gamze", false, false, "Kaya", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "gamze.kaya.s15" },
                    { new Guid("40000000-0000-0000-0000-000000000016"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ahmet.yildiz.s16@std.iyte.edu.tr", "Ahmet", false, false, "Yıldız", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ahmet.yildiz.s16" },
                    { new Guid("40000000-0000-0000-0000-000000000017"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "gamze.dogan.s17@std.iyte.edu.tr", "Gamze", false, false, "Doğan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "gamze.dogan.s17" },
                    { new Guid("40000000-0000-0000-0000-000000000018"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "murat.arslan.s18@std.iyte.edu.tr", "Murat", false, false, "Arslan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "murat.arslan.s18" },
                    { new Guid("40000000-0000-0000-0000-000000000019"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "selin.yildiz.s19@std.iyte.edu.tr", "Selin", false, false, "Yıldız", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "selin.yildiz.s19" },
                    { new Guid("40000000-0000-0000-0000-000000000020"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "burak.kaya.s20@std.iyte.edu.tr", "Burak", false, false, "Kaya", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "burak.kaya.s20" },
                    { new Guid("40000000-0000-0000-0000-000000000021"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "fatma.sahin.s21@std.iyte.edu.tr", "Fatma", false, false, "Şahin", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "fatma.sahin.s21" },
                    { new Guid("40000000-0000-0000-0000-000000000022"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "can.yilmaz.s22@std.iyte.edu.tr", "Can", false, false, "Yılmaz", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "can.yilmaz.s22" },
                    { new Guid("40000000-0000-0000-0000-000000000023"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "merve.yildiz.s23@std.iyte.edu.tr", "Merve", false, false, "Yıldız", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "merve.yildiz.s23" },
                    { new Guid("40000000-0000-0000-0000-000000000024"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "burak.arslan.s24@std.iyte.edu.tr", "Burak", false, false, "Arslan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "burak.arslan.s24" },
                    { new Guid("40000000-0000-0000-0000-000000000025"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "hatice.yilmaz.s25@std.iyte.edu.tr", "Hatice", false, false, "Yılmaz", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "hatice.yilmaz.s25" },
                    { new Guid("40000000-0000-0000-0000-000000000026"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "huseyin.dogan.s26@std.iyte.edu.tr", "Hüseyin", false, false, "Doğan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "huseyin.dogan.s26" },
                    { new Guid("40000000-0000-0000-0000-000000000027"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ebru.kaya.s27@std.iyte.edu.tr", "Ebru", false, false, "Kaya", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ebru.kaya.s27" },
                    { new Guid("40000000-0000-0000-0000-000000000028"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ahmet.arslan.s28@std.iyte.edu.tr", "Ahmet", false, false, "Arslan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ahmet.arslan.s28" },
                    { new Guid("40000000-0000-0000-0000-000000000029"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ebru.arslan.s29@std.iyte.edu.tr", "Ebru", false, false, "Arslan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ebru.arslan.s29" },
                    { new Guid("40000000-0000-0000-0000-000000000030"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ahmet.ozturk.s30@std.iyte.edu.tr", "Ahmet", false, false, "Öztürk", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ahmet.ozturk.s30" },
                    { new Guid("40000000-0000-0000-0000-000000000031"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "selin.dogan.s31@std.iyte.edu.tr", "Selin", false, false, "Doğan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "selin.dogan.s31" },
                    { new Guid("40000000-0000-0000-0000-000000000032"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "veli.demir.s32@std.iyte.edu.tr", "Veli", false, false, "Demir", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "veli.demir.s32" },
                    { new Guid("40000000-0000-0000-0000-000000000033"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "deniz.arslan.s33@std.iyte.edu.tr", "Deniz", false, false, "Arslan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "deniz.arslan.s33" },
                    { new Guid("40000000-0000-0000-0000-000000000034"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ali.aydin.s34@std.iyte.edu.tr", "Ali", false, false, "Aydın", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ali.aydin.s34" },
                    { new Guid("40000000-0000-0000-0000-000000000035"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ebru.yilmaz.s35@std.iyte.edu.tr", "Ebru", false, false, "Yılmaz", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ebru.yilmaz.s35" },
                    { new Guid("40000000-0000-0000-0000-000000000036"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "mustafa.dogan.s36@std.iyte.edu.tr", "Mustafa", false, false, "Doğan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "mustafa.dogan.s36" },
                    { new Guid("40000000-0000-0000-0000-000000000037"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "fatma.arslan.s37@std.iyte.edu.tr", "Fatma", false, false, "Arslan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "fatma.arslan.s37" },
                    { new Guid("40000000-0000-0000-0000-000000000038"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "veli.ozturk.s38@std.iyte.edu.tr", "Veli", false, false, "Öztürk", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "veli.ozturk.s38" },
                    { new Guid("40000000-0000-0000-0000-000000000039"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ebru.ozturk.s39@std.iyte.edu.tr", "Ebru", false, false, "Öztürk", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ebru.ozturk.s39" },
                    { new Guid("40000000-0000-0000-0000-000000000040"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "mehmet.yildiz.s40@std.iyte.edu.tr", "Mehmet", false, false, "Yıldız", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "mehmet.yildiz.s40" },
                    { new Guid("40000000-0000-0000-0000-000000000041"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ayse.yilmaz.p1@iyte.edu.tr", "Ayşe", true, true, "Yılmaz", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ayse.yilmaz.p1" },
                    { new Guid("40000000-0000-0000-0000-000000000042"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "mehmet.kaya.p2@iyte.edu.tr", "Mehmet", true, true, "Kaya", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "mehmet.kaya.p2" },
                    { new Guid("40000000-0000-0000-0000-000000000043"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "zeynep.demir.p3@iyte.edu.tr", "Zeynep", true, true, "Demir", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "zeynep.demir.p3" },
                    { new Guid("40000000-0000-0000-0000-000000000044"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ahmet.celik.p4@iyte.edu.tr", "Ahmet", true, true, "Çelik", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ahmet.celik.p4" },
                    { new Guid("40000000-0000-0000-0000-000000000045"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "mustafa.sahin.p5@iyte.edu.tr", "Mustafa", true, true, "Şahin", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "mustafa.sahin.p5" },
                    { new Guid("40000000-0000-0000-0000-000000000046"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "fatma.ozturk.p6@iyte.edu.tr", "Fatma", true, true, "Öztürk", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "fatma.ozturk.p6" },
                    { new Guid("40000000-0000-0000-0000-000000000047"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "ali.yildiz.p7@iyte.edu.tr", "Ali", true, true, "Yıldız", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "ali.yildiz.p7" },
                    { new Guid("40000000-0000-0000-0000-000000000048"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "huseyin.aydin.p8@iyte.edu.tr", "Hüseyin", true, true, "Aydın", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "huseyin.aydin.p8" },
                    { new Guid("40000000-0000-0000-0000-000000000049"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "elif.arslan.p9@iyte.edu.tr", "Elif", true, true, "Arslan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "elif.arslan.p9" },
                    { new Guid("40000000-0000-0000-0000-000000000050"), 0, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "veli.dogan.p10@iyte.edu.tr", "Veli", true, true, "Doğan", new byte[] { 161, 97, 252, 217, 237, 233, 217, 241, 64, 57, 71, 62, 37, 23, 194, 22, 229, 131, 225, 58, 170, 243, 45, 43, 186, 204, 250, 250, 54, 251, 145, 235, 242, 83, 126, 108, 252, 44, 105, 172, 17, 160, 164, 246, 224, 224, 213, 146, 112, 22, 157, 99, 212, 39, 226, 25, 158, 8, 238, 113, 116, 70, 87, 28, 208, 180, 90, 41, 121, 66, 84, 204, 233, 175, 131, 100, 243, 55, 152, 9, 247, 206, 81, 182, 231, 255, 165, 56, 38, 26, 101, 76, 137, 120, 150, 158, 122, 157, 151, 233, 64, 114, 119, 14, 63, 133, 235, 220, 148, 159, 68, 163, 43, 225, 13, 233, 23, 72, 251, 226, 24, 81, 94, 107, 117, 205, 172, 40 }, new byte[] { 238, 253, 149, 95, 122, 60, 125, 3, 53, 4, 90, 155, 34, 254, 92, 159, 32, 36, 53, 153, 251, 227, 80, 187, 42, 69, 228, 68, 109, 126, 148, 67, 61, 91, 236, 131, 103, 164, 241, 8, 218, 181, 27, 150, 130, 89, 111, 240, 63, 252, 61, 229, 28, 191, 250, 217, 102, 80, 168, 93, 254, 110, 148, 66 }, null, null, "veli.dogan.p10" },
                    { new Guid("44444444-4444-4444-4444-44444444444a"), 0, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "advisor@iyte.edu.tr", "Advisor", true, false, "User", new byte[] { 215, 173, 110, 12, 143, 187, 97, 118, 94, 92, 206, 77, 237, 47, 184, 212, 182, 189, 199, 248, 168, 107, 66, 141, 227, 36, 128, 236, 60, 120, 116, 3, 3, 169, 7, 117, 20, 35, 78, 54, 51, 242, 63, 18, 94, 43, 198, 20, 9, 11, 162, 207, 84, 107, 225, 179, 197, 213, 171, 167, 94, 99, 105, 240 }, new byte[] { 193, 17, 255, 64, 6, 65, 212, 38, 164, 134, 209, 88, 128, 136, 0, 49, 195, 187, 104, 13, 32, 211, 74, 26, 224, 50, 223, 29, 76, 182, 222, 27, 119, 220, 20, 114, 219, 187, 199, 43, 26, 97, 192, 200, 139, 138, 211, 160, 156, 121, 87, 228, 255, 158, 182, 204, 89, 151, 227, 30, 127, 134, 210, 18, 141, 138, 163, 53, 79, 231, 65, 209, 250, 155, 183, 245, 133, 16, 212, 27, 76, 22, 3, 87, 19, 86, 221, 246, 131, 58, 102, 237, 203, 245, 28, 109, 46, 211, 6, 93, 170, 25, 154, 184, 236, 41, 216, 28, 147, 199, 232, 251, 169, 41, 213, 153, 170, 79, 212, 157, 126, 143, 81, 192, 30, 123, 197, 230 }, "4445556677", null, "advisoruser" },
                    { new Guid("55555555-5555-5555-5555-55555555555a"), 0, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "deptsecretary@iyte.edu.tr", "Department", true, false, "Secretary", new byte[] { 95, 22, 3, 207, 195, 103, 13, 79, 188, 198, 43, 139, 173, 19, 8, 48, 198, 252, 90, 214, 72, 243, 150, 55, 146, 203, 97, 89, 117, 229, 6, 68, 223, 182, 138, 170, 103, 190, 183, 84, 186, 123, 86, 98, 103, 203, 83, 55, 193, 164, 212, 114, 208, 241, 55, 131, 243, 220, 6, 46, 122, 125, 77, 171 }, new byte[] { 128, 62, 134, 219, 139, 8, 20, 129, 10, 245, 38, 1, 21, 237, 202, 62, 54, 35, 89, 0, 159, 122, 0, 114, 49, 99, 211, 113, 11, 216, 57, 186, 212, 0, 7, 177, 81, 252, 222, 82, 239, 175, 19, 141, 54, 65, 156, 98, 92, 249, 254, 185, 111, 136, 216, 233, 70, 49, 143, 26, 126, 225, 66, 28, 9, 180, 67, 39, 227, 59, 50, 36, 239, 232, 65, 144, 229, 31, 70, 180, 18, 22, 204, 77, 175, 212, 232, 133, 23, 146, 190, 159, 77, 190, 194, 37, 212, 239, 155, 247, 199, 157, 196, 177, 62, 157, 249, 33, 123, 55, 148, 193, 178, 34, 166, 236, 93, 17, 115, 97, 94, 187, 173, 50, 145, 213, 160, 220 }, "5556667788", null, "deptsecretary" },
                    { new Guid("66666666-6666-6666-6666-66666666666a"), 0, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "deansoffice@iyte.edu.tr", "DeansOffice", true, false, "Staff", new byte[] { 196, 122, 182, 104, 170, 196, 76, 25, 192, 211, 188, 139, 37, 30, 57, 153, 33, 34, 209, 47, 166, 29, 44, 136, 180, 149, 200, 39, 81, 107, 243, 167, 152, 16, 84, 178, 92, 73, 77, 174, 19, 132, 225, 165, 181, 204, 47, 179, 245, 168, 196, 15, 202, 121, 171, 17, 65, 137, 80, 83, 29, 199, 176, 85 }, new byte[] { 149, 150, 49, 101, 59, 143, 92, 184, 57, 177, 28, 245, 97, 176, 56, 172, 24, 217, 149, 139, 10, 209, 83, 125, 145, 251, 195, 220, 71, 214, 19, 244, 136, 125, 6, 17, 125, 91, 71, 54, 22, 181, 116, 119, 254, 114, 160, 76, 71, 178, 167, 208, 119, 190, 248, 161, 168, 243, 40, 51, 16, 137, 179, 131, 18, 250, 100, 53, 165, 168, 72, 250, 11, 81, 89, 75, 68, 24, 254, 209, 13, 183, 235, 3, 193, 187, 195, 131, 223, 25, 229, 133, 19, 108, 36, 73, 241, 135, 219, 217, 232, 33, 158, 207, 43, 63, 109, 56, 90, 68, 195, 197, 154, 159, 177, 176, 38, 203, 232, 125, 109, 210, 159, 89, 191, 25, 46, 43 }, "6667778899", null, "deansoffice" }
                });

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "Id", "CreatedDate", "DeletedDate", "FacultyId", "Name", "UpdatedDate" },
                values: new object[,]
                {
                    { new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9760), null, new Guid("10000000-0000-0000-0000-000000000001"), "Computer Engineering", null },
                    { new Guid("20000000-0000-0000-0000-000000000002"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9760), null, new Guid("10000000-0000-0000-0000-000000000001"), "Electrical-Electronics Engineering", null },
                    { new Guid("20000000-0000-0000-0000-000000000003"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9770), null, new Guid("10000000-0000-0000-0000-000000000001"), "Mechanical Engineering", null },
                    { new Guid("20000000-0000-0000-0000-000000000004"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9770), null, new Guid("10000000-0000-0000-0000-000000000001"), "Civil Engineering", null },
                    { new Guid("20000000-0000-0000-0000-000000000005"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9770), null, new Guid("10000000-0000-0000-0000-000000000001"), "Environmental Engineering", null },
                    { new Guid("20000000-0000-0000-0000-000000000006"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9770), null, new Guid("10000000-0000-0000-0000-000000000001"), "Chemical Engineering", null },
                    { new Guid("20000000-0000-0000-0000-000000000007"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9770), null, new Guid("10000000-0000-0000-0000-000000000001"), "Food Engineering", null },
                    { new Guid("20000000-0000-0000-0000-000000000008"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9770), null, new Guid("10000000-0000-0000-0000-000000000001"), "Materials Science and Engineering", null },
                    { new Guid("20000000-0000-0000-0000-000000000009"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9780), null, new Guid("10000000-0000-0000-0000-000000000001"), "Bioengineering", null },
                    { new Guid("20000000-0000-0000-0000-000000000010"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9780), null, new Guid("10000000-0000-0000-0000-000000000001"), "Energy Systems Engineering", null },
                    { new Guid("20000000-0000-0000-0000-000000000011"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9780), null, new Guid("10000000-0000-0000-0000-000000000001"), "Photonics", null },
                    { new Guid("20000000-0000-0000-0000-000000000012"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9780), null, new Guid("10000000-0000-0000-0000-000000000002"), "Physics", null },
                    { new Guid("20000000-0000-0000-0000-000000000013"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9790), null, new Guid("10000000-0000-0000-0000-000000000002"), "Chemistry", null },
                    { new Guid("20000000-0000-0000-0000-000000000014"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9790), null, new Guid("10000000-0000-0000-0000-000000000002"), "Mathematics", null },
                    { new Guid("20000000-0000-0000-0000-000000000015"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9790), null, new Guid("10000000-0000-0000-0000-000000000002"), "Molecular Biology and Genetics", null },
                    { new Guid("20000000-0000-0000-0000-000000000016"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9790), null, new Guid("10000000-0000-0000-0000-000000000003"), "Architecture", null },
                    { new Guid("20000000-0000-0000-0000-000000000017"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9790), null, new Guid("10000000-0000-0000-0000-000000000003"), "Urban and Regional Planning", null },
                    { new Guid("20000000-0000-0000-0000-000000000018"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9790), null, new Guid("10000000-0000-0000-0000-000000000003"), "Industrial Design", null },
                    { new Guid("20000000-0000-0000-0000-000000000019"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9800), null, new Guid("10000000-0000-0000-0000-000000000004"), "Foreign Languages", null },
                    { new Guid("20000000-0000-0000-0000-000000000020"), new DateTime(2025, 5, 20, 1, 7, 54, 765, DateTimeKind.Utc).AddTicks(9800), null, new Guid("10000000-0000-0000-0000-000000000005"), "General Culture Courses", null }
                });

            migrationBuilder.InsertData(
                table: "Staffs",
                columns: new[] { "Id", "CreatedDate", "DeletedDate", "DepartmentId", "FacultyId", "StaffIdentificationNumber", "Title", "UpdatedDate" },
                values: new object[] { new Guid("40000000-0000-0000-0000-000000000044"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, new Guid("10000000-0000-0000-0000-000000000001"), "STAFF004", "Dean's Office Staff", null });

            migrationBuilder.InsertData(
                table: "UserOperationClaims",
                columns: new[] { "Id", "CreatedDate", "DeletedDate", "OperationClaimId", "UpdatedDate", "UserId" },
                values: new object[,]
                {
                    { new Guid("063965a6-6096-4c63-8fbf-3d390213c979"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8430), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000024") },
                    { new Guid("170e462e-3985-4299-bced-d03398253873"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8360), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000008") },
                    { new Guid("1dfeb8cb-5462-4016-b030-82f7afcc328e"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8510), null, new Guid("00000000-0000-0000-0000-000000000005"), null, new Guid("40000000-0000-0000-0000-000000000043") },
                    { new Guid("2637708c-d903-4366-9d04-8aac73a76e75"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8410), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000019") },
                    { new Guid("2719c4f1-a063-41e4-8edf-59b76636c0e3"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8520), null, new Guid("00000000-0000-0000-0000-000000000003"), null, new Guid("40000000-0000-0000-0000-000000000048") },
                    { new Guid("2fa1a8be-b401-4480-9c50-2a1195c235b5"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8440), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000027") },
                    { new Guid("314e98ef-c411-4a59-b514-8736d39ad7cd"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8520), null, new Guid("00000000-0000-0000-0000-000000000003"), null, new Guid("40000000-0000-0000-0000-000000000046") },
                    { new Guid("4119f062-bf52-4afc-8d88-66ed12ca18f7"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8480), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000035") },
                    { new Guid("4c1eba27-5930-480b-b177-d097d3683c6d"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8440), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000026") },
                    { new Guid("507f6bfa-41c8-48bc-8077-f97f7c7693a8"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8340), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000002") },
                    { new Guid("516e806d-a825-41a2-964b-7936033e55c8"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8410), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000018") },
                    { new Guid("52862d72-b448-4f2c-8536-5c55cc30dfe4"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8380), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000011") },
                    { new Guid("55e10782-c423-4153-a640-d31bca6890a0"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8490), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000038") },
                    { new Guid("57ff712f-dee7-4462-ba9e-b4afe2139e05"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8510), null, new Guid("00000000-0000-0000-0000-000000000006"), null, new Guid("40000000-0000-0000-0000-000000000044") },
                    { new Guid("5a1f2dba-eb34-4618-a72b-8491b52be260"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8390), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000014") },
                    { new Guid("5ab52e5b-407c-436d-898e-16f576fd1c08"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8490), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000039") },
                    { new Guid("5af8227b-3d31-4550-a9ae-78a2f6de36c7"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8360), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000007") },
                    { new Guid("62d79583-6cf5-4ee2-96f8-27487c9857d5"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8500), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000041") },
                    { new Guid("653e902e-6622-491a-82d4-63405eb87d3b"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8430), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000023") },
                    { new Guid("8024852d-978a-4162-92aa-c9494e23810a"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8350), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000005") },
                    { new Guid("80e25c23-4339-48b0-b922-818fcf6310a6"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8500), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000042") },
                    { new Guid("8481bb18-200f-4f7d-8c11-9676d3faaa68"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8530), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000050") },
                    { new Guid("84ce215c-a7eb-444b-aae5-f88799283415"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8350), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000004") },
                    { new Guid("95de6c49-d41a-459a-b6cf-095b2098800b"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8510), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000045") },
                    { new Guid("9895d1bb-843c-470b-9079-027dbe9117ef"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8340), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000003") },
                    { new Guid("98eb5f08-1906-4359-8ecc-b2287ed44274"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8500), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000040") },
                    { new Guid("9acd8a5a-0d20-46e7-bac8-e22ed05c629f"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8450), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000029") },
                    { new Guid("9b1c534d-1795-4648-9809-01298b792dcb"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8480), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000036") },
                    { new Guid("a779a150-000b-4f23-92c5-fc743ed5bfaf"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8430), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000022") },
                    { new Guid("a81f0530-1abc-4c15-ae6f-d25b5f9cd556"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8420), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000021") },
                    { new Guid("a96d6c73-e60f-425f-88f3-1ea63e546612"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8360), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000006") },
                    { new Guid("aa4bf9c0-3bad-4f1e-895b-e6cf1ca859a3"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8420), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000020") },
                    { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("00000000-0000-0000-0000-000000000001"), null, new Guid("11111111-1111-1111-1111-11111111111a") },
                    { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("22222222-2222-2222-2222-22222222222a") },
                    { new Guid("beaf93e7-663b-4a5a-91cf-254bffc22ee4"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8370), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000009") },
                    { new Guid("c30ebe8f-3751-41c3-a8be-f0db79a27296"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8470), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000033") },
                    { new Guid("c6e28d9f-51b4-45ab-a639-15327556c831"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8480), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000037") },
                    { new Guid("c6e77136-78d1-43df-b0e2-140290c919ae"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8470), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000032") },
                    { new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("00000000-0000-0000-0000-000000000003"), null, new Guid("33333333-3333-3333-3333-33333333333a") },
                    { new Guid("ccf3f6f7-8963-4da8-a270-4781656f19a3"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8520), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000047") },
                    { new Guid("cd43eaf1-9da1-48fc-855c-6de480c0fd6f"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8440), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000025") },
                    { new Guid("cf487a0a-38cc-4e57-80ae-935dc706d5c5"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8460), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000030") },
                    { new Guid("d108ad7d-32e4-4809-b00c-9815fec6eef5"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8400), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000016") },
                    { new Guid("d341b685-eb32-4000-b995-9e1d6ea91cfc"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8380), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000012") },
                    { new Guid("d423c6a0-74f0-4cbd-901c-2d5c69c7416b"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8450), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000028") },
                    { new Guid("dbb2d56e-5b2b-4118-bdcd-b3de415e0250"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8460), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000031") },
                    { new Guid("dc2fc4cf-d7e1-4e26-9e22-782d324d8bb2"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8370), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000010") },
                    { new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("44444444-4444-4444-4444-44444444444a") },
                    { new Guid("dfa5f693-b165-4f98-9157-43b60871f0ed"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8470), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000034") },
                    { new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("00000000-0000-0000-0000-000000000005"), null, new Guid("55555555-5555-5555-5555-55555555555a") },
                    { new Guid("f2332c0d-da16-4b3d-b44e-5cfa9eca48d2"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8410), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000017") },
                    { new Guid("f28d6590-33ad-44b0-abcc-7bb39929fb56"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8390), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000015") },
                    { new Guid("f306716d-4a2b-496c-abd0-22ea92abe2c3"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8380), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000013") },
                    { new Guid("f3b0a4e9-7d63-4e47-9126-e110a63c8452"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8330), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000001") },
                    { new Guid("f9e8a480-0e73-4da9-82f5-e4b3417d96dc"), new DateTime(2025, 5, 19, 22, 7, 54, 765, DateTimeKind.Utc).AddTicks(8530), null, new Guid("00000000-0000-0000-0000-000000000003"), null, new Guid("40000000-0000-0000-0000-000000000049") },
                    { new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("00000000-0000-0000-0000-000000000006"), null, new Guid("66666666-6666-6666-6666-66666666666a") }
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "Id", "CourseCode", "CourseName", "CourseType", "CreatedDate", "DeletedDate", "DepartmentId", "Ects", "UpdatedDate" },
                values: new object[,]
                {
                    { new Guid("30000000-0000-0000-0000-000000000001"), "MATH 141", "Calculus I", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(450), null, new Guid("20000000-0000-0000-0000-000000000014"), 5, null },
                    { new Guid("30000000-0000-0000-0000-000000000002"), "PHYS 121", "Physics I", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(450), null, new Guid("20000000-0000-0000-0000-000000000012"), 7, null },
                    { new Guid("30000000-0000-0000-0000-000000000003"), "CENG 111", "Introduction to Computer Engineering", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(450), null, new Guid("20000000-0000-0000-0000-000000000001"), 5, null },
                    { new Guid("30000000-0000-0000-0000-000000000004"), "CENG 113", "Introduction to Programming", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(450), null, new Guid("20000000-0000-0000-0000-000000000001"), 6, null },
                    { new Guid("30000000-0000-0000-0000-000000000005"), "CENG 115", "Discrete Structures", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(460), null, new Guid("20000000-0000-0000-0000-000000000001"), 5, null },
                    { new Guid("30000000-0000-0000-0000-000000000006"), "ENG 101", "Academic English I", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(460), null, new Guid("20000000-0000-0000-0000-000000000019"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000007"), "MATH 142", "Calculus II", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(460), null, new Guid("20000000-0000-0000-0000-000000000014"), 6, null },
                    { new Guid("30000000-0000-0000-0000-000000000008"), "PHYS 122", "Physics II", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(470), null, new Guid("20000000-0000-0000-0000-000000000012"), 8, null },
                    { new Guid("30000000-0000-0000-0000-000000000009"), "MATH 144", "Finite Mathematics", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(470), null, new Guid("20000000-0000-0000-0000-000000000014"), 5, null },
                    { new Guid("30000000-0000-0000-0000-000000000010"), "CENG 112", "Data Structures", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(470), null, new Guid("20000000-0000-0000-0000-000000000001"), 5, null },
                    { new Guid("30000000-0000-0000-0000-000000000011"), "ECON 106", "Principles of Economics", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(480), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000012"), "ENG 102", "Academic English II", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(480), null, new Guid("20000000-0000-0000-0000-000000000019"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000013"), "GCC 101", "Career Planning and Development", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(480), null, new Guid("20000000-0000-0000-0000-000000000020"), 0, null },
                    { new Guid("30000000-0000-0000-0000-000000000014"), "CENG 211", "Fundamentals of Programming", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(490), null, new Guid("20000000-0000-0000-0000-000000000001"), 5, null },
                    { new Guid("30000000-0000-0000-0000-000000000015"), "CENG 213", "Theory of Computation", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(490), null, new Guid("20000000-0000-0000-0000-000000000001"), 5, null },
                    { new Guid("30000000-0000-0000-0000-000000000016"), "CENG 215", "Circuits and Electronics", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(490), null, new Guid("20000000-0000-0000-0000-000000000001"), 6, null },
                    { new Guid("30000000-0000-0000-0000-000000000017"), "MATH 255", "Differential Equations", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(490), null, new Guid("20000000-0000-0000-0000-000000000014"), 6, null },
                    { new Guid("30000000-0000-0000-0000-000000000018"), "HIST 201", "History of Turkish Republic I", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(500), null, new Guid("20000000-0000-0000-0000-000000000020"), 2, null },
                    { new Guid("30000000-0000-0000-0000-000000000019"), "TURK 201", "Turkish Language I", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(500), null, new Guid("20000000-0000-0000-0000-000000000020"), 2, null },
                    { new Guid("30000000-0000-0000-0000-000000000020"), "HIST 203", "History of Turkish Revolution I", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(500), null, new Guid("20000000-0000-0000-0000-000000000020"), 2, null },
                    { new Guid("30000000-0000-0000-0000-000000000021"), "TURK 203", "Turkish for International Students I", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(500), null, new Guid("20000000-0000-0000-0000-000000000020"), 2, null },
                    { new Guid("30000000-0000-0000-0000-000000000022"), "CENG 212", "Programming Language Concepts", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(510), null, new Guid("20000000-0000-0000-0000-000000000001"), 5, null },
                    { new Guid("30000000-0000-0000-0000-000000000023"), "CENG 214", "Logic Design", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(510), null, new Guid("20000000-0000-0000-0000-000000000001"), 6, null },
                    { new Guid("30000000-0000-0000-0000-000000000024"), "CENG 216", "Numerical Computing", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(510), null, new Guid("20000000-0000-0000-0000-000000000001"), 5, null },
                    { new Guid("30000000-0000-0000-0000-000000000025"), "CENG 218", "Analysis and Design of Algorithms", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(510), null, new Guid("20000000-0000-0000-0000-000000000001"), 5, null },
                    { new Guid("30000000-0000-0000-0000-000000000026"), "CENG 222", "Probability and Statistics", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(520), null, new Guid("20000000-0000-0000-0000-000000000001"), 5, null },
                    { new Guid("30000000-0000-0000-0000-000000000027"), "HIST 202", "History of Turkish Republic II", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(520), null, new Guid("20000000-0000-0000-0000-000000000020"), 2, null },
                    { new Guid("30000000-0000-0000-0000-000000000028"), "TURK 202", "Turkish Language II", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(520), null, new Guid("20000000-0000-0000-0000-000000000020"), 2, null },
                    { new Guid("30000000-0000-0000-0000-000000000029"), "HIST 204", "History of Turkish Revolution II", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(520), null, new Guid("20000000-0000-0000-0000-000000000020"), 2, null },
                    { new Guid("30000000-0000-0000-0000-000000000030"), "TURK 204", "Turkish for International Students II", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(530), null, new Guid("20000000-0000-0000-0000-000000000020"), 2, null },
                    { new Guid("30000000-0000-0000-0000-000000000031"), "CENG 311", "Computer Architecture", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(530), null, new Guid("20000000-0000-0000-0000-000000000001"), 8, null },
                    { new Guid("30000000-0000-0000-0000-000000000032"), "CENG 315", "Information Management", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(540), null, new Guid("20000000-0000-0000-0000-000000000001"), 6, null },
                    { new Guid("30000000-0000-0000-0000-000000000033"), "CENG 312", "Computer Networks", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(540), null, new Guid("20000000-0000-0000-0000-000000000001"), 6, null },
                    { new Guid("30000000-0000-0000-0000-000000000034"), "CENG 316", "Software Engineering", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(540), null, new Guid("20000000-0000-0000-0000-000000000001"), 6, null },
                    { new Guid("30000000-0000-0000-0000-000000000035"), "CENG 318", "Human-Computer Interaction", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(540), null, new Guid("20000000-0000-0000-0000-000000000001"), 6, null },
                    { new Guid("30000000-0000-0000-0000-000000000036"), "CENG 322", "Operating Systems", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(550), null, new Guid("20000000-0000-0000-0000-000000000001"), 8, null },
                    { new Guid("30000000-0000-0000-0000-000000000037"), "CENG 411", "Professionalism in Computer Engineering", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(550), null, new Guid("20000000-0000-0000-0000-000000000001"), 6, null },
                    { new Guid("30000000-0000-0000-0000-000000000038"), "CENG 415", "Undergraduate Thesis and Seminar I", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(550), null, new Guid("20000000-0000-0000-0000-000000000001"), 8, null },
                    { new Guid("30000000-0000-0000-0000-000000000039"), "CENG 416", "Undergraduate Thesis and Seminar II", 1, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(560), null, new Guid("20000000-0000-0000-0000-000000000001"), 8, null },
                    { new Guid("30000000-0000-0000-0000-000000000040"), "CENG 370", "Mainframe Computers", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(560), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000041"), "CENG 381", "Stochastic Processes", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(560), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000042"), "CENG 382", "Information Theory", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(560), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000043"), "CENG 383", "Real-Time Systems", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(570), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000044"), "CENG 384", "Microprocessors", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(570), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000045"), "CENG 385", "Mathematical Logic", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(570), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000046"), "CENG 386", "Fuzzy Logic Systems", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(570), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000047"), "CENG 388", "Web Programming", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(580), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000048"), "CENG 389", "Mobile Application Development", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(580), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000049"), "CENG 390", "Cloud Computing", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(580), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000050"), "CENG 391", "Introduction to Image Understanding", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(580), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000051"), "CENG 421", "Computer Network Programming", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(590), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000052"), "CENG 422", "Computer Network Design and Management", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(590), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000053"), "CENG 431", "Software Systems Development", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(590), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000054"), "CENG 432", "Fundamentals of Enterprise Application Development", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(590), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000055"), "CENG 433", "Scalable Software Development for the Internet", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(600), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000056"), "CENG 434", "Enterprise Application Integrations", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(600), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000057"), "CENG 435", "Database Management System Design and Implementation", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(600), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000058"), "CENG 436", "Distributed Information Management", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(600), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000059"), "CENG 437", "Software Quality Management", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(610), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000060"), "CENG 441", "Introduction to Parallel Programming", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(610), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000061"), "CENG 442", "Multi-Core Architectures and Operating Systems", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(620), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000062"), "CENG 443", "Heterogeneous Parallel Programming", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(620), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000063"), "CENG 444", "Parallel Programming Patterns", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(620), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000064"), "CENG 451", "Advanced Digital System Design", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(620), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000065"), "CENG 452", "Software Development for Embedded Systems", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(630), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000066"), "CENG 461", "Artificial Intelligence", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(630), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000067"), "CENG 462", "Soft Computing", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(630), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000068"), "CENG 463", "Introduction to Machine Learning", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(640), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000069"), "CENG 464", "Text Mining", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(640), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000070"), "CENG 465", "Principles of Data-Intensive Systems", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(640), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000071"), "CENG 471", "Cryptography", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(640), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000072"), "CENG 472", "Computer Network Security", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(650), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000073"), "CENG 473", "Information and Communication Technologies Security", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(650), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000074"), "CENG 481", "Theoretical Approaches in Computer Science", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(650), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000075"), "CENG 482", "Evolutionary Computation", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(650), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000076"), "CENG 483", "Behavioral Robotics", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(660), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000077"), "CENG 484", "Data Mining", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(660), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000078"), "CENG 485", "Entrepreneurship in Information Technologies", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(660), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000079"), "CENG 486", "Entrepreneurship for Smart Businesses", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(660), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000080"), "CENG 487", "Introduction to Computer Graphics", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(670), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000081"), "CENG 488", "Computer Graphics", 2, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(670), null, new Guid("20000000-0000-0000-0000-000000000001"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000082"), "ART 201", "Drawing-Sketch", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(670), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000083"), "ART 202", "Painting", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(670), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000084"), "ART 203", "Sculpture", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(680), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000085"), "ART 204", "Artistic Ceramics", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(680), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000086"), "ART 205", "Color Photography", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(680), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000087"), "ART 206", "Introduction to Sound Production and Design", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(680), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000088"), "ART 210", "Western Music and Aesthetics", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(690), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000089"), "ART 211", "Music Workshop", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(690), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000090"), "ART 212", "Introduction to Harmony", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(690), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000091"), "ART 230", "Dance Education", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(700), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000092"), "ART 231", "Traditional Folk Dances I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(710), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000093"), "ART 232", "Traditional Folk Dances II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(710), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000094"), "CHN 201", "Basic Chinese I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(710), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000095"), "FREN 201", "Basic French I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(710), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000096"), "FREN 202", "Basic French II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(720), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000097"), "FREN 203", "Intermediate French I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(720), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000098"), "GER 201", "Basic German I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(720), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000099"), "GER 202", "Basic German II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(720), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000100"), "GER 203", "Intermediate German I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(730), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000101"), "GER 204", "Intermediate German II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(730), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000102"), "HUM 203", "Introduction to Social Anthropology", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(730), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000103"), "HUM 205", "Current Issues in Turkish Language", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(730), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000104"), "HUM 206", "Comparative Cultures", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(740), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000105"), "HUM 207", "Ottoman History I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(740), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000106"), "HUM 208", "Ottoman History II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(740), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000107"), "HUM 211", "Introduction to Russian Culture", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(740), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000108"), "HUM 213", "History of Western Civilizations I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(750), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000109"), "HUM 214", "History of Western Civilizations II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(750), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000110"), "HUM 215", "Mythology", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(750), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000111"), "HUM 216", "Analysis of Folklore Texts", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(750), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000112"), "HUM 217", "Art History I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(760), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000113"), "HUM 218", "Art History II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(760), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000114"), "HUM 219", "Art History III", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(760), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000115"), "HUM 220", "Introduction to Japanese Culture", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(760), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000116"), "HUM 223", "Introduction to French Culture", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(770), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000117"), "HUM 226", "Textual Analysis of Contemporary Turkish Literature", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(770), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000118"), "HUM 227", "Turkish Language Reform", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(770), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000119"), "HUM 230", "Group Dynamics", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(770), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000120"), "HUM 231", "Sociology of Work", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(780), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000121"), "HUM 232", "Visual Communication Symbols in Art and Daily Life", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(780), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000122"), "HUM 233", "Visual Perception in Art", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(790), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000123"), "HUM 240", "Introduction to Spanish Culture", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(790), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000124"), "HUM 251", "Ottoman Turkish I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(800), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000125"), "HUM 252", "Ottoman Turkish II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(800), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000126"), "HUM 255", "Latin I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(800), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000127"), "HUM 256", "Latin II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(800), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000128"), "JAP 201", "Basic Japanese I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(810), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000129"), "JAP 202", "Basic Japanese II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(810), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000130"), "JAP 203", "Intermediate Japanese I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(810), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000131"), "MAN 203", "Project Management", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(810), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000132"), "MAN 205", "Innovation Management", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(820), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000133"), "MAN 206", "Businesses and Business Life", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(820), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000134"), "MAN 210", "Corporate Communication and Management Skills", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(820), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000135"), "MAN 211", "Communication and Management Skills for Engineers", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(820), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000136"), "MAN 215", "Engineering Economy", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(830), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000137"), "MAN 216", "Introduction to Marketing", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(830), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000138"), "MAN 217", "Fundamentals of Management", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(830), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000139"), "MAN 218", "Entrepreneurship", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(830), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000140"), "MAN 220", "Leadership", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(840), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000141"), "MAN 221", "Organizational and Personal Career Management", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(840), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000142"), "MAN 230", "Law in Business Life", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(840), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000143"), "MAN 231", "Intellectual and Industrial Property Law", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(840), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000144"), "RUS 201", "Basic Russian I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(840), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000145"), "RUS 202", "Basic Russian II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(850), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000146"), "RUS 203", "Intermediate Russian I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(850), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000147"), "RUS 204", "Intermediate Russian II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(850), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000148"), "RUS 205", "Advanced Russian I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(860), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000149"), "RUS 206", "Advanced Russian II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(860), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000150"), "SPAN 203", "Intermediate Spanish I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(860), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000151"), "SPAN 204", "Intermediate Spanish II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(860), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000152"), "SPRT 201", "Tennis I", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(870), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000153"), "SPRT 202", "Tennis II", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(870), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000154"), "SPRT 203", "Badminton", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(870), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000155"), "SPRT 204", "Basketball", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(870), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000156"), "SPRT 206", "Table Tennis", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(880), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null },
                    { new Guid("30000000-0000-0000-0000-000000000157"), "SPRT 208", "Basic Fitness Techniques", 3, new DateTime(2025, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(880), null, new Guid("20000000-0000-0000-0000-000000000020"), 3, null }
                });

            migrationBuilder.InsertData(
                table: "Staffs",
                columns: new[] { "Id", "CreatedDate", "DeletedDate", "DepartmentId", "FacultyId", "StaffIdentificationNumber", "Title", "UpdatedDate" },
                values: new object[,]
                {
                    { new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("20000000-0000-0000-0000-000000000001"), new Guid("10000000-0000-0000-0000-000000000001"), "STAFF001", "Advisor", null },
                    { new Guid("40000000-0000-0000-0000-000000000042"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("20000000-0000-0000-0000-000000000002"), new Guid("10000000-0000-0000-0000-000000000001"), "STAFF002", "Advisor", null },
                    { new Guid("40000000-0000-0000-0000-000000000043"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("20000000-0000-0000-0000-000000000001"), new Guid("10000000-0000-0000-0000-000000000001"), "STAFF003", "Department Secretary", null },
                    { new Guid("40000000-0000-0000-0000-000000000045"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("20000000-0000-0000-0000-000000000014"), new Guid("10000000-0000-0000-0000-000000000002"), "STAFF005", "Advisor", null },
                    { new Guid("40000000-0000-0000-0000-000000000046"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("20000000-0000-0000-0000-000000000012"), new Guid("10000000-0000-0000-0000-000000000002"), "STAFF006", "Academic Staff", null },
                    { new Guid("40000000-0000-0000-0000-000000000047"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("20000000-0000-0000-0000-000000000016"), new Guid("10000000-0000-0000-0000-000000000003"), "STAFF007", "Advisor", null },
                    { new Guid("40000000-0000-0000-0000-000000000048"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("20000000-0000-0000-0000-000000000019"), new Guid("10000000-0000-0000-0000-000000000004"), "STAFF008", "Instructor", null },
                    { new Guid("40000000-0000-0000-0000-000000000049"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("20000000-0000-0000-0000-000000000020"), new Guid("10000000-0000-0000-0000-000000000005"), "STAFF009", "Coordinator", null },
                    { new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, new Guid("20000000-0000-0000-0000-000000000001"), new Guid("10000000-0000-0000-0000-000000000001"), "STAFF010", "Advisor", null }
                });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "AssignedAdvisorUserId", "CreatedDate", "CurrentEctsCompleted", "CurrentGpa", "DeletedDate", "DepartmentId", "EnrollDate", "GraduationStatus", "ProgramName", "StudentNumber", "UpdatedDate" },
                values: new object[,]
                {
                    { new Guid("40000000-0000-0000-0000-000000000001"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2023, 3, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(220), 9, "Undergraduate Program", "202400001", null },
                    { new Guid("40000000-0000-0000-0000-000000000002"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2022, 4, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(240), 9, "Undergraduate Program", "202400002", null },
                    { new Guid("40000000-0000-0000-0000-000000000003"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2020, 6, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(240), 9, "Undergraduate Program", "202400003", null },
                    { new Guid("40000000-0000-0000-0000-000000000004"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2021, 3, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(250), 9, "Undergraduate Program", "202400004", null },
                    { new Guid("40000000-0000-0000-0000-000000000005"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2021, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(250), 9, "Undergraduate Program", "202400005", null },
                    { new Guid("40000000-0000-0000-0000-000000000006"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2020, 12, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(250), 9, "Undergraduate Program", "202400006", null },
                    { new Guid("40000000-0000-0000-0000-000000000007"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2022, 12, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(260), 9, "Undergraduate Program", "202400007", null },
                    { new Guid("40000000-0000-0000-0000-000000000008"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2020, 9, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(260), 9, "Undergraduate Program", "202400008", null },
                    { new Guid("40000000-0000-0000-0000-000000000009"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2023, 7, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(260), 9, "Undergraduate Program", "202400009", null },
                    { new Guid("40000000-0000-0000-0000-000000000010"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2024, 2, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(260), 9, "Undergraduate Program", "202400010", null },
                    { new Guid("40000000-0000-0000-0000-000000000011"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2022, 9, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(270), 9, "Undergraduate Program", "202400011", null },
                    { new Guid("40000000-0000-0000-0000-000000000012"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2023, 11, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(270), 9, "Undergraduate Program", "202400012", null },
                    { new Guid("40000000-0000-0000-0000-000000000013"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2023, 6, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(270), 9, "Undergraduate Program", "202400013", null },
                    { new Guid("40000000-0000-0000-0000-000000000014"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2024, 4, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(270), 9, "Undergraduate Program", "202400014", null },
                    { new Guid("40000000-0000-0000-0000-000000000015"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2020, 10, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(270), 9, "Undergraduate Program", "202400015", null },
                    { new Guid("40000000-0000-0000-0000-000000000016"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2022, 10, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(280), 9, "Undergraduate Program", "202400016", null },
                    { new Guid("40000000-0000-0000-0000-000000000017"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2024, 4, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(280), 9, "Undergraduate Program", "202400017", null },
                    { new Guid("40000000-0000-0000-0000-000000000018"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2020, 12, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(280), 9, "Undergraduate Program", "202400018", null },
                    { new Guid("40000000-0000-0000-0000-000000000019"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2021, 2, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(280), 9, "Undergraduate Program", "202400019", null },
                    { new Guid("40000000-0000-0000-0000-000000000020"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2023, 7, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(290), 9, "Undergraduate Program", "202400020", null },
                    { new Guid("40000000-0000-0000-0000-000000000021"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2021, 11, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(290), 9, "Undergraduate Program", "202400021", null },
                    { new Guid("40000000-0000-0000-0000-000000000022"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2021, 2, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(290), 9, "Undergraduate Program", "202400022", null },
                    { new Guid("40000000-0000-0000-0000-000000000023"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2024, 1, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(290), 9, "Undergraduate Program", "202400023", null },
                    { new Guid("40000000-0000-0000-0000-000000000024"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2023, 9, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(290), 9, "Undergraduate Program", "202400024", null },
                    { new Guid("40000000-0000-0000-0000-000000000025"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2020, 9, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(300), 9, "Undergraduate Program", "202400025", null },
                    { new Guid("40000000-0000-0000-0000-000000000026"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2022, 3, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(300), 9, "Undergraduate Program", "202400026", null },
                    { new Guid("40000000-0000-0000-0000-000000000027"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2022, 3, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(300), 9, "Undergraduate Program", "202400027", null },
                    { new Guid("40000000-0000-0000-0000-000000000028"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2021, 10, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(300), 9, "Undergraduate Program", "202400028", null },
                    { new Guid("40000000-0000-0000-0000-000000000029"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2020, 9, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(300), 9, "Undergraduate Program", "202400029", null },
                    { new Guid("40000000-0000-0000-0000-000000000030"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2021, 2, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(310), 9, "Undergraduate Program", "202400030", null },
                    { new Guid("40000000-0000-0000-0000-000000000031"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2021, 8, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(310), 9, "Undergraduate Program", "202400031", null },
                    { new Guid("40000000-0000-0000-0000-000000000032"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2021, 3, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(310), 9, "Undergraduate Program", "202400032", null },
                    { new Guid("40000000-0000-0000-0000-000000000033"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2022, 6, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(310), 9, "Undergraduate Program", "202400033", null },
                    { new Guid("40000000-0000-0000-0000-000000000034"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2021, 7, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(310), 9, "Undergraduate Program", "202400034", null },
                    { new Guid("40000000-0000-0000-0000-000000000035"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2021, 11, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(320), 9, "Undergraduate Program", "202400035", null },
                    { new Guid("40000000-0000-0000-0000-000000000036"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2022, 2, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(320), 9, "Undergraduate Program", "202400036", null },
                    { new Guid("40000000-0000-0000-0000-000000000037"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2022, 12, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(320), 9, "Undergraduate Program", "202400037", null },
                    { new Guid("40000000-0000-0000-0000-000000000038"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2023, 5, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(330), 9, "Undergraduate Program", "202400038", null },
                    { new Guid("40000000-0000-0000-0000-000000000039"), new Guid("40000000-0000-0000-0000-000000000041"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2022, 11, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(330), 9, "Undergraduate Program", "202400039", null },
                    { new Guid("40000000-0000-0000-0000-000000000040"), new Guid("40000000-0000-0000-0000-000000000050"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, null, new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2023, 3, 20, 1, 7, 54, 766, DateTimeKind.Utc).AddTicks(330), 9, "Undergraduate Program", "202400040", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Courses_DepartmentId",
                table: "Courses",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseTakens_MatchedCourseId",
                table: "CourseTakens",
                column: "MatchedCourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseTakens_StudentUserId",
                table: "CourseTakens",
                column: "StudentUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_FacultyId",
                table: "Departments",
                column: "FacultyId");

            migrationBuilder.CreateIndex(
                name: "IX_EligibilityCheckResults_GraduationProcessId",
                table: "EligibilityCheckResults",
                column: "GraduationProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_EmailAuthenticators_UserId",
                table: "EmailAuthenticators",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FileAttachments_GraduationProcessId",
                table: "FileAttachments",
                column: "GraduationProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_FileAttachments_StudentUserId",
                table: "FileAttachments",
                column: "StudentUserId");

            migrationBuilder.CreateIndex(
                name: "IX_FileAttachments_TranscriptDataId",
                table: "FileAttachments",
                column: "TranscriptDataId");

            migrationBuilder.CreateIndex(
                name: "IX_FileAttachments_UploaderUserId",
                table: "FileAttachments",
                column: "UploaderUserId");

            migrationBuilder.CreateIndex(
                name: "IX_GraduationProcesses_AdvisorUserId",
                table: "GraduationProcesses",
                column: "AdvisorUserId");

            migrationBuilder.CreateIndex(
                name: "IX_GraduationProcesses_DeansOfficeUserId",
                table: "GraduationProcesses",
                column: "DeansOfficeUserId");

            migrationBuilder.CreateIndex(
                name: "IX_GraduationProcesses_DeptSecretaryUserId",
                table: "GraduationProcesses",
                column: "DeptSecretaryUserId");

            migrationBuilder.CreateIndex(
                name: "IX_GraduationProcesses_StudentAffairsUserId",
                table: "GraduationProcesses",
                column: "StudentAffairsUserId");

            migrationBuilder.CreateIndex(
                name: "IX_GraduationProcesses_StudentUserId",
                table: "GraduationProcesses",
                column: "StudentUserId");

            migrationBuilder.CreateIndex(
                name: "IX_GraduationRequirementSets_CreatedByUserId",
                table: "GraduationRequirementSets",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_GraduationRequirementSets_DepartmentId",
                table: "GraduationRequirementSets",
                column: "DepartmentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GraduationRequirementSets_LastModifiedByUserId",
                table: "GraduationRequirementSets",
                column: "LastModifiedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_RecipientUserId",
                table: "Notifications",
                column: "RecipientUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_RelatedProcessId",
                table: "Notifications",
                column: "RelatedProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_OtpAuthenticators_UserId",
                table: "OtpAuthenticators",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RankingListCriterias_RankingListId",
                table: "RankingListCriterias",
                column: "RankingListId");

            migrationBuilder.CreateIndex(
                name: "IX_RankingListEntries_RankingListId",
                table: "RankingListEntries",
                column: "RankingListId");

            migrationBuilder.CreateIndex(
                name: "IX_RankingListEntries_StudentUserId",
                table: "RankingListEntries",
                column: "StudentUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RankingLists_GeneratedByUserId",
                table: "RankingLists",
                column: "GeneratedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RankingLists_ScopeDepartmentId",
                table: "RankingLists",
                column: "ScopeDepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_RankingLists_ScopeFacultyId",
                table: "RankingLists",
                column: "ScopeFacultyId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RequirementMandatoryCourses_CourseId",
                table: "RequirementMandatoryCourses",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_RequirementMandatoryCourses_GraduationRequirementSetId",
                table: "RequirementMandatoryCourses",
                column: "GraduationRequirementSetId");

            migrationBuilder.CreateIndex(
                name: "IX_Staffs_DepartmentId",
                table: "Staffs",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Staffs_FacultyId",
                table: "Staffs",
                column: "FacultyId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_AssignedAdvisorUserId",
                table: "Students",
                column: "AssignedAdvisorUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_DepartmentId",
                table: "Students",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_TranscriptDatas_StudentUserId",
                table: "TranscriptDatas",
                column: "StudentUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserOperationClaims_OperationClaimId",
                table: "UserOperationClaims",
                column: "OperationClaimId");

            migrationBuilder.CreateIndex(
                name: "IX_UserOperationClaims_UserId",
                table: "UserOperationClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ValidationCodes_UserId",
                table: "ValidationCodes",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseTakens");

            migrationBuilder.DropTable(
                name: "EligibilityCheckResults");

            migrationBuilder.DropTable(
                name: "EmailAuthenticators");

            migrationBuilder.DropTable(
                name: "FileAttachments");

            migrationBuilder.DropTable(
                name: "MailLogs");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "OtpAuthenticators");

            migrationBuilder.DropTable(
                name: "RankingListCriterias");

            migrationBuilder.DropTable(
                name: "RankingListEntries");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "RequirementMandatoryCourses");

            migrationBuilder.DropTable(
                name: "Staffs");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "UserOperationClaims");

            migrationBuilder.DropTable(
                name: "ValidationCodes");

            migrationBuilder.DropTable(
                name: "TranscriptDatas");

            migrationBuilder.DropTable(
                name: "GraduationProcesses");

            migrationBuilder.DropTable(
                name: "RankingLists");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "GraduationRequirementSets");

            migrationBuilder.DropTable(
                name: "OperationClaims");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Faculties");
        }
    }
}
