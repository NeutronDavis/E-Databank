using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IProvince
    {
        Task<Province> AddProvinceAsync(Province province);
        Task<Province> GetProvinceById(int provinceId);
        Task<List<Province>> GetAllProvince();
        Task<Province> UpdateProvinceAsync(Province province);
        Task RemoveProvince(Province province);
    }
}
