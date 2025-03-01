using EDataBank.Core.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IModelService:IBand, IBranch, ICathedral,ICmc, IDistrict, IOrdination, IPrincipalBand, IPriority, IProfession, IProvince, IQualification, IRank,INationality
    {
        BranchView GetBranchView(int branchId);
        List<BranchView> GetBranchesByProvinceId(int provinceId);
    }
}
