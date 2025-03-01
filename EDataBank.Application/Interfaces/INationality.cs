using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface INationality
    {
        Task<Nationality> AddNationalityAsync(Nationality nationality);
        Task<Nationality> GetNationalityById(int nationalityId);
        Task<List<Nationality>> GetAllNationality();
        Task<Nationality> UpdateNationalityAsync(Nationality nationality);
        Task RemoveNationality(Nationality nationality);
    }
}
