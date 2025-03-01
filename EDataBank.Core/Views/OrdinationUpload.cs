using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Views
{
    public class OrdinationUpload
    {
        public string? OtherName { get; set; }
        public string? LastName { get; set; }
        public int? RankId { get; set; }
        public int? Year { get; set; }
        public int? BranchId { get; set; }
        public int? NextRankId { get; set; }
    }
}
