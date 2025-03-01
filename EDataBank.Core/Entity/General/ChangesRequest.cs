using EDataBank.Core.Entity.Account;
using EDataBank.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.General

{
    public class ChangesRequest
    {
        public int ChangesRequestId { get; set; }
        public Users? Users { get; set; }
        public string? UsersId { get; set; }
        public string? FieldsModified { get; set; }
        public string? FieldValue { get; set; }
        public int? OrdinationId { get; set; }
        public ChangesType? ChangesType { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}
