using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IRank
    {
        Task<Rank> AddRankAsync(Rank rank);
        Task<Rank> GetRankById(int rankId);
        Task<List<Rank>> GetAllRank();
        Task<Rank> UpdateRankAsync(Rank rank);
        Task RemoveRank(Rank rank);
    }
}
