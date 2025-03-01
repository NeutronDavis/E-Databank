using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EDataBank.Database.Migrations
{
    /// <inheritdoc />
    public partial class first : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bands",
                columns: table => new
                {
                    BandId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BandName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bands", x => x.BandId);
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    FeedbackId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FeedbackAttachment = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    FeedbackCategory = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FeedbackText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FeedbackActionTaken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FeedbackStatus = table.Column<int>(type: "int", nullable: false),
                    FeedbackOpenDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FeedbackStatusChangeDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.FeedbackId);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    GroupId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPlatformAdmin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.GroupId);
                });

            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    MenuId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sortOrder = table.Column<int>(type: "int", nullable: false),
                    MenuIcon = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MenuType = table.Column<int>(type: "int", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    Field = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.MenuId);
                });

            migrationBuilder.CreateTable(
                name: "Nationalities",
                columns: table => new
                {
                    NationalityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NationalityName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nationalities", x => x.NationalityId);
                });

            migrationBuilder.CreateTable(
                name: "PrincipalBands",
                columns: table => new
                {
                    PrincipalBandId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PrincipalBandName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrincipalBandOrder = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrincipalBands", x => x.PrincipalBandId);
                });

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    PriorityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PriorityName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PriorityLevel = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.PriorityId);
                });

            migrationBuilder.CreateTable(
                name: "Professions",
                columns: table => new
                {
                    ProfessionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfessionName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Professions", x => x.ProfessionId);
                });

            migrationBuilder.CreateTable(
                name: "Qualifications",
                columns: table => new
                {
                    QualificationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QualificationName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Qualifications", x => x.QualificationId);
                });

            migrationBuilder.CreateTable(
                name: "Ranks",
                columns: table => new
                {
                    RankId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RankName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RankOrder = table.Column<int>(type: "int", nullable: true),
                    RankGender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EndYearCount = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ranks", x => x.RankId);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    StudentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Age = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.StudentId);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Display = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SubMenuId = table.Column<int>(type: "int", nullable: false),
                    MenuId = table.Column<int>(type: "int", nullable: false),
                    GroupId = table.Column<int>(type: "int", nullable: false),
                    CanView = table.Column<bool>(type: "bit", nullable: false),
                    CanUpdate = table.Column<bool>(type: "bit", nullable: false),
                    CanDelete = table.Column<bool>(type: "bit", nullable: false),
                    CanExecute = table.Column<bool>(type: "bit", nullable: false),
                    CanApprove = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Permissions_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubMenus",
                columns: table => new
                {
                    SubMenuId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MenuId = table.Column<int>(type: "int", nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    sortOrder = table.Column<int>(type: "int", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Field = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubMenus", x => x.SubMenuId);
                    table.ForeignKey(
                        name: "FK_SubMenus_Menus_MenuId",
                        column: x => x.MenuId,
                        principalTable: "Menus",
                        principalColumn: "MenuId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cathedrals",
                columns: table => new
                {
                    CathedralId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CathedralName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PriorityId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cathedrals", x => x.CathedralId);
                    table.ForeignKey(
                        name: "FK_Cathedrals_Priorities_PriorityId",
                        column: x => x.PriorityId,
                        principalTable: "Priorities",
                        principalColumn: "PriorityId");
                });

            migrationBuilder.CreateTable(
                name: "Cmcs",
                columns: table => new
                {
                    CmcId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CmcOrder = table.Column<int>(type: "int", nullable: true),
                    PriorityId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cmcs", x => x.CmcId);
                    table.ForeignKey(
                        name: "FK_Cmcs_Priorities_PriorityId",
                        column: x => x.PriorityId,
                        principalTable: "Priorities",
                        principalColumn: "PriorityId");
                });

            migrationBuilder.CreateTable(
                name: "Provinces",
                columns: table => new
                {
                    ProvinceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProvinceName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CmcId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provinces", x => x.ProvinceId);
                    table.ForeignKey(
                        name: "FK_Provinces_Cmcs_CmcId",
                        column: x => x.CmcId,
                        principalTable: "Cmcs",
                        principalColumn: "CmcId");
                });

            migrationBuilder.CreateTable(
                name: "Districts",
                columns: table => new
                {
                    DistrictId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DistrictName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DistrictAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProvinceId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Districts", x => x.DistrictId);
                    table.ForeignKey(
                        name: "FK_Districts_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "ProvinceId");
                });

            migrationBuilder.CreateTable(
                name: "Branches",
                columns: table => new
                {
                    BranchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BranchAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DistrictId = table.Column<int>(type: "int", nullable: true),
                    ProvinceId = table.Column<int>(type: "int", nullable: true),
                    ProvinceAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DistrictAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ElderInChargeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ElderInChargeRank = table.Column<int>(type: "int", nullable: true),
                    ElderInChargeEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ElderInChargePhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecretaryName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecretaryRank = table.Column<int>(type: "int", nullable: true),
                    SecretaryEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecretaryPhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FinancialSecretaryName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FinancialSecretaryRank = table.Column<int>(type: "int", nullable: true),
                    FinancialSecretaryEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FinancialSecretaryPhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branches", x => x.BranchId);
                    table.ForeignKey(
                        name: "FK_Branches_Districts_DistrictId",
                        column: x => x.DistrictId,
                        principalTable: "Districts",
                        principalColumn: "DistrictId");
                    table.ForeignKey(
                        name: "FK_Branches_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "ProvinceId");
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RankId = table.Column<int>(type: "int", nullable: true),
                    PrincipalBandId = table.Column<int>(type: "int", nullable: true),
                    BandId = table.Column<int>(type: "int", nullable: true),
                    OtherBandsAssociation = table.Column<int>(type: "int", nullable: true),
                    MaritalStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    YearOfMarriage = table.Column<int>(type: "int", nullable: true),
                    Nationality1Id = table.Column<int>(type: "int", nullable: true),
                    Nationality2Id = table.Column<int>(type: "int", nullable: true),
                    NameOfSpouse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrdinationRankOfSpouse = table.Column<int>(type: "int", nullable: true),
                    OrdinationYear = table.Column<int>(type: "int", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QualificationId = table.Column<int>(type: "int", nullable: true),
                    ProfessionId = table.Column<int>(type: "int", nullable: true),
                    Occupation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CppInChurch = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BranchId = table.Column<int>(type: "int", nullable: true),
                    NoOfChildren = table.Column<int>(type: "int", nullable: true),
                    ProfilePics = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    ProfilePicExtention = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsAcountValidated = table.Column<bool>(type: "bit", nullable: true),
                    IsAccountLocked = table.Column<bool>(type: "bit", nullable: true),
                    RegsiteredOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AuthCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastVisitedSubMenuId = table.Column<int>(type: "int", nullable: true),
                    LastVisitedMenuId = table.Column<int>(type: "int", nullable: true),
                    LastVisitedMenuUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastAccessDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Bands_BandId",
                        column: x => x.BandId,
                        principalTable: "Bands",
                        principalColumn: "BandId");
                    table.ForeignKey(
                        name: "FK_Users_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "BranchId");
                    table.ForeignKey(
                        name: "FK_Users_PrincipalBands_PrincipalBandId",
                        column: x => x.PrincipalBandId,
                        principalTable: "PrincipalBands",
                        principalColumn: "PrincipalBandId");
                    table.ForeignKey(
                        name: "FK_Users_Professions_ProfessionId",
                        column: x => x.ProfessionId,
                        principalTable: "Professions",
                        principalColumn: "ProfessionId");
                    table.ForeignKey(
                        name: "FK_Users_Qualifications_QualificationId",
                        column: x => x.QualificationId,
                        principalTable: "Qualifications",
                        principalColumn: "QualificationId");
                    table.ForeignKey(
                        name: "FK_Users_Ranks_RankId",
                        column: x => x.RankId,
                        principalTable: "Ranks",
                        principalColumn: "RankId");
                });

            migrationBuilder.CreateTable(
                name: "ChangesRequests",
                columns: table => new
                {
                    ChangesRequestId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FieldsModified = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FieldValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrdinationId = table.Column<int>(type: "int", nullable: true),
                    ChangesType = table.Column<int>(type: "int", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangesRequests", x => x.ChangesRequestId);
                    table.ForeignKey(
                        name: "FK_ChangesRequests_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Ordinations",
                columns: table => new
                {
                    OrdinationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RankId = table.Column<int>(type: "int", nullable: true),
                    Year = table.Column<int>(type: "int", nullable: true),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    BranchId = table.Column<int>(type: "int", nullable: true),
                    NextRankId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ordinations", x => x.OrdinationId);
                    table.ForeignKey(
                        name: "FK_Ordinations_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "BranchId");
                    table.ForeignKey(
                        name: "FK_Ordinations_Ranks_RankId",
                        column: x => x.RankId,
                        principalTable: "Ranks",
                        principalColumn: "RankId");
                    table.ForeignKey(
                        name: "FK_Ordinations_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserGroups",
                columns: table => new
                {
                    UserGroupId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    GroupId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroups", x => x.UserGroupId);
                    table.ForeignKey(
                        name: "FK_UserGroups_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserGroups_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Branches_DistrictId",
                table: "Branches",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_ProvinceId",
                table: "Branches",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_Cathedrals_PriorityId",
                table: "Cathedrals",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_ChangesRequests_UsersId",
                table: "ChangesRequests",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Cmcs_PriorityId",
                table: "Cmcs",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Districts_ProvinceId",
                table: "Districts",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_Ordinations_BranchId",
                table: "Ordinations",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Ordinations_RankId",
                table: "Ordinations",
                column: "RankId");

            migrationBuilder.CreateIndex(
                name: "IX_Ordinations_UsersId",
                table: "Ordinations",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_GroupId",
                table: "Permissions",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Provinces_CmcId",
                table: "Provinces",
                column: "CmcId");

            migrationBuilder.CreateIndex(
                name: "IX_SubMenus_MenuId",
                table: "SubMenus",
                column: "MenuId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroups_GroupId",
                table: "UserGroups",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroups_UserId",
                table: "UserGroups",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_BandId",
                table: "Users",
                column: "BandId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_BranchId",
                table: "Users",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_PrincipalBandId",
                table: "Users",
                column: "PrincipalBandId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ProfessionId",
                table: "Users",
                column: "ProfessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_QualificationId",
                table: "Users",
                column: "QualificationId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RankId",
                table: "Users",
                column: "RankId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cathedrals");

            migrationBuilder.DropTable(
                name: "ChangesRequests");

            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "Nationalities");

            migrationBuilder.DropTable(
                name: "Ordinations");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "SubMenus");

            migrationBuilder.DropTable(
                name: "UserGroups");

            migrationBuilder.DropTable(
                name: "Menus");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Bands");

            migrationBuilder.DropTable(
                name: "Branches");

            migrationBuilder.DropTable(
                name: "PrincipalBands");

            migrationBuilder.DropTable(
                name: "Professions");

            migrationBuilder.DropTable(
                name: "Qualifications");

            migrationBuilder.DropTable(
                name: "Ranks");

            migrationBuilder.DropTable(
                name: "Districts");

            migrationBuilder.DropTable(
                name: "Provinces");

            migrationBuilder.DropTable(
                name: "Cmcs");

            migrationBuilder.DropTable(
                name: "Priorities");
        }
    }
}
