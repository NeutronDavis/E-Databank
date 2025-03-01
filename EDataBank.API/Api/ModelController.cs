
using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Model;
using EDataBank.Web.Api.Api;
using EDataBank.Web.Api.Filters;
using FluentEmail.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Priority = EDataBank.Core.Entity.Model.Priority;

namespace EDataBank.API.Api
{
        [Route("api/[controller]")]
        [AuthorizeUser]
    public class ModelController: BaseApiController
    {
        private readonly IModelService _modelService;
        private readonly ILogger<ModelController> _logger;
        public ModelController(IModelService modelService, ILogger<ModelController> logger)
        {
            _modelService = modelService;
            _logger = logger;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddBand([FromBody] JObject param)
        {
            try
            {
                var band = param["band"]!.ToObject<Band>();
                if(band == null)return BadRequest(new { status = false, msg = "Band can't be null" });
                var retVal = await _modelService.AddBandAsync(band);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllBand()
        {
            try
            {
                var retVal = await _modelService.GetAllBandAsync();

                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> GetBandById([FromBody] JObject param)
        {
            try
            {
                var bandId = param["bandId"]!.ToObject<int>();
                if(bandId == 0) return BadRequest(new { status = false, msg = "Band id can't be null" });
                var retVal = await _modelService.GetBandById(bandId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdateBand([FromBody] JObject param)
        {
            try
            {
                var band = param["band"]!.ToObject<Band>();
                if(band == null) return BadRequest(new { status = false, msg = "Band can't be null" });
                if(band.BandId == 0) return BadRequest(new { status = false, msg = "Band id can't be null" });
                 var res =  await _modelService.UpdateBandAsync(band);
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
        public async Task<IActionResult> RemoveBand([FromBody] JObject param)
        {
            try
            {
                var bandId = param["bandId"]!.ToObject<int>();
                if (bandId == 0) return BadRequest(new { status = false, msg = "Band can't be null" });
                var band = await _modelService.GetBandById(bandId);
                if (band == null) return NotFound();
              
                await _modelService.RemoveBand(band);

                return Ok(new { success = true, data = "",msg="Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        //End of Band

        [HttpPost("[action]")]
        public async Task<IActionResult> AddBranch([FromBody] JObject param)
        {
            try
            {
                var branch = param["branch"]!.ToObject<Branch>();
                if (branch == null) return BadRequest(new { status = false, msg = "Branch can't be null" });
                var retVal = await _modelService.AddBranchAsync(branch);
                return Ok(new { success = true, data = retVal });

            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message});
            }
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllBranch()
        {
            try
            {
                var retVal = await _modelService.GetAllBranch();

                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> GetBranchById([FromBody] JObject param)
        {
            try
            {
                var branchId = param["branchId"]!.ToObject<int>();
                if (branchId == 0) return BadRequest(new { status = false, msg = "Branch id can't be null" });
                var retVal = await _modelService.GetBranchById(branchId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdateBranch([FromBody] JObject param)
        {
            try
            {
                var branch = param["branch"]!.ToObject<Branch>();
                if (branch == null) return BadRequest(new { status = false, msg = "Branch can't be null" });
                if (branch.BranchId == 0) return BadRequest(new { status = false, msg = "Branch id can't be null" });
                var res = await _modelService.UpdateBranchAsync(branch);
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
        public async Task<IActionResult> RemoveBranch([FromBody] JObject param)
        {
            try
            {
                var branchId = param["branchId"]!.ToObject<int>();
                if (branchId == 0) return BadRequest(new { status = false, msg = "Branch can't be null" });
                var branch = await _modelService.GetBranchById(branchId);
                if (branch == null) return NotFound();

                await _modelService.RemoveBranch(branch);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        //End of Branch


        [HttpPost("[action]")]
        public async Task<IActionResult> AddCathedral([FromBody] JObject param)
        {
            try
            {
                var cathedral = param["cathedral"]!.ToObject<Cathedral>();
                if (cathedral == null) return BadRequest(new { status = false, msg = "Cathedral can't be null" });
                var retVal = await _modelService.AddCathedralAsync(cathedral);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllCathedral()
        {
            try
            {
                var retVal = await _modelService.GetAllCathedral();

                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> GetCathedralById([FromBody] JObject param)
        {
            try
            {
                var cathedralId = param["cathedralId"]!.ToObject<int>();
                if (cathedralId == 0) return BadRequest(new { status = false, msg = "CathedralId id can't be null" });
                var retVal = await _modelService.GetBranchById(cathedralId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdateCathedral([FromBody] JObject param)
        {
            try
            {
                var cathedral = param["cathedral"]!.ToObject<Cathedral>();
                if (cathedral == null) return BadRequest(new { status = false, msg = "Branch can't be null" });
                if (cathedral.CathedralId == 0) return BadRequest(new { status = false, msg = "Branch id can't be null" });
                var res = await _modelService.UpdateCathedralAsync(cathedral);
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
        public async Task<IActionResult> RemoveCathedral([FromBody] JObject param)
        {
            try
            {
                var cathedralId = param["cathedralId"]!.ToObject<int>();
                if (cathedralId == 0) return BadRequest(new { status = false, msg = "Cathedral can't be null" });
                var cathedral = await _modelService.GetCathedralById(cathedralId);
                if (cathedral == null) return NotFound();

                await _modelService.RemoveCathedral(cathedral);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        //End of Cathedral

        [HttpPost("[action]")]
        public async Task<IActionResult> AddCmc([FromBody] JObject param)
        {
            try
            {
                var cmc = param["cmc"]!.ToObject<Cmc>();
                if (cmc == null) return BadRequest(new { status = false, msg = "Cmc can't be null" });
                var retVal = await _modelService.AddCmcAsync(cmc);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllCmc()
        {
            try
            {
                var retVal = await _modelService.GetAllCmc();

                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> GetCmcById([FromBody] JObject param)
        {
            try
            {
                var cmcId = param["cmcId"]!.ToObject<int>();
                if (cmcId == 0) return BadRequest(new { status = false, msg = "Cmc id can't be null" });
                var retVal = await _modelService.GetCmcById(cmcId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdateCmc([FromBody] JObject param)
        {
            try
            {
                var cmc = param["cmc"]!.ToObject<Cmc>();
                if (cmc == null) return BadRequest(new { status = false, msg = "Cmc can't be null" });
                if (cmc.CmcId == 0) return BadRequest(new { status = false, msg = "Cmc id can't be null" });
                var res = await _modelService.UpdateCmcAsync(cmc);
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
        public async Task<IActionResult> RemoveCmc([FromBody] JObject param)
        {
            try
            {
                var cmcId = param["cmcId"]!.ToObject<int>();
                if (cmcId == 0) return BadRequest(new { status = false, msg = "Cmc can't be null" });
                var cmc = await _modelService.GetCmcById(cmcId);
                if (cmc == null) return NotFound();

                await _modelService.RemoveCmc(cmc);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        //End of CMC

        [HttpPost("[action]")]
        public async Task<IActionResult> AddDistrict([FromBody] JObject param)
        {
            try
            {
                var district = param["district"]!.ToObject<District>();
                if (district == null) return BadRequest(new { status = false, msg = "District can't be null" });
                var retVal = await _modelService.AddDistrictAsync(district);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllDistrict()
        {
            try
            {
                var retVal = await _modelService.GetAllDistrict();

                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> GetDistrictById([FromBody] JObject param)
        {
            try
            {
                var districtId = param["districtId"]!.ToObject<int>();
                if (districtId == 0) return BadRequest(new { status = false, msg = "District id can't be null" });
                var retVal = await _modelService.GetCmcById(districtId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdateDistrict([FromBody] JObject param)
        {
            try
            {
                var district = param["district"]!.ToObject<District>();
                if (district == null) return BadRequest(new { status = false, msg = "District can't be null" });
                if (district.DistrictId == 0) return BadRequest(new { status = false, msg = "District id can't be null" });
                var res = await _modelService.UpdateDistrictAsync(district);
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
        public async Task<IActionResult> RemoveDistrict([FromBody] JObject param)
        {
            try
            {
                var districtId = param["districtId"]!.ToObject<int>();
                if (districtId == 0) return BadRequest(new { status = false, msg = "District can't be null" });
                var district = await _modelService.GetDistrictById(districtId);
                if (district == null) return NotFound();

                await _modelService.RemoveDistrict(district);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        //End of District

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrdination([FromBody] JObject param)
        {
            try
            {
                var ordination = param["ordination"]!.ToObject<Ordination>();
                if (ordination == null) return BadRequest(new { status = false, msg = "Ordination can't be null" });
                var retVal = await _modelService.AddOrdinationAsync(ordination);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllOrdination()
        {
            try
            {
                var retVal = await _modelService.GetAllOrdination();

                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> GetOrdinationById([FromBody] JObject param)
        {
            try
            {
                var ordinationId = param["ordinationId"]!.ToObject<int>();
                if (ordinationId == 0) return BadRequest(new { status = false, msg = "Ordination id can't be null" });
                var retVal = await _modelService.GetOrdinationById(ordinationId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdateOrdination([FromBody] JObject param)
        {
            try
            {
                var ordination = param["ordination"]!.ToObject<Ordination>();
                if (ordination == null) return BadRequest(new { status = false, msg = "Ordination can't be null" });
                if (ordination.OrdinationId == 0) return BadRequest(new { status = false, msg = "Ordination id can't be null" });
                var res = await _modelService.UpdateOrdinationAsync(ordination);
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
        public async Task<IActionResult> RemoveOrdination([FromBody] JObject param)
        {
            try
            {
                var ordinationId = param["ordinationId"]!.ToObject<int>();
                if (ordinationId == 0) return BadRequest(new { status = false, msg = "Ordination can't be null" });
                var ordination = await _modelService.GetOrdinationById(ordinationId);
                if (ordination == null) return NotFound();

                await _modelService.RemoveOrdination(ordination);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        //End of Ordination

        [HttpPost("[action]")]
        public async Task<IActionResult> AddPrincipalBand([FromBody] JObject param)
        {
            try
            {
                var principalBand = param["principalBand"]!.ToObject<PrincipalBand>();
                if (principalBand == null) return BadRequest(new { status = false, msg = "PrincipalBand can't be null" });
                var retVal = await _modelService.AddPrincipalBandAsync(principalBand);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllPrincipalBand()
        {
            try
            {
                var retVal = await _modelService.GetAllPrincipalBand();

                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> GetPrincipalBandById([FromBody] JObject param)
        {
            try
            {
                var principalBandId = param["principalBandId"]!.ToObject<int>();
                if (principalBandId == 0) return BadRequest(new { status = false, msg = "PrincipalBand id can't be null" });
                var retVal = await _modelService.GetPrincipalBandById(principalBandId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdatePrincipalBand([FromBody] JObject param)
        {
            try
            {
                var principalBand = param["principalBand"]!.ToObject<PrincipalBand>();
                if (principalBand == null) return BadRequest(new { status = false, msg = "PrincipalBand can't be null" });
                if (principalBand.PrincipalBandId == 0) return BadRequest(new { status = false, msg = "PrincipalBand id can't be null" });
                var res = await _modelService.UpdatePrincipalBandAsync(principalBand);
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
        public async Task<IActionResult> RemovePrincipalBand([FromBody] JObject param)
        {
            try
            {
                var principalBandId = param["principalBandId"]!.ToObject<int>();
                if (principalBandId == 0) return BadRequest(new { status = false, msg = "PrincipalBand can't be null" });
                var principalBand = await _modelService.GetPrincipalBandById(principalBandId);
                if (principalBand == null) return NotFound();

                await _modelService.RemovePrincipalBand(principalBand);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        //End of PrincipalBand

        [HttpPost("[action]")]
        public async Task<IActionResult> AddPriority([FromBody] JObject param)
        {
            try
            {
                var priority = param["priority"]!.ToObject<Priority>();
                if (priority == null) return BadRequest(new { status = false, msg = "Priority can't be null" });
                var retVal = await _modelService.AddPriorityAsync(priority);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllPriority()
        {
            try
            {
                var retVal = await _modelService.GetAllPriority();

                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> GetPriorityById([FromBody] JObject param)
        {
            try
            {
                var priorityId = param["priorityId"]!.ToObject<int>();
                if (priorityId == 0) return BadRequest(new { status = false, msg = "Priority id can't be null" });
                var retVal = await _modelService.GetPriorityById(priorityId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdatePriority([FromBody] JObject param)
        {
            try
            {
                var priority = param["priority"]!.ToObject<Priority>();
                if (priority == null) return BadRequest(new { status = false, msg = "Priority can't be null" });
                if (priority.PriorityId == 0) return BadRequest(new { status = false, msg = "Priority id can't be null" });
                var res = await _modelService.UpdatePriorityAsync(priority);
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
        public async Task<IActionResult> RemovePriority([FromBody] JObject param)
        {
            try
            {
                var priorityId = param["priorityId"]!.ToObject<int>();
                if (priorityId == 0) return BadRequest(new { status = false, msg = "Priority can't be null" });
                var priority = await _modelService.GetPriorityById(priorityId);
                if (priority == null) return NotFound();

                await _modelService.RemovePriority(priority);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }


        //End of Priority


        [HttpPost("[action]")]
        public async Task<IActionResult> AddProfession([FromBody] JObject param)
        {
            try
            {
                var profession = param["profession"]!.ToObject<Profession>();
                if (profession == null) return BadRequest(new { status = false, msg = "Profession can't be null" });
                var retVal = await _modelService.AddProfessionAsync(profession);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllProfession()
        {
            try
            {
                var retVal = await _modelService.GetAllProfession();

                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> GetProfessionById([FromBody] JObject param)
        {
            try
            {
                var professionId = param["professionId"]!.ToObject<int>();
                if (professionId == 0) return BadRequest(new { status = false, msg = "Profession id can't be null" });
                var retVal = await _modelService.GetProfessionById(professionId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdateProfession([FromBody] JObject param)
        {
            try
            {
                var profession = param["profession"]!.ToObject<Profession>();
                if (profession == null) return BadRequest(new { status = false, msg = "Profession can't be null" });
                if (profession.ProfessionId == 0) return BadRequest(new { status = false, msg = "Profession id can't be null" });
                var res = await _modelService.UpdateProfessionAsync(profession);
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
        public async Task<IActionResult> RemoveProfession([FromBody] JObject param)
        {
            try
            {
                var professionId = param["professionId"]!.ToObject<int>();
                if (professionId == 0) return BadRequest(new { status = false, msg = "Profession can't be null" });
                var profession = await _modelService.GetProfessionById(professionId);
                if (profession == null) return NotFound();

                await _modelService.RemoveProfession(profession);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }



        //End of Profession

        [HttpPost("[action]")]
        public async Task<IActionResult> AddProvince([FromBody] JObject param)
        {
            try
            {
                var province = param["province"]!.ToObject<Province>();
                if (province == null) return BadRequest(new { status = false, msg = "Province can't be null" });
                var retVal = await _modelService.AddProvinceAsync(province);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllProvince()
        {
            try
            {
                var retVal = await _modelService.GetAllProvince();

                return Ok(new { success = true, data = retVal.OrderBy(x=>x.CmcId) });
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
        public async Task<IActionResult> GetProvinceById([FromBody] JObject param)
        {
            try
            {
                var provinceId = param["provinceId"]!.ToObject<int>();
                if (provinceId == 0) return BadRequest(new { status = false, msg = "Province id can't be null" });
                var retVal = await _modelService.GetProvinceById(provinceId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdateProvince([FromBody] JObject param)
        {
            try
            {
                var province = param["province"]!.ToObject<Province>();
                if (province == null) return BadRequest(new { status = false, msg = "Province can't be null" });
                if (province.ProvinceId == 0) return BadRequest(new { status = false, msg = "Province id can't be null" });
                var res = await _modelService.UpdateProvinceAsync(province);
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
        public async Task<IActionResult> RemoveProvince([FromBody] JObject param)
        {
            try
            {
                var provinceId = param["provinceId"]!.ToObject<int>();
                if (provinceId == 0) return BadRequest(new { status = false, msg = "Province can't be null" });
                var province = await _modelService.GetProvinceById(provinceId);
                if (province == null) return NotFound();

                await _modelService.RemoveProvince(province);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }


        //End of Province

        [HttpPost("[action]")]
        public async Task<IActionResult> AddQualification([FromBody] JObject param)
        {
            try
            {
                var qualification = param["qualification"]!.ToObject<Qualification>();
                if (qualification == null) return BadRequest(new { status = false, msg = "Qualification can't be null" });
                var retVal = await _modelService.AddQualificationAsync(qualification);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllQualification()
        {
            try
            {
                var retVal = await _modelService.GetAllQualification();

                return Ok(new { success = true, data = retVal });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message});
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetQualificationById([FromBody] JObject param)
        {
            try
            {
                var qualificationId = param["qualificationId"]!.ToObject<int>();
                if (qualificationId == 0) return BadRequest(new { status = false, msg = "Qualification id can't be null" });
                var retVal = await _modelService.GetQualificationById(qualificationId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdateQualification([FromBody] JObject param)
        {
            try
            {
                var qualification = param["qualification"]!.ToObject<Qualification>();
                if (qualification == null) return BadRequest(new { status = false, msg = "Qualification can't be null" });
                if (qualification.QualificationId == 0) return BadRequest(new { status = false, msg = "Qualification id can't be null" });
                var retV = await _modelService.GetQualificationById(qualification.QualificationId);
                var res = await _modelService.UpdateQualificationAsync(qualification);
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
        public async Task<IActionResult> RemoveQualification([FromBody] JObject param)
        {
            try
            {
                var qualificationId = param["qualificationId"]!.ToObject<int>();
                if (qualificationId == 0) return BadRequest(new { status = false, msg = "Qualification can't be null" });
                var qualification = await _modelService.GetQualificationById(qualificationId);
                if (qualification == null) return NotFound();

                await _modelService.RemoveQualification(qualification);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }


        //End of Qualification

        [HttpPost("[action]")]
        public async Task<IActionResult> AddRank([FromBody] JObject param)
        {
            try
            {
                var rank = param["rank"]!.ToObject<Rank>();
                if (rank == null) return BadRequest(new { status = false, msg = "Rank can't be null" });
                var retVal = await _modelService.AddRankAsync(rank);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllRank()
        {
            try
            {
                var retVal = await _modelService.GetAllRank();

                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> GetRankById([FromBody] JObject param)
        {
            try
            {
                var rankId = param["rankId"]!.ToObject<int>();
                if (rankId == 0) return BadRequest(new { status = false, msg = "Rank id can't be null" });
                var retVal = await _modelService.GetRankById(rankId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdateRank([FromBody] JObject param)
        {
            try
            {
                var rank = param["rank"]!.ToObject<Rank>();
                if (rank == null) return BadRequest(new { status = false, msg = "Rank can't be null" });
                if (rank.RankId == 0) return BadRequest(new { status = false, msg = "Rank id can't be null" });
                var retV = await _modelService.GetRankById(rank.RankId);
                if (retV == null) return NotFound();
                retV.RankName = rank.RankName;
                retV.RankOrder = rank.RankOrder;
                retV.EndYearCount = rank.EndYearCount;
                
                var res = await _modelService.UpdateRankAsync(retV);
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
        public async Task<IActionResult> RemoveRank([FromBody] JObject param)
        {
            try
            {
                var rankId = param["rankId"]!.ToObject<int>();
                if (rankId == 0) return BadRequest(new { status = false, msg = "Rank can't be null" });
                var rank = await _modelService.GetRankById(rankId);
                if (rank == null) return NotFound();

                await _modelService.RemoveRank(rank);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        //End of Rank

        [HttpPost("[action]")]
        public async Task<IActionResult> AddNationality([FromBody] JObject param)
        {
            try
            {
                var nationality = param["nationality"]!.ToObject<Nationality>();
                if (nationality == null) return BadRequest(new { status = false, msg = "Nationality can't be null" });
                var retVal = await _modelService.AddNationalityAsync(nationality);
                return Ok(new { success = true, data = retVal });

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
        public async Task<IActionResult> GetAllNationality()
        {
            try
            {
                var retVal = await _modelService.GetAllNationality();

                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> GetNationalityById([FromBody] JObject param)
        {
            try
            {
                var nationalityId = param["nationalityId"]!.ToObject<int>();
                if (nationalityId == 0) return BadRequest(new { status = false, msg = "Nationality id can't be null" });
                var retVal = await _modelService.GetRankById(nationalityId);
                return Ok(new { success = true, data = retVal });
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
        public async Task<IActionResult> UpdateNationality([FromBody] JObject param)
        {
            try
            {
                var nationality = param["nationality"]!.ToObject<Nationality>();
                if (nationality == null) return BadRequest(new { status = false, msg = "Nationality can't be null" });
                if (nationality.NationalityId == 0) return BadRequest(new { status = false, msg = "Nationality id can't be null" });
                var retV = await _modelService.GetNationalityById(nationality.NationalityId);
                if (retV == null) return NotFound();
                retV.NationalityName = nationality.NationalityName;

                var res = await _modelService.UpdateNationalityAsync(retV);
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
        public async Task<IActionResult> RemoveNationality([FromBody] JObject param)
        {
            try
            {
                var nationalityId = param["nationalityId"]!.ToObject<int>();
                if (nationalityId == 0) return BadRequest(new { status = false, msg = "Nationality can't be null" });
                var nationality = await _modelService.GetNationalityById(nationalityId);
                if (nationality == null) return NotFound();

                await _modelService.RemoveNationality(nationality);

                return Ok(new { success = true, data = "", msg = "Sucessfully remove" });
            }
            catch (Exception ex)
            {
#pragma warning disable CA2254 // Template should be a static expression
                _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
                return BadRequest(new { success = false, msg = ex.InnerException.Message });
            }
        }

        //End Of Nationality

    }
}
