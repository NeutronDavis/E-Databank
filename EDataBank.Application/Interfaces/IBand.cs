using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IBand
    {
        Task<Band> AddBandAsync(Band band);
        Task<Band> GetBandById(int bandId);
        Task<List<Band>> GetAllBandAsync();
        Task<Band> UpdateBandAsync(Band band);
        Task RemoveBand(Band band);
    }
}
