using EDataBank.Core.Entity.Account;
using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Views
{
    public class OrdinationView
    {
        public int OrdinationId { get; set; }
        public int? RankId { get; set; }
        public int? Year { get; set; }
        public string? UsersId { get; set; }
        public int? BranchId { get; set; }
        public int? NextRankId { get; set; }
        public string? FullName { get; set; }
        public string? Gender { get; set; }
        public string? RankName { get; set; }
        public string? NextRank { get; set; }
        public int? RankOrder { get; set; }
        public string? BranchName { get; set; }
    }
}
