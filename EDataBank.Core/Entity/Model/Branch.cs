using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.Model
{
    public class Branch
    {
        public int BranchId { get; set; }
        public string? BranchName { get; set; }
        public string? BranchAddress { get; set; }
        public District? District { get; set; }
        public int? DistrictId { get; set; }
        
        public Province? Province { get; set; }
        public int? ProvinceId { get; set; }
        public string? ProvinceAddress { get; set; }
        public string? DistrictAddress { get; set; }
        public string? ElderInChargeName { get; set; }
        public int? ElderInChargeRank { get; set; }
        public string? ElderInChargeEmail { get; set; }
        public string? ElderInChargePhoneNumber { get; set; }

        public string? SecretaryName { get; set; }
        public int? SecretaryRank { get; set; }
        public string? SecretaryEmail { get; set; }
        public string? SecretaryPhoneNumber { get; set; }

        public string? FinancialSecretaryName { get; set; }
        public int? FinancialSecretaryRank { get; set; }
        public string? FinancialSecretaryEmail { get; set; }
        public string? FinancialSecretaryPhoneNumber { get; set; }
    }
}
