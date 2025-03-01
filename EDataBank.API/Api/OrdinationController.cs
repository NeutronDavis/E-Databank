using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.General;
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
    public class OrdinationController : BaseApiController
    {
        private readonly IOrdinationService _ordinationService;
        private readonly IUserService _userService;
        private readonly ILogger<OrdinationController> _logger;
        public OrdinationController(IOrdinationService ordinationService, ILogger<OrdinationController> logger, IUserService userService)
        {
            _ordinationService = ordinationService;
            _logger = logger;
            _userService = userService;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveUploadedOrdination([FromBody] JObject param)
        {
            try
            {
                var uploadedData = param["data"]!.ToObject<List<Ordination>>();
                if(uploadedData!.Count == 0) return BadRequest(new { status = false, msg = "no data is uploaded " });
                var res =   await _ordinationService.SaveBulkOrdination(uploadedData);
                return Ok(new { success = true, data = res });

            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveSingleOrdination([FromBody] JObject param)
        {
            try
            {
                var ordination = param["ordination"]!.ToObject<Ordination>();
                var res = await _ordinationService.SaveOrdination(ordination!);
                return Ok(new { success = true, data = res });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> ModifyOrdination([FromBody] JObject param)
        {
            try
            {
                var ordination = param["ordination"]!.ToObject<Ordination>();
                await _ordinationService.UpdateOrdination(ordination!);
                return Ok(new { success = true, data = ""});
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> DeleteOrdination([FromBody] JObject param)
        {
            try
            {
                var ordinationId = param["ordinationId"]!.ToObject<int>();
                if (ordinationId < 1) return BadRequest(new { success = false, msg = "ordinationId is null" });
                await _ordinationService.RemoveOrdination(ordinationId!);
                return Ok(new { success = true, data = "" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetAMemberOrdination([FromBody] JObject param)
        {
            try
            {
                var memberId = param["memberId"]!.ToObject<string>();
                if (memberId == null) return BadRequest(new { status = false, msg = "member Id can't be null" });
                var member = await _userService.GetSingleUser(memberId);
                if (member == null) return NotFound();
                var res = _ordinationService.GetMemberOrdination(memberId).OrderBy(x => x.RankId);
                return Ok(new { success = true, data = res });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        [HttpPost("[action]")]
        public IActionResult GetAMemberOrdinationReport([FromBody] JObject param)
        {
            try
            {
                var gender = param["gender"]!.ToObject<string>();
                var branchId = param["branchId"]!.ToObject<int>();
;                if (gender == null) return BadRequest(new { status = false, msg = "gender can't be null" });
                if (branchId == 0) return BadRequest(new { status = false, msg = "branchId can't be null" });
                var res = _ordinationService.MemberOrdinationReport(branchId,gender);
                return Ok(new { success = true, data = res });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        [HttpPost("[action]")]
        public IActionResult GetAMemberReport([FromBody] JObject param)
        {
            try
            {
                var gender = param["gender"]!.ToObject<string>();
                var branchId = param["branchId"]!.ToObject<int>();
                ; if (gender == null) return BadRequest(new { status = false, msg = "gender can't be null" });
                if (branchId == 0) return BadRequest(new { status = false, msg = "branchId can't be null" });
                var res = _ordinationService.MemberReport(branchId, gender);
                return Ok(new { success = true, data = res });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }


        [HttpPost("[action]")]
        public IActionResult GetAProvinceMemberOrdinationReport([FromBody] JObject param)
        {
            try
            {
                var gender = param["gender"]!.ToObject<string>();
                var provinceId = param["provinceId"]!.ToObject<int>();
                if (gender == null) return BadRequest(new { status = false, msg = "gender can't be null" });
                if (provinceId == 0) return BadRequest(new { status = false, msg = "provinceId can't be null" });
                var res = _ordinationService.PrivincialMemberOrdinationReport(provinceId, gender);
                return Ok(new { success = true, data = res });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        [HttpPost("[action]")]
        public IActionResult GetAProvinceMemberReport([FromBody] JObject param)
        {
            try
            {
                var gender = param["gender"]!.ToObject<string>();
                var provinceId = param["provinceId"]!.ToObject<int>();
                if (gender == null) return BadRequest(new { status = false, msg = "gender can't be null" });
                if (provinceId == 0) return BadRequest(new { status = false, msg = "provinceId can't be null" });
                var res = _ordinationService.ProvincialMemberReport(provinceId, gender);
                return Ok(new { success = true, data = res });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        [HttpPost("[action]")]
        public IActionResult GenerateMemberReport([FromBody] JObject param)
        {
            try
            {
                var branch = param["branchId"]!.ToObject<int>();
                var professionId = param["professionId"]!.ToObject<int>();

                if (branch == 0) return BadRequest(new { status = false, msg = "Branch id can't be null" });
                var res = _ordinationService.MemberReport(branch, professionId);
                return Ok(new { success = true, data = res });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetAllUploadAnalysis()
        {
            try
            {
                var res = _ordinationService.GetUploadInfo();
                return Ok(new { success = true, data = res });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> RemoveUploadedData([FromBody] JObject param)
        {
            try
            {
                var branch = param["branchId"]!.ToObject<int>();

                if (branch == 0) return BadRequest(new { status = false, msg = "Branch id can't be null" });
                await _ordinationService.RemoveMemberUploadedRecords(branch);
                return Ok(new { success = true, data ="" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }
    }
}
