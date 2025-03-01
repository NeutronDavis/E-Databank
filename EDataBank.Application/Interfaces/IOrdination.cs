using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IOrdination
    {
        Task<Ordination> AddOrdinationAsync(Ordination ordination);
        Task<Ordination> GetOrdinationById(int ordinationId);
        Task<List<Ordination>> GetAllOrdination();
        Task<Ordination> UpdateOrdinationAsync(Ordination ordination);
        Task RemoveOrdination(Ordination ordination);
    }
}
