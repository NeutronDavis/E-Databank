using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.General
{
    public class OrdinationBlander
    {
        public List<string?>? Ranks { get; set; }
        public List<int?>? Year { get; set; }
        public string? LastName { get; set; }
        public string? OtherName { get; set; }
        public string? Gender { get; set; }
    }
}
