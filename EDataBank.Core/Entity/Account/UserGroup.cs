
using EDataBank.Core.Entity.Model;

namespace EDataBank.Core.Entity.Account;

public class UserGroup
{
  public int UserGroupId { get; set; }
  public virtual Users? User { get; set; }

  public virtual string UserId { get; set; } = null!;

  public virtual Group? Group { get; set; }

  public virtual int GroupId { get; set; }
  public virtual Branch? Branch { get; set; }
  public virtual int? BranchId { get; set; }
}
