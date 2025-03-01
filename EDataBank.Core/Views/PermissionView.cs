using Microsoft.EntityFrameworkCore;

namespace EDataBank.Core.Views;
[Keyless]
public class PermissionView
{

  public string? Display { get; set; }
  public int SubMenuId { get; set; }
  public int MenuId { get; set; }
    public int GroupId { get; set; }
  public string? Name { get; set; }

  public bool CanView { get; set; }
  public bool CanUpdate { get; set; }
  public bool CanDelete { get; set; }
  public bool CanExecute { get; set; }
  public bool CanApprove { get; set; }
  public string? Menu { get; set; }
  public string? SubMenu { get; set; }
  public string? MenuIcon { get; set; }
  public string? Id { get; set; }

  public string? Url { get; set; }



}
