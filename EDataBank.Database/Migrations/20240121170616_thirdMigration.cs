using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EDataBank.Database.Migrations
{
    /// <inheritdoc />
    public partial class thirdMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "uploadInfos",
                columns: table => new
                {
                    UploadInfoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CmcId = table.Column<int>(type: "int", nullable: true),
                    ProvinceId = table.Column<int>(type: "int", nullable: true),
                    DistrictId = table.Column<int>(type: "int", nullable: true),
                    BranchId = table.Column<int>(type: "int", nullable: true),
                    TotalMale = table.Column<int>(type: "int", nullable: true),
                    TotalFemale = table.Column<int>(type: "int", nullable: true),
                    TotalMember = table.Column<int>(type: "int", nullable: true),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    UploadedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_uploadInfos", x => x.UploadInfoId);
                    table.ForeignKey(
                        name: "FK_uploadInfos_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "BranchId");
                    table.ForeignKey(
                        name: "FK_uploadInfos_Cmcs_CmcId",
                        column: x => x.CmcId,
                        principalTable: "Cmcs",
                        principalColumn: "CmcId");
                    table.ForeignKey(
                        name: "FK_uploadInfos_Districts_DistrictId",
                        column: x => x.DistrictId,
                        principalTable: "Districts",
                        principalColumn: "DistrictId");
                    table.ForeignKey(
                        name: "FK_uploadInfos_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "ProvinceId");
                    table.ForeignKey(
                        name: "FK_uploadInfos_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_uploadInfos_BranchId",
                table: "uploadInfos",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_uploadInfos_CmcId",
                table: "uploadInfos",
                column: "CmcId");

            migrationBuilder.CreateIndex(
                name: "IX_uploadInfos_DistrictId",
                table: "uploadInfos",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_uploadInfos_ProvinceId",
                table: "uploadInfos",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_uploadInfos_UsersId",
                table: "uploadInfos",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "uploadInfos");
        }
    }
}
