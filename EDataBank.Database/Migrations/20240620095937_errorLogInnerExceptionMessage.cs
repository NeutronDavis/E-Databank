using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EDataBank.Database.Migrations
{
    /// <inheritdoc />
    public partial class errorLogInnerExceptionMessage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InnerExceptionMessage",
                table: "ErrorLogs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InnerExceptionMessage",
                table: "ErrorLogs");
        }
    }
}
