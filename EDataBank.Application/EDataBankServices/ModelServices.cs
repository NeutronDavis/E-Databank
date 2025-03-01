using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Model;
using EDataBank.Core.Views;
using EDataBank.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.EDataBankServices
{
    public class ModelServices: IModelService
    {
        private readonly IRepository<Band> _bandRepo;
        private readonly IRepository<Branch> _branchRepo;
        private readonly IRepository<Cathedral> _cathedralRepo;
        private readonly IRepository<Cmc> _cmcRepo;
        private readonly IRepository<District> _districtRepo;
        private readonly IRepository<Ordination> _ordinationRepo;
        private readonly IRepository<PrincipalBand> _principalBandRepo;
        private readonly IRepository<Priority> _priorityRepo;
        private readonly IRepository<Profession> _professionRepo;
        private readonly IRepository<Province> _provinceRepo;
        private readonly IRepository<Qualification> _qualificationRepo;
        private readonly IRepository<Rank> _rankRepo;
        private readonly IRepository<Nationality> _nationalityRepo;
        private EDataBankDbContext _context;
        public ModelServices(IRepository<Band> bandRepo, IRepository<Branch> branchRepo, IRepository<Cathedral> cathedralRepo, IRepository<Cmc> cmcRepo, IRepository<District> districtRepo, IRepository<Ordination> ordinationRepo, IRepository<PrincipalBand> principalBandRepo, IRepository<Priority> priorityRepo, IRepository<Profession> professionRepo, IRepository<Province> provinceRepo, IRepository<Qualification> qualificationRepo, IRepository<Rank> rankRepo, IRepository<Nationality> nationalityRepo, EDataBankDbContext context)
        {
            _bandRepo = bandRepo;
            _branchRepo = branchRepo;
            _cathedralRepo = cathedralRepo;
            _cmcRepo = cmcRepo;
            _districtRepo = districtRepo;
            _ordinationRepo = ordinationRepo;
            _principalBandRepo = principalBandRepo;
            _priorityRepo = priorityRepo;
            _professionRepo = professionRepo;
            _provinceRepo = provinceRepo;
            _qualificationRepo = qualificationRepo;
            _rankRepo = rankRepo;
            _nationalityRepo = nationalityRepo;
            _context = context;
        }

        //Band
        public async Task<Band> AddBandAsync(Band band)
        {
            try
            {
                var newBand = await _bandRepo.AddAsync(band);
                return newBand;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<Band> GetBandById(int bandId)
        {
            try
            {
                return await _bandRepo.GetbyIdAsync(bandId) ?? new Band();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<List<Band>> GetAllBandAsync()
        {
            try
            {
                return await _bandRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Band> UpdateBandAsync(Band band)
        {
            try
            {
                await _bandRepo.UpdateAsync(band);
                return await this.GetBandById(band.BandId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task RemoveBand(Band band)
        {
            try
            {
                await _bandRepo.DeleteAsync(band);
            }
            catch (Exception)
            {

                throw;
            }
        }


        //Branch
        public async Task<Branch> AddBranchAsync(Branch branch)
        {
            try
            {
                branch?.BranchName?.ToUpper();
                var newBranch = await _branchRepo.AddAsync(branch!);
                return newBranch;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<Branch> GetBranchById(int branchId)
        {
            try
            {
                return await _branchRepo.GetbyIdAsync(branchId) ?? new Branch();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public BranchView GetBranchView(int branchId)
        {
            try
            {
                var res =   _context.BranchViews.Where(x => x.BranchId == branchId).ToList().FirstOrDefault();
                if (res != null && res.ElderInChargeRank == "NULL")
                {
                    res.ElderInChargeRank = null;
                }

                if (res != null && res.SecretaryRank == "NULL")
                {
                    res.SecretaryRank = null;
                }

                if (res != null && res.FinancialSecretaryRank == "NULL")
                {
                    res.FinancialSecretaryRank = null;
                }
                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }


       public List<BranchView> GetBranchesByProvinceId(int provinceId)
        {
            var res = _context.BranchViews.Where(x => x.ProvinceId == provinceId).ToList();
            return res;
        }
        public async Task<List<Branch>> GetAllBranch()
        {
            try
            {
                return await _branchRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Branch> UpdateBranchAsync(Branch branch)
        {
            try
            {
                branch?.BranchName?.ToUpper();
                await _branchRepo.UpdateAsync(branch!);
                return await this.GetBranchById(branch!.BranchId);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task RemoveBranch(Branch branch)
        {
            try
            {
                await _branchRepo.DeleteAsync(branch);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //Cathedral
        public async Task<Cathedral> AddCathedralAsync(Cathedral cathedral)
        {
            try
            {
                cathedral?.CathedralName?.ToUpper();
                var newCathedral = await _cathedralRepo.AddAsync(cathedral!);
                return newCathedral;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<Cathedral> GetCathedralById(int cathedralId)
        {
            try
            {
                return await _cathedralRepo.GetbyIdAsync(cathedralId) ?? new Cathedral();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<Cathedral>> GetAllCathedral()
        {
            try
            {
                return await _cathedralRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Cathedral> UpdateCathedralAsync(Cathedral cathedral)
        {
            try
            {
                cathedral?.CathedralName?.ToUpper();
                await _cathedralRepo.UpdateAsync(cathedral!);
                return await this.GetCathedralById(cathedral.CathedralId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task RemoveCathedral(Cathedral cathedral)
        {
            try
            {
                await _cathedralRepo.DeleteAsync(cathedral);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //Cmc
        public async Task<Cmc> AddCmcAsync(Cmc cmc)
        {
            try
            {
                var newCmc = await _cmcRepo.AddAsync(cmc);
                return newCmc;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Cmc> GetCmcById(int cmcId)
        {
            try
            {
                return await _cmcRepo.GetbyIdAsync(cmcId) ?? new Cmc();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<Cmc>> GetAllCmc()
        {
            try
            {
                return await _cmcRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Cmc> UpdateCmcAsync(Cmc cmc)
        {
            try
            {
                await _cmcRepo.UpdateAsync(cmc);
                return await this.GetCmcById(cmc.CmcId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task RemoveCmc(Cmc cmc)
        {
            try
            {
                await _cmcRepo.DeleteAsync(cmc);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //District
        public async Task<District> AddDistrictAsync(District district)
        {
            try
            {
                district?.DistrictName?.ToUpper();
                var newDistrict = await _districtRepo.AddAsync(district!);
                return newDistrict;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<District> GetDistrictById(int districtId)
        {
            try
            {
                return await _districtRepo.GetbyIdAsync(districtId) ?? new District();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<District>> GetAllDistrict()
        {
            try
            {
                return await _districtRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<District> UpdateDistrictAsync(District district)
        {
            try
            {
                district?.DistrictName?.ToUpper();
                await _districtRepo.UpdateAsync(district!);
                return await this.GetDistrictById(district!.DistrictId);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task RemoveDistrict(District district)
        {
            try
            {
                await _districtRepo.DeleteAsync(district);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //Ordination
        public async Task<Ordination> AddOrdinationAsync(Ordination ordination)
        {
            try
            {
                var newOrdination = await _ordinationRepo.AddAsync(ordination);
                return newOrdination;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<Ordination> GetOrdinationById(int ordinationId)
        {
            try
            {
                return await _ordinationRepo.GetbyIdAsync(ordinationId) ?? new Ordination();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<Ordination>> GetAllOrdination()
        {
            try
            {
                return await _ordinationRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Ordination> UpdateOrdinationAsync(Ordination ordination)
        {
            try
            {
                await _ordinationRepo.UpdateAsync(ordination);
                return await this.GetOrdinationById(ordination.OrdinationId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task RemoveOrdination(Ordination ordination)
        {
            try
            {
                await _ordinationRepo.DeleteAsync(ordination);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //PrincipalBand
        public async Task<PrincipalBand> AddPrincipalBandAsync(PrincipalBand principalBand)
        {
            try
            {
                var newPrincipalBand = await _principalBandRepo.AddAsync(principalBand);
                return newPrincipalBand;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<PrincipalBand> GetPrincipalBandById(int principalBandId)
        {
            try
            {
                return await _principalBandRepo.GetbyIdAsync(principalBandId) ?? new PrincipalBand();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<PrincipalBand>> GetAllPrincipalBand()
        {
            try
            {
                return await _principalBandRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<PrincipalBand> UpdatePrincipalBandAsync(PrincipalBand principalBand)
        {
            try
            {
                await _principalBandRepo.UpdateAsync(principalBand);
                return await this.GetPrincipalBandById(principalBand.PrincipalBandId);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task RemovePrincipalBand(PrincipalBand principalBand)
        {
            try
            {
                await _principalBandRepo.DeleteAsync(principalBand);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //Priority
        public async Task<Priority> AddPriorityAsync(Priority priority)
        {
            try
            {
                priority?.PriorityName?.ToUpper();
                var newPriority = await _priorityRepo.AddAsync(priority!);
                return newPriority;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<Priority> GetPriorityById(int priorityId)
        {
            try
            {
                return await _priorityRepo.GetbyIdAsync(priorityId) ?? new Priority();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<Priority>> GetAllPriority()
        {
            try
            {
                return await _priorityRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Priority> UpdatePriorityAsync(Priority priority)
        {
            try
            {
                priority?.PriorityName?.ToUpper();
                await _priorityRepo.UpdateAsync(priority);
                return await this.GetPriorityById(priority.PriorityId);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task RemovePriority(Priority priority)
        {
            try
            {
                await _priorityRepo.DeleteAsync(priority);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //Profession
        public async Task<Profession> AddProfessionAsync(Profession profession)
        {
            try
            {
                var newProfession = await _professionRepo.AddAsync(profession);
                return newProfession;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<Profession> GetProfessionById(int professionId)
        {
            try
            {
                return await _professionRepo.GetbyIdAsync(professionId) ?? new Profession();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<Profession>> GetAllProfession()
        {
            try
            {
                return await _professionRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Profession> UpdateProfessionAsync(Profession profession)
        {
            try
            {
                await _professionRepo.UpdateAsync(profession);
                return await this.GetProfessionById(profession.ProfessionId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task RemoveProfession(Profession profession)
        {
            try
            {
                await _professionRepo.DeleteAsync(profession);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //Province
        public async Task<Province> AddProvinceAsync(Province province)
        {
            try
            {
                province?.ProvinceName?.ToUpper();
                var newProvince = await _provinceRepo.AddAsync(province!);
                return newProvince;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<Province> GetProvinceById(int provinceId)
        {
            try
            {
                return await _provinceRepo.GetbyIdAsync(provinceId) ?? new Province();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<Province>> GetAllProvince()
        {
            try
            {
                return await _provinceRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Province> UpdateProvinceAsync(Province province)
        {
            try
            {
                province?.ProvinceName?.ToUpper();
                await _provinceRepo.UpdateAsync(province!);
                return await this.GetProvinceById(province!.ProvinceId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task RemoveProvince(Province province)
        {
            try
            {
                await _provinceRepo.DeleteAsync(province);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //Qualification
        public async Task<Qualification> AddQualificationAsync(Qualification qualification)
        {
            try
            {
                var newQualification = await _qualificationRepo.AddAsync(qualification);
                return newQualification;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<Qualification> GetQualificationById(int qualificationId)
        {
            try
            {
                return await _qualificationRepo.GetbyIdAsync(qualificationId) ?? new Qualification();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<Qualification>> GetAllQualification()
        {
            try
            {
                return await _qualificationRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Qualification> UpdateQualificationAsync(Qualification qualification)
        {
            try
            {
                await _qualificationRepo.UpdateAsync(qualification);
                return await this.GetQualificationById(qualification.QualificationId);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task RemoveQualification(Qualification qualification)
        {
            try
            {
                await _qualificationRepo.DeleteAsync(qualification);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //Rank
        public async Task<Rank> AddRankAsync(Rank rank)
        {
            try
            {
                var newRank = await _rankRepo.AddAsync(rank);
                return newRank;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<Rank> GetRankById(int rankId)
        {
            try
            {
                return await _rankRepo.GetbyIdAsync(rankId) ?? new Rank();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<Rank>> GetAllRank()
        {
            try
            {
                return await _rankRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Rank> UpdateRankAsync(Rank rank)
        {
            try
            {
                await _rankRepo.UpdateAsync(rank);
                return await this.GetRankById(rank.RankId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task RemoveRank(Rank rank)
        {
            try
            {
                await _rankRepo.DeleteAsync(rank);
            }
            catch (Exception)
            {

                throw;
            }
        }
        //Nationality
        public async Task<Nationality> AddNationalityAsync(Nationality nationality)
        {
            try
            {
                var newNationality = await _nationalityRepo.AddAsync(nationality);
                return newNationality;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<Nationality> GetNationalityById(int nationalityId)
        {
            try
            {
                return await _nationalityRepo.GetbyIdAsync(nationalityId) ?? new Nationality();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<Nationality>> GetAllNationality()
        {
            try
            {
                return await _nationalityRepo.GetAllAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Nationality> UpdateNationalityAsync(Nationality nationality)
        {
            try
            {
                await _nationalityRepo.UpdateAsync(nationality);
                return await this.GetNationalityById(nationality.NationalityId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task RemoveNationality(Nationality nationality)
        {
            try
            {
                await _nationalityRepo.DeleteAsync(nationality);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
