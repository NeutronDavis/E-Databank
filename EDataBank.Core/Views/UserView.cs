
using System.Globalization;
using EDataBank.Core.Entity.Model;
using Microsoft.EntityFrameworkCore;

namespace EDataBank.Core.Views;
[Keyless]
public class UserView
{
  TextInfo _textInfo;
  public UserView()
  {
    _textInfo = new CultureInfo("en-US", false).TextInfo;
  }
  public string? Id { get; set; }

    public string? OtherName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Gender { get; set; }
    public string? DateOfBirth { get; set; }
    public string? Title { get; set; }
    public int? PrincipalBandId { get; set; }
    public int? BandId { get; set; }
    public int? OtherBandsAssociation { get; set; }
    public string? MaritalStatus { get; set; }
    public int? YearOfMarriage { get; set; }
    public string? Nationality1 { get; set; }
    public string? Nationality2 { get; set; }
    public string? NameOfSpouse { get; set; }
    public int? NoOfChildren { get; set; }
    public int? OrdinationRankOfSpouse { get; set; }
    public string? Address { get; set; }
    public int? QualificationId { get; set; }
    public int? ProfessionId { get; set; }
    public string? Occupation { get; set; }
    public string? CppInChurch { get; set; }
    public int? BranchId { get; set; }
  public string? FullName => _textInfo.ToTitleCase($"{LastName} {OtherName}");
  public string? UserName => LastName;
  public string? Email { get; set; }
    public int? RankId { get; set; }


    public DateTime? LastAccessDate { get; set; }
    public bool? IsAcountValidated { get; set; } = false;
    public bool? IsAccountLocked { get; set; } = false;

   // public DateTime CreatedOn { get; set; }
    public string? Profession { get; set; }
    public string? Qualification { get; set; }
    public string? RankName { get; set; }
    public string? PrincipalBandName { get; set; }
    public string? BandName { get; set; }
    public string? BranchName { get; set; }
    public string? RankOfSpouse { get; set; }

}

