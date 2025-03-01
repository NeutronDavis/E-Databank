using EDataBank.Core.Entity.General;
using EDataBank.Core.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IChangesSevice
    {
        Task SaveChanges(ChangesRequest changesRequest);
        List<ChangesView> GetAllRequest();
        Task DeleteRequest(int ChangesRequestId);
        Task ApproveRequest(int ChangesRequestId);
        Task<ChangesRequest> GetChangeRequestById(int requestId);
    }
}
