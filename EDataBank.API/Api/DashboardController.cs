using EDataBank.Application.EDataBankServices;
using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Model;
using EDataBank.Web.Api.Api;
using EDataBank.Web.Api.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;

namespace EDataBank.API.Api
{

    [Route("api/[controller]")]
    [AuthorizeUser]
    public class DashboardController : BaseApiController
    {
        private readonly IDashboardService _dashboardService;
        private readonly IErrorLogService _errorLogService;
        public DashboardController(IErrorLogService errorLogService, IDashboardService dashboardService)
        {
           _errorLogService = errorLogService;  
            _dashboardService = dashboardService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetDashboardData()
        {
            try
            {

                var resTtals = _dashboardService.GetTotalMembersMaleAndFemale();
                var resMFCIP = _dashboardService.GetMaleAndFemaleCountInProvinces();
                var resCMPFP = _dashboardService.GetCalculateMeberInProvinceForPies();
                var advisoryBoard =  _dashboardService.GetBoardInfo();
                return Ok(new { success = true, data = new { totals = resTtals, mfcip = resMFCIP, cmpfp = resCMPFP, boardInfo = advisoryBoard } });

            }
            catch (Exception ex) when (ex.InnerException != null && ex.InnerException.Message.Contains("timed out"))
            {
                string? controllerName = RouteData.Values["controller"]!.ToString(); string? actionName = RouteData.Values["action"]!.ToString(); string controllerRoute = $"{controllerName}/{actionName}"; await _errorLogService.LogException(ex, controllerRoute);
                return BadRequest(new { success = false, errorType = "timeOut", msg = "The service is taking longer than expected. Please wait and try again soon." });
            }
            catch (Exception ex)
            {
                string? controllerName = RouteData.Values["controller"]!.ToString(); string? actionName = RouteData.Values["action"]!.ToString(); string controllerRoute = $"{controllerName}/{actionName}"; await _errorLogService.LogException(ex, controllerRoute);
                return BadRequest(new { success = false, errorType = "error", msg = ex.Message });
            }
        }

   
    }
}
