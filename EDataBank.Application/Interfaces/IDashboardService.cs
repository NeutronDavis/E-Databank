using EDataBank.Core.Entity.Account;
using EDataBank.Core.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IDashboardService
    {
        TotalMembersMaleAndFemale GetTotalMembersMaleAndFemale();
        List<MaleAndFemaleCountInProvince> GetMaleAndFemaleCountInProvinces();
        List<CalculateMemberInProvinceForPie> GetCalculateMeberInProvinceForPies();
        Task<List<AdvisaryBoardInfo>> GetBoardInfo();
    }
}
