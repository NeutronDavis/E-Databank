using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface ICmc
    {
        Task<Cmc> AddCmcAsync(Cmc cmc);
        Task<Cmc> GetCmcById(int cmcId);
        Task<List<Cmc>> GetAllCmc();
        Task<Cmc> UpdateCmcAsync(Cmc cmc);
        Task RemoveCmc(Cmc cmc);
    }
}
