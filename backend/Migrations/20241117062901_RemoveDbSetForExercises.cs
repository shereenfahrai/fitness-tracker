using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDbSetForExercises : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_Users_UserId",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Workouts_UserId",
                table: "Workouts");

            migrationBuilder.AddColumn<int>(
                name: "PrivateUserUserId",
                table: "Workouts",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_PrivateUserUserId",
                table: "Workouts",
                column: "PrivateUserUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_Users_PrivateUserUserId",
                table: "Workouts",
                column: "PrivateUserUserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_Users_PrivateUserUserId",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Workouts_PrivateUserUserId",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "PrivateUserUserId",
                table: "Workouts");

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_UserId",
                table: "Workouts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_Users_UserId",
                table: "Workouts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
