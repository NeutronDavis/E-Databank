using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces;
public interface IErrorLogService
{
  Task LogException(Exception ex, string controllerRoute);
}
