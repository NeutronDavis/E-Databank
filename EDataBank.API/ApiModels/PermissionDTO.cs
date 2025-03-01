using EDataBank.Core.Views;

namespace EDataBank.Web.Api.ApiModels;

internal class PermissionDTO
{
  public string? Menu { get; set; }
  public string? MenuIcon { get; set; }
  public int MenuId { get; set; }
  public List<PermissionView>? Privileges { get; set; }
}
