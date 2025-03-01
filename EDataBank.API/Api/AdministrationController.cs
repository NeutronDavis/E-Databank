
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using EDataBank.Application.EDataBankServices;
using EDataBank.Application.Extensions;
using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Account;
using EDataBank.Core.Enums;
using EDataBank.Web.Api.ApiModels;
using EDataBank.Web.Api.Filters;
using FluentAssertions.Common;
using FluentEmail.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;




namespace EDataBank.Web.Api.Api;

[Route("api/[controller]")]
[AuthorizeUser]
public class AdministrationController : BaseApiController
{
  private readonly IUserService _userService;
  private readonly ILogger<AdministrationController> _logger;
  private readonly IMenuService _menuService;
  private readonly IFluentEmail _fluentEmail;
    private readonly IConfiguration _configuration;


    private readonly IWebHostEnvironment _webHostEnvironment;
  public AdministrationController(IUserService userService, ILogger<AdministrationController> logger, IConfiguration configuration, IMenuService menuService, IFluentEmail fluentEmail, IWebHostEnvironment webHostEnvironment)
  {
    _userService = userService;
    _logger = logger;
  

    _menuService = menuService;
    _fluentEmail = fluentEmail;
    _webHostEnvironment = webHostEnvironment;
     _configuration = configuration;
    }

  [HttpGet("[action]")]
  public async Task<IActionResult> GetAllGroup()
  {
    try{ 

      var retVal = await _userService.GetGroupsAsync();

      return Ok(new { success = true, data = retVal, msg = "" });
    }
    catch (Exception ex)
    {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }
  }


  [HttpGet("[action]")]
  public IActionResult GetAllUsers()
  {
    try
    {
     
       var users =  _userService.GetUsersView();
    
      return Ok(new { success = true,  users });

    }
    catch (Exception ex)
    {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }

  
  }



  [HttpPost("[action]")]
  public async Task<IActionResult> searchUser([FromBody] JObject param)
  {
    string searchTerms = param["searchTerms"]!.ToObject<string>()!;
    string searchCategory = param["searchCategory"]!.ToObject<string>()!;
    UserSearchCategory userSearchCategory = Enum.Parse<UserSearchCategory>(searchCategory, true);

    var users = await _userService.GetUserBySearchCriteriaAsync(searchTerms, userSearchCategory);
    if (users != null)
    {
      users.ForEach(user =>
      {
        if (user.ProfilePics != null) { user.ProfilePicExtention = Encoding.Default.GetString(user.ProfilePics); }

      });
    }
   

    return Ok(new {data=users});
  }



  [HttpPost("[action]")]
  public async Task<IActionResult> InviteSatff([FromBody] JObject param)
  {
    try
    {
      var email = param["email"]!.ToObject<string>()!;
      
      await SendInvitation(email);
      return Ok(new
      {
        success = true,
        msg = "Invitation sent successfully"
      });
    }
    catch (Exception ex)
    {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }
    
  }
  [HttpPost("[action]")]
  public async Task<IActionResult> LockUserAccount([FromBody] JObject param)
  {
      try
    {      
      var userId = param["userId"]!.ToObject<string>()!;
      var user = await _userService.FindUserByIdAsync(userId);
      if ((bool)user.IsAccountLocked!)
      {
        user.IsAccountLocked = false;
      }else
      {
        user.IsAccountLocked = true;
      }
      await _userService.UpdateUserAsync(user);
      return Ok(new
      {
        success = true,
        msg = "User Account Locked Successfully"
      });
    }
    catch (Exception ex)
    {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }
  }

  public async Task SendInvitation(string  toEmail)
  {
    string webRootPath = _webHostEnvironment.WebRootPath;
    var path = Path.Combine(webRootPath, "Emails","Invitation.cshtml");
    //var path = $"Invitation.cshtml";
    try
    {
      var AppPath = _configuration.GetValue<string>("APP:APP_URL");
      var email = _fluentEmail.To(toEmail).Subject("NuovoForte Platform Invitation to Join")
      .UsingTemplateFromFile(path, new  { AppPath });
      await email.SendAsync();
    }
    catch (Exception ex)
    {

      throw;
    }
    
  }

  [HttpPost("[action]")]
  public async Task<IActionResult> ReInitializePermisions()
  {
    var groups = _userService.GeAllGroup();
    var permissions = new List<Permission>();
    foreach (var group in groups)
    {
      var groupId = group.GroupId;
      var data = _menuService.GetApplicationMenus().OrderBy(x => x.MenuSortOrder).ToList();

      data.ForEach(m =>
      {

        if (m.SubMenuId.HasValue)
        {
          var permission = new Permission
          {

            MenuId = m.MenuId,
            SubMenuId = m.SubMenuId.Value,
            GroupId = groupId,
            Display = m.SubMenu,
            Name = m.SubMenu,
            CanUpdate = true,
            CanView = true,
            CanDelete = true,
            CanExecute = groupId == 1,
            CanApprove = groupId == 1
          };
          permissions.Add(permission);

        }

      });
    }



    await _userService.InsertRolesAsync(permissions);

    return Ok();
  }


