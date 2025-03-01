
using EDataBank.Core.Views;


namespace EDataBank.Application.EDataBankServices;
public interface  IMenuService
{
  List<MenuView> GetApplicationMenus();
}
