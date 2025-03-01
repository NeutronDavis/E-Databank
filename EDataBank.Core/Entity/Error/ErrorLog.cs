using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.Error
{
    public class ErrorLog
    {
        public int ErrorLogId { get; set; }
        public string? Exception { get; set; }
        public string? Message { get; set; }
        public string? InnerExceptionMessage { get; set; }
        public string? ControllerAction { get; set; }
        public DateTime? CreatedOn { get; set; } = DateTime.Now;
    }
}