  [HttpPost("[action]")]

  public IActionResult GetGroupPermissions([FromBody] JObject param)
  {

    try
    {
      var groupId = param["groupId"]!.ToObject<int>();

      var permissions = _userService.GetGroupPermissions(groupId);
      var menus = permissions.Select(x => new { x.Menu, x.MenuId, x.MenuIcon }).Distinct().ToList();

      List<PermissionDTO> permDtos = new List<PermissionDTO>();

      menus.ForEach(m =>
      {
        permDtos.Add(new PermissionDTO
        {
          Menu = m.Menu,
          MenuId = m.MenuId,
          MenuIcon = m.MenuIcon,
          Privileges = permissions.Where(x => x.MenuId == m.MenuId).ToList()
        });
      });
     
      permDtos = permDtos.OrderByDescending(x => x.Privileges?.Count).ToList();
      return Ok(new { Permissions = permDtos });
    }
    catch (Exception ex)
    {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
    }
  }


  [HttpPost("[action]")]
  public  IActionResult GetUsersInGroup([FromBody] JObject param)
  {


    try
    {

      var groupId = param["groupId"]!.ToObject<int>();

      var usersInGroup = _userService.GetUsersInRole(groupId);

      return Ok(new {  Users = usersInGroup });
    }
    catch (Exception ex)
    {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }
  }

  [HttpPost("[action]")]
  public IActionResult GetUsersInAGroup([FromBody] JObject param)
  {
    try
    {

      var groupId = param["groupId"]!.ToObject<int>();
      if(groupId == 0) return BadRequest(new { success = false, msg = "group id is null" });

      var retVal = _userService.GetUsersInAGroup(groupId);

      return Ok(new { success=true, data = retVal,msg=""  });
    }
    catch (Exception ex)
    {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }
  }


  [HttpPost("[action]")]
  public async Task<IActionResult> RemoveUserFromGroup([FromBody] JObject param)
  {


    try
    {
    
      var groupId = param["groupId"]!.ToObject<int>();
      var userId = param["userId"]!.ToObject<string>();
  
     await _userService.RemoveUserFromRoleAsync(new UserGroup { UserId = userId!, GroupId = groupId});

      return Ok(true);
    }
    catch (Exception ex)
    {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }
  }
    [HttpPost("[action]")]
    public async Task<IActionResult> ChangeUserGroup([FromBody] JObject param)
    {


        try
        {
            var userId = param["userId"]!.ToObject<string>();
            var roleType = param["roleType"]!.ToObject<int>();
            if (userId == null) return BadRequest(new { success = false, msg = "userId is null" });
            if (roleType == 0) return BadRequest(new { success = false, msg = "role is null" });

            await _userService.UpdateUserRoleAsync(userId, roleType);

            return Ok(new { success = false, msg = "Member role successfully change" });
        }
        catch (Exception ex)
        {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }
    }

    [HttpPost("[action]")]
  public async Task<IActionResult> AddUsersToGroup([FromBody] JObject param)
  {


    try
    {
      var groupId = param["groupId"]!.ToObject<int>();
      var users = param["users"]!.ToObject<List<Users>>();
   

      if(users?.Count==0) return BadRequest(new
      {
        success = false,
        msg = "Add user to group failed"
      });
      await  users!.ForEachAsync(async (user) =>
      {
      await _userService.AddUserToGroupAsync(user.Id, groupId,(int)user.BranchId!);
      });
      return Ok(users);
    }
    catch (Exception ex)
    {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }
  }

  [HttpPost("[action]")]
  public IActionResult GetUserGroups([FromBody] JObject param)
  {
    try
    {
      var userId = param["userId"]!.ToObject<string>()!;
      var groups = _userService.GetUserGroups(userId);
      return Ok(groups);
    }
    catch (Exception ex)
    {
#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });

        }
  }


  [HttpPost("[action]")]
  public async Task<IActionResult> GetAUsers([FromBody] JObject param)
  {
    try
    {
      var userId = param["userId"]!.ToObject<string>()!;
      var user = await _userService.FindUserByIdAsync(userId);
      return Ok(new { success = true, data = user, msg="" });
    }
    catch (Exception ex)
    {
#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }
  }

  [HttpPost("[action]")]
  public IActionResult GetUserPermissions([FromBody] JObject param)
  {


    try
    {

      var userId = param["userId"]!.ToObject<string>()!;
      var facilityId = param["facilityId"]!.ToObject<int>();
      var perms = _userService.GetUserPermissions(userId);

      return Ok(perms);
    }
    catch (Exception ex)
    {
#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = ex.Message });
        }
  }


}
