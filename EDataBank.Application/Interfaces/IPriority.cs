using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IPriority
    {
        Task<Priority> AddPriorityAsync(Priority priority);
        Task<Priority> GetPriorityById(int priorityId);
        Task<List<Priority>> GetAllPriority();
        Task<Priority> UpdatePriorityAsync(Priority priority);
        Task RemovePriority(Priority priority);
    }
}
