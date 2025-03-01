using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IBranch
    {
        Task<Branch> AddBranchAsync(Branch branch);
        Task<Branch> GetBranchById(int branchId);
        Task<List<Branch>> GetAllBranch();
        Task<Branch> UpdateBranchAsync(Branch branch);
        Task RemoveBranch(Branch branch);
    }
}
