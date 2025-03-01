using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Views
{
    public class Profile
    {

        public string? OtherName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Title { get; set; }
        public string? Gender { get; set; }
        public string? MaritalStatus { get; set; }
        public int? Nationality1Id{ get; set; }
        public int? Nationality2Id { get; set; }
        public string? NameOfSpouse { get; set; }
        public string? Occupation { get; set; }
        public int? OrdinationRankOfSpouse { get; set; }
        public int? QualificationId { get; set; }
        public int? ProfessionId { get; set; }
        public int? BranchId { get; set; }
        public string? DateOfBirth { get; set; }
        public int? NoOfChildren { get; set; }
    }
}
