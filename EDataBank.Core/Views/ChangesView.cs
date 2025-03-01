using EDataBank.Core.Entity.Account;
using EDataBank.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Views
{
    public class ChangesView
    {
        public int ChangesRequestId { get; set; }
        public string? OtherName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }
        public string? Gender { get; set; }
        public string? Branch { get; set; }
        public string? UsersId { get; set; }
        public string? FieldsModified { get; set; }
        public string? FieldValue { get; set; }
        public string? ChangesType { get; set; }
        public int? OrdinationId { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
