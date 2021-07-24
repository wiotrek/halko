using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class HalkoDevice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DeviceStates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    State = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeviceStates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Devices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Producer = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Model = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Imei = table.Column<string>(type: "TEXT", maxLength: 15, nullable: false),
                    Color = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    DateBuyed = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateSold = table.Column<DateTime>(type: "TEXT", nullable: true),
                    PriceBuyed = table.Column<double>(type: "decimal(18, 2)", nullable: false),
                    Price = table.Column<double>(type: "decimal(18, 2)", nullable: false),
                    PointId = table.Column<int>(type: "INTEGER", nullable: false),
                    DeviceStateId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Devices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Devices_DeviceStates_DeviceStateId",
                        column: x => x.DeviceStateId,
                        principalTable: "DeviceStates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Devices_Points_PointId",
                        column: x => x.PointId,
                        principalTable: "Points",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Devices_DeviceStateId",
                table: "Devices",
                column: "DeviceStateId");

            migrationBuilder.CreateIndex(
                name: "IX_Devices_Imei",
                table: "Devices",
                column: "Imei");

            migrationBuilder.CreateIndex(
                name: "IX_Devices_PointId",
                table: "Devices",
                column: "PointId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Devices");

            migrationBuilder.DropTable(
                name: "DeviceStates");
        }
    }
}
