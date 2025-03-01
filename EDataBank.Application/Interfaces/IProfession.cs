using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IProfession
    {
        Task<Profession> AddProfessionAsync(Profession profession);
        Task<Profession> GetProfessionById(int professionId);
        Task<List<Profession>> GetAllProfession();
        Task<Profession> UpdateProfessionAsync(Profession profession);
        Task RemoveProfession(Profession profession);
    }
}
