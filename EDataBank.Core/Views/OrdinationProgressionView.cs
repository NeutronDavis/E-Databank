using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Views
{
    public class OrdinationProgressionView
    {
        public int? BranchId { get; set; }
        public int? ProvinceId { get; set; }
        public string? FullName { get; set; }
        public string? Gender { get; set; }
        public string? BranchName { get; set; }
        public string? RankName { get; set; }
        public int? RankYear { get; set; }
        public string? NextRank { get; set; }
        public int? NextRankYear { get; set; }
        public int? YearsFromNow { get; set; }
        public string? Description { get; set; }
    }
}
