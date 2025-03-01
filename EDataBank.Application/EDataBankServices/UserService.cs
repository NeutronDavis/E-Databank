using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using EDataBank.Application.Extensions;
using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Account;
using EDataBank.Core.Entity.General;
using EDataBank.Core.Entity.Model;
using EDataBank.Core.Enums;
using EDataBank.Core.Views;
using EDataBank.Database;
using Microsoft.EntityFrameworkCore;


namespace EDataBank.Application.EDataBankServices;
public class UserService: IUserService
{
  private readonly IRepository<Users> _UserRepo;
    private readonly IRepository<UserGroup> _UserGroupRepo;
    private readonly IRepository<Feedback> _feedbackRepo;
    private readonly IRepository<Group> _groupRepo;
    private readonly IRepository<Permission> _permRepo;
    private EDataBankDbContext _context;
    private readonly IRepository<Ordination> _ordinationRepo;
    private readonly IModelService modelService;
    public UserService(IRepository<Users> UserRepository, EDataBankDbContext context, IRepository<UserGroup> userGroupRepo, IRepository<Feedback> feedbackRepo, IRepository<Group> groupRepo, IRepository<Permission> permRepo, IRepository<Ordination> ordinationRepo, IModelService modelService)
    {
        _UserRepo = UserRepository;
        _context = context;
        _UserGroupRepo = userGroupRepo;
        _feedbackRepo = feedbackRepo;
        _groupRepo = groupRepo;
        _permRepo = permRepo;
        _ordinationRepo = ordinationRepo;
        this.modelService = modelService;
    }

    private const int PBKDF2IterCount = 1000; // default for Rfc2898DeriveBytes
    private const int PBKDF2SubkeyLength = 256 / 8; // 256 bits
    private const int SaltSize = 128 / 8; // 128 bits

    public async Task RegisterUserAsync(Users users)
    {
        try
        {
            //await _UserRepo.AddAsync(users);
            var res = await _UserRepo.AddAsync(users);

            var ranks = await modelService.GetAllRank();
            var currentRank = ranks.ToList().Find(x => x.RankId == res.RankId);
            var nextRank = (currentRank!.RankOrder == 16 || currentRank.RankOrder == 12)?null: ranks.Find(x => x.RankOrder == currentRank!.RankOrder + 1);

            var ordination = new Ordination();

            ordination.RankId = res.RankId;
            ordination.BranchId = res.BranchId;
            ordination.NextRankId = nextRank!.RankId;
            ordination.UsersId = res.Id;
            ordination.Year = res.OrdinationYear;

            await _ordinationRepo.AddAsync(ordination);
           
        }
        catch (Exception)
        {

            throw;
        }
    }
    public async Task Uploadmembers(List<Users> members)
    {
        try
        {
            await _UserRepo.BulkInsertAsync(members);

            List<UserGroup> myNewserGroups = new List<UserGroup>();

            await members.ForEachAsync(async (x) => { 
                var res = await this.MemberViaFullNameAsync(x.FullName!);
                if (res != null)
                {
                    myNewserGroups.Add(new UserGroup { UserId = res.Id, GroupId = 2, BranchId= res.BranchId });
                }
            });
            await _UserGroupRepo.BulkInsertAsync(myNewserGroups);

    }
        catch (Exception ex)
        {

            throw;
        }
    }
    public async Task<List<Users>> GetUsersAsync()
    {
        return await _UserRepo.GetAllAsync();
    }

    public async Task<Users> FindUserByIdAsync(string userId)
  {
    try
    {
      var retVal = await _UserRepo.GetByIdAsync(userId)?? new Users();
      return retVal;
    }
    catch (Exception)
    {

      throw;
    }
  }
    public UserView GetUserViewById(string userId)
    {
        return _context.UserView.FirstOrDefault(x => x.Id == userId!) ?? new UserView();
    }
    public async Task UpdateUserAsync(Users user)
    {
        if (user != null)
        {
          await _UserRepo.UpdateAsync(user);
            
        }
        return; 
    }
    public async Task RemoveUserAsync(Users user)
    {
        await _UserRepo.DeleteAsync(user);
    }

    public async Task<bool> UserExistAsync(string email)
    {
        var user = await _UserRepo.FilterAsync(u => u.Email.ToLower().Trim() == email.ToLower().Trim());
        return user.Any();
    }

