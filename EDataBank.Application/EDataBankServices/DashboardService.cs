using EDataBank.Application.Extensions;
using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Account;
using EDataBank.Core.Entity.Model;
using EDataBank.Core.Views;
using EDataBank.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.EDataBankServices
{
    public class DashboardService : IDashboardService
    {
        private EDataBankDbContext _context;
        private readonly IRepository<Branch> _branchRepo;
        private readonly IRepository<Users> _UserRepo;
        private readonly IRepository<Rank> _rankRepo;
        public DashboardService(EDataBankDbContext contex, IRepository<Branch> branchRepo, IRepository<Users> userRepo, IRepository<Rank> rankRepo)
        {
            _context = contex;
            _branchRepo = branchRepo;
            _UserRepo = userRepo;
            _rankRepo = rankRepo;
        }
        public TotalMembersMaleAndFemale GetTotalMembersMaleAndFemale()
        {

            return _context.TotalMembersMaleAndFemales.FromSqlInterpolated($"EXEC TotalMembersMaleAndFemale").ToList().FirstOrDefault()!;

        }
        public List<MaleAndFemaleCountInProvince> GetMaleAndFemaleCountInProvinces()
        {

            return _context.MaleAndFemaleCountInProvinces.FromSqlInterpolated($"EXEC MaleAndFemaleCountInProvince").ToList()!;

        }
        public List<CalculateMemberInProvinceForPie> GetCalculateMeberInProvinceForPies()
        {

            return _context.CalculateMeberInProvinceForPies.FromSqlInterpolated($"EXEC CalculateMeberInProvinceForPie").ToList()!;

        }

        public async Task<List<AdvisaryBoardInfo>> GetBoardInfo()
        {
            try
            {
                var rank = await _rankRepo.GetAllAsync();
                var branch = await _branchRepo.FindAsync(x => x.BranchName == "ADVISORY BOARD");
                var advisaryBoardInfo = new List<AdvisaryBoardInfo>();
                if (branch != null)
                {
                    var advisoryBoardMembers = await _UserRepo.FilterAsync(x => x.BranchId == branch.BranchId);
                    if (advisoryBoardMembers.Count > 0)
                    {
                        advisoryBoardMembers.ForEach(x=>
                        {
                            var newAdvisoryM = new AdvisaryBoardInfo()
                            {
                                Title = x.Title,
                                OtherName = x.OtherName,
                                LastName = x.LastName,
                                CurrentPosition = x.CppInChurch,
                                Rank = rank.Find(r => r.RankId == x.RankId)?.RankName,
                                RankOrder = rank.Find(r => r.RankId == x.RankId)?.RankOrder,
                                Pic = x.ProfilePics == null ? "" : Encoding.Default.GetString(x.ProfilePics)
                            };
                            advisaryBoardInfo.Add(newAdvisoryM);
                        });
                    }

                }
                return advisaryBoardInfo.OrderByDescending(x=> x.RankOrder).ToList();

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
