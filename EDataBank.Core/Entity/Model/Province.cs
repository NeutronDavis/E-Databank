using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.Model
{
    public class Province
    {
        public int ProvinceId { get; set; }
        public string? ProvinceName { get; set; }
        public Cmc? Cmc { get; set; }
        public int? CmcId { get; set; }
    }
}
