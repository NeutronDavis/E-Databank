using Aspose.Cells;
using EDataBank.API.ApiModels;
using EDataBank.Application.EDataBankServices;
using EDataBank.Application.Extensions;
using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Account;
using EDataBank.Core.Entity.Application;
using EDataBank.Core.Entity.General;
using EDataBank.Core.Entity.Model;
using EDataBank.Core.Entity.Report;
using EDataBank.Core.Entity.StudentEntitiy;
using EDataBank.Core.Views;
using EDataBank.Database;
using EDataBank.Web.Api.ApiModels;
using EDataBank.Web.Api.Utility;
using FluentEmail.Core;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Operations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Reporting.NETCore;
using Microsoft.VisualBasic;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EDataBank.Web.Api.Api;

[AllowAnonymous]
[Route("api/[controller]")]
public class MainController:BaseApiController
{

    private readonly Dictionary<string, string> _uIColumns = new Dictionary<string, string>
    {
        {"Column1","SN" },
        {"Column2","Rank" },
        {"Column3","LastName" },
        {"Column4","OtherName" },
        {"Column5","Gender" },
        {"Column6","PrincipalBand" },
        {"Column7","OtherBandsAssociation" },
        {"Column8","DateofBirth" },
        {"Column9","MaritalStatus"},
        {"Column10","YearOfMarriage"},
        {"Column11","Nationality1"},
        {"Column12","Nationality2"},
        {"Column13","NumberofChildren"},
        {"Column14","NameOfSpouse"},
        {"Column15","spouseRank"},
        {"Column16","Address"},
        {"Column17","PhoneNumber"},
        {"Column18","EmailContact"},
        {"Column19","Qualification"},
        {"Column20","Profession"},
        {"Column21","Occupation"},
        {"Column22","CppInChurch"},
        {"Column23","rank1"},
        {"Column24","year1"},
        {"Column25","rank2"},
        {"Column26","year2"},
        {"Column27","rank3"},
        {"Column28","year3"},
        {"Column29","rank4"},
        {"Column30","year4"},
        {"Column31","rank5"},
        {"Column32","year5"},
        {"Column33","rank6"},
        {"Column34","year6"},
        {"Column35","rank7"},
        {"Column36","year7"},
        {"Column37","rank8"},
        {"Column38","year8"},
        {"Column39","rank9"},
        {"Column40","year9"},
        {"Column41","rank10"},
        {"Column42","year10"},
        {"Column43","rank11"},
        {"Column44","year11"},
        {"Column45","rank12"},
        {"Column46","year12"},
        {"Column47","rank13"},
        {"Column48","year13"},
        {"Column49","rank14"},
        {"Column50","year14"},
        {"Column51","rank15"},
        {"Column52","year15"},
        {"Column53","rank16"},
        {"Column54","year16"},
        {"Column55","rank17"},
        {"Column56","year17"}
    };

    private readonly ILogger<MainController> _logger;
  private readonly IUserService _userService;
    private readonly IConfiguration _configuration;
    private readonly IStudentService _studentService;
    private readonly IMenuService _menuService;
    private readonly IFluentEmail _fluentEmail;
    private readonly IChangesSevice _changesSevice;
    private readonly IModelService _modelService;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly IOrdinationService _ordinationService;
    private readonly IErrorLogService _errorLogService;
    private EDataBankDbContext _context;
    public MainController(IUserService userService, ILogger<MainController> logger, IConfiguration configuration, IStudentService studentService, IMenuService menuService, IFluentEmail fluentEmail, IWebHostEnvironment webHostEnvironment, IChangesSevice changesSevice, IModelService modelService, IOrdinationService ordinationService, EDataBankDbContext context, IErrorLogService errorLogService)
    {
        _userService = userService;
        _logger = logger;
        _configuration = configuration;
        _studentService = studentService;
        _menuService = menuService;
        _fluentEmail = fluentEmail;
        _changesSevice = changesSevice;
        _webHostEnvironment = webHostEnvironment;
        _modelService = modelService;
        _ordinationService = ordinationService;
        _context = context;
        _errorLogService = errorLogService;
    }

    [HttpGet("[action]")]

    public async Task<IActionResult> GetStudent()
    {
        Student student = new()
        {
            Age = "21",
            Name = "Davis",
            
        };
      var students =   await _studentService.CreateStudentsAsync(student);
        return Ok(new { data = students });
        
    }

    public async Task SendChangesNotification(Users user,string type,string lederEmail)
    {

        try
        {
            string webRootPath = _webHostEnvironment.WebRootPath;
            var path = Path.Combine(webRootPath, "Emails", "ChangeRequestNotification.cshtml");
            var AppPath = _configuration.GetValue<string>("APP:APP_URL");
            var email = _fluentEmail.To(lederEmail).Subject($"EDataBank {type} update notification")
              .UsingTemplateFromFile(path, new
              {
                  AppPath,
                  FullName = $"{user.OtherName}, {user.LastName}",
              });


            await email.SendAsync();
        }
        catch (Exception ex)
        {

            _logger.LogError(ex, "ChangeRequestNotification Exception");
        }


        //await _emailService.SendEmailAsync(email);

    }

    public async Task SendChangesApprovedNotification(Users user,string type)
    {

        try
        {
            string webRootPath = _webHostEnvironment.WebRootPath;
            var path = Path.Combine(webRootPath, "Emails", "ChangeRequestActionNotification.cshtml");
            var AppPath = _configuration.GetValue<string>("APP:APP_URL");
            var email = _fluentEmail.To(user.Email).Subject($"EDataBank {type} Confirmation")
              .UsingTemplateFromFile(path, new
              {
                  AppPath,
                  FullName = $"{user.OtherName}, {user.LastName}",
                  ChangeType=type,
                  Action="Approved"
              });


            await email.SendAsync();
        }
        catch (Exception ex)
        {

            _logger.LogError(ex, "SendRegistrationNotification Exception");
        }


        //await _emailService.SendEmailAsync(email);

    }

    public async Task SendChangesDeclineNotification(Users user, string type,int requestId)
    {

        try
        {
            string webRootPath = _webHostEnvironment.WebRootPath;
            var path = Path.Combine(webRootPath, "Emails", "ChangeRequestActionNotification.cshtml");
            var AppPath = _configuration.GetValue<string>("APP:APP_URL");
            var email = _fluentEmail.To(user.Email).Subject($"EDataBank {type} Confirmation")
              .UsingTemplateFromFile(path, new
              {
                  AppPath,
                  FullName = $"{user.OtherName}, {user.LastName}",
                  ChangeType = type,
                  Action = "Decline"
              });


            await email.SendAsync();

            await _changesSevice.DeleteRequest(requestId);
        }
        catch (Exception ex)
        {

            _logger.LogError(ex, "SendRegistrationNotification Exception");
        }


        //await _emailService.SendEmailAsync(email);

    }

