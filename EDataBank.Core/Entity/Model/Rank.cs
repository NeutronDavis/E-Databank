using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.Model
{
    public class Rank
    {
        public int RankId { get; set; }
        public string? RankName { get; set; }
        public int? RankOrder { get; set; }
        public string? RankGender { get; set; }
        public int? EndYearCount { get; set; }
    }
}
