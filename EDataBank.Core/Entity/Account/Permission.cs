using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace EDataBank.Core.Entity.Account;
public class Permission: IdentityRole
{
  public virtual string? Display { get; set; }
  public int SubMenuId { get; set; }
  public int MenuId { get; set; }
  public int GroupId { get; set; }
  public Group? Group { get; set; }
  public bool CanView { get; set; } = true;
  public bool CanUpdate { get; set; } = false;
  public bool CanDelete { get; set; } = false;
  public bool CanExecute { get; set; } = false;
  public bool CanApprove { get; set; } = false;
}
