using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class Settlements : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Settlements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DayBilans = table.Column<double>(type: "decimal(18, 2)", nullable: false),
                    DayBilansInCash = table.Column<double>(type: "decimal(18, 2)", nullable: false),
                    DayBilansInCart = table.Column<double>(type: "decimal(18, 2)", nullable: false),
                    MonthBilansInCart = table.Column<double>(type: "decimal(18, 2)", nullable: false),
                    Income = table.Column<double>(type: "decimal(18, 2)", nullable: false),
                    Outcome = table.Column<double>(type: "decimal(18, 2)", nullable: false),
                    AccessoryAmountBilans = table.Column<int>(type: "INTEGER", nullable: false),
                    PhoneAmountBilans = table.Column<int>(type: "INTEGER", nullable: false),
                    ServiceAmountBilans = table.Column<int>(type: "INTEGER", nullable: false),
                    PointId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settlements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Settlements_Points_PointId",
                        column: x => x.PointId,
                        principalTable: "Points",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Settlements_PointId",
                table: "Settlements",
                column: "PointId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Settlements");
        }
    }
}
