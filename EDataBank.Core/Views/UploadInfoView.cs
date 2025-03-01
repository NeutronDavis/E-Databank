using EDataBank.Core.Entity.Account;
using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Views
{
    public class UploadInfoView
    {
        public int UploadInfoId { get; set; }
        public int? CmcId { get; set; }
        public int? ProvinceId { get; set; }
        public int? DistrictId { get; set; }
        public int? BranchId { get; set; }
        public int? TotalMale { get; set; }
        public int? TotalFemale { get; set; }
        public int? TotalMember { get; set; }
        public string? UsersId { get; set; }
        public DateTime? UploadedAt { get; set; }

        public string? ProvinceName { get; set; }
        public string? DistrictName { get; set; }
        public string? BranchName { get; set; }
        public string? UploadedBy { get; set; }
    }
}
