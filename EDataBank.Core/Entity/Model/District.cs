using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.Model
{
    public class District
    {
        public int DistrictId { get; set; }
        public string? DistrictName { get; set; }
        public string? DistrictAddress { get; set; }
        public Province? Province { get; set; }
        public int? ProvinceId { get; set; }
    }
}
