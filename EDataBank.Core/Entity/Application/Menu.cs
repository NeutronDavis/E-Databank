using EDataBank.Core.Enums;
using System.ComponentModel.DataAnnotations;


namespace EDataBank.Core.Entity.Application;

 public class Menu
  {
      public int MenuId { get; set; }
  public string Name { get; set; } = null!;
      public ICollection<SubMenu>? SubMenu { get; set; }
      public int sortOrder { get; set; }
      [MaxLength(50)]
      public string? MenuIcon { get; set; }
      public MenuType MenuType { get; set; }
      [MaxLength(400)]
      public string? Url { get; set; }
      [MaxLength(50)]
      public string? Field { get; set; }
      [MaxLength(400)]
      public string? Description { get; set; }
  }

