using EDataBank.Core.Views;
using EDataBank.Database;
using Microsoft.EntityFrameworkCore;

namespace EDataBank.Application.EDataBankServices;

public class MenuService : IMenuService
{
  private EDataBankDbContext _context;
  public MenuService(EDataBankDbContext context)
  {
    _context = context;
  }
  public List<MenuView> GetApplicationMenus()
  {
   var c=_context.MenuView.FromSqlRaw($"EXEC GetApplicationMenu").ToList();
    return c;
  }
}
