using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IPrincipalBand
    {
        Task<PrincipalBand> AddPrincipalBandAsync(PrincipalBand principalBand);
        Task<PrincipalBand> GetPrincipalBandById(int principalBandId);
        Task<List<PrincipalBand>> GetAllPrincipalBand();
        Task<PrincipalBand> UpdatePrincipalBandAsync(PrincipalBand principalBand);
        Task RemovePrincipalBand(PrincipalBand principalBand);
    }
}