    public async Task<bool> MemberExistAsync(string fullname)
    {
        var user = await _UserRepo.FilterAsync(u => u.FullName!.ToLower() == fullname.ToLower());
        return user.Any();
    }
    public async Task<List<Users>> GetUploadedMemberAsync(int branchId)
    {
        var user = await _UserRepo.FilterAsync(u =>  u.BranchId == branchId);
        return user;
    }
    public async Task<Users> MemberViaFullNameAsync(string fullname)
    {
        var user = await _UserRepo.FindAsync(u => u.FullName!.ToLower() == fullname.ToLower());
        return user!;
    }
    public async Task<Users> MemberViaFullNameAndBranchAsync(string fullname,int branchId)
    {
        var user = await _UserRepo.FindAsync(u => u.FullName!.ToLower() == fullname.ToLower() && u.BranchId == branchId);
        return user!;
    }
    public async Task<Users> AuthenticateAsync(string username, string password)
    {
        try
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null!;

            var fullNane = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(username);
            var user = await _UserRepo.FindAsync(x => x.FullName == username);

            // check if email exists
            if (user == null)
                return null!;

            // check if password is correct
            if (!VerifyPasswordHash(user.PasswordHash, password))
                return null!;

            // authentication successful
            return user;
        }
        catch (Exception ex)
        {

            throw;
        }
        
    }

    public string CreatePasswordHash(string password)
    {
        if (password == null)
        {
            throw new ArgumentNullException("password");
        }

        // Produce a version 0 (see comment above) text hash.
        byte[] salt;
        byte[] subkey;
        using (var deriveBytes = new Rfc2898DeriveBytes(password, SaltSize, PBKDF2IterCount))
        {
            salt = deriveBytes.Salt;
            subkey = deriveBytes.GetBytes(PBKDF2SubkeyLength);
        }

        var outputBytes = new byte[1 + SaltSize + PBKDF2SubkeyLength];
        Buffer.BlockCopy(salt, 0, outputBytes, 1, SaltSize);
        Buffer.BlockCopy(subkey, 0, outputBytes, 1 + SaltSize, PBKDF2SubkeyLength);
        return Convert.ToBase64String(outputBytes);
    }

    private static bool VerifyPasswordHash(string hashedPassword, string password)
    {
        if (hashedPassword == null)
        {
            return false;
        }
        if (password == null)
        {
            throw new ArgumentNullException("password");
        }

        var hashedPasswordBytes = Convert.FromBase64String(hashedPassword);

        // Verify a version 0 (see comment above) text hash.

        if (hashedPasswordBytes.Length != (1 + SaltSize + PBKDF2SubkeyLength) || hashedPasswordBytes[0] != 0x00)
        {
            // Wrong length or version header.
            return false;
        }

        var salt = new byte[SaltSize];
        Buffer.BlockCopy(hashedPasswordBytes, 1, salt, 0, SaltSize);
        var storedSubkey = new byte[PBKDF2SubkeyLength];
        Buffer.BlockCopy(hashedPasswordBytes, 1 + SaltSize, storedSubkey, 0, PBKDF2SubkeyLength);

        byte[] generatedSubkey;
        using (var deriveBytes = new Rfc2898DeriveBytes(password, salt, PBKDF2IterCount))
        {
            generatedSubkey = deriveBytes.GetBytes(PBKDF2SubkeyLength);
        }
        return ByteArraysEqual(storedSubkey, generatedSubkey);
    }
    private static bool ByteArraysEqual(byte[] a, byte[] b)
    {
        if (ReferenceEquals(a, b))
        {
            return true;
        }

        if (a == null || b == null || a.Length != b.Length)
        {
            return false;
        }

        var areSame = true;
        for (var i = 0; i < a.Length; i++)
        {
            areSame &= (a[i] == b[i]);
        }
        return areSame;
    }
    public async Task<Users> GetSingleUser(string userId)
    {
        return await _UserRepo.GetByIdAsync(userId) ?? new Users();
    }
    public Group GetUserGroups(string userId)
    {
      
        return  _context.Groups.FromSqlInterpolated($"EXEC GetUserGroups {userId}").ToList().FirstOrDefault()!;

    }

    public async Task<Users> getUserByEmail(string email)
    {
        return await _UserRepo.FindAsync(u => u.Email == email) ?? new Users();
    }

    public async Task<bool> ValidateUser(string email, string password, string token)
    {
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(token))
            return false!;

        var users = await _UserRepo.FilterAsync(x => x.UserName.Trim().ToLower() == email.Trim().ToLower() && x.AuthCode!.ToLower().Trim() == token.Trim().ToLower());

        var user = users.FirstOrDefault();
        // check if email exists
        if (user == null)
            return false!;

        // check if password is correct
        if (!VerifyPasswordHash(user.PasswordHash, password))
            return false!;

        user.IsAccountLocked = false;
        user.IsAcountValidated = true;

        await _UserRepo.UpdateAsync(user);
        // validation successful
        return true;
    }

    public async Task AddUserToGroupAsync(string userId, int groupId, int branchId)
    {
        await _UserGroupRepo.InsertAsync(new UserGroup { UserId = userId, GroupId = groupId,BranchId = branchId }, true);
    }

    public async Task UpdateProfileVisit(string userid, int? lastVisitedSubMenuId,int? lastVisitedMenuId, string? lastVisitedMenuUrl)
    {
        var user = await _UserRepo.FindAsync(userid);
        if (user != null)
        {
            user.LastVisitedMenuUrl = lastVisitedMenuUrl;
            user.LastVisitedSubMenuId = lastVisitedSubMenuId;
            user.LastVisitedMenuId = lastVisitedMenuId;
            await _UserRepo.UpdateAsync(user);
        }
    }

    public async Task UpdateProfileImageAsync(Users userParam)
    {
        var user = await _UserRepo.FindAsync(userParam.Id);

        if (user == null)
            throw new Exception("User not found");

        await _UserRepo.UpdateAsync(user);

    }

    public async Task DeleteAsync(string id)
    {
        var user = await _UserRepo.FindAsync(id);
        if (user != null)
        {
            await _UserRepo.DeleteAsync(user);

        }
    }

    public async Task<Users> UpdateBasicUserAsync(Users userParam, string? userId)
    {
     
        await _UserRepo.UpdateAsync(userParam);

        return await _UserRepo.FindAsync(userId!) ?? new Users();

    }

    public async Task<Tuple<bool, Users>> GetUserByUserNameAsync(string email)
    {

        var user = await _UserRepo.FindAsync(u => u.UserName.ToLower().Trim() == email.ToLower().Trim());
        bool userExist = user != null;
        if (userExist)
        {

            return new Tuple<bool, Users>(userExist, user!);
        }
        else
        {
            return new Tuple<bool, Users>(userExist, null!);
        }

    }

    public async Task<Users> ResetPassword(Users data)
    {
        data.PasswordHash = CreatePasswordHash("12345");
        await _UserRepo.UpdateAsync(data);
        return await _UserRepo.FindAsync(data.Id) ?? new Users();
    }

    public async Task<bool> ChangePasswordAsync(string userId, string oldPassword, string newPassword, Users user)
    {
        // check if password is correct
        if (!VerifyPasswordHash(user.PasswordHash, oldPassword))
            return false!;

        user.PasswordHash = CreatePasswordHash(newPassword);
        await _UserRepo.UpdateAsync(user);
        return true;
    }

    public async Task<bool> sendFeedback(Feedback data)
    {
        await _feedbackRepo.AddAsync(data);
        return true;
    }

    public async Task<List<Group>> GetGroupsAsync()
    {

        return await _groupRepo.GetAllAsync(); ;
    }
    public List<UserView> GetUsersView()
    {
        var c = _context.UserView.ToList();
        return c;
    }
    public async Task<List<Users>?> GetUserBySearchCriteriaAsync(string searchTerm, UserSearchCategory searchCategory)
    {
        var users = new List<Users>();
        switch (searchCategory)
        {
            case UserSearchCategory.FullName:
                users = await _UserRepo.FilterAsync(x => x.LastName!.ToLower().Trim().Contains(searchTerm.ToLower().Trim()) || x.LastName!.ToLower().Trim().Contains(searchTerm.Trim().ToLower()));
                return users.ToList();

            case UserSearchCategory.PhoneNumber:
                users = await _UserRepo.FilterAsync(x => x.PhoneNumber.Trim().ToLower().Contains(searchTerm.ToLower().Trim()));
                return users.ToList();

            case UserSearchCategory.Email:
                users = await _UserRepo.FilterAsync(x => x.Email.Trim().ToLower().Contains(searchTerm.ToLower().Trim()));
                return users.ToList();

            default:
                break;
        }
        return null;
    }

    public List<Group> GeAllGroup()
    {
        var groups = _context.Groups.FromSqlInterpolated($"EXEC GetAllGroup").ToList();
        return groups;
    }
    public async Task InsertRolesAsync(List<Permission> roles)
    {
        try
        {
            await _permRepo.BulkInsertAsync(roles);

        }
        catch (Exception ex)
        {

            throw ex;
        }

    }

    public List<PermissionView> GetGroupPermissions(int groupId)
    {

        var permissions = _context.PermissionView.Where(x => x.GroupId == groupId).ToList();


        return permissions;
    }

    public List<UserView> GetUsersInRole(int groupId)
    {
        var users = _context.UserView.FromSqlInterpolated($"EXEC GetUsersInGroup {groupId}").ToList();
        return users;
    }

    public List<UserView> GetUsersInAGroup(int groupId)
    {
        var users = _context.UserView.FromSqlInterpolated($"EXEC GetUsersInAGroup {groupId}").ToList();
        return users;
    }
    public async Task RemoveUserFromRoleAsync(UserGroup userGroup)
    {
        var userGroupData = await _UserGroupRepo.FindAsync(x => x.UserId == userGroup.UserId && x.GroupId == userGroup.GroupId);
        if(userGroupData != null)
            await _UserGroupRepo.DeleteAsync(userGroupData);
    }
    public async Task UpdateUserRoleAsync(string userId, int roleType)
    {
        var userGroupData = await _UserGroupRepo.FindAsync(x => x.UserId == userId);
        if (userGroupData != null)
        {
            userGroupData!.GroupId = roleType;

            await _UserGroupRepo.UpdateAsync(userGroupData);
        }
    }

    public List<PermissionView> GetUserPermissions(string userId)
    {
        var permissions = _context.PermissionView.FromSqlInterpolated($"EXEC GetUserPermissions {userId}").ToList();
        return permissions;
    }

    public async Task<UserView> RegisterMemberFromSystem(Users users)
    {
        try
        {
            var res = await _UserRepo.AddAsync(users);

            var ranks = await modelService.GetAllRank();
            var currentRank = ranks.ToList().Find(x => x.RankId == res.RankId);
            var nextRank = ranks.Find(x => x.RankOrder == currentRank!.RankOrder + 1);

            var ordination = new Ordination();

            ordination.RankId = res.RankId;
            ordination.BranchId = res.BranchId;
            ordination.NextRankId = nextRank!.RankId;
            ordination.UsersId = res.Id;
            ordination.Year = res.OrdinationYear;

            await _ordinationRepo.AddAsync(ordination);
            await _UserGroupRepo.AddAsync(new UserGroup { GroupId=2,UserId=res.Id, BranchId= res.BranchId });
            var ress = _context.UserView.Where(x => x.Id == res.Id);
            return ress.ToList().FirstOrDefault()!;
        }
        catch (Exception)
        {

            throw;
        }
    }

    public List<UserView> SearchMember(string searchString)
    {

        var res = _context.UserView.FromSqlInterpolated($"EXEC MemberSearch {searchString}").ToList();
        return res;
    }

    public async Task UploadOrdinations(List<Ordination> ordinations)
    {
        try
        {
            await _ordinationRepo.BulkInsertAsync(ordinations);
        }
        catch (Exception)
        {

            throw;
        }
    }

    public async Task<List<Ordination>> OrdinationDataBlender(List<UploadedData> uploadeds, List<Users> users)
    {
        try
        {
            var ranks = await modelService.GetAllRank();

            var ordination = new List<Ordination>();
            var blender = new List<OrdinationBlander>();

            //Get RANK and YEAR
            foreach (var item in uploadeds)
            {
                var rankList = new List<string?>();
                var yearList = new List<int?>();

                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank1) ? item.Rank1 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank2) ? item.Rank2 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank3) ? item.Rank3 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank4) ? item.Rank4 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank5) ? item.Rank5 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank6) ? item.Rank6 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank7) ? item.Rank7 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank8) ? item.Rank8 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank9) ? item.Rank9 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank10) ? item.Rank10 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank11) ? item.Rank11 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank12) ? item.Rank12 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank13) ? item.Rank13 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank14) ? item.Rank14 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank15) ? item.Rank15 : null);
                rankList.Add(!string.IsNullOrWhiteSpace(item.Rank16) ? item.Rank16 : null);
                
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year1) ? int.Parse(item.Year1) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year2) ? int.Parse(item.Year2) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year3) ? int.Parse(item.Year3) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year4) ? int.Parse(item.Year4) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year5) ? int.Parse(item.Year5) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year6) ? int.Parse(item.Year6) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year7) ? int.Parse(item.Year7) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year8) ? int.Parse(item.Year8) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year9) ? int.Parse(item.Year9) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year10) ? int.Parse(item.Year10) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year11) ? int.Parse(item.Year11) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year12) ? int.Parse(item.Year12) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year13) ? int.Parse(item.Year13) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year14) ? int.Parse(item.Year14) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year15) ? int.Parse(item.Year15) : null);
                yearList.Add(!string.IsNullOrWhiteSpace(item.Year16) ? int.Parse(item.Year16) : null);

                blender.Add(new OrdinationBlander
                {
                    Ranks = rankList,
                    Year = yearList,
                    Gender = item.Gender,
                    LastName = item.LastName,
                    OtherName = item.OtherName
                });
            }

            var subBlender = new List<OrdinationSubBlander>();
            var maleRank = ranks.Where(x => x.RankGender != "F").ToList();
            var femaleRank = ranks.Where(x => x.RankGender != "M").ToList();
            if (blender.Count > 0)
            {
                blender.ForEach(b =>
                {
                    for (int i = 0; i < b.Ranks!.Count; i++)
                    {
                        if (b.Gender!.Trim().ToLower() == "male".Trim().ToLower())
                        {
                            var rk = maleRank.Find(r => r.RankName!.Trim().ToLower() == (b.Ranks[i] != null? b.Ranks[i]!.Trim().ToLower():null));
                            var nextRk = rk != null ? rk.RankOrder < 16 ? maleRank.Find(r => r.RankOrder == rk.RankOrder + 1) : null : null;

                            subBlender.Add(new OrdinationSubBlander
                            {
                                LastName = b.LastName,
                                OtherName = b.OtherName,
                                RankId = rk == null ? 38 : rk.RankId,
                                Year = b.Year![i] == null?0: b.Year![i],
                                NextRankId = nextRk == null ? 38 : nextRk.RankId,
                            });
                        }
                        else
                        {
                            var rkF = femaleRank.Find(r => r.RankName!.Trim().ToLower() == (b.Ranks[i] != null ? b.Ranks[i]!.Trim().ToLower() : null));
                            var nextRkF = rkF != null ? rkF.RankOrder < 12 ? femaleRank.Find(r => r.RankOrder == rkF.RankOrder + 1) : null : null;

                            subBlender.Add(new OrdinationSubBlander
                            {
                                LastName = b.LastName,
                                OtherName = b.OtherName,
                                RankId = rkF == null ? 38 : rkF.RankId,
                                Year = b.Year![i] == null ? 0 : b.Year![i],
                                NextRankId = nextRkF == null ? 38 : nextRkF.RankId,
                            });
                        }


                    }
                });
            }

            if (subBlender.Count > 0)
            {
                foreach (var item in subBlender)
                {
                    var fullName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase($"{item.LastName} {item.OtherName}");
                    var selectedUser = users.Find(x => x.FullName!.Trim().ToLower() == fullName.Trim().ToLower());
                    if (selectedUser != null)
                    {
                        ordination.Add(new Ordination
                        {
                            UsersId = selectedUser.Id,
                            BranchId = selectedUser.BranchId,
                            RankId = item.RankId,
                            Year = item.Year,
                            NextRankId = item.NextRankId
                        });

                    }
                }
            }

           // var finalOrdinationBlend = ordination.Where(x => x.RankId != null && x.Year != null && x.RankId != 0 && x.Year != 0).ToList();

            return ordination;


        }
        catch (Exception e)
        {

            throw;
        }
    }

}
