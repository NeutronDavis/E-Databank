
using EDataBank.Core.Entity.Application;

namespace EDataBank.Web.Api.ApiModels;

public class MenuDTO
{
  public int? MenuId { get; set; }
  public string? Menu { get; set; } = null!;
  public string? MenuIcon { get; set; }
  public string? MenuUrl { get; set; }
  public int? MenuType { get; set; }
  public List<SubMenu>? SubMenus { get; set; }
}
