using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.General
{
    public class BranchUploadInfo
    {
        public string? Cmc { get; set; }
        public string? District { get; set; }
        public string? Branch { get; set; }
        public string? Province { get; set; }
        public string? ProvinceAddress { get; set; }
        public string? BranchAddress { get; set; }
        public string? DistrictAddress { get; set; }
        public string? ElderInChargeName { get; set; }
        public string? ElderInChargeRank { get; set; }
        public string? ElderInChargeEmail { get; set; }
        public string? ElderInChargePhoneNumber { get; set; }

        public string? SecretaryName { get; set; }
        public string? SecretaryRank { get; set; }
        public string? SecretaryEmail { get; set; }
        public string? SecretaryPhoneNumber { get; set; }

        public string? FinancialSecretaryName { get; set; }
        public string? FinancialSecretaryRank { get; set; }
        public string? FinancialSecretaryEmail { get; set; }
        public string? FinancialSecretaryPhoneNumber { get; set; }
    }
}
