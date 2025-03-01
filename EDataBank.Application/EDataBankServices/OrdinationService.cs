using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Model;
using EDataBank.Core.Entity.Report;
using EDataBank.Core.Views;
using EDataBank.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.EDataBankServices
{
    public class OrdinationService: IOrdinationService
    {
        private readonly IRepository<Ordination> _ordinationRepo;
        private readonly IRepository<UploadInfo> _uploadinfoRepo;
        private EDataBankDbContext _context;
        public OrdinationService(IRepository<Ordination> ordinationRepo, EDataBankDbContext context, IRepository<UploadInfo> uploadinfoRepo)
        {
            _context = context;
            _ordinationRepo = ordinationRepo;
            _uploadinfoRepo = uploadinfoRepo;
        }

        public async Task<Ordination> SaveOrdination(Ordination ordination)
        {
            try
            {
                var res = await _ordinationRepo.AddAsync(ordination);
                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task UpdateOrdination(Ordination ordination)
        {
            try
            {
              await _context.Database.ExecuteSqlInterpolatedAsync($"EXEC UpdateOrdination {ordination.Year}, {ordination.RankId},{ordination.NextRankId},{ordination.OrdinationId}");
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task RemoveOrdination(int ordinationId)
        {
            try
            {
                var res = await _ordinationRepo.GetByIdAsync(ordinationId);
                await _ordinationRepo.DeleteAsync(res!);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<int> SaveBulkOrdination(List<Ordination> ordinations)
        {
            try
            {
                var res =  await _ordinationRepo.BulkInsertAsync(ordinations);
                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<OrdinationView> GetMemberOrdination(string userId)
        {
            try
            {
                var res = _context.OrdinationViews.FromSqlInterpolated($"EXEC GetMemberOrdinations {userId}").ToList();
                return res;
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public List<OrdinationReport> MemberOrdinationReport(int branchId,string gender)
        {
            try
            {
                var res = _context.OrdinationReports.FromSqlInterpolated($"EXEC GetUserOrdinationReport {branchId},{gender}").ToList();
                return res;
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public List<MemberReport> MemberReport(int branchId, string gender)
        {
            try
            {
                var res = _context.MemberReports.FromSqlInterpolated($"EXEC GetMemberReport {branchId},{gender}").ToList();
                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<OrdinationReport> PrivincialMemberOrdinationReport(int provinceId, string gender)
        {
            try
            {
                var res = _context.OrdinationReports.FromSqlInterpolated($"EXEC GetUserOrdinationReportATheProvinceLevel {provinceId},{gender}").ToList();
                return res;
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public List<MemberReport> ProvincialMemberReport(int provinceId, string gender)
        {
            try
            {
                var res = _context.MemberReports.FromSqlInterpolated($"EXEC GetMemberReportOnProvincialLevel {provinceId},{gender}").ToList();
                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<GeneralReportModel> ProvincialMemberReport(int provinceId, int professionId)
        {
            try
            {
                var res = _context.GeneralReportModels.FromSqlInterpolated($"EXEC GetProvincialUserOrdinationAndMemberReport {provinceId},{professionId}").ToList();
                res.ForEach(x =>
                {
                    x.Rank1 = x.Rank1 == "NULL" ? null : x.Rank1;
                    x.Rank2 = x.Rank2 == "NULL" ? null : x.Rank2;
                    x.Rank3 = x.Rank3 == "NULL" ? null : x.Rank3;
                    x.Rank4 = x.Rank4 == "NULL" ? null : x.Rank4;
                    x.Rank5 = x.Rank5 == "NULL" ? null : x.Rank5;
                    x.Rank6 = x.Rank6 == "NULL" ? null : x.Rank6;
                    x.Rank7 = x.Rank7 == "NULL" ? null : x.Rank7;
                    x.Rank8 = x.Rank8 == "NULL" ? null : x.Rank8;
                    x.Rank9 = x.Rank9 == "NULL" ? null : x.Rank9;
                    x.Rank10 = x.Rank10 == "NULL" ? null : x.Rank10;
                    x.Rank11 = x.Rank11 == "NULL" ? null : x.Rank11;
                    x.Rank12 = x.Rank12 == "NULL" ? null : x.Rank12;
                    x.Rank13 = x.Rank13 == "NULL" ? null : x.Rank13;
                    x.Rank14 = x.Rank14 == "NULL" ? null : x.Rank14;
                    x.Rank15 = x.Rank15 == "NULL" ? null : x.Rank15;
                    x.Rank16 = x.Rank16 == "NULL" ? null : x.Rank16;


                    x.Year1 = x.Year1 == 0 ? null : x.Year1;
                    x.Year2 = x.Year2 == 0 ? null : x.Year2;
                    x.Year3 = x.Year3 == 0 ? null : x.Year3;
                    x.Year4 = x.Year4 == 0 ? null : x.Year4;
                    x.Year5 = x.Year5 == 0 ? null : x.Year5;
                    x.Year6 = x.Year6 == 0 ? null : x.Year6;
                    x.Year7 = x.Year7 == 0 ? null : x.Year7;
                    x.Year8 = x.Year8 == 0 ? null : x.Year8;
                    x.Year9 = x.Year9 == 0 ? null : x.Year9;
                    x.Year10 = x.Year10 == 0 ? null : x.Year10;
                    x.Year11 = x.Year11 == 0 ? null : x.Year11;
                    x.Year12 = x.Year12 == 0 ? null : x.Year12;
                    x.Year13 = x.Year13 == 0 ? null : x.Year13;
                    x.Year14 = x.Year14 == 0 ? null : x.Year14;
                    x.Year15 = x.Year15 == 0 ? null : x.Year15;
                    x.Year16 = x.Year16 == 0 ? null : x.Year16;


                    x.Nationality1 = x.Nationality1 == "NULL" ? null : x.Nationality1;
                    x.Nationality2 = x.Nationality2 == "NULL" ? null : x.Nationality2;
                    x.BandName = x.BandName == "Others" ? null : x.BandName;
                    x.CurrentRank = x.CurrentRank == "NULL" ? null : x.CurrentRank;
                    x.RankOfSpouse = x.RankOfSpouse == "NULL" ? null : x.RankOfSpouse;
                    x.Qualification = x.Qualification == "Others" ? null : x.Qualification;
                    x.Profession = x.Profession == "Others" ? null : x.Profession;
                });
                return res;


            }
            catch (Exception e)
            {

                throw;
            }
        }

        public List<GeneralReportModel> MemberReport(int branchId, int professionId)
        {
            try
            {
                var res = _context.GeneralReportModels.FromSqlInterpolated($"EXEC GetUserOrdinationAndMemberReport {branchId},{professionId}").ToList();
                res.ForEach(x =>
                {
                    x.Rank1 = x.Rank1 == "NULL" ? null : x.Rank1;
                    x.Rank2 = x.Rank2 == "NULL" ? null : x.Rank2;
                    x.Rank3 = x.Rank3 == "NULL" ? null : x.Rank3;
                    x.Rank4 = x.Rank4 == "NULL" ? null : x.Rank4;
                    x.Rank5 = x.Rank5 == "NULL" ? null : x.Rank5;
                    x.Rank6 = x.Rank6 == "NULL" ? null : x.Rank6;
                    x.Rank7 = x.Rank7 == "NULL" ? null : x.Rank7;
                    x.Rank8 = x.Rank8 == "NULL" ? null : x.Rank8;
                    x.Rank9 = x.Rank9 == "NULL" ? null : x.Rank9;
                    x.Rank10 = x.Rank10 == "NULL" ? null : x.Rank10;
                    x.Rank11 = x.Rank11 == "NULL" ? null : x.Rank11;
                    x.Rank12 = x.Rank12 == "NULL" ? null : x.Rank12;
                    x.Rank13 = x.Rank13 == "NULL" ? null : x.Rank13;
                    x.Rank14 = x.Rank14 == "NULL" ? null : x.Rank14;
                    x.Rank15 = x.Rank15 == "NULL" ? null : x.Rank15; 
                    x.Rank16 = x.Rank16 == "NULL" ? null : x.Rank16;


                    x.Year1 = x.Year1 == 0 ? null : x.Year1;
                    x.Year2 = x.Year2 == 0 ? null : x.Year2;
                    x.Year3 = x.Year3 == 0 ? null : x.Year3;
                    x.Year4 = x.Year4 == 0 ? null : x.Year4;
                    x.Year5 = x.Year5 == 0 ? null : x.Year5;
                    x.Year6 = x.Year6 == 0 ? null : x.Year6;
                    x.Year7 = x.Year7 == 0 ? null : x.Year7;
                    x.Year8 = x.Year8 == 0 ? null : x.Year8;
                    x.Year9 = x.Year9 == 0 ? null : x.Year9;
                    x.Year10 = x.Year10 == 0 ? null : x.Year10;
                    x.Year11 = x.Year11 == 0 ? null : x.Year11;
                    x.Year12 = x.Year12 == 0 ? null : x.Year12;
                    x.Year13 = x.Year13 == 0 ? null : x.Year13;
                    x.Year14 = x.Year14 == 0 ? null : x.Year14;
                    x.Year15 = x.Year15 == 0 ? null : x.Year15;
                    x.Year16 = x.Year16 == 0 ? null : x.Year16;


                    x.Nationality1 = x.Nationality1 == "NULL" ? null : x.Nationality1;
                    x.Nationality2 = x.Nationality2 == "NULL" ? null : x.Nationality2;
                    x.BandName = x.BandName == "Others" ? null : x.BandName;
                    x.CurrentRank = x.CurrentRank == "NULL" ? null : x.CurrentRank; 
                    x.RankOfSpouse = x.RankOfSpouse == "NULL" ? null : x.RankOfSpouse;
                    x.Qualification = x.Qualification == "Others" ? null : x.Qualification;
                    x.Profession = x.Profession == "Others" ? null : x.Profession;
                });
                return res;


            }
            catch (Exception e)
            {

                throw;
            }
        }

        public List<GeneralReportModel> MemberReportByRankAndYear(string rank, int year)
        {
            try
            {
                var res = _context.GeneralReportModels.FromSqlInterpolated($"EXEC GetUniqueUsersByRankAndYear {rank},{year}").ToList();
                res.ForEach(x =>
                {
                    x.Rank1 = x.Rank1 == "NULL" ? null : x.Rank1;
                    x.Rank2 = x.Rank2 == "NULL" ? null : x.Rank2;
                    x.Rank3 = x.Rank3 == "NULL" ? null : x.Rank3;
                    x.Rank4 = x.Rank4 == "NULL" ? null : x.Rank4;
                    x.Rank5 = x.Rank5 == "NULL" ? null : x.Rank5;
                    x.Rank6 = x.Rank6 == "NULL" ? null : x.Rank6;
                    x.Rank7 = x.Rank7 == "NULL" ? null : x.Rank7;
                    x.Rank8 = x.Rank8 == "NULL" ? null : x.Rank8;
                    x.Rank9 = x.Rank9 == "NULL" ? null : x.Rank9;
                    x.Rank10 = x.Rank10 == "NULL" ? null : x.Rank10;
                    x.Rank11 = x.Rank11 == "NULL" ? null : x.Rank11;
                    x.Rank12 = x.Rank12 == "NULL" ? null : x.Rank12;
                    x.Rank13 = x.Rank13 == "NULL" ? null : x.Rank13;
                    x.Rank14 = x.Rank14 == "NULL" ? null : x.Rank14;
                    x.Rank15 = x.Rank15 == "NULL" ? null : x.Rank15;
                    x.Rank16 = x.Rank16 == "NULL" ? null : x.Rank16;


                    x.Year1 = x.Year1 == 0 ? null : x.Year1;
                    x.Year2 = x.Year2 == 0 ? null : x.Year2;
                    x.Year3 = x.Year3 == 0 ? null : x.Year3;
                    x.Year4 = x.Year4 == 0 ? null : x.Year4;
                    x.Year5 = x.Year5 == 0 ? null : x.Year5;
                    x.Year6 = x.Year6 == 0 ? null : x.Year6;
                    x.Year7 = x.Year7 == 0 ? null : x.Year7;
                    x.Year8 = x.Year8 == 0 ? null : x.Year8;
                    x.Year9 = x.Year9 == 0 ? null : x.Year9;
                    x.Year10 = x.Year10 == 0 ? null : x.Year10;
                    x.Year11 = x.Year11 == 0 ? null : x.Year11;
                    x.Year12 = x.Year12 == 0 ? null : x.Year12;
                    x.Year13 = x.Year13 == 0 ? null : x.Year13;
                    x.Year14 = x.Year14 == 0 ? null : x.Year14;
                    x.Year15 = x.Year15 == 0 ? null : x.Year15;
                    x.Year16 = x.Year16 == 0 ? null : x.Year16;


                    x.Nationality1 = x.Nationality1 == "NULL" ? null : x.Nationality1;
                    x.Nationality2 = x.Nationality2 == "NULL" ? null : x.Nationality2;
                    x.BandName = x.BandName == "Others" ? null : x.BandName;
                    x.CurrentRank = x.CurrentRank == "NULL" ? null : x.CurrentRank;
                    x.RankOfSpouse = x.RankOfSpouse == "NULL" ? null : x.RankOfSpouse;
                    x.Qualification = x.Qualification == "Others" ? null : x.Qualification;
                    x.Profession = x.Profession == "Others" ? null : x.Profession;
                });
                return res;


            }
            catch (Exception e)
            {

                throw;
            }
        }

        public List<OrdinationProgressionView> MemberOrdinationProgessionReport(int provinceId, int branchId,string rank, int year)
        {
            try
            {
                var res = _context.OrdinationProgressionViews
                    .FromSqlInterpolated($"EXEC GetOrdinationProgressionsByParameters { (provinceId != 0 ? (int?)provinceId : null)}, { (branchId != 0 ? (int?)branchId : null)}, {(!string.IsNullOrWhiteSpace(rank) ? rank : null)},{ (year != 0 ? (int?)year : null)}").ToList();

                return res;
            }
            catch (Exception e)
            {
                throw new Exception("Error fetching ordination progression report", e);
            }
        }

        public List<General_Report_Model2> MemberProvincialReport(int provinceId)
        {
            try
            {
                var res = _context.General_Report_Model2s.FromSqlInterpolated($"select * from generalprovincialmemberview where ProvinceId = {provinceId}").ToList();
                res.ForEach(x =>
                {
                   
                    x.Nationality1 = x.Nationality1 == "NULL" ? null : x.Nationality1;
                    x.Nationality2 = x.Nationality2 == "NULL" ? null : x.Nationality2;
                    x.BandName = x.BandName == "Others" ? null : x.BandName;
                    x.CurrentRank = x.CurrentRank == "NULL" ? null : x.CurrentRank;
                    x.RankOfSpouse = x.RankOfSpouse == "NULL" ? null : x.RankOfSpouse;
                    x.Qualification = x.Qualification == "Others" ? null : x.Qualification;
                    x.Profession = x.Profession == "Others" ? null : x.Profession;
                });
                return res;


            }
            catch (Exception e)
            {

                throw;
            }
        }
        public List<OrdinationReport> MemberOrdinationReport(int branchId, int professionId)
        {
            try
            {
                var res = _context.OrdinationReports.FromSqlInterpolated($"EXEC GetCleanMemberOrdinationReport {branchId},{professionId}").ToList();
                res.ForEach(x =>
                {

                    x.Rank1 = x.Rank1 == "NULL" ? null : x.Rank1;
                    x.Rank2 = x.Rank2 == "NULL" ? null : x.Rank2;
                    x.Rank3 = x.Rank3 == "NULL" ? null : x.Rank3;
                    x.Rank4 = x.Rank4 == "NULL" ? null : x.Rank4;
                    x.Rank5 = x.Rank5 == "NULL" ? null : x.Rank5;
                    x.Rank6 = x.Rank6 == "NULL" ? null : x.Rank6;
                    x.Rank7 = x.Rank7 == "NULL" ? null : x.Rank7;
                    x.Rank8 = x.Rank8 == "NULL" ? null : x.Rank8;
                    x.Rank9 = x.Rank9 == "NULL" ? null : x.Rank9;
                    x.Rank10 = x.Rank10 == "NULL" ? null : x.Rank10;
                    x.Rank11 = x.Rank11 == "NULL" ? null : x.Rank11;
                    x.Rank12 = x.Rank12 == "NULL" ? null : x.Rank12;
                    x.Rank13 = x.Rank13 == "NULL" ? null : x.Rank13;
                    x.Rank14 = x.Rank14 == "NULL" ? null : x.Rank14;
                    x.Rank15 = x.Rank15 == "NULL" ? null : x.Rank15;
                    x.Rank16 = x.Rank16 == "NULL" ? null : x.Rank16;

                    x.Year1 = x.Year1 == 0 ? null : x.Year1;
                    x.Year2 = x.Year2 == 0 ? null : x.Year2;
                    x.Year3 = x.Year3 == 0 ? null : x.Year3;
                    x.Year4 = x.Year4 == 0 ? null : x.Year4;
                    x.Year5 = x.Year5 == 0 ? null : x.Year5;
                    x.Year6 = x.Year6 == 0 ? null : x.Year6;
                    x.Year7 = x.Year7 == 0 ? null : x.Year7;
                    x.Year8 = x.Year8 == 0 ? null : x.Year8;
                    x.Year9 = x.Year9 == 0 ? null : x.Year9;
                    x.Year10 = x.Year10 == 0 ? null : x.Year10;
                    x.Year11 = x.Year11 == 0 ? null : x.Year11;
                    x.Year12 = x.Year12 == 0 ? null : x.Year12;
                    x.Year13 = x.Year13 == 0 ? null : x.Year13;
                    x.Year14 = x.Year14 == 0 ? null : x.Year14;
                    x.Year15 = x.Year15 == 0 ? null : x.Year15;
                    x.Year16 = x.Year16 == 0 ? null : x.Year16;


                });
                return res;


            }
            catch (Exception e)
            {

                throw;
            }
        }



        public async Task AddUploadInfo(UploadInfo uploadInfo)
        {
            try
            {
                await _uploadinfoRepo.AddAsync(uploadInfo);   
            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<UploadInfoView> GetUploadInfo()
        {
            try
            {
                var res = _context.UploadInfoViews.FromSqlInterpolated($"select * from uploadinfo_vw").ToList();
                return res;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task RemoveMemberUploadedRecords(int branchId)
        {
            try
            {
                await _context.Database.ExecuteSqlInterpolatedAsync($"EXEC DeleteUploadedMemberData {branchId}");
           
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
