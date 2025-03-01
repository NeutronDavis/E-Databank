using EDataBank.Core.Entity.Account;
using EDataBank.Core.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.Report
{
    public class UploadInfo
    {
        public int UploadInfoId { get; set; }
        public Cmc? Cmc { get; set; }
        public int? CmcId { get; set; }
        public Province? Province { get; set; }
        public int? ProvinceId { get; set; }
        public District? District { get; set; }
        public int? DistrictId { get; set; }
        public Branch? Branch { get; set; }
        public int? BranchId { get; set; }
        public int? TotalMale { get; set; }
        public int? TotalFemale { get; set; }
        public int? TotalMember { get; set; }
        public Users? Users { get; set; }
        public string? UsersId { get; set; }
        public DateTime? UploadedAt { get; set; }
    }
}
