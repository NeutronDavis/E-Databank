using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Views;
public class MenuView
{
  public int MenuId { get; set; }
  public string? Menu { get; set; }
  public string? SubMenu { get; set; }
  public int? SubMenuId { get; set; }
  public string? Icon { get; set; }
  public string? MenuIcon { get; set; }
  public int? MenuSortOrder { get; set; }
  public int? subMenuSortOrder { get; set; }
  public string? Description { get; set; }
  public string? MenuDescription { get; set; }
  public string? Url { get; set; }
  public string? MenuUrl { get; set; }
  public int? MenuType { get; set; }
}
