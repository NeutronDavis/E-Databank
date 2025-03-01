using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EDataBank.Core.Entity.Application;
public class SubMenu
    {
        public int SubMenuId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        [ForeignKey("Menu")]
        public int MenuId { get; set; }
        public Menu? Menu { get; set; }
        [MaxLength(50)]
        public string? Icon { get; set; }
        public int sortOrder { get; set; }
        [MaxLength(300)]
        public string? Url { get; set; }
        [MaxLength(50)]
        public string? Field { get; set; }
    }

