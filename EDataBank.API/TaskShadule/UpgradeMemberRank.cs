using EDataBank.Application;
using EDataBank.Application.Extensions;
using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Account;
using EDataBank.Core.Entity.Model;
using Hangfire;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace EDataBank.API.TaskShadule
{
    public class UpgradeMemberRank
    {

        private readonly IModelService _modelService;
        private readonly IRepository<Users> _UserRepo;
        private readonly IRepository<Ordination> _ordinationRepo;
        public UpgradeMemberRank(IModelService modelService, IRepository<Users> UserRepo, IRepository<Ordination> ordinationRepo)
        {
            _modelService = modelService;
            _UserRepo = UserRepo;
            _ordinationRepo = ordinationRepo;
        }

        public void ChangeMemberCrentRankEvery12month()
        {

            BackgroundJob.Enqueue(
                () => RankChangingProcess());
        }

        public async Task RankChangingProcess()
        {
            var ranks = await _modelService.GetAllRank();
            var newOrdinations = new List<Ordination>();

            await ranks.ForEachAsync(async r =>
            {
                var users = await _UserRepo.FilterAsync(x => x.RankId == r.RankId);

                foreach (var user in users)
                {
                    var currentOrdination = await _ordinationRepo.FindAsync(o => o.RankId == user.RankId && o.UsersId == user.Id);

                    if (currentOrdination != null && currentOrdination.Year.HasValue)
                    {
                        int currentYear = DateTime.Now.Year;
                        int yearDiff = currentYear - currentOrdination.Year.Value;

                        if (yearDiff >= r.EndYearCount && (r.RankOrder < 16 || r.RankOrder < 12))
                        {
                            var nextRank = ranks.FindAll(a=>a.RankGender != (user.Gender?.ToLower() == "male"?"F":"M")).Find(rr => rr.RankOrder == r.RankOrder + 1);

                            newOrdinations.Add(new Ordination
                            {
                                RankId = currentOrdination.NextRankId,
                                Year = currentYear,
                                NextRankId = nextRank?.RankId,
                                BranchId = user.BranchId,
                                UsersId = user.Id
                            });

                            user.RankId = currentOrdination.NextRankId;
                        }
                    }
                }
                await _UserRepo.SaveChangesAsync();
            });
            await _ordinationRepo.BulkInsertAsync(newOrdinations);
        }
    }
}
