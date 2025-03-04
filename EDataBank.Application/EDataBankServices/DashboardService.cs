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

        public List<AdvisaryBoard> GetBoardInfo()
        {
            try
            {
                var advisoryBoardMembers = _context.AdvisaryBoardInfos.FromSqlInterpolated($"EXEC GetAdvisoryBoard").ToList();
       
                var advisaryBoardInfo = new List<AdvisaryBoard>();
              
                if (advisoryBoardMembers.Count > 0)
                {
                   advisoryBoardMembers.ForEach(x =>
                    {
                        var newAdvisoryM = new AdvisaryBoard()
                        {
                            Title = x.Title,
                            OtherName = x.OtherName,
                            LastName = x.LastName,
                            CurrentPosition = x.CppInChurch,
                            Rank = x.RankName,
                            RankOrder = x.RankOrder,
                            Pic = x.ProfilePics == null ? "" : Encoding.Default.GetString(x.ProfilePics),
                            
                    };
                        advisaryBoardInfo.Add(newAdvisoryM);
                    });
                }

                return advisaryBoardInfo;

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
