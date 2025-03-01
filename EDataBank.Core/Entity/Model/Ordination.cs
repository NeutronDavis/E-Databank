using EDataBank.Core.Entity.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.Model
{
    public class Ordination
    {
        public int OrdinationId { get; set; }
        public Rank? Rank { get; set; }
        public int? RankId { get; set; }
        public int? Year { get; set; }
        public Users? Users { get; set; }
        public string? UsersId { get; set; }
        public Branch? Branch { get; set; }
        public int? BranchId { get; set; }
        public int? NextRankId { get; set; }
    }
}
