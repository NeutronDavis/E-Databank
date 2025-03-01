using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface ICathedral
    {
        Task<Cathedral> AddCathedralAsync(Cathedral cathedral);
        Task<Cathedral> GetCathedralById(int cathedralId);
        Task<List<Cathedral>> GetAllCathedral();
        Task<Cathedral> UpdateCathedralAsync(Cathedral cathedral);
        Task RemoveCathedral(Cathedral cathedral);
    }
}
