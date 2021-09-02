using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class DeviceService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DeviceServices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                    Owner = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                    OwnerContact = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    OwnerCost = table.Column<double>(type: "decimal(18, 2)", nullable: false),
                    ServiceCost = table.Column<double>(type: "decimal(18, 2)", nullable: false),
                    Imei = table.Column<string>(type: "TEXT", maxLength: 15, nullable: false),
                    TroubleDescription = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    PointSubmitDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ParticipantId = table.Column<int>(type: "INTEGER", nullable: false),
                    PointId = table.Column<int>(type: "INTEGER", nullable: false),
                    GiveBackDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    GiveBackInfo = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeviceServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeviceServices_Participants_ParticipantId",
                        column: x => x.ParticipantId,
                        principalTable: "Participants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeviceServices_Points_PointId",
                        column: x => x.PointId,
                        principalTable: "Points",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeviceServices_Imei",
                table: "DeviceServices",
                column: "Imei");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceServices_ParticipantId",
                table: "DeviceServices",
                column: "ParticipantId");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceServices_PointId",
                table: "DeviceServices",
                column: "PointId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeviceServices");
        }
    }
}
