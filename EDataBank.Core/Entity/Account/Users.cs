using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EDataBank.Core.Entity.Model;
using Microsoft.AspNetCore.Identity;

namespace EDataBank.Core.Entity.Account;
public class Users : IdentityUser
{

    public Users()
    {
        this.Groups = new HashSet<UserGroup>();

    }
   public string? UsersId { get; set; }
  public string? OtherName { get; set; }
  public string? LastName { get; set; }
  public string? PhoneNumber { get; set; }
  public string? Gender { get; set; }
    public string? DateOfBirth { get; set; }
    public Rank? Rank { get; set; }
    public int? RankId { get; set; }
    public PrincipalBand? PrincipalBand { get; set; }
    public int? PrincipalBandId { get; set; }
    public Band? Band { get; set; }
    public int? BandId { get; set; }
    public int? OtherBandsAssociation { get; set; }
    public string? MaritalStatus { get; set; }
    public int? YearOfMarriage { get; set; }
    public int? Nationality1Id { get; set; }
    public int? Nationality2Id { get; set; }
    public string? NameOfSpouse { get; set; }
    public int? OrdinationRankOfSpouse { get; set; }
    public int? OrdinationYear { get; set; }
    public string? Address { get; set; }
    public Qualification? Qualification { get; set; }
    public int? QualificationId { get; set; }
    public Profession? Profession { get; set; }
    public int? ProfessionId { get; set; }
    public string? Occupation { get; set; }
    public string? CppInChurch { get; set; }
    public Branch? Branch { get; set; }
    public int? BranchId { get; set; }
    public int? NoOfChildren { get; set; }
  public byte[]? ProfilePics { get; set; }
  public string? ProfilePicExtention { get; set; }
    public virtual ICollection<UserGroup> Groups { get; set; }
    public bool? IsAcountValidated { get; set; } = false;
  public bool? IsAccountLocked { get; set; } = false;
  public DateTime RegsiteredOn { get; set; } = DateTime.Now;
    public string? AuthCode { get; set; }
    public int? LastVisitedSubMenuId { get; set; }
    public int? LastVisitedMenuId { get; set; }
    public string? LastVisitedMenuUrl { get; set; }
    public DateTime? LastAccessDate { get; set; }
    public string? FullName { get; set; }
    public string? Title { get; set; }
}
