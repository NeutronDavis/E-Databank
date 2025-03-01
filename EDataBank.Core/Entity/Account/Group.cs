using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.Account;
public class Group
{
  public Group()
  {
   this.Permissions  = new List<Permission>();
  }
  public int GroupId { get; set; }

  public string Name { get; set; } = null!;
  public string? Description { get; set; }

  public bool IsPlatformAdmin { get; set; } = false;
  public ICollection<Permission> Permissions { get; set; }

}
