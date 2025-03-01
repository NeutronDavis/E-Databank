using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EDataBank.Database.Migrations
{
    /// <inheritdoc />
    public partial class second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "UserGroups",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserGroups_BranchId",
                table: "UserGroups",
                column: "BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_Branches_BranchId",
                table: "UserGroups",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "BranchId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_Branches_BranchId",
                table: "UserGroups");

            migrationBuilder.DropIndex(
                name: "IX_UserGroups_BranchId",
                table: "UserGroups");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "UserGroups");
        }
    }
}
