using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Views
{
    public class BranchView
    {
        public int? BranchId { get; set; }
        public int? Cmc { get; set; }
        public string? BranchName { get; set; }
        public string? BranchAddress { get; set; }
        public string? DistrictName { get; set; }
        public string? DistrictAddress { get; set; }
        public string? ProvinceName { get; set; }
        public string? ProvinceAddress { get; set; }

        public string? ElderInChargeEmail { get; set; }
        public string? ElderInChargeName { get; set; }
        public string? ElderInChargePhoneNumber { get; set; }
        public string? ElderInChargeRank { get; set; }
      

        public string? SecretaryName { get; set; }
        public string? SecretaryRank { get; set; }
        public string? SecretaryEmail { get; set; }
        public string? SecretaryPhoneNumber { get; set; }

        public string? FinancialSecretaryName { get; set; }
        public string? FinancialSecretaryRank { get; set; }
        public string? FinancialSecretaryEmail { get; set; }
        public string? FinancialSecretaryPhoneNumber { get; set; }

        public int ProvinceId { get; set; }
    }
}
