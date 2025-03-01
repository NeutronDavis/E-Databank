using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Error;
using EDataBank.Database;
using Microsoft.EntityFrameworkCore;


namespace EDataBank.Application.EDataBankServices;
public  class ErrorLogService : IErrorLogService
{
    private IRepository<ErrorLog> errorLogRepo;
    public ErrorLogService(IRepository<ErrorLog> erLRepo)
  {
    errorLogRepo = erLRepo;
  }
  public async Task LogException(Exception ex, string controllerRoute)
  {

    try
    {
      var trace= ex.StackTrace??ex.Message?.ToString();
      var errorL = new ErrorLog() { ControllerAction=controllerRoute,Message=ex.Message,InnerExceptionMessage = ex.InnerException?.Message,Exception=trace};
      await errorLogRepo.AddAsync(errorL);
    }
    catch (Exception)
    {
            throw;
    }
      
  }
}
