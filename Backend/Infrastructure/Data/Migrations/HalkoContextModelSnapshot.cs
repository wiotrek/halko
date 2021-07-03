﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data.Migrations
{
    [DbContext(typeof(HalkoContext))]
    partial class HalkoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.7");

            modelBuilder.Entity("Core.Entities.Auth.ParticipantPoint", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Initial")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("PointId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("PointId");

                    b.ToTable("Participants");
                });

            modelBuilder.Entity("Core.Entities.Auth.Point", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Points");
                });

            modelBuilder.Entity("Core.Entities.Auth.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Core.Entities.Auth.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Core.Entities.Auth.UserPoint", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("PointId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("PointId");

                    b.HasIndex("UserId");

                    b.ToTable("UserPoints");
                });

            modelBuilder.Entity("Core.Entities.Auth.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("Core.Entities.Auth.ParticipantPoint", b =>
                {
                    b.HasOne("Core.Entities.Auth.Point", null)
                        .WithMany("Participants")
                        .HasForeignKey("PointId")
                        .OnDelete(DeleteBehavior.NoAction);
                });

            modelBuilder.Entity("Core.Entities.Auth.UserPoint", b =>
                {
                    b.HasOne("Core.Entities.Auth.Point", "Point")
                        .WithMany()
                        .HasForeignKey("PointId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Auth.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Point");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Auth.UserRole", b =>
                {
                    b.HasOne("Core.Entities.Auth.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Auth.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Auth.Point", b =>
                {
                    b.Navigation("Participants");
                });
#pragma warning restore 612, 618
        }
    }
}
