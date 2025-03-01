using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IDistrict
    {
        Task<District> AddDistrictAsync(District district);
        Task<District> GetDistrictById(int districtId);
        Task<List<District>> GetAllDistrict();
        Task<District> UpdateDistrictAsync(District district);
        Task RemoveDistrict(District district);
    }
}
