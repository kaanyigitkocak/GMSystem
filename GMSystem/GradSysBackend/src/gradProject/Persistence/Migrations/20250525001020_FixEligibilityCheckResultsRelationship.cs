using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixEligibilityCheckResultsRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("00af4b3d-5fef-4ace-834d-b41ea687b5e3"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("01b08141-9f39-45e9-a183-56e24275961b"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("0ef68268-c606-4b04-91bb-d5ec18369d31"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("11f1f7db-39f3-4814-884e-4e61a15d0ee2"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("122ce92b-d368-4abc-abc9-e7ed6a08ae77"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("14ffc83d-5f64-4a16-b270-2c2aba2b14d7"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("15f13c9c-4bc6-4bd6-ab98-23ddf3351de5"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("22d9d163-b02e-4d2b-a082-c8c2e1fbc73c"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("2a4b9c41-8f24-45ac-b033-aa6e7f406613"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("2c2afecd-0b4d-4ac8-a5e4-884c93003680"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("30fd7e0b-c650-421d-8601-02d241d1fa38"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("31e95d89-58e9-445d-8b5f-8b433b2fa83d"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("32f83747-8e65-41d6-80da-99281c511029"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("4152f620-63ae-4788-8e83-6971f73ce0d5"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("42abff95-cc74-4f81-a233-d174bb146d35"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("439948ae-082a-47dc-8404-f5ec5419af94"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("4b0609c0-058a-4528-986b-3ebb06d4b91f"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("518b14dc-5407-414c-a09b-0fcbc6d9363c"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("51b6f077-5992-417b-a52b-ee75a5777563"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("546c4187-ce47-40d1-9d70-65e99db72f10"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("5efb597d-13cc-49b7-9c0a-2f1c754ed3c0"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("68288bbe-ff1c-4b36-9c0c-1facdb3824b4"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("6a2fbd5f-1de3-405c-82d1-835e4db7b3dc"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("707e19a7-5da3-4fb8-88ff-361f9bb62280"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("77965c7d-c112-47ef-a856-447fdf8d2fdf"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("792695b5-ef6a-4f2b-a792-a5d1e45442fc"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("7a1fdd96-7b59-4446-95ac-c5e2a9c620a5"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("7fd5f16b-9450-46df-ba88-2591e1031460"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("844fa37a-4a36-4fde-b4f8-dd5cd7c5339f"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("943c8072-e593-431c-a22e-4061ff8e8c3d"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("9dbc0dae-786a-4c99-b749-b3bb4d094b15"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("9fc1c443-bc39-42d4-adb5-7dcf28c89b82"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("a127af33-6ed3-4a4a-b40c-318fcac15bc1"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("a37630b9-df05-4d8c-ba87-622905d91c30"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("a8991f52-bc3e-4b84-a012-ffffa03ee2a9"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("a9431fe7-d4fa-4057-a63b-c9d9ce16c906"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("b3f9ef0f-1fd0-4426-bbe7-807980fe4cca"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("b83deea9-5671-4387-83c8-8546e8e93767"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("bb03c739-4451-43f7-8887-5d10de712571"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("c8f87677-6ef8-41e8-ad59-f2f41856dc75"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("cb2b6dbe-ff9a-41d5-9d87-41883e42b659"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("cc3b04e1-3cf9-42bb-b3a6-e18ea44c890e"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("cd795b27-08f1-472c-b367-ddcf5e4ae653"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("d6fe3ce2-d7c9-42a6-af6d-ae3ff8a231c6"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("de02a3da-ba4f-40cd-b626-ced41b8ea615"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("e08a2378-3005-4857-a16d-84b2fdf30fc8"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("eaf8017e-987a-4505-ba3b-6f389d0cfa93"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("f04c2840-2b9e-4121-b024-e03c445e8bf9"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("f3d44706-12f3-490f-8ec8-f38ed6dd1f06"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("fa4f37b0-aef2-4563-acdf-45b63b710124"));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000001"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7750));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000002"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7760));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000003"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7760));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000004"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7760));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000005"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7760));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000006"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7770));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000007"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7770));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000008"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7890));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000009"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7890));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000010"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7900));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000011"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7900));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000012"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7900));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000013"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7900));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000014"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7910));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000015"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7910));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000016"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7910));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000017"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7910));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000018"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7920));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000019"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7920));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000020"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7920));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000021"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7920));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000022"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7930));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000023"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7930));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000024"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7930));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000025"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7930));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000026"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7940));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000027"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7940));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000028"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7940));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000029"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7940));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000030"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7950));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000031"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7950));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000032"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7950));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000033"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7950));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000034"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7960));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000035"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7970));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000036"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7970));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000037"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7980));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000038"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7980));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000039"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7990));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000040"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7990));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000041"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7990));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000042"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7990));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000043"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8000));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000044"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8000));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000045"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8000));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000046"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8000));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000047"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8010));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000048"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8010));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000049"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8010));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000050"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8010));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000051"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8020));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000052"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8020));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000053"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8020));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000054"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8020));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000055"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8020));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000056"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8030));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000057"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8030));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000058"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8030));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000059"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8030));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000060"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8040));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000061"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8040));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000062"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8040));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000063"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8040));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000064"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8050));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000065"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8050));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000066"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8060));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000067"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8060));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000068"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8060));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000069"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8070));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000070"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8070));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000071"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8070));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000072"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8080));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000073"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8080));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000074"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8080));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000075"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8080));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000076"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8080));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000077"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8090));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000078"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8090));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000079"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8090));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000080"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8090));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000081"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8100));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000082"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8100));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000083"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8100));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000084"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8100));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000085"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8110));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000086"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8110));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000087"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8110));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000088"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8110));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000089"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8120));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000090"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8120));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000091"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8130));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000092"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8130));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000093"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8140));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000094"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8140));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000095"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8140));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000096"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8140));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000097"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8150));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000098"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8150));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000099"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8160));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000100"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8160));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000101"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8160));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000102"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8160));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000103"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8170));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000104"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8170));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000105"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8170));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000106"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8170));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000107"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8180));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000108"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8180));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000109"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8180));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000110"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8180));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000111"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8190));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000112"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8190));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000113"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8190));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000114"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8190));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000115"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8200));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000116"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8200));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000117"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8200));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000118"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8200));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000119"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8210));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000120"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8210));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000121"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8210));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000122"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8220));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000123"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8220));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000124"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8220));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000125"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8220));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000126"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8230));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000127"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8230));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000128"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8230));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000129"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8230));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000130"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8240));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000131"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8240));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000132"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8250));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000133"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8250));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000134"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8250));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000135"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8250));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000136"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8260));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000137"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8260));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000138"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8260));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000139"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8260));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000140"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8270));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000141"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8270));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000142"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8270));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000143"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8270));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000144"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8290));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000145"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8290));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000146"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8290));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000147"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8290));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000148"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8300));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000149"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8300));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000150"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8300));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000151"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8300));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000152"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8310));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000153"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8310));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000154"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8310));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000155"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8310));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000156"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8320));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000157"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8320));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000158"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8320));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000159"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8320));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000160"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8330));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000161"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8330));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000162"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8330));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000163"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8330));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000164"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8340));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000165"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8340));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000166"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(8340));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000001"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6500));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000002"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6500));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000003"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6500));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000004"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6500));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000005"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6500));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000006"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6510));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000007"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6510));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000008"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6510));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000009"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6510));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000010"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6520));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000011"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6520));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000012"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6520));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000013"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6520));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000014"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6520));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000015"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6530));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000016"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6540));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000017"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6540));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000018"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6540));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000019"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6550));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000020"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6550));

            migrationBuilder.UpdateData(
                table: "Faculties",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000001"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6390));

            migrationBuilder.UpdateData(
                table: "Faculties",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000002"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6440));

            migrationBuilder.UpdateData(
                table: "Faculties",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000003"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6450));

            migrationBuilder.UpdateData(
                table: "Faculties",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000004"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6450));

            migrationBuilder.UpdateData(
                table: "Faculties",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000005"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(6450));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000001"),
                column: "EnrollDate",
                value: new DateTime(2020, 11, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7350));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000002"),
                column: "EnrollDate",
                value: new DateTime(2023, 9, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7360));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000003"),
                column: "EnrollDate",
                value: new DateTime(2024, 1, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7370));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000004"),
                column: "EnrollDate",
                value: new DateTime(2023, 9, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7370));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000005"),
                column: "EnrollDate",
                value: new DateTime(2021, 1, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7370));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000006"),
                column: "EnrollDate",
                value: new DateTime(2022, 9, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7380));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000007"),
                column: "EnrollDate",
                value: new DateTime(2021, 9, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7380));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000008"),
                column: "EnrollDate",
                value: new DateTime(2022, 3, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7380));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000009"),
                column: "EnrollDate",
                value: new DateTime(2022, 8, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7390));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000010"),
                column: "EnrollDate",
                value: new DateTime(2022, 12, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7390));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000011"),
                column: "EnrollDate",
                value: new DateTime(2023, 2, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7390));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000012"),
                column: "EnrollDate",
                value: new DateTime(2022, 7, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7390));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000013"),
                column: "EnrollDate",
                value: new DateTime(2021, 10, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7410));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000014"),
                column: "EnrollDate",
                value: new DateTime(2023, 11, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7410));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000015"),
                column: "EnrollDate",
                value: new DateTime(2021, 3, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7420));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000016"),
                column: "EnrollDate",
                value: new DateTime(2023, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7420));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000017"),
                column: "EnrollDate",
                value: new DateTime(2020, 9, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7420));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000018"),
                column: "EnrollDate",
                value: new DateTime(2021, 9, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7420));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000019"),
                column: "EnrollDate",
                value: new DateTime(2021, 10, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7430));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000020"),
                column: "EnrollDate",
                value: new DateTime(2024, 2, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7430));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000021"),
                column: "EnrollDate",
                value: new DateTime(2021, 11, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7430));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000022"),
                column: "EnrollDate",
                value: new DateTime(2021, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7430));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000023"),
                column: "EnrollDate",
                value: new DateTime(2023, 6, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7440));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000024"),
                column: "EnrollDate",
                value: new DateTime(2023, 2, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7440));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000025"),
                column: "EnrollDate",
                value: new DateTime(2022, 10, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7440));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000026"),
                column: "EnrollDate",
                value: new DateTime(2023, 8, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7440));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000027"),
                column: "EnrollDate",
                value: new DateTime(2024, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7450));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000028"),
                column: "EnrollDate",
                value: new DateTime(2022, 10, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7450));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000029"),
                column: "EnrollDate",
                value: new DateTime(2021, 3, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7450));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000030"),
                column: "EnrollDate",
                value: new DateTime(2022, 9, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7460));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000031"),
                column: "EnrollDate",
                value: new DateTime(2023, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7460));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000032"),
                column: "EnrollDate",
                value: new DateTime(2024, 3, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7460));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000033"),
                column: "EnrollDate",
                value: new DateTime(2022, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7460));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000034"),
                column: "EnrollDate",
                value: new DateTime(2020, 10, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7470));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000035"),
                column: "EnrollDate",
                value: new DateTime(2022, 9, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7470));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000036"),
                column: "EnrollDate",
                value: new DateTime(2024, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7470));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000037"),
                column: "EnrollDate",
                value: new DateTime(2020, 7, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7470));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000038"),
                column: "EnrollDate",
                value: new DateTime(2023, 2, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7480));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000039"),
                column: "EnrollDate",
                value: new DateTime(2022, 11, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7480));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000040"),
                column: "EnrollDate",
                value: new DateTime(2022, 2, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7480));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000041"),
                column: "EnrollDate",
                value: new DateTime(2023, 12, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7480));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000042"),
                column: "EnrollDate",
                value: new DateTime(2023, 11, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7490));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000043"),
                column: "EnrollDate",
                value: new DateTime(2023, 4, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7490));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000044"),
                column: "EnrollDate",
                value: new DateTime(2020, 11, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7490));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000045"),
                column: "EnrollDate",
                value: new DateTime(2021, 7, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7500));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000046"),
                column: "EnrollDate",
                value: new DateTime(2020, 8, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7500));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000047"),
                column: "EnrollDate",
                value: new DateTime(2023, 7, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7500));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000048"),
                column: "EnrollDate",
                value: new DateTime(2023, 8, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7500));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000049"),
                column: "EnrollDate",
                value: new DateTime(2020, 7, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7510));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000050"),
                column: "EnrollDate",
                value: new DateTime(2024, 4, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7510));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000051"),
                column: "EnrollDate",
                value: new DateTime(2024, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7510));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000052"),
                column: "EnrollDate",
                value: new DateTime(2021, 4, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7520));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000053"),
                column: "EnrollDate",
                value: new DateTime(2021, 4, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7520));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000054"),
                column: "EnrollDate",
                value: new DateTime(2022, 11, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7520));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000055"),
                column: "EnrollDate",
                value: new DateTime(2021, 10, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7520));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000056"),
                column: "EnrollDate",
                value: new DateTime(2022, 11, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7530));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000057"),
                column: "EnrollDate",
                value: new DateTime(2021, 3, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7530));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000058"),
                column: "EnrollDate",
                value: new DateTime(2021, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7530));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000059"),
                column: "EnrollDate",
                value: new DateTime(2022, 12, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7530));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000060"),
                column: "EnrollDate",
                value: new DateTime(2023, 11, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7540));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000061"),
                column: "EnrollDate",
                value: new DateTime(2024, 2, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7540));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000062"),
                column: "EnrollDate",
                value: new DateTime(2022, 10, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7540));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000063"),
                column: "EnrollDate",
                value: new DateTime(2022, 1, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7540));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000064"),
                column: "EnrollDate",
                value: new DateTime(2024, 2, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7550));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000065"),
                column: "EnrollDate",
                value: new DateTime(2021, 4, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7550));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000066"),
                column: "EnrollDate",
                value: new DateTime(2023, 7, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7550));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000067"),
                column: "EnrollDate",
                value: new DateTime(2023, 6, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7560));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000068"),
                column: "EnrollDate",
                value: new DateTime(2023, 1, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7560));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000069"),
                column: "EnrollDate",
                value: new DateTime(2023, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7560));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000070"),
                column: "EnrollDate",
                value: new DateTime(2023, 6, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7560));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000071"),
                column: "EnrollDate",
                value: new DateTime(2021, 12, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7570));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000072"),
                column: "EnrollDate",
                value: new DateTime(2021, 2, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7570));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000073"),
                column: "EnrollDate",
                value: new DateTime(2021, 11, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7570));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000074"),
                column: "EnrollDate",
                value: new DateTime(2023, 11, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7570));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000075"),
                column: "EnrollDate",
                value: new DateTime(2022, 12, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7580));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000076"),
                column: "EnrollDate",
                value: new DateTime(2022, 9, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7580));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000077"),
                column: "EnrollDate",
                value: new DateTime(2024, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7580));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000078"),
                column: "EnrollDate",
                value: new DateTime(2023, 8, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7590));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000079"),
                column: "EnrollDate",
                value: new DateTime(2021, 2, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7590));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000080"),
                column: "EnrollDate",
                value: new DateTime(2022, 2, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7590));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000081"),
                column: "EnrollDate",
                value: new DateTime(2021, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7590));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000082"),
                column: "EnrollDate",
                value: new DateTime(2021, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7600));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000083"),
                column: "EnrollDate",
                value: new DateTime(2021, 5, 25, 3, 10, 19, 102, DateTimeKind.Utc).AddTicks(7600));

            migrationBuilder.InsertData(
                table: "UserOperationClaims",
                columns: new[] { "Id", "CreatedDate", "DeletedDate", "OperationClaimId", "UpdatedDate", "UserId" },
                values: new object[,]
                {
                    { new Guid("01d3eaf5-de10-4007-b41d-32a38128aea8"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5050), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000025") },
                    { new Guid("03631d3f-4180-4061-92fb-c37c5b7345ef"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5000), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000012") },
                    { new Guid("04e07031-67ff-4a7c-b9d4-faa76c7e026d"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5060), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000029") },
                    { new Guid("06350cd5-563a-4d91-b10b-13419d04f885"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5110), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000085") },
                    { new Guid("1c94ce45-7526-4ab7-a123-10252660552c"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(4960), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000007") },
                    { new Guid("20c60e47-8181-4b54-b05d-a1efdb8f3a32"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5050), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000026") },
                    { new Guid("2477a728-e5c8-494f-98c3-106cef18342d"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5030), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000020") },
                    { new Guid("27e756ba-6993-4931-a915-cb95f9cbf0ed"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(4960), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000005") },
                    { new Guid("2f677a25-1e6f-453e-90bd-1e0a8ecf3a4c"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5090), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000036") },
                    { new Guid("34275814-81d1-44de-a6c8-d48236e64651"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(4940), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000001") },
                    { new Guid("3b139afc-5cab-446c-9ff9-68ad71a3747e"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5130), null, new Guid("00000000-0000-0000-0000-000000000003"), null, new Guid("40000000-0000-0000-0000-000000000089") },
                    { new Guid("41076673-e779-4989-867f-e7a757fbd6f9"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5140), null, new Guid("00000000-0000-0000-0000-000000000003"), null, new Guid("40000000-0000-0000-0000-000000000092") },
                    { new Guid("429f2e20-b6fa-4a15-bfbf-976060a514e4"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(4950), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000003") },
                    { new Guid("44ad58d9-c562-48dc-b210-122f4956b9bc"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(4970), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000009") },
                    { new Guid("5074d4c6-12c5-4958-847c-b34bc6e76062"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5120), null, new Guid("00000000-0000-0000-0000-000000000005"), null, new Guid("40000000-0000-0000-0000-000000000086") },
                    { new Guid("5a0cce97-081d-436a-a0b5-6baf1a39b3ae"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5050), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000027") },
                    { new Guid("5a65a8c9-5163-4eee-b111-6a6fddf143c4"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5020), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000017") },
                    { new Guid("5fe89163-90cb-48e5-9c62-5397790efdd0"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5040), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000023") },
                    { new Guid("6021e0c2-e172-467d-904d-61ead4bb7c2d"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5100), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000040") },
                    { new Guid("611b01de-bffd-4a0b-a756-498182ada620"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5110), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000084") },
                    { new Guid("652210a4-13d0-49ec-ae47-870139c8650e"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5080), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000034") },
                    { new Guid("65d5e9a1-5e5a-4134-8e9a-dc7930b0e418"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5040), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000022") },
                    { new Guid("6862150c-dc1b-4220-9ce6-e082a2b645b1"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5070), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000032") },
                    { new Guid("6c45bdaf-b28c-4d00-91e7-3067f7cfed5f"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5070), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000030") },
                    { new Guid("6ed1d9ea-969a-4604-a325-5ff759194571"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5000), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000013") },
                    { new Guid("73a095ba-854d-4813-8944-0c4e97ed4a4f"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5090), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000037") },
                    { new Guid("763d6141-57b1-4f0b-80b4-6e945ecc6c56"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5120), null, new Guid("00000000-0000-0000-0000-000000000006"), null, new Guid("40000000-0000-0000-0000-000000000087") },
                    { new Guid("7bd63fa5-ca74-421d-9e6f-e75ddf4b1493"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5140), null, new Guid("00000000-0000-0000-0000-000000000003"), null, new Guid("40000000-0000-0000-0000-000000000091") },
                    { new Guid("83a6ab4a-62a0-4a84-9ba2-b0dd5b8dd393"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5080), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000033") },
                    { new Guid("8ba18c92-185e-479e-90ad-14e55c855a71"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5060), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000028") },
                    { new Guid("910353a4-31f1-4157-8f5a-f148f545ab58"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5140), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000093") },
                    { new Guid("95338390-adc1-46cb-988f-dabe7f42497f"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(4940), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000002") },
                    { new Guid("97f6f9b6-254c-4193-b901-05aa362e286b"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(4970), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000008") },
                    { new Guid("9a3f59c1-c112-4bad-997a-5aa41fe542bf"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5100), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000038") },
                    { new Guid("9f5bc6fc-e7be-4873-ac91-6b43227edf4b"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(4990), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000011") },
                    { new Guid("9fb9fbb3-6d5c-4f88-90b1-cc1af081a651"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5010), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000014") },
                    { new Guid("a5f642a1-4215-4249-a2ec-dacb4f9f990f"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5090), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000035") },
                    { new Guid("bd06c693-5c0c-4084-a3f3-10c88bc8348b"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5020), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000018") },
                    { new Guid("be4e9a23-2789-41ec-aa15-d04a5e51786e"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(4950), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000004") },
                    { new Guid("cb914b2e-2a05-49e5-b8a2-edf1427dcb3b"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5010), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000016") },
                    { new Guid("e270273b-8d4d-4dd6-a4af-02c348ca0ce9"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5130), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000090") },
                    { new Guid("e5e0ca09-28b0-424d-9379-02a267dfc95e"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(4990), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000010") },
                    { new Guid("e5f2119f-b7ed-48e8-978b-2aca155992ed"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5020), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000019") },
                    { new Guid("ec200f31-4ee9-4334-92f0-464f053263cc"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5030), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000021") },
                    { new Guid("edc8627b-4c8c-4dc6-b155-c2b372cd55d9"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5120), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000088") },
                    { new Guid("f3ecc430-7a31-4da8-889b-bfcdb8b1a7e9"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5070), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000031") },
                    { new Guid("f402d8fe-bdcf-4e40-b283-4ec4d1b00265"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(4960), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000006") },
                    { new Guid("f5b97fe9-a3df-4738-9e1a-86231abe6d8f"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5040), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000024") },
                    { new Guid("f83f70c1-33e0-4139-9fe3-0f99a8a401d7"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5010), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000015") },
                    { new Guid("ff3eb4f7-8e2d-4a29-b179-3ee4453abcab"), new DateTime(2025, 5, 25, 0, 10, 19, 102, DateTimeKind.Utc).AddTicks(5100), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000039") }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-11111111111a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 134, 214, 39, 166, 136, 229, 172, 178, 87, 2, 74, 100, 112, 135, 82, 153, 137, 86, 235, 43, 145, 122, 199, 83, 159, 168, 123, 212, 247, 232, 9, 77, 18, 58, 179, 200, 189, 154, 24, 117, 108, 209, 207, 200, 227, 199, 40, 145, 91, 234, 68, 2, 191, 80, 119, 46, 93, 236, 85, 125, 96, 103, 176, 154 }, new byte[] { 8, 82, 117, 120, 150, 238, 218, 134, 226, 181, 10, 168, 98, 155, 178, 242, 212, 218, 54, 111, 5, 33, 205, 231, 6, 106, 72, 252, 73, 188, 13, 152, 50, 221, 161, 139, 119, 199, 105, 113, 51, 211, 194, 115, 26, 72, 126, 120, 48, 174, 102, 91, 132, 18, 35, 99, 141, 37, 111, 31, 75, 22, 61, 240, 239, 29, 244, 105, 94, 7, 26, 131, 236, 100, 210, 133, 187, 13, 58, 183, 214, 187, 148, 93, 132, 211, 139, 249, 67, 135, 15, 139, 60, 187, 226, 92, 89, 209, 97, 233, 247, 235, 105, 11, 136, 106, 128, 4, 49, 222, 182, 17, 93, 193, 82, 218, 115, 78, 183, 202, 22, 3, 30, 199, 246, 10, 134, 198 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-22222222222a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 5, 97, 207, 109, 146, 84, 98, 170, 211, 108, 75, 89, 119, 38, 73, 148, 86, 86, 138, 114, 93, 44, 10, 150, 183, 226, 250, 181, 114, 82, 103, 130, 12, 110, 117, 82, 240, 248, 234, 71, 48, 191, 149, 130, 230, 111, 125, 216, 82, 65, 95, 173, 26, 195, 116, 140, 144, 214, 142, 12, 199, 190, 29, 96 }, new byte[] { 8, 125, 250, 36, 16, 208, 255, 42, 66, 221, 155, 172, 105, 122, 218, 58, 15, 159, 70, 166, 79, 4, 118, 253, 79, 215, 93, 21, 191, 13, 236, 213, 214, 240, 208, 49, 178, 15, 242, 31, 237, 139, 215, 216, 66, 90, 21, 119, 93, 240, 115, 10, 101, 182, 61, 157, 203, 44, 92, 72, 181, 129, 30, 100, 32, 177, 56, 24, 103, 163, 234, 238, 253, 73, 79, 177, 220, 106, 95, 106, 89, 189, 159, 190, 25, 101, 137, 7, 103, 180, 146, 176, 221, 218, 72, 43, 86, 74, 175, 57, 23, 3, 132, 123, 24, 148, 61, 117, 23, 243, 127, 138, 60, 160, 200, 198, 93, 143, 173, 3, 9, 221, 93, 60, 222, 179, 174, 153 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-33333333333a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 207, 150, 212, 198, 195, 237, 76, 70, 43, 108, 120, 48, 88, 33, 192, 153, 141, 73, 200, 39, 176, 73, 185, 143, 46, 173, 21, 220, 198, 229, 13, 88, 184, 190, 42, 163, 44, 65, 39, 220, 39, 185, 151, 238, 12, 147, 228, 6, 173, 204, 36, 44, 78, 98, 132, 133, 64, 200, 60, 60, 238, 116, 186, 212 }, new byte[] { 245, 186, 202, 48, 33, 19, 31, 0, 240, 234, 46, 191, 169, 136, 137, 69, 223, 199, 98, 3, 28, 49, 150, 244, 92, 81, 41, 67, 15, 191, 144, 56, 58, 231, 195, 137, 81, 127, 168, 156, 207, 60, 68, 5, 223, 167, 175, 224, 25, 3, 143, 84, 9, 39, 54, 48, 194, 240, 39, 78, 68, 224, 54, 182, 240, 191, 217, 33, 229, 138, 144, 53, 219, 16, 245, 203, 193, 165, 1, 103, 92, 248, 2, 214, 71, 174, 238, 193, 255, 86, 120, 165, 62, 243, 250, 177, 183, 142, 31, 127, 112, 60, 196, 108, 242, 138, 149, 157, 211, 94, 199, 175, 131, 255, 23, 26, 39, 130, 16, 11, 117, 36, 115, 25, 47, 146, 243, 122 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000001"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000002"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000003"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000004"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000005"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000006"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000007"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000008"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000009"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000010"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000011"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000012"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000013"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000014"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000015"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000016"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000017"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000018"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000019"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000020"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000021"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000022"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000023"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000024"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000025"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000026"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000027"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000028"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000029"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000030"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000031"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000032"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000033"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000034"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000035"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000036"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000037"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000038"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000039"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000040"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000041"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000042"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000043"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000044"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000045"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000046"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000047"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000048"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000049"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000050"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000051"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000052"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000053"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000054"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000055"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000056"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000057"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000058"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000059"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000060"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000061"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000062"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000063"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000064"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000065"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000066"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000067"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000068"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000069"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000070"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000071"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000072"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000073"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000074"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000075"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000076"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000077"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000078"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000079"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000080"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000081"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000082"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000083"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000084"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000085"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000086"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000087"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000088"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000089"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000090"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000091"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000092"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000093"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 80, 217, 79, 34, 121, 201, 133, 78, 22, 1, 172, 25, 191, 84, 253, 62, 164, 91, 124, 62, 94, 104, 136, 233, 151, 19, 151, 13, 145, 170, 123, 72, 107, 181, 23, 43, 34, 92, 145, 103, 192, 141, 144, 240, 231, 172, 222, 212, 126, 64, 192, 112, 190, 88, 10, 40, 77, 210, 177, 78, 84, 108, 36, 105 }, new byte[] { 186, 156, 144, 123, 0, 15, 7, 231, 22, 61, 68, 92, 25, 34, 236, 127, 165, 140, 9, 253, 213, 51, 191, 181, 56, 97, 132, 87, 201, 35, 218, 19, 248, 86, 47, 117, 209, 161, 2, 93, 49, 107, 161, 254, 224, 167, 128, 75, 172, 40, 77, 34, 144, 32, 39, 103, 202, 82, 242, 130, 154, 143, 81, 158, 181, 178, 154, 112, 11, 198, 164, 221, 195, 87, 242, 247, 68, 25, 12, 61, 127, 33, 233, 137, 22, 13, 35, 213, 241, 24, 224, 225, 2, 27, 201, 224, 76, 169, 80, 72, 254, 152, 23, 79, 190, 118, 105, 219, 138, 133, 119, 159, 64, 83, 242, 13, 28, 3, 72, 245, 10, 8, 79, 23, 117, 20, 115, 34 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-44444444444a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 109, 206, 71, 226, 162, 150, 38, 234, 214, 254, 132, 161, 126, 109, 138, 8, 160, 48, 181, 5, 76, 218, 147, 65, 142, 92, 78, 123, 193, 152, 145, 184, 153, 175, 247, 208, 40, 1, 50, 190, 2, 173, 228, 189, 230, 231, 221, 149, 126, 160, 84, 141, 2, 157, 99, 221, 206, 185, 184, 234, 11, 35, 117, 124 }, new byte[] { 10, 141, 235, 82, 116, 36, 110, 33, 158, 191, 248, 35, 82, 26, 190, 40, 77, 160, 164, 67, 135, 110, 37, 152, 234, 202, 200, 199, 155, 102, 59, 22, 255, 53, 203, 126, 140, 72, 44, 142, 186, 35, 67, 205, 21, 136, 218, 174, 102, 226, 30, 140, 235, 189, 191, 65, 174, 248, 214, 247, 86, 106, 144, 228, 43, 28, 46, 128, 199, 21, 187, 158, 147, 98, 102, 152, 6, 199, 181, 186, 64, 142, 178, 165, 51, 214, 153, 45, 231, 117, 195, 205, 141, 183, 96, 195, 116, 145, 99, 223, 194, 232, 241, 56, 48, 51, 105, 189, 98, 199, 89, 39, 21, 42, 254, 23, 93, 36, 216, 1, 117, 242, 63, 179, 181, 25, 23, 102 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-55555555555a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 193, 32, 230, 161, 75, 216, 151, 65, 77, 31, 250, 82, 123, 35, 202, 77, 164, 140, 63, 0, 25, 229, 202, 20, 179, 161, 65, 185, 181, 198, 147, 31, 73, 48, 245, 32, 96, 139, 226, 150, 151, 199, 62, 139, 188, 255, 179, 197, 36, 45, 38, 184, 29, 248, 87, 141, 243, 122, 35, 236, 160, 73, 159, 143 }, new byte[] { 165, 222, 110, 229, 178, 237, 93, 127, 128, 241, 51, 67, 203, 182, 58, 36, 155, 219, 76, 91, 57, 191, 42, 18, 175, 23, 218, 103, 205, 124, 252, 188, 92, 130, 23, 87, 243, 41, 158, 181, 199, 82, 246, 38, 123, 101, 38, 82, 214, 164, 97, 86, 254, 62, 243, 101, 212, 189, 107, 46, 95, 133, 163, 92, 66, 56, 186, 113, 149, 36, 99, 51, 130, 173, 107, 66, 128, 193, 227, 72, 217, 75, 170, 78, 36, 89, 108, 61, 141, 237, 147, 132, 60, 228, 62, 73, 186, 71, 181, 138, 231, 18, 34, 205, 97, 36, 157, 167, 61, 228, 211, 121, 25, 182, 98, 144, 4, 115, 211, 173, 225, 116, 140, 128, 218, 233, 133, 228 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-66666666666a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 167, 59, 86, 188, 12, 145, 0, 216, 89, 107, 47, 186, 30, 56, 148, 23, 119, 220, 37, 56, 87, 10, 194, 71, 211, 110, 167, 17, 197, 37, 185, 130, 44, 57, 26, 169, 178, 26, 212, 103, 191, 53, 181, 65, 211, 69, 55, 158, 135, 62, 159, 251, 26, 98, 65, 179, 64, 97, 52, 78, 14, 120, 128, 76 }, new byte[] { 166, 101, 205, 192, 21, 55, 159, 80, 217, 165, 211, 44, 87, 64, 192, 70, 83, 171, 205, 187, 103, 82, 246, 131, 100, 239, 96, 238, 66, 64, 54, 64, 110, 153, 61, 190, 111, 1, 228, 16, 204, 85, 241, 17, 206, 196, 47, 201, 34, 12, 116, 69, 234, 132, 130, 214, 162, 163, 94, 77, 174, 130, 95, 224, 110, 171, 226, 218, 92, 24, 25, 239, 254, 155, 145, 132, 60, 92, 197, 201, 236, 83, 53, 201, 72, 168, 54, 251, 174, 22, 176, 243, 224, 88, 225, 120, 187, 152, 114, 236, 248, 178, 28, 179, 236, 13, 175, 171, 111, 93, 61, 42, 78, 206, 145, 253, 166, 129, 48, 162, 223, 53, 12, 192, 168, 86, 239, 103 } });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("01d3eaf5-de10-4007-b41d-32a38128aea8"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("03631d3f-4180-4061-92fb-c37c5b7345ef"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("04e07031-67ff-4a7c-b9d4-faa76c7e026d"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("06350cd5-563a-4d91-b10b-13419d04f885"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("1c94ce45-7526-4ab7-a123-10252660552c"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("20c60e47-8181-4b54-b05d-a1efdb8f3a32"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("2477a728-e5c8-494f-98c3-106cef18342d"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("27e756ba-6993-4931-a915-cb95f9cbf0ed"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("2f677a25-1e6f-453e-90bd-1e0a8ecf3a4c"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("34275814-81d1-44de-a6c8-d48236e64651"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("3b139afc-5cab-446c-9ff9-68ad71a3747e"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("41076673-e779-4989-867f-e7a757fbd6f9"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("429f2e20-b6fa-4a15-bfbf-976060a514e4"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("44ad58d9-c562-48dc-b210-122f4956b9bc"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("5074d4c6-12c5-4958-847c-b34bc6e76062"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("5a0cce97-081d-436a-a0b5-6baf1a39b3ae"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("5a65a8c9-5163-4eee-b111-6a6fddf143c4"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("5fe89163-90cb-48e5-9c62-5397790efdd0"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("6021e0c2-e172-467d-904d-61ead4bb7c2d"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("611b01de-bffd-4a0b-a756-498182ada620"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("652210a4-13d0-49ec-ae47-870139c8650e"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("65d5e9a1-5e5a-4134-8e9a-dc7930b0e418"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("6862150c-dc1b-4220-9ce6-e082a2b645b1"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("6c45bdaf-b28c-4d00-91e7-3067f7cfed5f"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("6ed1d9ea-969a-4604-a325-5ff759194571"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("73a095ba-854d-4813-8944-0c4e97ed4a4f"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("763d6141-57b1-4f0b-80b4-6e945ecc6c56"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("7bd63fa5-ca74-421d-9e6f-e75ddf4b1493"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("83a6ab4a-62a0-4a84-9ba2-b0dd5b8dd393"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("8ba18c92-185e-479e-90ad-14e55c855a71"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("910353a4-31f1-4157-8f5a-f148f545ab58"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("95338390-adc1-46cb-988f-dabe7f42497f"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("97f6f9b6-254c-4193-b901-05aa362e286b"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("9a3f59c1-c112-4bad-997a-5aa41fe542bf"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("9f5bc6fc-e7be-4873-ac91-6b43227edf4b"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("9fb9fbb3-6d5c-4f88-90b1-cc1af081a651"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("a5f642a1-4215-4249-a2ec-dacb4f9f990f"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("bd06c693-5c0c-4084-a3f3-10c88bc8348b"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("be4e9a23-2789-41ec-aa15-d04a5e51786e"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("cb914b2e-2a05-49e5-b8a2-edf1427dcb3b"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("e270273b-8d4d-4dd6-a4af-02c348ca0ce9"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("e5e0ca09-28b0-424d-9379-02a267dfc95e"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("e5f2119f-b7ed-48e8-978b-2aca155992ed"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("ec200f31-4ee9-4334-92f0-464f053263cc"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("edc8627b-4c8c-4dc6-b155-c2b372cd55d9"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("f3ecc430-7a31-4da8-889b-bfcdb8b1a7e9"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("f402d8fe-bdcf-4e40-b283-4ec4d1b00265"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("f5b97fe9-a3df-4738-9e1a-86231abe6d8f"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("f83f70c1-33e0-4139-9fe3-0f99a8a401d7"));

            migrationBuilder.DeleteData(
                table: "UserOperationClaims",
                keyColumn: "Id",
                keyValue: new Guid("ff3eb4f7-8e2d-4a29-b179-3ee4453abcab"));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000001"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8920));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000002"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8940));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000003"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8940));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000004"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8940));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000005"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8940));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000006"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8950));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000007"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8950));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000008"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8950));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000009"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8960));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000010"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8960));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000011"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8960));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000012"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8960));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000013"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8970));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000014"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8970));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000015"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8970));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000016"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8980));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000017"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8980));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000018"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8980));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000019"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8980));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000020"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8990));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000021"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8990));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000022"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8990));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000023"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8990));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000024"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9000));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000025"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9000));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000026"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9000));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000027"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9000));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000028"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9010));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000029"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9010));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000030"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9010));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000031"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9020));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000032"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9020));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000033"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9020));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000034"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9030));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000035"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9030));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000036"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9030));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000037"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9030));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000038"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9040));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000039"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9040));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000040"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9040));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000041"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9040));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000042"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9050));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000043"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9050));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000044"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9050));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000045"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9050));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000046"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9060));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000047"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9060));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000048"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9060));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000049"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9060));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000050"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9070));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000051"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9070));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000052"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9070));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000053"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9080));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000054"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9080));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000055"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9080));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000056"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9080));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000057"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9090));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000058"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9120));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000059"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9120));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000060"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9130));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000061"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9130));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000062"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9130));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000063"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9140));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000064"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9140));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000065"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9140));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000066"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9150));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000067"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9150));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000068"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9150));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000069"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9150));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000070"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9160));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000071"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9160));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000072"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9160));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000073"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9170));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000074"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9170));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000075"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9170));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000076"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9170));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000077"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9180));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000078"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9180));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000079"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9180));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000080"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9190));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000081"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9190));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000082"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9190));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000083"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9190));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000084"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9200));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000085"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9200));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000086"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9200));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000087"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9210));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000088"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9210));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000089"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9210));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000090"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9210));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000091"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9220));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000092"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9220));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000093"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9220));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000094"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9220));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000095"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9230));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000096"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9230));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000097"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9230));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000098"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9230));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000099"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9240));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000100"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9240));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000101"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9240));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000102"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9250));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000103"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9250));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000104"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9250));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000105"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9260));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000106"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9260));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000107"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9260));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000108"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9260));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000109"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9270));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000110"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9270));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000111"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9270));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000112"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9270));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000113"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9280));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000114"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9290));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000115"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9290));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000116"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9300));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000117"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9300));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000118"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9300));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000119"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9300));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000120"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9310));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000121"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9310));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000122"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9310));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000123"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9310));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000124"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9320));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000125"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9320));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000126"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9320));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000127"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9320));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000128"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9330));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000129"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9330));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000130"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9330));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000131"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9340));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000132"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9340));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000133"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9340));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000134"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9340));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000135"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9350));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000136"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9350));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000137"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9350));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000138"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9360));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000139"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9360));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000140"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9360));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000141"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9360));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000142"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9370));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000143"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9370));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000144"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9370));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000145"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9370));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000146"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9380));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000147"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9380));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000148"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9380));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000149"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9380));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000150"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9390));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000151"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9390));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000152"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9390));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000153"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9390));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000154"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9400));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000155"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9400));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000156"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9400));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000157"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9400));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000158"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9410));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000159"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9410));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000160"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9410));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000161"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9420));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000162"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9420));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000163"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9420));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000164"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9420));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000165"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9430));

            migrationBuilder.UpdateData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000166"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(9430));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000001"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7410));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000002"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7410));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000003"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7410));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000004"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7410));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000005"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7420));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000006"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7420));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000007"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7420));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000008"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7420));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000009"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7430));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000010"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7430));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000011"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7440));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000012"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7440));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000013"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7440));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000014"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7440));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000015"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7450));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000016"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7450));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000017"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7450));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000018"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7450));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000019"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7460));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000020"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7460));

            migrationBuilder.UpdateData(
                table: "Faculties",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000001"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7310));

            migrationBuilder.UpdateData(
                table: "Faculties",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000002"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7350));

            migrationBuilder.UpdateData(
                table: "Faculties",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000003"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7360));

            migrationBuilder.UpdateData(
                table: "Faculties",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000004"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7360));

            migrationBuilder.UpdateData(
                table: "Faculties",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000005"),
                column: "CreatedDate",
                value: new DateTime(2025, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(7360));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000001"),
                column: "EnrollDate",
                value: new DateTime(2020, 11, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8340));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000002"),
                column: "EnrollDate",
                value: new DateTime(2023, 9, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8350));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000003"),
                column: "EnrollDate",
                value: new DateTime(2024, 1, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8360));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000004"),
                column: "EnrollDate",
                value: new DateTime(2023, 9, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8360));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000005"),
                column: "EnrollDate",
                value: new DateTime(2021, 1, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8360));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000006"),
                column: "EnrollDate",
                value: new DateTime(2022, 9, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8380));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000007"),
                column: "EnrollDate",
                value: new DateTime(2021, 9, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8380));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000008"),
                column: "EnrollDate",
                value: new DateTime(2022, 3, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8390));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000009"),
                column: "EnrollDate",
                value: new DateTime(2022, 8, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8390));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000010"),
                column: "EnrollDate",
                value: new DateTime(2022, 12, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8390));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000011"),
                column: "EnrollDate",
                value: new DateTime(2023, 2, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8400));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000012"),
                column: "EnrollDate",
                value: new DateTime(2022, 7, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8400));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000013"),
                column: "EnrollDate",
                value: new DateTime(2021, 10, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8410));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000014"),
                column: "EnrollDate",
                value: new DateTime(2023, 11, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8410));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000015"),
                column: "EnrollDate",
                value: new DateTime(2021, 3, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8410));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000016"),
                column: "EnrollDate",
                value: new DateTime(2023, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8450));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000017"),
                column: "EnrollDate",
                value: new DateTime(2020, 9, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8450));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000018"),
                column: "EnrollDate",
                value: new DateTime(2021, 9, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8460));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000019"),
                column: "EnrollDate",
                value: new DateTime(2021, 10, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8460));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000020"),
                column: "EnrollDate",
                value: new DateTime(2024, 2, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8460));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000021"),
                column: "EnrollDate",
                value: new DateTime(2021, 11, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8470));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000022"),
                column: "EnrollDate",
                value: new DateTime(2021, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8470));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000023"),
                column: "EnrollDate",
                value: new DateTime(2023, 6, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8470));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000024"),
                column: "EnrollDate",
                value: new DateTime(2023, 2, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8470));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000025"),
                column: "EnrollDate",
                value: new DateTime(2022, 10, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8480));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000026"),
                column: "EnrollDate",
                value: new DateTime(2023, 8, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8480));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000027"),
                column: "EnrollDate",
                value: new DateTime(2024, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8480));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000028"),
                column: "EnrollDate",
                value: new DateTime(2022, 10, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8490));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000029"),
                column: "EnrollDate",
                value: new DateTime(2021, 3, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8490));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000030"),
                column: "EnrollDate",
                value: new DateTime(2022, 9, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8500));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000031"),
                column: "EnrollDate",
                value: new DateTime(2023, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8510));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000032"),
                column: "EnrollDate",
                value: new DateTime(2024, 3, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8510));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000033"),
                column: "EnrollDate",
                value: new DateTime(2022, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8510));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000034"),
                column: "EnrollDate",
                value: new DateTime(2020, 10, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8580));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000035"),
                column: "EnrollDate",
                value: new DateTime(2022, 9, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8580));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000036"),
                column: "EnrollDate",
                value: new DateTime(2024, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8590));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000037"),
                column: "EnrollDate",
                value: new DateTime(2020, 7, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8590));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000038"),
                column: "EnrollDate",
                value: new DateTime(2023, 2, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8590));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000039"),
                column: "EnrollDate",
                value: new DateTime(2022, 11, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8590));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000040"),
                column: "EnrollDate",
                value: new DateTime(2022, 2, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8600));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000041"),
                column: "EnrollDate",
                value: new DateTime(2023, 12, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8600));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000042"),
                column: "EnrollDate",
                value: new DateTime(2023, 11, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8600));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000043"),
                column: "EnrollDate",
                value: new DateTime(2023, 4, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8610));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000044"),
                column: "EnrollDate",
                value: new DateTime(2020, 11, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8610));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000045"),
                column: "EnrollDate",
                value: new DateTime(2021, 7, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8610));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000046"),
                column: "EnrollDate",
                value: new DateTime(2020, 8, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8610));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000047"),
                column: "EnrollDate",
                value: new DateTime(2023, 7, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8620));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000048"),
                column: "EnrollDate",
                value: new DateTime(2023, 8, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8620));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000049"),
                column: "EnrollDate",
                value: new DateTime(2020, 7, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8620));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000050"),
                column: "EnrollDate",
                value: new DateTime(2024, 4, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8630));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000051"),
                column: "EnrollDate",
                value: new DateTime(2024, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8630));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000052"),
                column: "EnrollDate",
                value: new DateTime(2021, 4, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8630));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000053"),
                column: "EnrollDate",
                value: new DateTime(2021, 4, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8630));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000054"),
                column: "EnrollDate",
                value: new DateTime(2022, 11, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8640));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000055"),
                column: "EnrollDate",
                value: new DateTime(2021, 10, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8640));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000056"),
                column: "EnrollDate",
                value: new DateTime(2022, 11, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8640));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000057"),
                column: "EnrollDate",
                value: new DateTime(2021, 3, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8650));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000058"),
                column: "EnrollDate",
                value: new DateTime(2021, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8650));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000059"),
                column: "EnrollDate",
                value: new DateTime(2022, 12, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8650));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000060"),
                column: "EnrollDate",
                value: new DateTime(2023, 11, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8650));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000061"),
                column: "EnrollDate",
                value: new DateTime(2024, 2, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8660));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000062"),
                column: "EnrollDate",
                value: new DateTime(2022, 10, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8660));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000063"),
                column: "EnrollDate",
                value: new DateTime(2022, 1, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8660));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000064"),
                column: "EnrollDate",
                value: new DateTime(2024, 2, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8660));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000065"),
                column: "EnrollDate",
                value: new DateTime(2021, 4, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8670));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000066"),
                column: "EnrollDate",
                value: new DateTime(2023, 7, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8670));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000067"),
                column: "EnrollDate",
                value: new DateTime(2023, 6, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8680));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000068"),
                column: "EnrollDate",
                value: new DateTime(2023, 1, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8680));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000069"),
                column: "EnrollDate",
                value: new DateTime(2023, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8680));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000070"),
                column: "EnrollDate",
                value: new DateTime(2023, 6, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8680));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000071"),
                column: "EnrollDate",
                value: new DateTime(2021, 12, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8690));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000072"),
                column: "EnrollDate",
                value: new DateTime(2021, 2, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8690));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000073"),
                column: "EnrollDate",
                value: new DateTime(2021, 11, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8690));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000074"),
                column: "EnrollDate",
                value: new DateTime(2023, 11, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8700));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000075"),
                column: "EnrollDate",
                value: new DateTime(2022, 12, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8700));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000076"),
                column: "EnrollDate",
                value: new DateTime(2022, 9, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8700));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000077"),
                column: "EnrollDate",
                value: new DateTime(2024, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8700));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000078"),
                column: "EnrollDate",
                value: new DateTime(2023, 8, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8710));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000079"),
                column: "EnrollDate",
                value: new DateTime(2021, 2, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8710));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000080"),
                column: "EnrollDate",
                value: new DateTime(2022, 2, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8710));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000081"),
                column: "EnrollDate",
                value: new DateTime(2021, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8720));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000082"),
                column: "EnrollDate",
                value: new DateTime(2021, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8720));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000083"),
                column: "EnrollDate",
                value: new DateTime(2021, 5, 25, 3, 3, 35, 178, DateTimeKind.Utc).AddTicks(8720));

            migrationBuilder.InsertData(
                table: "UserOperationClaims",
                columns: new[] { "Id", "CreatedDate", "DeletedDate", "OperationClaimId", "UpdatedDate", "UserId" },
                values: new object[,]
                {
                    { new Guid("00af4b3d-5fef-4ace-834d-b41ea687b5e3"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5670), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000015") },
                    { new Guid("01b08141-9f39-45e9-a183-56e24275961b"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5750), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000025") },
                    { new Guid("0ef68268-c606-4b04-91bb-d5ec18369d31"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5770), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000028") },
                    { new Guid("11f1f7db-39f3-4814-884e-4e61a15d0ee2"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5620), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000005") },
                    { new Guid("122ce92b-d368-4abc-abc9-e7ed6a08ae77"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5620), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000006") },
                    { new Guid("14ffc83d-5f64-4a16-b270-2c2aba2b14d7"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5680), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000018") },
                    { new Guid("15f13c9c-4bc6-4bd6-ab98-23ddf3351de5"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5870), null, new Guid("00000000-0000-0000-0000-000000000003"), null, new Guid("40000000-0000-0000-0000-000000000091") },
                    { new Guid("22d9d163-b02e-4d2b-a082-c8c2e1fbc73c"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5660), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000014") },
                    { new Guid("2a4b9c41-8f24-45ac-b033-aa6e7f406613"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5830), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000036") },
                    { new Guid("2c2afecd-0b4d-4ac8-a5e4-884c93003680"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5610), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000003") },
                    { new Guid("30fd7e0b-c650-421d-8601-02d241d1fa38"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5810), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000032") },
                    { new Guid("31e95d89-58e9-445d-8b5f-8b433b2fa83d"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5700), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000022") },
                    { new Guid("32f83747-8e65-41d6-80da-99281c511029"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5690), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000021") },
                    { new Guid("4152f620-63ae-4788-8e83-6971f73ce0d5"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5800), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000030") },
                    { new Guid("42abff95-cc74-4f81-a233-d174bb146d35"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5830), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000035") },
                    { new Guid("439948ae-082a-47dc-8404-f5ec5419af94"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5660), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000013") },
                    { new Guid("4b0609c0-058a-4528-986b-3ebb06d4b91f"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5820), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000034") },
                    { new Guid("518b14dc-5407-414c-a09b-0fcbc6d9363c"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5840), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000039") },
                    { new Guid("51b6f077-5992-417b-a52b-ee75a5777563"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5600), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000001") },
                    { new Guid("546c4187-ce47-40d1-9d70-65e99db72f10"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5880), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000093") },
                    { new Guid("5efb597d-13cc-49b7-9c0a-2f1c754ed3c0"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5770), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000029") },
                    { new Guid("68288bbe-ff1c-4b36-9c0c-1facdb3824b4"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5860), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000088") },
                    { new Guid("6a2fbd5f-1de3-405c-82d1-835e4db7b3dc"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5810), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000031") },
                    { new Guid("707e19a7-5da3-4fb8-88ff-361f9bb62280"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5860), null, new Guid("00000000-0000-0000-0000-000000000006"), null, new Guid("40000000-0000-0000-0000-000000000087") },
                    { new Guid("77965c7d-c112-47ef-a856-447fdf8d2fdf"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5830), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000037") },
                    { new Guid("792695b5-ef6a-4f2b-a792-a5d1e45442fc"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5760), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000027") },
                    { new Guid("7a1fdd96-7b59-4446-95ac-c5e2a9c620a5"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5740), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000024") },
                    { new Guid("7fd5f16b-9450-46df-ba88-2591e1031460"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5840), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000038") },
                    { new Guid("844fa37a-4a36-4fde-b4f8-dd5cd7c5339f"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5690), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000020") },
                    { new Guid("943c8072-e593-431c-a22e-4061ff8e8c3d"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5670), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000016") },
                    { new Guid("9dbc0dae-786a-4c99-b749-b3bb4d094b15"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5610), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000002") },
                    { new Guid("9fc1c443-bc39-42d4-adb5-7dcf28c89b82"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5670), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000017") },
                    { new Guid("a127af33-6ed3-4a4a-b40c-318fcac15bc1"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5840), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000040") },
                    { new Guid("a37630b9-df05-4d8c-ba87-622905d91c30"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5680), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000019") },
                    { new Guid("a8991f52-bc3e-4b84-a012-ffffa03ee2a9"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5640), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000010") },
                    { new Guid("a9431fe7-d4fa-4057-a63b-c9d9ce16c906"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5870), null, new Guid("00000000-0000-0000-0000-000000000003"), null, new Guid("40000000-0000-0000-0000-000000000089") },
                    { new Guid("b3f9ef0f-1fd0-4426-bbe7-807980fe4cca"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5610), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000004") },
                    { new Guid("b83deea9-5671-4387-83c8-8546e8e93767"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5820), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000033") },
                    { new Guid("bb03c739-4451-43f7-8887-5d10de712571"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5760), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000026") },
                    { new Guid("c8f87677-6ef8-41e8-ad59-f2f41856dc75"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5640), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000009") },
                    { new Guid("cb2b6dbe-ff9a-41d5-9d87-41883e42b659"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5850), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000085") },
                    { new Guid("cc3b04e1-3cf9-42bb-b3a6-e18ea44c890e"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5650), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000012") },
                    { new Guid("cd795b27-08f1-472c-b367-ddcf5e4ae653"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5850), null, new Guid("00000000-0000-0000-0000-000000000005"), null, new Guid("40000000-0000-0000-0000-000000000086") },
                    { new Guid("d6fe3ce2-d7c9-42a6-af6d-ae3ff8a231c6"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5630), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000007") },
                    { new Guid("de02a3da-ba4f-40cd-b626-ced41b8ea615"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5880), null, new Guid("00000000-0000-0000-0000-000000000003"), null, new Guid("40000000-0000-0000-0000-000000000092") },
                    { new Guid("e08a2378-3005-4857-a16d-84b2fdf30fc8"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5630), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000008") },
                    { new Guid("eaf8017e-987a-4505-ba3b-6f389d0cfa93"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5870), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000090") },
                    { new Guid("f04c2840-2b9e-4121-b024-e03c445e8bf9"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5850), null, new Guid("00000000-0000-0000-0000-000000000004"), null, new Guid("40000000-0000-0000-0000-000000000084") },
                    { new Guid("f3d44706-12f3-490f-8ec8-f38ed6dd1f06"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5700), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000023") },
                    { new Guid("fa4f37b0-aef2-4563-acdf-45b63b710124"), new DateTime(2025, 5, 25, 0, 3, 35, 178, DateTimeKind.Utc).AddTicks(5650), null, new Guid("00000000-0000-0000-0000-000000000002"), null, new Guid("40000000-0000-0000-0000-000000000011") }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-11111111111a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 100, 184, 178, 165, 146, 23, 181, 124, 207, 193, 138, 246, 202, 247, 24, 245, 192, 209, 185, 205, 159, 22, 235, 187, 223, 114, 198, 204, 71, 214, 138, 12, 138, 91, 133, 207, 167, 90, 114, 177, 198, 202, 229, 197, 219, 175, 102, 219, 173, 179, 208, 7, 129, 13, 160, 25, 118, 92, 110, 205, 182, 245, 65, 246 }, new byte[] { 113, 94, 87, 204, 173, 212, 209, 136, 186, 33, 254, 247, 186, 105, 185, 181, 158, 82, 226, 219, 129, 211, 205, 214, 129, 7, 188, 150, 247, 203, 140, 229, 227, 129, 175, 9, 92, 119, 218, 193, 134, 21, 220, 106, 248, 215, 140, 208, 197, 211, 145, 33, 218, 115, 164, 13, 45, 54, 21, 114, 29, 38, 42, 147, 76, 31, 12, 247, 51, 116, 172, 209, 162, 184, 251, 42, 91, 111, 110, 58, 90, 79, 226, 211, 244, 17, 52, 42, 75, 154, 175, 222, 161, 70, 134, 189, 161, 250, 169, 15, 221, 86, 179, 107, 147, 86, 236, 78, 87, 132, 220, 218, 89, 248, 43, 20, 155, 194, 0, 58, 66, 98, 216, 133, 78, 235, 244, 30 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-22222222222a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 28, 135, 163, 152, 227, 181, 22, 6, 204, 27, 171, 48, 136, 190, 24, 254, 254, 176, 23, 153, 195, 26, 207, 116, 18, 96, 193, 56, 20, 37, 32, 140, 8, 64, 40, 218, 36, 189, 172, 111, 16, 214, 68, 77, 250, 205, 203, 159, 230, 46, 213, 98, 203, 25, 248, 187, 140, 190, 162, 183, 190, 7, 172, 190 }, new byte[] { 235, 11, 181, 203, 88, 98, 158, 66, 87, 120, 208, 143, 31, 59, 218, 39, 141, 1, 156, 22, 57, 247, 103, 68, 41, 49, 80, 34, 107, 248, 129, 11, 229, 23, 215, 160, 140, 255, 186, 118, 165, 202, 92, 148, 177, 97, 233, 168, 116, 247, 43, 180, 91, 166, 22, 217, 179, 85, 226, 136, 150, 151, 66, 223, 37, 14, 157, 10, 92, 158, 71, 249, 7, 14, 217, 26, 17, 49, 44, 163, 46, 18, 154, 100, 120, 252, 118, 195, 173, 40, 91, 124, 176, 247, 238, 65, 154, 57, 112, 129, 236, 230, 186, 176, 71, 4, 173, 18, 96, 24, 58, 219, 207, 160, 86, 201, 80, 46, 147, 66, 233, 47, 231, 23, 233, 109, 146, 179 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-33333333333a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 41, 155, 205, 97, 14, 145, 63, 102, 188, 193, 61, 82, 25, 143, 229, 47, 215, 194, 235, 89, 184, 82, 71, 51, 192, 127, 65, 209, 116, 114, 181, 246, 173, 151, 126, 244, 171, 240, 39, 210, 125, 20, 17, 233, 177, 250, 113, 249, 230, 207, 208, 14, 197, 216, 17, 6, 26, 104, 195, 25, 89, 233, 230, 113 }, new byte[] { 69, 66, 129, 30, 42, 233, 31, 218, 14, 71, 77, 121, 1, 44, 136, 122, 239, 122, 144, 8, 160, 198, 196, 15, 147, 35, 83, 103, 239, 66, 212, 113, 113, 169, 89, 177, 8, 141, 8, 167, 248, 166, 211, 204, 147, 24, 230, 46, 216, 152, 151, 253, 201, 198, 89, 16, 65, 226, 152, 28, 221, 162, 65, 232, 238, 68, 12, 40, 168, 160, 62, 4, 60, 48, 97, 200, 250, 151, 60, 138, 106, 199, 123, 225, 90, 96, 201, 104, 183, 133, 232, 55, 163, 94, 103, 209, 165, 158, 107, 163, 225, 188, 23, 38, 80, 180, 213, 206, 78, 91, 170, 107, 185, 52, 235, 173, 40, 220, 104, 94, 5, 125, 14, 104, 10, 250, 99, 41 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000001"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000002"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000003"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000004"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000005"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000006"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000007"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000008"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000009"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000010"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000011"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000012"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000013"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000014"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000015"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000016"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000017"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000018"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000019"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000020"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000021"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000022"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000023"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000024"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000025"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000026"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000027"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000028"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000029"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000030"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000031"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000032"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000033"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000034"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000035"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000036"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000037"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000038"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000039"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000040"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000041"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000042"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000043"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000044"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000045"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000046"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000047"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000048"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000049"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000050"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000051"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000052"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000053"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000054"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000055"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000056"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000057"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000058"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000059"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000060"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000061"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000062"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000063"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000064"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000065"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000066"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000067"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000068"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000069"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000070"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000071"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000072"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000073"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000074"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000075"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000076"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000077"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000078"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000079"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000080"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000081"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000082"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000083"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000084"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000085"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000086"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000087"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000088"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000089"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000090"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000091"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000092"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000093"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 61, 125, 166, 5, 179, 196, 245, 109, 245, 32, 253, 176, 216, 255, 244, 169, 46, 230, 14, 143, 142, 57, 32, 107, 218, 110, 56, 151, 199, 209, 24, 151, 124, 138, 87, 167, 41, 253, 53, 104, 200, 7, 72, 152, 178, 193, 102, 74, 74, 85, 82, 4, 141, 196, 222, 215, 14, 70, 24, 236, 215, 127, 120, 170 }, new byte[] { 78, 84, 47, 229, 229, 190, 50, 174, 119, 70, 10, 173, 154, 191, 164, 62, 129, 203, 229, 101, 51, 144, 30, 188, 214, 241, 172, 160, 123, 226, 176, 164, 43, 233, 166, 190, 136, 231, 158, 224, 26, 166, 117, 133, 39, 174, 79, 135, 30, 52, 174, 73, 35, 111, 56, 187, 150, 26, 42, 194, 49, 24, 6, 189, 16, 247, 110, 160, 116, 166, 39, 98, 39, 71, 72, 56, 175, 142, 254, 122, 136, 58, 11, 240, 187, 182, 52, 185, 157, 167, 235, 14, 88, 80, 71, 36, 61, 2, 223, 2, 9, 121, 198, 113, 93, 30, 81, 124, 59, 146, 145, 7, 129, 144, 122, 59, 7, 227, 44, 115, 248, 191, 142, 173, 176, 201, 89, 204 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-44444444444a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 222, 111, 89, 160, 22, 185, 180, 1, 111, 188, 254, 126, 172, 115, 72, 156, 15, 150, 182, 17, 8, 223, 189, 207, 0, 92, 242, 73, 211, 192, 123, 7, 208, 107, 228, 13, 164, 34, 120, 208, 212, 161, 27, 145, 217, 202, 50, 238, 90, 184, 104, 121, 109, 45, 105, 91, 121, 53, 194, 251, 104, 151, 243, 9 }, new byte[] { 228, 142, 3, 77, 200, 239, 189, 192, 48, 180, 18, 194, 97, 231, 203, 61, 185, 58, 253, 47, 213, 255, 209, 82, 134, 47, 89, 136, 117, 104, 249, 4, 249, 44, 209, 250, 69, 166, 40, 13, 188, 139, 186, 210, 93, 232, 234, 168, 102, 243, 183, 118, 94, 32, 183, 227, 97, 49, 133, 179, 8, 142, 132, 198, 116, 83, 154, 78, 204, 249, 219, 210, 120, 113, 94, 74, 103, 191, 240, 25, 100, 182, 161, 214, 183, 26, 17, 90, 104, 107, 42, 248, 52, 135, 74, 77, 228, 16, 156, 190, 215, 30, 28, 76, 121, 248, 161, 28, 178, 35, 73, 221, 172, 191, 195, 112, 172, 176, 134, 222, 255, 102, 252, 207, 140, 8, 174, 141 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-55555555555a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 125, 7, 96, 178, 21, 151, 39, 234, 85, 119, 209, 79, 104, 82, 215, 53, 189, 77, 255, 38, 89, 196, 4, 100, 87, 136, 151, 2, 12, 0, 78, 120, 48, 25, 189, 194, 8, 10, 177, 45, 32, 152, 143, 175, 24, 26, 212, 111, 44, 2, 204, 188, 141, 67, 26, 44, 254, 114, 153, 123, 140, 45, 255, 71 }, new byte[] { 36, 23, 141, 7, 83, 209, 238, 1, 253, 80, 113, 80, 198, 142, 226, 215, 239, 144, 9, 173, 96, 249, 103, 125, 61, 13, 62, 68, 168, 173, 84, 84, 170, 219, 243, 11, 200, 242, 47, 50, 106, 52, 64, 148, 203, 50, 187, 218, 145, 167, 27, 207, 72, 38, 212, 163, 221, 189, 252, 17, 64, 130, 73, 19, 47, 169, 242, 89, 185, 201, 43, 135, 177, 124, 211, 66, 248, 128, 34, 127, 215, 16, 82, 255, 30, 131, 255, 171, 152, 167, 200, 178, 130, 17, 187, 255, 152, 34, 33, 207, 67, 60, 252, 74, 75, 37, 201, 232, 116, 31, 93, 14, 253, 41, 184, 72, 226, 167, 119, 167, 64, 100, 23, 4, 167, 7, 188, 216 } });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-66666666666a"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 95, 144, 45, 165, 67, 212, 30, 17, 97, 153, 94, 49, 171, 19, 2, 217, 80, 111, 160, 40, 180, 26, 62, 29, 145, 65, 68, 206, 66, 88, 5, 222, 178, 63, 198, 158, 56, 178, 124, 64, 2, 24, 252, 93, 205, 233, 27, 148, 190, 234, 75, 202, 212, 215, 114, 129, 183, 124, 147, 213, 169, 199, 58, 139 }, new byte[] { 189, 216, 44, 190, 204, 176, 75, 22, 213, 87, 47, 61, 212, 190, 143, 235, 223, 89, 87, 168, 31, 145, 43, 198, 129, 25, 134, 170, 174, 104, 171, 163, 171, 22, 135, 170, 135, 201, 14, 95, 148, 119, 37, 26, 126, 156, 166, 85, 154, 23, 77, 95, 218, 173, 19, 156, 162, 178, 110, 167, 0, 171, 224, 62, 183, 27, 93, 50, 171, 198, 125, 48, 152, 40, 220, 109, 5, 185, 119, 237, 1, 136, 231, 6, 111, 203, 111, 97, 75, 243, 83, 6, 39, 237, 244, 3, 237, 141, 169, 243, 143, 72, 173, 68, 90, 13, 112, 3, 169, 192, 127, 198, 45, 194, 212, 34, 252, 113, 69, 15, 71, 130, 182, 36, 255, 31, 226, 185 } });
        }
    }
}