    [HttpPost("[action]")]
    public async Task<IActionResult> AddChanges([FromBody] JObject param)
    {
        try
        {
            var changesRequest = param["request"]?.ToObject<ChangesRequest>();

            if (changesRequest == null) return BadRequest(new { status = false, msg = "changesRequest can't be null" });
          

            await _changesSevice.SaveChanges(changesRequest);
            return Ok(new { success = true, data ="",msg= "Request sent and will be reviewed and approved by the administrators " });
        }
        catch (Exception ex)
        {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { status = false, msg = ex.InnerException });
        }
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> ApproveChangesRequest([FromBody] JObject param)
    {
        try
        {
            var changesRequestId = param["requestId"]?.ToObject<int>();

            if (changesRequestId == 0) return BadRequest(new { status = false, msg = "changesRequestId can't be null" });

            var res = await _changesSevice.GetChangeRequestById((int)changesRequestId!);
            if (changesRequestId == null) return NotFound();

            var user = await _userService.GetSingleUser(res.UsersId!);
            if (user == null) return NotFound();

            await _changesSevice.ApproveRequest((int)changesRequestId);

            if(user.Email != null)
                BackgroundJob.Enqueue(() => SendChangesApprovedNotification(user,res.ChangesType == Core.Enums.ChangesType.Profile?"Profile":"Ordination"));

            return Ok(new { success = true, data = "", msg = "Request approval successful" });
        }
        catch (Exception ex)
        {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { status = false, msg = ex.InnerException });
        }
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> DeleteChangesRequest([FromBody] JObject param)
    {
        try
        {
            var changesRequestId = param["requestId"]?.ToObject<int>();

            if (changesRequestId == null) return BadRequest(new { status = false, msg = "changesRequestId can't be null" });

            var res = await _changesSevice.GetChangeRequestById((int)changesRequestId!);
            if (changesRequestId == null) return NotFound();

            var user = await _userService.GetSingleUser(res.UsersId!);
            if (user == null) return NotFound();

            BackgroundJob.Enqueue(() => SendChangesDeclineNotification(user, res.ChangesType == Core.Enums.ChangesType.Profile ? "Profile" : "Ordination", (int)changesRequestId));

            return Ok(new { success = true, data = "", msg = "Request decline successful" });
        }
        catch (Exception ex)
        {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { status = false, msg = ex.InnerException });
        }
    }

    [HttpGet("[action]")]
    public IActionResult GetAllChangesRequest()
    {
        try
        {
            var res = _changesSevice.GetAllRequest().OrderByDescending(x => x.ChangesRequestId).ToList();
            return Ok(new { success = true, data = res, msg ="" });
        }
        catch (Exception ex)
        {
#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { status = false, msg = ex.InnerException });
        }
    }

    [HttpPost("[action]")]
  public async Task<IActionResult> GetAllUsers([FromBody] JObject param)
  {
    try
    {
      var userId = param["id"]!.ToObject<string>();
      if (userId == null) return BadRequest(new {status=false,msg="User id can't be null"});

      var retVal = await _userService.FindUserByIdAsync(userId);

      return Ok(new { status=true,data=retVal });
    }
    catch (Exception ex)
    {
        #pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error,ex.Message);
        #pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { status = false, msg = ex.InnerException });
    }
  }
    [HttpPost("[action]")]
    public IActionResult GetAUserView([FromBody] JObject param)
    {
        try
        {
            var userId = param["id"]!.ToObject<string>();
            if (userId == null) return BadRequest(new { status = false, msg = "User id can't be null" });

            var retVal =  _userService.GetUserViewById(userId);

            return Ok(new { status = true, data = retVal });
        }
        catch (Exception ex)
        {
#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { status = false, msg = ex.InnerException });
        }
    }

    [HttpPost("[action]")]
    public IActionResult MemberDetailsSearch([FromBody] JObject param)
    {
        try
        {
            var searchString = param["searchString"]!.ToObject<string>();
            if (searchString == null) return BadRequest(new { success = false, msg = "searchString is null" });
            var retVal = _userService.SearchMember(searchString);
            return Ok(new { success = true, data = retVal });
        }
        catch (Exception ex)
        {
#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { status = false, msg = ex.InnerException });
        }
    }

    [HttpPost("[action]")]
    public async  Task<IActionResult> LoadUserProfileAndOrdination([FromBody] JObject param)
    {
        try
        {
            string? userId = param["userId"]!.ToObject<string>();
            var userProfile = await _userService.FindUserByIdAsync(userId!);
            if (userProfile == null) return NotFound();

            var pic = userProfile.ProfilePics == null ? "" : Encoding.Default.GetString(userProfile.ProfilePics);

            var ordinations = _ordinationService.GetMemberOrdination(userId!).OrderBy(x=> x.RankId);

            var user = _userService.GetUserViewById(userId!);

            var userRole =  _userService.GetUserGroups(userId!);

            return Ok(new { success = true, data = user, ordination= ordinations,picture=pic,userGroup = userRole});
        }
        catch (Exception ex)
        {
#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { status = false, msg = ex.InnerException });
        }
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> LoadUserProfile([FromBody] JObject param)
    {
        string? userId = param["userId"]!.ToObject<string>();
        var userProfile = await _userService.FindUserByIdAsync(userId!);
        var user = _userService.GetUserViewById(userId!);
        if (userProfile == null)
        {
            return NotFound();
        }
        ////this is returned to the inteface base on user that logs , in react the user is store in the localstorage currentUser, register your self and create an account then ypu shuold get local mail
        ///get your otp and validate your account 
        ///then login to create your user object that is store in local storage , from there you can get  your userId
        ///study the main controller for more information
        ///
        if (userProfile.ProfilePics == null)
        {
            return Ok(new
            {
                success = true,
                data = new
                {
                    OtherName = userProfile.OtherName,
                    lastName = userProfile.LastName,
                    email = userProfile.Email,
                    phoneNumber = userProfile.PhoneNumber,
                    profilePics = userProfile.ProfilePics,
                    gender = userProfile.Gender,
                    userProfile.MaritalStatus,
                    userProfile.YearOfMarriage,
                    userProfile.NameOfSpouse,
                    userProfile.Nationality1Id,
                    userProfile.Nationality2Id,
                    userProfile.Occupation,
                    userProfile.OrdinationRankOfSpouse,
                    userProfile.OtherBandsAssociation,
                    userProfile.PrincipalBandId,
                    userProfile.ProfessionId,
                    userProfile.QualificationId,
                    userProfile.RankId,
                    userProfile.BranchId,
                    userProfile.CppInChurch,
                    userProfile.DateOfBirth,
                    userProfile.BandId,
                    userProfile.NoOfChildren,
                    userProfile.Title
                },

               userView= user
            });
        }
        else
        {
            //convert byte array to base64 string
            string str = Encoding.Default.GetString(userProfile.ProfilePics);


            return Ok(new
            {
                success = true,
                data = new
                {
                    OtherName = userProfile.OtherName,
                    lastName = userProfile.LastName,
                    email = userProfile.Email,
                    phoneNumber = userProfile.PhoneNumber,
                    profilePics = str,
                    gender = userProfile.Gender,
                    userProfile.MaritalStatus,
                    userProfile.YearOfMarriage,
                    userProfile.NameOfSpouse,
                    userProfile.Nationality1Id,
                    userProfile.Nationality2Id,
                    userProfile.Occupation,
                    userProfile.OrdinationRankOfSpouse,
                    userProfile.OtherBandsAssociation,
                    userProfile.PrincipalBandId,
                    userProfile.ProfessionId,
                    userProfile.QualificationId,
                    userProfile.RankId,
                    userProfile.BranchId,
                    userProfile.CppInChurch,
                    userProfile.DateOfBirth,
                    userProfile.BandId,
                    userProfile.NoOfChildren,
                    userProfile.Title
                },
                userView = user
            }) ;

        }
    }
    [HttpPost("[action]")]
    public async Task<IActionResult> OrdinationsFromUploadData([FromBody] JObject param)
    {

        try
        {
            var ordinations = param["ordinations"]!.ToObject<List<OrdinationUpload>>();
          
            if (ordinations!.Count > 0)
            {
                List<Ordination> ordinations1 = new List<Ordination>();
                List<OrdinationUpload> ordinationsNotUploaded = new List<OrdinationUpload>();
                await ordinations.ForEachAsync(async (x) =>
                {

                    x.OtherName = !string.IsNullOrEmpty(x.OtherName) ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x.OtherName) : "";
                    x.LastName = !string.IsNullOrEmpty(x.LastName) ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x.LastName) : "";
                    string fullName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase($"{x.LastName!} {x.OtherName!}");
                    var memberExist = await _userService. MemberViaFullNameAsync(fullName);
                    if (memberExist != null)
                    {
                        Ordination ordination = new Ordination();
                        ordination.RankId = x.RankId;
                        ordination.NextRankId = x.NextRankId;
                        ordination.BranchId = x.BranchId;
                        ordination.Year = x.Year;
                        ordination.UsersId = memberExist.Id;

                        ordinations1.Add(ordination);
                    }
                    else
                    {
                        ordinationsNotUploaded.Add(x);
                    }
                });

                await _userService.UploadOrdinations(ordinations1);

                return Ok(new { success = true, msg = ordinationsNotUploaded.Count > 0? ordinationsNotUploaded.Count+" out of "+ ordinations.Count+" ordinations where not uploaded":"Ordination upload successfull",data= ordinationsNotUploaded });
            }

        }
        catch (Exception ex)
        {
#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }

        return BadRequest(new { success = false, msg = "invalid data was supplied" });
    }
    public bool ContainsNumber(string input)
    {
        return int.TryParse(input, out _) || double.TryParse(input, out _);
    }

    public async Task<List<Users>> MemberDataBlender(List<UploadedData> uploadeds,int branchId)
    {
        try
        {
            var bands = await _modelService.GetAllBandAsync();
            var branches = await _modelService.GetAllBranch();
            var principalBands = await _modelService.GetAllPrincipalBand();
            var nationalities = await _modelService.GetAllNationality();
            var professions = await _modelService.GetAllProfession();
            var qualifications = await _modelService.GetAllQualification();
            var ranks = await _modelService.GetAllRank();

            var users = new List<Users>();
            foreach (var item in uploadeds)
            {
                int? uploadedBranchId = branches.Find(br => br.BranchId! == branchId)!.BranchId;
                int? bandId = !string.IsNullOrEmpty(item.OtherBandsAssociation) ? bands.Find(bn => bn.BandName!.Trim().ToLower() == item.OtherBandsAssociation!.Trim().ToLower())?.BandId:null;
                int? principalBandId = !string.IsNullOrEmpty(item.PrincipalBand) ? principalBands.Find(pb => pb.PrincipalBandName!.Trim().ToLower() == item.PrincipalBand!.Trim().ToLower())?.PrincipalBandId:null;
                int? nationalityId1 = !string.IsNullOrEmpty(item.Nationality1) ? nationalities.Find(n => n.NationalityName!.Trim().ToLower() == item.Nationality1!.Trim().ToLower())?.NationalityId:null;
                int? nationalityId2 = !string.IsNullOrEmpty(item.Nationality2) ? nationalities.Find(n => n.NationalityName!.Trim().ToLower() == item.Nationality2!.Trim().ToLower())?.NationalityId:null;
                int? professionId = !string.IsNullOrEmpty(item.Profession) ? professions.Find(pr => pr.ProfessionName!.Trim().ToLower() == item.Profession!.Trim().ToLower())?.ProfessionId:null;
                int? qualificationId = !string.IsNullOrEmpty(item.Qualification) ? qualifications.Find(q => q.QualificationName!.Trim().ToLower() == item.Qualification!.Trim().ToLower())?.QualificationId:null;
                int? rankId = !string.IsNullOrEmpty(item.Rank) ? ranks.Find(r => r.RankName!.Trim().ToLower() == item.Rank!.Trim().ToLower())?.RankId:null;
                int? rankOfSpouseId = !string.IsNullOrEmpty(item.SpouseRank) ? ranks.Find(r => r.RankName!.Trim().ToLower() == item.SpouseRank!.Trim().ToLower())?.RankId : null;
                users.Add(new Users
                {
                    OtherName= item.OtherName,
                    LastName= item.LastName,
                    PhoneNumber= item.PhoneNumber,
                    Gender = item.Gender,
                    Email = item.EmailContact,
                    DateOfBirth = item.DateofBirth,
                    RankId = rankId == null ? 38 : rankId,
                    PrincipalBandId= principalBandId == null ? 3 : principalBandId,
                    BandId= bandId == null ? 10 : bandId,
                    OtherBandsAssociation = bandId == null ? 10 : bandId,
                    MaritalStatus=item.MaritalStatus,
                    YearOfMarriage = item.YearOfMarriage,
                    Nationality1Id = nationalityId1 == null? 226: nationalityId1,
                    Nationality2Id = nationalityId2 == null? 226: nationalityId2,
                    NameOfSpouse= item.NameOfSpouse,
                    OrdinationRankOfSpouse= rankOfSpouseId == null ? 38 : rankOfSpouseId,
                    OrdinationYear= null,
                    Address = item.Address,
                    QualificationId = qualificationId == null ? 16 : qualificationId,
                    ProfessionId = professionId == null ? 108 : professionId,
                    Occupation =item.Occupation,
                    CppInChurch = item.CppInChurch,
                    BranchId = uploadedBranchId,
                    NoOfChildren = ContainsNumber(item.NumberofChildren!)? int.Parse(item.NumberofChildren!):0
                });
            }

            var blendedMembers = users.Where(x => !string.IsNullOrEmpty(x.LastName) && !string.IsNullOrEmpty(x.OtherName)).ToList();

            return blendedMembers;

        }
        catch (Exception e)
        {

            throw;
        }
    }

    public async Task<Tuple<Branch,District, UploadInfo>> BranchUploadInfoDataBlender(BranchUploadInfo branchUploadInfo)
    {
        try
        {
    
            var branches = await _modelService.GetAllBranch();
            var districts = await _modelService.GetAllDistrict();
            var provinces = await _modelService.GetAllProvince();
            var ranks = await _modelService.GetAllRank();

            var uploadedBranch = branches.Find(br => br.BranchName!.Trim().ToLower() == branchUploadInfo.Branch!.Trim().ToLower());
            var district = districts.Find(br => br.DistrictName!.Trim().ToLower() == branchUploadInfo.District!.Trim().ToLower());
            var uploadInfoData = new UploadInfo();

          int ? elderrankId = !string.IsNullOrEmpty(branchUploadInfo.ElderInChargeRank) ? ranks.Find(r => r.RankName!.Trim().ToLower() == branchUploadInfo.ElderInChargeRank.Trim().ToLower())?.RankId : null;
            int? secretaryRankId = !string.IsNullOrEmpty(branchUploadInfo.SecretaryRank) ? ranks.Find(r => r.RankName!.Trim().ToLower() == branchUploadInfo.SecretaryRank.Trim().ToLower())?.RankId : null;
            int? financialSecretaryRankId = !string.IsNullOrEmpty(branchUploadInfo.FinancialSecretaryRank) ? ranks.Find(r => r.RankName!.Trim().ToLower() == branchUploadInfo.FinancialSecretaryRank.Trim().ToLower())?.RankId : null;
            int? provinceId = !string.IsNullOrEmpty(branchUploadInfo.Province) ? provinces.Find(r => r.ProvinceName!.Trim().ToLower() == branchUploadInfo.Province.Trim().ToLower())?.ProvinceId : null;
            if (uploadedBranch != null)
            {
                uploadedBranch.BranchAddress = branchUploadInfo.BranchAddress;
                uploadedBranch.ProvinceAddress = branchUploadInfo.ProvinceAddress;
                

                uploadedBranch.DistrictAddress = branchUploadInfo.DistrictAddress;
                uploadedBranch.ElderInChargeName = branchUploadInfo.ElderInChargeName;
                uploadedBranch.ElderInChargeRank = elderrankId != null? elderrankId:38;
                uploadedBranch.ElderInChargeEmail = branchUploadInfo.ElderInChargeEmail;
                uploadedBranch.ElderInChargePhoneNumber = branchUploadInfo.ElderInChargePhoneNumber;

                uploadedBranch.SecretaryName = branchUploadInfo.SecretaryName;
                uploadedBranch.SecretaryRank = secretaryRankId != null? secretaryRankId:38;
                uploadedBranch.SecretaryEmail = branchUploadInfo.SecretaryEmail;
                uploadedBranch.SecretaryPhoneNumber = branchUploadInfo.SecretaryPhoneNumber;

                uploadedBranch.FinancialSecretaryName = branchUploadInfo.FinancialSecretaryName;
                uploadedBranch.FinancialSecretaryRank = financialSecretaryRankId != null ? financialSecretaryRankId : 38;
                uploadedBranch.FinancialSecretaryEmail = branchUploadInfo.FinancialSecretaryEmail;
                uploadedBranch.FinancialSecretaryPhoneNumber = branchUploadInfo.FinancialSecretaryPhoneNumber;

                uploadedBranch.ProvinceId = provinceId;
                uploadedBranch.DistrictId = uploadedBranch.DistrictId;

                //upload info
                uploadInfoData.CmcId = int.Parse(branchUploadInfo.Cmc!);
                uploadInfoData.ProvinceId = provinceId;
                uploadInfoData.DistrictId = uploadedBranch.DistrictId;
                uploadInfoData.BranchId = uploadedBranch.BranchId;
            }
           
            return new Tuple<Branch,District, UploadInfo>(uploadedBranch!,district!, uploadInfoData)!;

        }
        catch (Exception e)
        {

            throw;
        }
    }


    [HttpPost("[action]")]
    public async Task<IActionResult> RegisterMembersFromUploadData([FromBody] JObject param)
    {
        using var transaction = _context.Database.BeginTransaction();
        try
        {
            var members = param["members"]?.ToObject<List<UploadedData>>();
            var uploadInfo = param["uploadInfo"]?.ToObject<BranchUploadInfo>();
            var branchId = param["branchId"]?.ToObject<int>();
            var userId = param["userId"]?.ToObject<string>();
            if (branchId == 0) return BadRequest(new { success = false, msg = "branch id is null" });
            

            if (uploadInfo != null && members != null && members.Count > 0)
            {
                var duplicateData = new List<UploadedData>();
                
                var users = await MemberDataBlender(members, (int)branchId!);
                string password = "12345";

                await users.ForEachAsync(async (x) =>
                {
                    if (x != null)
                    {
                        x.OtherName = !string.IsNullOrEmpty(x.OtherName) ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x.OtherName) :"";
                        x.LastName = !string.IsNullOrEmpty(x.LastName) ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x.LastName) :"";
                        x.FullName =  CultureInfo.CurrentCulture.TextInfo.ToTitleCase($"{x.LastName} {x.OtherName}");
                        x.Email = !string.IsNullOrEmpty(x.Email) ? CultureInfo.CurrentCulture.TextInfo.ToLower(x.Email) : null;
                        x.Gender = !string.IsNullOrEmpty(x.Gender) ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x.Gender) : null;
                        x.MaritalStatus = !string.IsNullOrEmpty(x.MaritalStatus) ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x.MaritalStatus) : null;
                        x.NameOfSpouse = !string.IsNullOrEmpty(x.NameOfSpouse) ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x.NameOfSpouse) : null;
                        x.Address = !string.IsNullOrEmpty(x.Address) ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x.Address) : null;
                        x.Occupation = !string.IsNullOrEmpty(x.Occupation) ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x.Occupation) : null;
                        x.CppInChurch = !string.IsNullOrEmpty(x.CppInChurch) ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(x.CppInChurch) : null;
                        x.PhoneNumber = !string.IsNullOrEmpty(x.PhoneNumber) ? x.PhoneNumber : null;
                        x.AuthCode = $"{Helper.GenerateOTP()}";
                        x.UserName = !string.IsNullOrEmpty(x.Email) ? x.Email : null;
                        x.IsAcountValidated = true;

                        x.PasswordHash = _userService.CreatePasswordHash(password);

                        
                    }

                    var duplicatedMember = await _userService.MemberViaFullNameAndBranchAsync(x.FullName!, (int)branchId!);
                    if (duplicatedMember != null)
                    {
                        var data = members.Find(u => u.LastName!.Trim().ToLower() == x.LastName!.Trim().ToLower() && u.OtherName!.Trim().ToLower() == x.OtherName!.Trim().ToLower());
                        if (data != null)
                        {
                            duplicateData.Add(data);
                        }
                    }

                });

                if (duplicateData.Count > 0)
                {
                    return Ok(new { success = false, msg = $"The Listed Members Already Exist In The Database.",data=duplicateData });
                }

                await _userService.Uploadmembers(users);

                var branchRes = await BranchUploadInfoDataBlender(uploadInfo);

                //upload info
                var uploadD = branchRes.Item3;
                uploadD.TotalMember = users.Count;
                var maleD = users.FindAll(x =>x.Gender != null && x.Gender.Trim().ToLower() == "male");
                var femaleD = users.FindAll(x => x.Gender != null && x.Gender.Trim().ToLower() == "female");
                uploadD.TotalMale = maleD.Count > 0? maleD.Count:0;
                uploadD.TotalFemale = femaleD.Count > 0? femaleD.Count:0;
                uploadD.UsersId = userId;
                uploadD.UploadedAt = DateTime.Now;
                await _ordinationService.AddUploadInfo(uploadD);
                //upload info

                await _modelService.UpdateBranchAsync(branchRes.Item1!);
                var dis = branchRes.Item2;
                dis.DistrictAddress = branchRes.Item1.DistrictAddress;
                await _modelService.UpdateDistrictAsync(dis);
                var uploadedMembers = await _userService.GetUploadedMemberAsync((int)branchId);

                var ordinations = await _userService.OrdinationDataBlender(members, uploadedMembers);

                await _userService.UploadOrdinations(ordinations);
                transaction.Commit();
                return Ok(new { success = true, msg = $"Members upload successful" });
            }
        }
        catch (Exception ex)
        {
            transaction.Rollback();
            string? controllerName = RouteData.Values["controller"]!.ToString(); string? actionName = RouteData.Values["action"]!.ToString(); string controllerRoute = $"{controllerName}/{actionName}"; await _errorLogService.LogException(ex, controllerRoute);
            return BadRequest(new { success = false, msg = ex.Message });
        }

        return BadRequest(new { success = false, msg = "Invalid data was supplied" });
    }


    [HttpPost("[action]")]
    public async Task<IActionResult> RegisterUser([FromBody] JObject param)
    {

        try
        {
            var registerData = param["userData"]!.ToObject<Users>();
            string? password = param["password"]!.ToObject<string>();
            bool userExist = false;
            registerData!.OtherName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(registerData.OtherName!);
            registerData!.LastName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(registerData.LastName!);
            registerData!.FullName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase($"{registerData.LastName!} {registerData.OtherName!}");
            if (registerData != null)
            {
                string useremail = registerData.Email.ToString().Trim();
                if (!string.IsNullOrEmpty(useremail))
                {
                    userExist = await _userService.UserExistAsync(useremail);
                    if (userExist) return Ok(new { success = false, msg = $"{useremail} already exist on our platform" });
                    registerData.Email = useremail;
                    registerData.AuthCode = $"{Helper.GenerateOTP()}";
                    registerData.UserName = useremail;
                    registerData.PhoneNumber = registerData.PhoneNumber;
                    registerData.PasswordHash = _userService.CreatePasswordHash(password!);
                    BackgroundJob.Enqueue(() => SendRegistrationNotification(registerData));

                    await _userService.RegisterUserAsync(registerData);

                    return Ok(new { success = true, msg = $"account created successfully with otp sent to your email" });

                }
            }

        }
        catch (Exception ex)
        {
            string? controllerName = RouteData.Values["controller"]!.ToString(); string? actionName = RouteData.Values["action"]!.ToString(); string controllerRoute = $"{controllerName}/{actionName}"; await _errorLogService.LogException(ex, controllerRoute);
            return BadRequest(new { success = false, msg = ex.Message });
        }

        return BadRequest(new { success = false, msg = "invalid data was supplied" });
    }


    [HttpPost("[action]")]
    public async Task<IActionResult> RegisterUserFromSystem([FromBody] JObject param)
    {

        try
        {
            var registerData = param["userData"]!.ToObject<Users>();
            string? password = param["password"]!.ToObject<string>();
            bool userExist = false;
            registerData!.OtherName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(registerData.OtherName!);
            registerData!.LastName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(registerData.LastName!);
            registerData!.FullName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase($"{registerData.LastName!} {registerData.OtherName!}");
            if (registerData != null)
            {
                string useremail = registerData.Email.ToString().Trim();
                if (!string.IsNullOrEmpty(useremail))
                {
                    userExist = await _userService.UserExistAsync(useremail);
                    if (userExist) return Ok(new { success = false, msg = $"{useremail} already exist on our platform" });
                    registerData.Email = useremail;
                    registerData.AuthCode = $"{Helper.GenerateOTP()}";
                    registerData.UserName = useremail;
                    registerData.PasswordHash = _userService.CreatePasswordHash(password!);
                    registerData.IsAcountValidated = true;
                   // BackgroundJob.Enqueue(() => SendRegistrationNotification(registerData));

                    var res =  await _userService.RegisterMemberFromSystem(registerData);

                    return Ok(new { success = true, msg = $"account created successfully with otp sent to your email",data=res });

                }
            }

        }
        catch (Exception ex)
        {
            string? controllerName = RouteData.Values["controller"]!.ToString(); string? actionName = RouteData.Values["action"]!.ToString(); string controllerRoute = $"{controllerName}/{actionName}"; await _errorLogService.LogException(ex, controllerRoute);
            return BadRequest(new { success = false, msg = ex.Message });
        }
        return BadRequest(new { success = false, msg = "invalid data was supplied" });
    }


    public async Task SendRegistrationNotification(Users user)
    {

        try
        {
            string webRootPath = _webHostEnvironment.WebRootPath;
            var path = Path.Combine(webRootPath, "Emails", "RegistrationNotification.cshtml");
            var AppPath = _configuration.GetValue<string>("APP:APP_URL");
            var email = _fluentEmail.To(user.Email).Subject("EDataBank Account Registration Confirmation")
              .UsingTemplateFromFile(path, new
              {
                  AppPath,

                  FullName = $"{user.OtherName}, {user.LastName}",
                  user.Email,
                  user.PhoneNumber,
                  user.AuthCode,
                  Link = $"{AppPath}/?email={user.Email}&token={user.AuthCode}",
                  HomeLink = $"{AppPath}/index.html",
                  RegDate = DateTime.Now.ToLongDateString()
              });


            await email.SendAsync();
        }
        catch (Exception ex)
        {

            _logger.LogError(ex, "SendRegistrationNotification Exception");
        }


        //await _emailService.SendEmailAsync(email);

    }

    [HttpPost("[action]")]
    public async Task<IActionResult> ValidateToken([FromBody] JObject param)
    {
        try
        {
            var email = param["email"]!.ToObject<string>();
            string? password = param["password"]!.ToObject<string>();
            string token = param["token"]!.ToObject<string>()!;

            var validated = await _userService.ValidateUser(email!, password!, token);

            if (validated)
            {
                var user = await _userService.getUserByEmail(email!);
                if (user != null)

                    await _userService.AddUserToGroupAsync(user.Id,2,(int)user.BranchId!);

                var userre = await _userService.GetUserByUserNameAsync(email!);
                return Ok(new { success = true, msg = $"Account validated successfully",data=userre.Item2});
            }
            return Ok(new { success = false, msg = $"Account validation failed, please review email,password and OTP sent to your email" });

        }
        catch (Exception ex) when (ex.InnerException != null && ex.InnerException.Message.Contains("Duplicate"))
        {

            return Ok(new { success = false, msg = $"User has been  previously validated in this facility,proceed to login" });
        }
        catch (Exception ex)
        {

            Helper.LogException(ex, RouteData, _logger);
            return BadRequest(new { success = false, msg = ex.Message });
        }


    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Authenticate([FromBody] JObject param)
    {
        //Helper.LogException(new  Exception("Testing logs"), RouteData, _logger);
        try
        {

            TextInfo _textInfo = new CultureInfo("en-US", false).TextInfo;
            var username = param["username"]!.ToObject<string>();
            string? password = param["password"]!.ToObject<string>();
            var user = await _userService.AuthenticateAsync(username!, password!);

            if (user == null) return NotFound(new { success = false, msg = "Username or password is incorrect" });
            if (!user.IsAcountValidated!.Value) return Ok(new { success = false, msg = "Your account has not been validated,check your email for your OTP validation token" });
            if (user.IsAccountLocked == true) return Ok(new { success = false, msg = "Your account has been disabled ,please contact EDataBank Support." });
            var tokenHandler = new JwtSecurityTokenHandler();
            var JwtSecret = _configuration.GetValue<string>("Jwt:JWT_SECRET");
            var key = Encoding.ASCII.GetBytes(JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                        {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                        }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            var Initials = $"{user.LastName![0].ToString().ToUpper()}{user.OtherName![0].ToString().ToUpper()}";
            var FullName = _textInfo.ToTitleCase($"{user.LastName},{user.OtherName}");

            var userId = user.Id;

            //Uncomment to reIntitalize permission for any new menu created in the db
            //await ReInitializePermisionsAsync();

            List<PermissionView> perms = _userService.GetUserPermissions(userId);
            Group userGroups = _userService.GetUserGroups(userId);

            await this.UpdateLastAccessed(user!.Id);

            return Ok(new
            {
                user.Id,
                user.Email,
                user.Gender,
                Username = user.UserName,
                user.OtherName,
                user.LastName,
                user.PhoneNumber,
                user.BranchId,
                Token = tokenString,
                FullName,
                Initials,
                user.IsAccountLocked,
                user.IsAcountValidated,
                user.LastVisitedMenuUrl,
                user.LastVisitedSubMenuId,
                user.LastVisitedMenuId,
                permissions = perms,
                groups = userGroups,
                

            });

        }
        catch (Exception ex)
        {
#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { status = false, msg = ex.InnerException });
        }
    }

    private async Task UpdateLastAccessed(string userId)
    {
        var user = await _userService.FindUserByIdAsync(userId);
        user.LastAccessDate = DateTime.Now;
        await _userService.UpdateUserAsync(user);
    }

    [HttpGet("[action]")]
    public List<MenuDTO> GetApplicationMenu()
    {

        //InitializeRole();// Use to initialize my permission table fro admin
        var data = _menuService.GetApplicationMenus().OrderBy(x => x.MenuSortOrder).ThenBy(x => x.subMenuSortOrder).ToList();
        var menu = data.Select(x => new { x.Menu, x.MenuId, x.MenuIcon, x.MenuType, x.MenuUrl }).Distinct();
        List<MenuDTO> MenuDTOs = new List<MenuDTO>();
        menu.ToList().ForEach(m =>
        {
            MenuDTOs.Add(new MenuDTO
            {
                Menu = m.Menu,
                MenuId = m.MenuId,
                MenuIcon = m.MenuIcon,
                MenuType = m?.MenuType,
                MenuUrl = m?.MenuUrl,
                SubMenus = data.Where(s => s.MenuId == m?.MenuId && s.Menu == m.Menu).Select(sm => new SubMenu
                {
                    Description = sm.Description,
                    MenuId = sm.MenuId,
                    SubMenuId = sm.SubMenuId ?? 0,
                    Name = sm.SubMenu,
                    Icon = sm.Icon,
                    Url = sm.Url
                }).ToList()
            });


        });
        return MenuDTOs;
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> SetUserLastVisitedProfile([FromBody] JObject param)
    {
        try
        {
            var userId = param["userid"]!.ToObject<string>()!;
            var lastVisitedSubMenuId = param["lastVisitedSubMenuId"]!.ToObject<int>()!;
            var lastVisitedMenuId = param["lastVisitedMenuId"]!.ToObject<int>()!;
            var lastVisitedMenuUrl = param["lastVisitedMenuUrl"]!.ToObject<string>()!;

            await _userService.UpdateProfileVisit(userId, lastVisitedSubMenuId, lastVisitedMenuId, lastVisitedMenuUrl);
            return Ok(); 

        }

        catch (Exception ex)
        {
            Helper.LogException(ex, RouteData, _logger);
            return BadRequest(new { success = false, msg = "error updating SetUserLastVisitedProfile" });
        }
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> UploadProfileImage([FromBody] JObject param)
    {

        string urlSring = param["base64String"]!.ToObject<string>()!;
        string userId = param["userId"]!.ToObject<string>()!;
        string picExtension = param["extension"]!.ToObject<string>()!;

        var userInfo = await _userService.FindUserByIdAsync(userId);

        if (userInfo == null)
        {
            return NotFound();
        }

        //reading all characters as byte and storing them to byte[]
        byte[] barr = Encoding.ASCII.GetBytes(urlSring);

        //  update user
        userInfo.ProfilePics = barr;
        userInfo.ProfilePicExtention = picExtension;


        await _userService.UpdateProfileImageAsync(userInfo);

        return Ok(new { success = true, msg = "User Information updated Successfully", data = "" });

    }

    [HttpPost("[action]")]
    public async Task<IActionResult> UpdateUserBasicProfile([FromBody] JObject param)
    {
        try
        {
                var userData = param["userData"]!.ToObject<Profile>();
                string? userId = param["userId"]!.ToObject<string>();
                var userInfo = await _userService.FindUserByIdAsync(userId!);
                if (userInfo == null)
                {
                    return NotFound();
                }
                if (userData == null)
                {
                    return BadRequest(new { success = false, msg = "User data cannot be null" });
                }
                userInfo.Email = userData!.Email;
                userInfo.OtherName = userData!.OtherName;
                userInfo.LastName = userData!.LastName;
                userInfo.PhoneNumber = userData!.PhoneNumber;
                userInfo.Gender = userData!.Gender;
                userInfo.MaritalStatus=    userData.MaritalStatus;
                userInfo.NameOfSpouse = userData.NameOfSpouse;
                userInfo.Nationality1Id = userData.Nationality1Id;
                userInfo.Occupation = userData.Occupation;
                userInfo.Nationality2Id = userData.Nationality2Id;
                userInfo.OrdinationRankOfSpouse = userData.OrdinationRankOfSpouse;
                userInfo.ProfessionId = userData.ProfessionId;
                userInfo.QualificationId = userData.QualificationId;
                userInfo.BranchId = userData.BranchId;
                userInfo.DateOfBirth = userData.DateOfBirth;
                userInfo.NoOfChildren = userData.NoOfChildren;
                userInfo.Title = userData.Title;
              

                var retval = await _userService.UpdateBasicUserAsync(userInfo, userId);
                //convert byte array to base64 string
                string str = Encoding.Default.GetString(retval.ProfilePics!);
            return Ok(new
                {
                    success = true,
                    data = new
                    {
                        retval.OtherName,
                        retval.LastName,
                        retval.Email,
                        retval.PhoneNumber,
                        ProfilePics = str,
                        retval.Gender,
                        retval.MaritalStatus,
                        retval.NameOfSpouse,
                        retval.Nationality1Id,
                        retval.Nationality2Id,
                        retval.Occupation,
                        retval.OrdinationRankOfSpouse,
                        retval.OtherBandsAssociation,
                        retval.PrincipalBandId,
                        retval.Profession,
                        retval.Qualification,
                        retval.RankId,
                        retval.BranchId,
                        retval.CppInChurch,
                        retval.DateOfBirth,
                        retval.BandId,
                        retval.NoOfChildren
                    }
                });
            }
            catch (Exception ex)
            {
                Helper.LogException(ex, RouteData, _logger);
                return BadRequest(new { success = false, msg = ex.Message });
            }

        }

    [HttpPost("[action]")]
    public async Task<IActionResult> ResetPassword([FromBody] JObject param)
    {
        try
        {
            string email = param["email"]!.ToObject<string>()!;
            var retVal = await _userService.GetUserByUserNameAsync(email);
            if (!retVal.Item1)
            {
                return NotFound();

            }
            var retVal2 = await _userService.ResetPassword(retVal.Item2);

            await ResetPasswordNotification(retVal2, "12345");

            return Ok(new { success = true, msg = "Password succsesfuly reset, your new password has been sent to your email address" });

        }
        catch (Exception ex)
        {
            Helper.LogException(ex, RouteData, _logger);
            return BadRequest(new { status = false, msg = ex.Message });
        }
    }

    public async Task ResetPasswordNotification(Users user, string password)
    {

        string webRootPath = _webHostEnvironment.WebRootPath;
        var path = Path.Combine(webRootPath, "Emails", "PasswordChangeMail.cshtml");
        var email = _fluentEmail.To(user.Email).Subject("EDataBank Password Reset Confirmation")
          .UsingTemplateFromFile(path, new
          {
              AppPath = _configuration.GetValue<string>("APP:APP_URL"),
              User = user,
              Password = password,
              Type = " Reset"
          });

        await email.SendAsync();

    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Feedback([FromBody] JObject param)
    {

        try
        {

            var data = param["feedbackData"]!.ToObject<Feedback>()!;

            var feed = await _userService.sendFeedback(data);

            return Ok(new { status = true, msg = "Feedback Successfully Sent" });

        }
        catch (Exception ex)
        {
            Helper.LogException(ex, RouteData, _logger);
            return BadRequest(new { success = false, msg = ex.Message });
        }
    }


    [HttpPost("[action]")]
    public async Task<IActionResult> UpdateUserPassword([FromBody] JObject param)
    {
        try
        {
            string oldPassword = param["oldPassword"]!.ToObject<string>()!;
            string newPassword = param["newPassword"]!.ToObject<string>()!;
            string userId = param["userId"]!.ToObject<string>()!;

            var userInfo = await _userService.FindUserByIdAsync(userId);

            if (userInfo == null)
            {
                return NotFound();
            }

            bool retval = await _userService.ChangePasswordAsync(userId, oldPassword, newPassword, userInfo);
            if (retval)
            {
                BackgroundJob.Enqueue(() => ResetPasswordNotification(userInfo, newPassword));
                return Ok(new { status = true, msg = "User Information updated Successfully" });
            }
            return Ok(new { status = false, msg = "Invalide Password" });
        }
        catch (Exception ex)
        {
            Helper.LogException(ex, RouteData, _logger);
            return BadRequest(new { success = false, msg = ex.Message });
        }
    }
    [HttpPost("[action]")]
    public IActionResult GetPermissionAndGroups([FromBody] JObject param)
    {
        try
        {
            TextInfo _textInfo = new CultureInfo("en-US", false).TextInfo;

            string userId = param["userId"]!.ToObject<string>()!;

            if (userId == null) return BadRequest(new { success = false, msg = "userId cannot be null" });


            var userGroups = _userService.GetUserGroups(userId);
            var perms = _userService.GetUserPermissions(userId);


            return Ok(new
            {
                success = true,
                msg = "",
                data = new
                {
                    permissions = perms,
                    groups = userGroups
                }
            });

        }
        catch (Exception ex)
        {
            Helper.LogException(ex, RouteData, _logger);
            return BadRequest(new { success = false, msg = ex.Message });
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
            return BadRequest(new { success = false, msg = ex.InnerException.Message });
        }
    }


    [HttpPost("[action]")]
    public async Task<IActionResult> ImportExcelMembers()
    {

        try
        {
            MemoryStream ms = new MemoryStream();
            this.Request.Form.Files[0].CopyTo(ms);
            //var service = this.Request.Query["service"][0];
            Workbook wrk = new Workbook(ms);
            Worksheet wrksht = wrk.Worksheets["DataBase"];
            if (wrksht == null) return BadRequest(new { success = false, errorType = "error", msg = "Invalide Worksheets: 'Database' worksheet is required, pleas confirm your file before upload." });
            var errormodels = new List<ErrorModel>();

            //uploadInfo
            var branch = wrksht.Cells["D8"].StringValue;
            var district = wrksht.Cells["D6"].StringValue;
            var province = wrksht.Cells["D4"].StringValue;
            var cmc = wrksht.Cells["D2"].StringValue;

            var branchAddress = wrksht.Cells["I8"].StringValue;
            var districtAddress = wrksht.Cells["I6"].StringValue;
            var provinceAddress = wrksht.Cells["I4"].StringValue;

            //Upload Officers info
            var elderInChargeName = wrksht.Cells["R4"].StringValue;
            var elderInChargeRank = wrksht.Cells["S4"].StringValue;
            var elderInChargeEmail = wrksht.Cells["U4"].StringValue;
            var elderInChargePhoneNumber = wrksht.Cells["T4"].StringValue;

            var secretaryName = wrksht.Cells["R6"].StringValue;
            var secretaryRank = wrksht.Cells["S6"].StringValue;
            var secretaryEmail = wrksht.Cells["U6"].StringValue;
            var secretaryPhoneNumber = wrksht.Cells["T6"].StringValue;
          
            var financialSecretaryName = wrksht.Cells["R8"].StringValue;
            var financialSecretaryRank = wrksht.Cells["S8"].StringValue;
            var financialSecretaryEmail = wrksht.Cells["U8"].StringValue;
            var financialSecretaryPhoneNumber = wrksht.Cells["T8"].StringValue;
            var uploadInfo = new BranchUploadInfo()
            {
                Cmc = cmc,
                Branch = branch,
                District = district,
                Province = province,
                BranchAddress = branchAddress,
                DistrictAddress = districtAddress,
                ProvinceAddress = provinceAddress,
                ElderInChargeName = elderInChargeName,
                ElderInChargeEmail = elderInChargeEmail,
                ElderInChargePhoneNumber = elderInChargePhoneNumber,
                ElderInChargeRank = elderInChargeRank,
                SecretaryEmail = secretaryEmail,
                SecretaryName = secretaryName,
                SecretaryPhoneNumber = secretaryPhoneNumber,
                SecretaryRank = secretaryRank,
                FinancialSecretaryEmail = financialSecretaryEmail,
                FinancialSecretaryName = financialSecretaryName,
                FinancialSecretaryPhoneNumber = financialSecretaryPhoneNumber,
                FinancialSecretaryRank = financialSecretaryRank,
            };
            //End UploadInfo
          
            var selBrach = new Branch();
            int? cmcId = (await _modelService.GetAllCmc()).Find(x => x.CmcId == (!string.IsNullOrEmpty(branch)? int.Parse(cmc):0))?.CmcId;
            int? provinceId = (await _modelService.GetAllProvince()).Find(x => x.ProvinceName?.ToLower() == province?.ToLower() && x.CmcId == cmcId)?.ProvinceId;
            if (provinceId == null)
            {
                errormodels.Add(new ErrorModel
                {
                    Group = "Province Name",
                    Message = $"We can't find this  Province: {wrksht.Cells["D4"].StringValue} name in cell D4 under CMC {wrksht.Cells["D2"].StringValue} ;if this Province exist, try to switch CMC else inform the admin to register this Province in PLATFORM DATA menu--->PROVINCE TAB before uploading"


                });

            }


            int? districtId = (await _modelService.GetAllDistrict()).Find(x => x.DistrictName?.ToLower() == district.ToLower() && x.ProvinceId == provinceId)?.DistrictId;
            if (districtId == null)
            {
                errormodels.Add(new ErrorModel
                {
                    Group = "District Name",
                    Message = $"We can't find this  District: {wrksht.Cells["D6"].StringValue} name in cell D6  under PROVINCE {wrksht.Cells["D4"].StringValue} ;if this District exist,try to switch PROVINCE else inform the admin to register this District in PLATFORM DATA menu--->DISTRICT TAB before uploading"


                });
            }

            var branches = (await _modelService.GetAllBranch()).ToList().Find(x => x.BranchName?.Trim().ToUpper() == branch?.Trim().ToUpper() && x.DistrictId == districtId);
            if (branches == null)
            {
                errormodels.Add(new ErrorModel
                {
                    Group = "Branch Name",
                    Message = $"We can't find this  Branch: {wrksht.Cells["D8"].StringValue} name in cell D8 under DISTRICT {wrksht.Cells["D6"].StringValue};if this branch exist,try to switch DISTRICT else inform the admin to register this branch in PLATFORM DATA menu--->BRANCH TAB before uploading"


                });
                selBrach = new Branch();
            }
            else
            {
                selBrach = branches;
            }


           



            if (wrksht == null)
            {
                return Ok(new
                {

                    ErrorMsg = "Worksheet cannot be found Worksheet called 'Database' in the uploaded excel workbook,did you mispell anything? Please check the name of the worksheet ",
                    success = false
                }); ;


            }
            DataTable dt = wrksht.Cells.ExportDataTableAsString(10, 1, wrksht.Cells.MaxDataRow + 1, wrksht.Cells.MaxDataColumn, true);

            var elderRankValidation = await ValidateLeadersRanksAsync(uploadInfo);
            (dt, var errors) = await ValidateImportedData(dt);
            errormodels.AddRange(errors);
            errormodels.AddRange(elderRankValidation);


            return Ok(new { members = dt, success = true, errormodels, selBrach, uploadInfo });

        }
        catch (Exception ex) when (ex.InnerException != null && ex.InnerException.Message.Contains("timed out"))
        {
            string? controllerName = RouteData.Values["controller"]!.ToString(); string? actionName = RouteData.Values["action"]!.ToString(); string controllerRoute = $"{controllerName}/{actionName}"; await _errorLogService.LogException(ex, controllerRoute);
            return BadRequest(new { success = false, errorType = "timeOut", msg = "The service is taking longer than expected. Please wait and try again soon." });
        }
        catch (Exception ex1)
        {
            string? controllerName = RouteData.Values["controller"]!.ToString(); string? actionName = RouteData.Values["action"]!.ToString(); string controllerRoute = $"{controllerName}/{actionName}"; await _errorLogService.LogException(ex1, controllerRoute);
            return BadRequest(new { success = false, errorType = "error", msg = ex1.Message });
        }

    }


    private async Task<Tuple<DataTable, List<ErrorModel>>> ValidateImportedData(DataTable dt)
    {

        dt.Rows.Cast<DataRow>().ForEach(dr =>
        {
            var dob = dr["Column8"]?.ToString();
            if (!string.IsNullOrEmpty(dob))
            {
                dob = dob.ToString().Replace("/", "-");
                var datecomp = dob.Split("-");
                if (datecomp.Length == 3)
                {
                    string day = datecomp[0].ToString();
                    if (day.Length == 1)
                    {
                        day = $"0{day}";
                    }
                    var mon = datecomp[1].ToString()!;
                    if (mon.Length == 1)
                    {
                        mon = $"0{mon}";
                    }

                    var fdob = $"{day}-{mon}-{datecomp.Last()}";
                    dr["Column8"] = fdob;
                }
                else if (datecomp.Length == 1 )
                {
                    if (dob.Length == 4)
                    {
                        dr["Column8"] = $"01-01-{dob}";
                    }
                }
                else
                {
                    dr["Column8"] = dob;
                }

            }



        });


        //Profession 1

        var professions = (await _modelService.GetAllProfession()).ToList().Select(x => x?.ProfessionName?.Trim().ToUpper()).ToList().Distinct().ToList();
        var qualifaications = (await _modelService.GetAllQualification()).ToList().Select(x => x?.QualificationName?.Trim().ToUpper()).ToList().Distinct().ToList();


        dt = dt.Rows.Cast<DataRow>()
             .Where(row => !row.ItemArray.All(f => f is DBNull ||
                              string.IsNullOrEmpty(f as string ?? f.ToString())))
        .CopyToDataTable();

        var ordinationRankX = await ValidateOrdinationRanksAsync(dt, "Column23","X");
        var ordinationRankZ = await ValidateOrdinationRanksAsync(dt, "Column25", "Z");
        var ordinationRankAB = await ValidateOrdinationRanksAsync(dt, "Column27", "AB");
        var ordinationRankAD = await ValidateOrdinationRanksAsync(dt, "Column29", "AD");
        var ordinationRankAF = await ValidateOrdinationRanksAsync(dt, "Column31", "AF");
        var ordinationRankAH = await ValidateOrdinationRanksAsync(dt, "Column33", "AH");
        var ordinationRankAJ = await ValidateOrdinationRanksAsync(dt, "Column35", "AJ");
        var ordinationRankAL = await ValidateOrdinationRanksAsync(dt, "Column37", "AL");
        var ordinationRankAN = await ValidateOrdinationRanksAsync(dt, "Column39", "AN");
        var ordinationRankAP = await ValidateOrdinationRanksAsync(dt, "Column41", "AP");
        var ordinationRankAR = await ValidateOrdinationRanksAsync(dt, "Column43", "AR");
        var ordinationRankAT = await ValidateOrdinationRanksAsync(dt, "Column45", "AT");
        var ordinationRankAV = await ValidateOrdinationRanksAsync(dt, "Column47", "AV");
        var ordinationRankAX = await ValidateOrdinationRanksAsync(dt, "Column49", "AX");
        var ordinationRankAZ = await ValidateOrdinationRanksAsync(dt, "Column51", "AZ");
        var ordinationRankBB = await ValidateOrdinationRanksAsync(dt, "Column53", "BB");
        var ordinationRankBD = await ValidateOrdinationRanksAsync(dt, "Column55", "BD");

        var ordinationYearY =  ValidateOrdinationYear(dt, "Column24", "Y");
        var ordinationYearAA = ValidateOrdinationYear(dt, "Column26", "AA");
        var ordinationYearAC = ValidateOrdinationYear(dt, "Column28", "AC");
        var ordinationYearAE = ValidateOrdinationYear(dt, "Column30", "AE");
        var ordinationYearAG = ValidateOrdinationYear(dt, "Column32", "AG");
        var ordinationYearAI = ValidateOrdinationYear(dt, "Column34", "AI");
        var ordinationYearAK = ValidateOrdinationYear(dt, "Column36", "AK");
        var ordinationYearAM = ValidateOrdinationYear(dt, "Column38", "AM");
        var ordinationYearAO = ValidateOrdinationYear(dt, "Column40", "AO");
        var ordinationYearAQ = ValidateOrdinationYear(dt, "Column42", "AQ");
        var ordinationYearAS = ValidateOrdinationYear(dt, "Column44", "AS");
        var ordinationYearAU = ValidateOrdinationYear(dt, "Column46", "AU");
        var ordinationYearAW = ValidateOrdinationYear(dt, "Column48", "AW");
        var ordinationYearAY = ValidateOrdinationYear(dt, "Column50", "AY");
        var ordinationYearBA = ValidateOrdinationYear(dt, "Column52", "BA");
        var ordinationYearBC = ValidateOrdinationYear(dt, "Column54", "BC");
        var ordinationYearBE = ValidateOrdinationYear(dt, "Column56", "BE");

        var RankErrors = await ValidateRanksAsync(dt);
        var genderErrors = ValidateGender(dt);
        var bandErrors = await ValidateProncipalBandAsync(dt);
        var dobErrors = ValidateDOB(dt);
        var yearOfMarrigeError = ValidateYearOfMarrige(dt);
        var maritalStatusErrors = ValidateMaritalStatus(dt);
        var nationality1Errors = await ValidateCountryAsync(dt, "Column11", "L", "Nationality 1");
        var nationality2Errors = await ValidateCountryAsync(dt, "Column12", "M", "Nationality 2");
        var spouseRankError = await ValidateRanksAsync(dt, "Column15", "P", "Spouse Ordination Rank");
        dt = CleanDataAsync(dt, professions!, "Column20");
        dt = CleanDataAsync(dt, professions!, "Column21");
        dt = CleanDataAsync(dt, qualifaications!, "Column19");

        var errors = RankErrors.Union(genderErrors).Union(bandErrors).Union(dobErrors).Union(yearOfMarrigeError)
            .Union(maritalStatusErrors)
            .Union(nationality1Errors)
            .Union(nationality2Errors)
            .Union(spouseRankError)
            .Union(ordinationRankX)
            .Union(ordinationRankZ)
            .Union(ordinationRankAB)
            .Union(ordinationRankAD)
            .Union(ordinationRankAF)
            .Union(ordinationRankAH)
            .Union(ordinationRankAJ)
            .Union(ordinationRankAL)
            .Union(ordinationRankAN)
            .Union(ordinationRankAP)
            .Union(ordinationRankAR)
            .Union(ordinationRankAT)
            .Union(ordinationRankAV)
            .Union(ordinationRankAX)
            .Union(ordinationRankAZ)
            .Union(ordinationRankBB)
            .Union(ordinationRankBD)

            .Union(ordinationYearY)
            .Union(ordinationYearAA)
            .Union(ordinationYearAC)
            .Union(ordinationYearAE)
            .Union(ordinationYearAG)
            .Union(ordinationYearAI)
            .Union(ordinationYearAK)
            .Union(ordinationYearAM)
            .Union(ordinationYearAO)
            .Union(ordinationYearAQ)
            .Union(ordinationYearAS)
            .Union(ordinationYearAU)
            .Union(ordinationYearAW)
            .Union(ordinationYearAY)
            .Union(ordinationYearBA)
            .Union(ordinationYearBC)
            .Union(ordinationYearBE)
            .ToList();

        dt.Columns.Cast<DataColumn>().ToList().ForEach(c => {

            c.ColumnName = _uIColumns[c.ColumnName].ToString();

        });
        dt.AcceptChanges();

        return new Tuple<DataTable, List<ErrorModel>>(dt, errors);
    }

    DataTable CleanDataAsync(DataTable dt, List<string> DataColumn, string columnName = "Column20")
    {

        dt.Rows.Cast<DataRow>().ForEach(dr =>
        {
            if (!string.IsNullOrEmpty(dr[columnName]?.ToString()))
            {
                var data = dr[columnName]?.ToString();
                if (DataColumn.Where(p => p == data?.Trim().ToUpper()).Any())
                {
                    dr[columnName] = dr[columnName]?.ToString();
                }
                else
                {
                    dr[columnName] = "Others";
                }

            }

        });
        return dt;
    }
  

public async Task<List<ErrorModel>> ValidateOrdinationRanksAsync(DataTable dataTable, string columName, string ColumnLetter , string group = "Ordination Rank")
{
    var rankErrors = new List<ErrorModel>();
    var Dbranks = (await _modelService.GetAllRank()).Select(x => x.RankName?.ToUpper().Trim()).ToList();
    var rankData = dataTable.AsEnumerable().Select(x => x.Field<string>(columName)?.Trim()).ToList();
    string RankstartColumn = ColumnLetter;
    int rankstartRow = 12;

    foreach (var rank in rankData)
    {

        if(ColumnLetter == "X")
        {
            if (string.IsNullOrEmpty(rank))
            {
                rankErrors.Add(new ErrorModel
                {
                    Group = group,
                    Message = $"Empty Current {group} value: in cell <b>{RankstartColumn}{rankstartRow}</b>"
                });

            }
        }

        if (!string.IsNullOrEmpty(rank) && !Dbranks.Select(r => r?.ToUpper().Trim()).Contains(rank?.ToUpper().Trim()))
        {
            rankErrors.Add(new ErrorModel
            {
                Group = group,
                Message = $"wrong {group} value: <b>{rank}</b>  in cell <b>{RankstartColumn}{rankstartRow}</b>"
            });
        }

        rankstartRow++;
    }

    return rankErrors;
}

public async Task<List<ErrorModel>> ValidateRanksAsync(DataTable dataTable, string columName = "Column2", string ColumnLetter = "C", string group = "Current Rank")
    {
        var rankErrors = new List<ErrorModel>();
        var Dbranks = (await _modelService.GetAllRank()).Select(x => x.RankName?.ToUpper().Trim()).ToList();
        var rankData = dataTable.AsEnumerable().Select(x => x.Field<string>(columName)?.Trim()).ToList();
        string RankstartColumn = ColumnLetter;
        int rankstartRow = 12;

        foreach (var rank in rankData)
        {



            if (!string.IsNullOrEmpty(rank) && !Dbranks.Select(r => r?.ToUpper().Trim()).Contains(rank?.ToUpper().Trim()))
            {
                rankErrors.Add(new ErrorModel
                {
                    Group = group,
                    Message = $"wrong {group} value: <b>{rank}</b>  in cell <b>{RankstartColumn}{rankstartRow}</b>"
                });


            }
            rankstartRow++;
        }

        return rankErrors;
    }

    public async Task<List<ErrorModel>> ValidateLeadersRanksAsync(BranchUploadInfo data)
    {
        var rankErrors = new List<ErrorModel>();
        var Dbranks = (await _modelService.GetAllRank()).Select(x => x.RankName?.ToUpper().Trim()).ToList();


        if (!string.IsNullOrEmpty(data.ElderInChargeRank) && !Dbranks.Select(r => r?.ToUpper().Trim()).Contains(data.ElderInChargeRank?.ToUpper().Trim()))
        {
            rankErrors.Add(new ErrorModel
            {
                Group = "ElderInChargeRank",
                Message=$"We can't find this Rank: <b>{data.ElderInChargeRank}</b> in cell S4, confirm the name and spellings to correct the Rank"
                //Message = $"wrong {group} value: <b>{rank}</b>  in cell <b>{RankstartColumn}{rankstartRow}</b>"
            });
        }

        if (!string.IsNullOrEmpty(data.SecretaryRank) && !Dbranks.Select(r => r?.ToUpper().Trim()).Contains(data.SecretaryRank?.ToUpper().Trim()))
        {
            rankErrors.Add(new ErrorModel
            {
                Group = "SecretaryRank",
                Message = $"We can't find this Rank: <b>{data.SecretaryRank}</b> in cell S6, confirm the name and spellings to correct the Rank"
                //Message = $"wrong {group} value: <b>{rank}</b>  in cell <b>{RankstartColumn}{rankstartRow}</b>"
            });
        }

        if (!string.IsNullOrEmpty(data.FinancialSecretaryRank) && !Dbranks.Select(r => r?.ToUpper().Trim()).Contains(data.FinancialSecretaryRank?.ToUpper().Trim()))
        {
            rankErrors.Add(new ErrorModel
            {
                Group = "FinancialSecretaryRank",
                Message = $"We can't find this Rank: <b>{data.FinancialSecretaryRank}</b> in cell S8, confirm the name and spellings to correct the Rank"
                //Message = $"wrong {group} value: <b>{rank}</b>  in cell <b>{RankstartColumn}{rankstartRow}</b>"
            });
        }

        return rankErrors;
    }



    public List<ErrorModel> ValidateGender(DataTable dataTable)
    {
        var genderErrors = new List<ErrorModel>();
        var dbGenders = new List<string> { "Male", "Female" }!;
        var genderData = dataTable.AsEnumerable().Select(x => x.Field<string>("Column5")?.Trim()).ToList();
        string RankstartColumn = "F";
        int rankstartRow = 12;

        foreach (var gender in genderData)
        {
            if (string.IsNullOrEmpty(gender))
            {
                genderErrors.Add(new ErrorModel
                {
                    Group = "Gender",
                    Message = $"Empty gender value: <b>{gender}</b>   in cell <b>{RankstartColumn}{rankstartRow}</b> "
                });
            }

            if (!string.IsNullOrEmpty(gender) && !dbGenders.Select(r => r?.ToUpper().Trim()).Contains(gender?.ToUpper().Trim())) 
            {
                genderErrors.Add(new ErrorModel
                {
                    Group = "Gender",
                    Message = $"wrong gender value: <b>{gender}</b>   in cell <b>{RankstartColumn}{rankstartRow}</b> "
                });


            }

          
            rankstartRow++;
        }

        return genderErrors;

    }

    public async Task<List<ErrorModel>> ValidateProncipalBandAsync(DataTable dataTable)
    {
        var pbandErrors = new List<ErrorModel>();
        var Dbpbands = (await _modelService.GetAllPrincipalBand()).Select(x => x.PrincipalBandName?.ToUpper().Trim()).ToList();
        var pbandData = dataTable.AsEnumerable().Select(x => x.Field<string>("Column6")?.Trim()).ToList();
        string RankstartColumn = "G";
        int rankstartRow = 12;

        foreach (var pband in pbandData)
        {


            if (!string.IsNullOrEmpty(pband) && !Dbpbands.Select(b => b?.ToUpper().Trim()).Contains(pband?.ToUpper().Trim()))
            {
                pbandErrors.Add(new ErrorModel
                {
                    Group = "Principal Band",
                    Message = $"wrong principal band value: <b>{pband}</b>  in cell <b>{RankstartColumn}{rankstartRow}</b>"
                });


            }
            rankstartRow++;
        }

        return pbandErrors;

    }


    public List<ErrorModel> ValidateDOB(DataTable dataTable)
    {
        var dobErrors = new List<ErrorModel>();

        var dobData = dataTable.AsEnumerable().Select(x => x.Field<string>("Column8")?.Trim()).ToList();
        string RankstartColumn = "I";
        int rankstartRow = 12;

        foreach (var dob in dobData)
        {


            if (!string.IsNullOrEmpty(dob))
            {
                try
                {


                    DateTime.ParseExact(dob, "dd-mm-yyyy", null);
                }
                catch (Exception)
                {

                    dobErrors.Add(new ErrorModel
                    {
                        Group = "Date of Birth",
                        Message = $"wrong format (dd-mm-yyyy) DOB value: <b>{dob}</b>  in cell <b>{RankstartColumn}{rankstartRow}</b>"
                    });
                }




            }
            rankstartRow++;
        }

        return dobErrors;

    }


    public List<ErrorModel> ValidateOrdinationYear(DataTable dataTable,string columName, string ColumnLetter)
    {
        var dobErrors = new List<ErrorModel>();

        var dobData = dataTable.AsEnumerable().Select(x => x.Field<string>(columName)?.Trim()).ToList();
        string RankstartColumn = ColumnLetter;
        int rankstartRow = 12;

        foreach (var y in dobData)
        {

            if (!string.IsNullOrEmpty(y))
            {
                try
                {
                    int year;
                    if (!int.TryParse(y, out year) || year < 1000 || year > 9999)
                    {
                        // Year is not a valid 4-digit integer
                        throw new FormatException();
                    }
                }
                catch (FormatException)
                {
                    dobErrors.Add(new ErrorModel
                    {
                        Group = "Ordination Year",
                        Message = $"Invalid year format (yyyy): '{y}' in cell '{RankstartColumn}{rankstartRow}'"
                    });
                }
            }

            rankstartRow++;
        }

        return dobErrors;

    }

    public List<ErrorModel> ValidateYearOfMarrige(DataTable dataTable)
    {
        var dobErrors = new List<ErrorModel>();

        var dobData = dataTable.AsEnumerable().Select(x => x.Field<string>("Column10")?.Trim()).ToList();
        string RankstartColumn = "K";
        int rankstartRow = 12;

        foreach (var y in dobData)
        {


            if (!string.IsNullOrEmpty(y))
            {
                try
                {


                    DateTime.ParseExact(y, "yyyy", null);
                }
                catch (Exception)
                {

                    dobErrors.Add(new ErrorModel
                    {
                        Group = "Date of Birth",
                        Message = $"wrong format (yyyy) YearOfMarriage value: <b>{y}</b>  in cell <b>{RankstartColumn}{rankstartRow}</b>"
                    });
                }




            }
            rankstartRow++;
        }

        return dobErrors;

    }


    public List<ErrorModel> ValidateMaritalStatus(DataTable dataTable)
    {
        var msErrors = new List<ErrorModel>();
        var dbMs = new List<string> { "Single", "Married", "Widowed", "Divorced", "Celibate" }!;
        var msData = dataTable.AsEnumerable().Select(x => x.Field<string>("Column9")?.Trim()).ToList();
        string RankstartColumn = "J";
        int rankstartRow = 12;

        foreach (var ms in msData)
        {


            if (!string.IsNullOrEmpty(ms) && !dbMs.Select(r => r?.ToUpper().Trim()).Contains(ms?.ToUpper().Trim()))
            {
                msErrors.Add(new ErrorModel
                {
                    Group = "Marital Status",
                    Message = $"wrong marital status value: <b>{ms}</b>  in cell <b>{RankstartColumn}{rankstartRow}</b>"
                });


            }
            rankstartRow++;
        }

        return msErrors;

    }

    public async Task<List<ErrorModel>> ValidateCountryAsync(DataTable dataTable, string columName, string ColumnLetter, string group)
    {
        var countryErrors = new List<ErrorModel>();
        var Dbcountry = (await _modelService.GetAllNationality()).Select(x => x.NationalityName?.ToUpper().Trim()).ToList();
        var countryData = dataTable.AsEnumerable().Select(x => x.Field<string>(columName)?.Trim()).ToList();
        string countrytartColumn = ColumnLetter;
        int countrystartRow = 12;

        foreach (var rank in countryData)
        {



            if (!string.IsNullOrEmpty(rank) && !Dbcountry.Select(r => r?.ToUpper().Trim()).Contains(rank?.ToUpper().Trim()))
            {
                countryErrors.Add(new ErrorModel
                {
                    Group = group,
                    Message = $"wrong {group} value: <b>{rank}</b>  in cell <b>{countrytartColumn}{countrystartRow}</b>"
                });


            }
            countrystartRow++;
        }

        return countryErrors;
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> GenerateMemberReport([FromBody] JObject param)
    {
        try
        {
            var branchId = param["branchId"]!.ToObject<int>();
            var professionId = param["professionId"]!.ToObject<int>();

            if (branchId == 0) return BadRequest(new { status = false, msg = "Branch id can't be null" });
            var res = _ordinationService.MemberReport(branchId,professionId).OrderByDescending(x => x.CurrentRankOrder).ToList();

            var branchData = _modelService.GetBranchView(branchId);

            return Ok(new { success = true, data = new { res, branchData } });
        }
        catch (Exception ex) when (ex.InnerException != null && ex.InnerException.Message.Contains("timed out"))
        {
            string? controllerName = RouteData.Values["controller"]!.ToString(); string? actionName = RouteData.Values["action"]!.ToString(); string controllerRoute = $"{controllerName}/{actionName}";await _errorLogService.LogException(ex, controllerRoute);
            return BadRequest(new { success = false,errorType="timeOut", msg = "The service is taking longer than expected. Please wait and try again soon." });
        }
        catch (Exception ex)
        {

            string? controllerName = RouteData.Values["controller"]!.ToString(); string? actionName = RouteData.Values["action"]!.ToString(); string controllerRoute = $"{controllerName}/{actionName}"; await _errorLogService.LogException(ex, controllerRoute);

            return BadRequest(new { success = false, errorType = "error", msg = ex.Message });
        }
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> GenerateMemberReportByRankAndYear([FromBody] JObject param)
    {
        try
        {
            var rank = param["rank"]!.ToObject<string>();
            var year = param["year"]!.ToObject<int>();

            if (year == 0) return BadRequest(new { status = false, msg = "Year can't be null" });

            if (rank == null) return BadRequest(new { status = false, msg = "Rank can't be null" });

            var res = _ordinationService.MemberReportByRankAndYear(rank, year).OrderByDescending(x => x.CurrentRankOrder).ToList();


            return Ok(new { success = true, data = new { res } });
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

    [HttpGet("[action]")]
    public async Task<IActionResult> RenderProvincialReport(int provinceId,int professionId)
    {
        try
        {
            if (provinceId == 0) return BadRequest(new { status = false, msg = "Province id can't be null" });
   
            var res =  _ordinationService.ProvincialMemberReport(provinceId, professionId);
            if (res.Count == 0) return BadRequest(new { status = false, msg = "No member with this selected profession" });
            var dt = Helper.LinqQueryToDataTable(res);
            var branchDetails = _modelService.GetBranchesByProvinceId(provinceId);
            var dtbranchDetails = Helper.LinqQueryToDataTable(branchDetails);
            dt!.TableName = "dtUser";
            var rept = PrintReport(dt, dtbranchDetails!, out string fileame, out string mimeType, out byte[] bytes, "ProvinceReport.rdlc");

            return File(rept, "application/pdf");


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

    [HttpGet("[action]")]
    public async Task<IActionResult> RenderBranchReport(int branchId,int professionId)
    {
        try
        {
            var branchDetails = _modelService.GetBranchView(branchId);
            if (branchDetails == null) return BadRequest(new { success = false, errorType = "branchError", msg = "Branch info required. Please fill in missing details." });

            var res = _ordinationService.MemberReport(branchId, professionId);
            res = res.OrderByDescending(x => x.CurrentRankOrder).ToList();

            var dt = Helper.LinqQueryToDataTable(res);
            var dtbranchDetails = Helper.LinqQueryToDataTable(new List<BranchView>() { branchDetails });
         
            dt!.TableName = "dtUser";
            var rept = PrintReport(dt, dtbranchDetails!, out string fileame, out string mimeType, out byte[] bytes);
       
            return File(rept,"application/pdf");

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

    [HttpGet("[action]")]
    public async Task<IActionResult> RenderRankYearReport(string rank, int year)
    {
        try
        {

            var res = _ordinationService.MemberReportByRankAndYear(rank, year);
            res = res.OrderByDescending(x => x.CurrentRankOrder).ToList();

            var dt = Helper.LinqQueryToDataTable(res);
           

            dt!.TableName = "dtUser";
            var rept = PrintRankYearReport(dt,rank,year, out string fileame, out string mimeType, out byte[] bytes);

            return File(rept, "application/pdf");

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

    [HttpGet("[action]")]
    public async  Task<IActionResult> RenderOrdinationProgressionReport(int provinceId, int branchId,string rank, int year)
    {
        try
        {
            var res = _ordinationService.MemberOrdinationProgessionReport(provinceId,branchId,rank, year);


            res = res.OrderByDescending(x => x.Gender).ToList();
            var dt = Helper.LinqQueryToDataTable(res);
            dt!.TableName = "dtRecommendation";
            var rept = PrintOrdinationReport(dt,  out string fileame, out string mimeType, out byte[] bytes);

            return File(rept, "application/pdf");

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
    [HttpPost("[action]")]
    public async Task<IActionResult> GenerateOrdinationProgressionReport([FromBody] JObject param)
    {
        try
        {
            var provinceId = param["provinceId"]!.ToObject<int>();
            var branchId = param["branchId"]!.ToObject<int>();
            var year = param["year"]!.ToObject<int>();
            var rank = param["rank"]!.ToObject<string>();

            var res = _ordinationService.MemberOrdinationProgessionReport(provinceId, branchId, rank!, year)
                .Select(e => new { e.FullName,e.Gender,e.BranchName,e.RankName,e.RankYear, e.NextRank,e.NextRankYear,e.YearsFromNow,e.Description}).ToList();
            res = res.OrderByDescending(x => x.Gender).ToList();

            return Ok(new { success = true, data = res });
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

    [HttpGet("[action]")]
    public async Task<IActionResult> GetMemberUploadTemplate()
    {
        try
        {
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "Template", "Generated-Member-Upload-File.xlsx");
            if (!System.IO.File.Exists(filePath)) return NotFound(new { success = false, errorType = "notfound", msg = "Template Not Found"});

            var memoryStream = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyTo(memoryStream);
            }
            memoryStream.Position = 0;

            var contentType = GetContentType(filePath);
            return File(memoryStream, contentType);
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

    private string GetContentType(string path)
    {
        var types = new Dictionary<string, string>
        {
            {".txt","text/plain" },
            {".pdf","application/pdf" },
            {".doc","application/vnd.ms-word" },
            {".docx","application/vnd.openxmlformats-officedocument.wordprocessing.document" },
            {".xls","application/vnd.ms-excel" },
            {".xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
            {".png","image/png" },
            {".jpg","image/jpg" },
            {".jpeg","image/jpeg" },
            {".gif","image/gif" },
            {".csv","text/csv" }
        };

        var ext = Path.GetExtension(path).ToLowerInvariant();
        return types.ContainsKey(ext) ? types[ext] : "application/octet-stream";
    }

    private byte[] PrintReport(DataTable dt, DataTable branchDetails, out string fileame, out string mimeType, out byte[] bytes,string reportName= "BranchReport.rdlc")
    {
        try
        {
           
            fileame = string.Empty;
           
            fileame = "Branch Report";
            dt.DefaultView.Sort = "RankId asc";
            dt = dt.DefaultView.ToTable();
            LocalReport localReport = new LocalReport();
            localReport.EnableHyperlinks = true;
            localReport.ReportPath = Path.Combine(_webHostEnvironment.WebRootPath, "Report", reportName);
            localReport.DataSources.Add(new ReportDataSource("DataSet1", dt));
            localReport.DataSources.Add(new ReportDataSource("DataSet2", branchDetails));
            Warning[] warnings;
            string[] streamids;
            string encoding;
            string extension;

            bytes = localReport.Render(
               "Pdf", null, out mimeType, out encoding,
                out extension,
               out streamids, out warnings);

            return bytes;
        }
        catch (Exception ex)
        {
            
            throw ex;
            return new byte[4];
        }
        
        
    }
    private byte[] PrintRankYearReport(DataTable dt,string rank,int year, out string fileame, out string mimeType, out byte[] bytes, string reportName = "ReportByRankAndYear.rdlc")
    {
        try
        {

            fileame = string.Empty;

            fileame = "Rank And Year Report";
            dt.DefaultView.Sort = "RankId asc";
            dt = dt.DefaultView.ToTable();
            LocalReport localReport = new LocalReport();
            localReport.EnableHyperlinks = true;
            localReport.ReportPath = Path.Combine(_webHostEnvironment.WebRootPath, "Report", reportName);
            localReport.DataSources.Add(new ReportDataSource("DataSet1", dt));
            localReport.SetParameters(new ReportParameter("RankName",rank.ToUpper()));
            localReport.SetParameters(new ReportParameter("Year", $"{year}"));
            Warning[] warnings;
            string[] streamids;
            string encoding;
            string extension;

            bytes = localReport.Render(
               "Pdf", null, out mimeType, out encoding,
                out extension,
               out streamids, out warnings);

            return bytes;
        }
        catch (Exception ex)
        {

            throw ex;
            return new byte[4];
        }


    }

    private byte[] PrintOrdinationReport(DataTable dt, out string fileame, out string mimeType, out byte[] bytes, string reportName = "OrdinationProgressionReport.rdlc")
    {
        try
        {

            fileame = string.Empty;

            fileame = "Ordination Report";
          
            dt = dt.DefaultView.ToTable();
            LocalReport localReport = new LocalReport();
            localReport.EnableHyperlinks = true;
            localReport.ReportPath = Path.Combine(_webHostEnvironment.WebRootPath, "Report", reportName);
            localReport.DataSources.Add(new ReportDataSource("TestDataSet", dt));
        
            Warning[] warnings;
            string[] streamids;
            string encoding;
            string extension;

            bytes = localReport.Render(
               "Pdf", null, out mimeType, out encoding,
                out extension,
               out streamids, out warnings);

            return bytes;
        }
        catch (Exception ex)
        {

            throw ex;
            return new byte[4];
        }


    }
}
