using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EDataBank.Database.Migrations
{
    /// <inheritdoc />
    public partial class errorLogMessage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Message",
                table: "ErrorLogs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Message",
                table: "ErrorLogs");
        }
    }
}
