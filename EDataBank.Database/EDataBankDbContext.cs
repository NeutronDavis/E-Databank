using EDataBank.Core.Entity.Account;
using EDataBank.Core.Entity.Application;
using EDataBank.Core.Entity.Error;
using EDataBank.Core.Entity.General;
using EDataBank.Core.Entity.Model;
using EDataBank.Core.Entity.Report;
using EDataBank.Core.Entity.StudentEntitiy;
using EDataBank.Core.Views;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace EDataBank.Database
{

    public class EDataBankDbContext : DbContext
    {
        public EDataBankDbContext(DbContextOptions<EDataBankDbContext> options)
            : base(options)
        {
        }

        public DbSet<Users> Users => Set<Users>();
        public DbSet<Group> Groups => Set<Group>();
        public DbSet<UserGroup> UserGroups => Set<UserGroup>();
        public DbSet<Permission> Permissions => Set<Permission>();
        public DbSet<Feedback> Feedbacks => Set<Feedback>();
        public DbSet<Student> Students => Set<Student>();
        public DbSet<Menu> Menus => Set<Menu>();
        public DbSet<SubMenu> SubMenus => Set<SubMenu>();
        public DbSet<Priority> Priorities => Set<Priority>();
        public DbSet<Cathedral> Cathedrals => Set<Cathedral>();
        public DbSet<Cmc> Cmcs => Set<Cmc>();
        public DbSet<Province> Provinces => Set<Province>();
        public DbSet<District> Districts => Set<District>();
        public DbSet<Branch> Branches => Set<Branch>();
        public DbSet<Ordination> Ordinations => Set<Ordination>();
        public DbSet<Rank> Ranks => Set<Rank>();
        public DbSet<Band> Bands => Set<Band>();
        public DbSet<Profession> Professions => Set<Profession>();
        public DbSet<Qualification> Qualifications => Set<Qualification>();
        public DbSet<PrincipalBand> PrincipalBands => Set<PrincipalBand>();
        public DbSet<ChangesRequest> ChangesRequests => Set<ChangesRequest>();
        public DbSet<Nationality> Nationalities => Set<Nationality>();
        public DbSet<UploadInfo> uploadInfos => Set<UploadInfo>();
        public DbSet<ErrorLog> ErrorLogs => Set<ErrorLog>();

        //View
        public DbSet<MenuView> MenuView => Set<MenuView>();
        public DbSet<UserView> UserView => Set<UserView>();
        public DbSet<PermissionView> PermissionView => Set<PermissionView>();
        public DbSet<MaleAndFemaleCountInProvince> MaleAndFemaleCountInProvinces => Set<MaleAndFemaleCountInProvince>();
        public DbSet<TotalMembersMaleAndFemale> TotalMembersMaleAndFemales => Set<TotalMembersMaleAndFemale>();
        public DbSet<CalculateMemberInProvinceForPie> CalculateMeberInProvinceForPies => Set<CalculateMemberInProvinceForPie>();
        public DbSet<ChangesView> ChangesViews => Set<ChangesView>();
        public DbSet<OrdinationView> OrdinationViews => Set<OrdinationView>();
        public DbSet<OrdinationReport> OrdinationReports => Set<OrdinationReport>();
        public DbSet<MemberReport> MemberReports => Set<MemberReport>();
        public DbSet<GeneralReportModel> GeneralReportModels => Set<GeneralReportModel>();
        public DbSet<BranchView> BranchViews => Set<BranchView>();
        public DbSet<UploadInfoView> UploadInfoViews => Set<UploadInfoView>();
        public DbSet<General_Report_Model2> General_Report_Model2s => Set<General_Report_Model2>();
        public DbSet<OrdinationProgressionView> OrdinationProgressionViews => Set<OrdinationProgressionView>();
        public DbSet<AdvisaryBoardInfo> AdvisaryBoardInfos => Set<AdvisaryBoardInfo>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            modelBuilder.Entity<MenuView>().HasNoKey();
            modelBuilder.Entity<MaleAndFemaleCountInProvince>().HasNoKey();
            modelBuilder.Entity<TotalMembersMaleAndFemale>().HasNoKey();
            modelBuilder.Entity<CalculateMemberInProvinceForPie>().HasNoKey();
            modelBuilder.Entity<ChangesView>().HasNoKey();
            modelBuilder.Entity<OrdinationView>().HasNoKey();
            modelBuilder.Entity<OrdinationReport>().HasNoKey();
            modelBuilder.Entity<MemberReport>().HasNoKey();
            modelBuilder.Entity<GeneralReportModel>().HasNoKey();
            modelBuilder.Entity<BranchView>().HasNoKey();
            modelBuilder.Entity<UploadInfoView>().HasNoKey();
            modelBuilder.Entity<General_Report_Model2>().HasNoKey();
            modelBuilder.Entity<OrdinationProgressionView>().HasNoKey();
            modelBuilder.Entity<AdvisaryBoardInfo>().HasNoKey();

            //map database View from the POCO
            modelBuilder.Entity<MenuView>().ToTable("Menu_vw", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<UserView>().ToTable("User_vw", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<PermissionView>().ToTable("permission_vw", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<MaleAndFemaleCountInProvince>().ToTable("MaleAndFemaleCountInProvinces",t => t.ExcludeFromMigrations());
            modelBuilder.Entity<TotalMembersMaleAndFemale>().ToTable("TotalMembersMaleAndFemales", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<CalculateMemberInProvinceForPie>().ToTable("CalculateMeberInProvinceForPies", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<ChangesView>().ToTable("Changes_vw", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<OrdinationView>().ToTable("Ordination_vw", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<MemberReport>().ToTable("memberRepot_vw", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<OrdinationReport>().ToTable("ordinationReport_vw", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<GeneralReportModel>().ToTable("generalReportModel_vw", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<BranchView>().ToTable("branch_vw", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<UploadInfoView>().ToTable("uploadinfo_vw", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<General_Report_Model2>().ToTable("generalprovincialmemberview", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<OrdinationProgressionView>().ToTable("HighestYearOrdinationsWithAge", t => t.ExcludeFromMigrations());
            modelBuilder.Entity<AdvisaryBoardInfo>().ToTable("AdvisaryBoardInfo", t => t.ExcludeFromMigrations());
        }

    }
}