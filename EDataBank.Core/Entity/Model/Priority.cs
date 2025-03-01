using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.Model
{
    public class Priority
    {
        public int PriorityId { get; set; } 
        public string? PriorityName { get; set; }
        public int? PriorityLevel { get; set; }
    }
}
