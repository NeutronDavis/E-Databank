using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.Model
{
    public class Cathedral
    {
        public int CathedralId { get; set; }
        public string? CathedralName { get; set; }
        public Priority? Priority { get; set; }
        public int? PriorityId { get; set; }

    }
}
