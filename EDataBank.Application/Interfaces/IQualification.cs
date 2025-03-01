using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IQualification
    {
        Task<Qualification> AddQualificationAsync(Qualification qualification);
        Task<Qualification> GetQualificationById(int qualificationId);
        Task<List<Qualification>> GetAllQualification();
        Task<Qualification> UpdateQualificationAsync(Qualification qualification);
        Task RemoveQualification(Qualification qualification);
    }
}
