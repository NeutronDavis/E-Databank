import { client } from "../../../Infrastructure/agent";
import { EDBRequestResponse } from "../../../shared/EDBRequestResponse";

import { IBand, IBranch, ICathedral, ICmc, IDistrict, INationality, IOrdination, IPrincipalBand, IPriority, IProductForm, IProfession, IProvince, IQualification, IRank } from "../types/interface";

export const platformService={

    AddBandAsync: (band:IBand):Promise<EDBRequestResponse> =>
	client.post("/Model/AddBand",{band}),
	
    getAllBand: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllBand"),
	
    getBandById: (bandId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetBandById",{bandId}),
	
    updateBand:(band:IBand):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdateBand",{band}),

    removeBand:(bandId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemoveBand",{bandId}),


    AddBranchAsync: (branch:IBranch):Promise<EDBRequestResponse> =>
	client.post("/Model/AddBranch",{branch}),

    getAllBranch: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllBranch"),
	
    GetBranchById: (branchId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetBranchById",{branchId}),
	
    UpdateBranch:(branch:IBranch):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdateBranch",{branch}),

    removeBranch:(branchId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemoveBranch",{branchId}),
    

    AddCathedralAsync: (cathedral:ICathedral):Promise<EDBRequestResponse> =>
	client.post("/Model/AddCathedral",{cathedral}),

    getAllCathedral: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllCathedral"),
	
    GetCathedralById: (cathedralId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetCathedralById",{cathedralId}),
	
    updateCathedral:(cathedral:ICathedral):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdateCathedral",{cathedral}),

    removeCathedral:(cathedralId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemoveCathedral",{cathedralId}),


    AddCmcAsync: (cmc:ICmc):Promise<EDBRequestResponse> =>
	client.post("/Model/AddCmc",{cmc}),

    getAllCmc: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllCmc"),
	
    getCmcById: (cmcId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetCmcById",{cmcId}),
	
    updateCmc:(cmc:ICmc):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdateCmc",{cmc}),

    removeCmc:(cmcId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemoveCmc",{cmcId}),



    AddDistrictAsync: (district:IDistrict):Promise<EDBRequestResponse> =>
	client.post("/Model/AddDistrict",{district}),

    getAllDistrict: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllDistrict"),
	
    getDistrictById: (districtId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetDistrictById",{districtId}),
	
    UpdateDistrict:(district:IDistrict):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdateDistrict",{district}),

    removeDistrict:(districtId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemoveDistrict",{districtId}),


    AddOrdinationAsync: (ordination:IOrdination):Promise<EDBRequestResponse> =>
	client.post("/Model/AddOrdination",{ordination}),

    getAllOrdination: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllOrdination"),
	
    GetOrdinationById: (ordinationId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetOrdinationById",{ordinationId}),
	
    updateOrdination:(ordination:IOrdination):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdateOrdination",{ordination}),

    removeOrdination:(ordinationId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemoveOrdination",{ordinationId}),


    AddPrincipalBandAsync: (principalBand:IPrincipalBand):Promise<EDBRequestResponse> =>
	client.post("/Model/AddPrincipalBand",{principalBand}),

    getAllPrincipalBand: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllPrincipalBand"),
	
    getPrincipalBandById: (principalBandId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetPrincipalBandById",{principalBandId}),
	
    updatePrincipalBand:(principalBand:IPrincipalBand):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdatePrincipalBand",{principalBand}),

    removePrincipalBand:(principalBandId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemovePrincipalBand",{principalBandId}),


    AddPriorityAsync: (priority:IPriority):Promise<EDBRequestResponse> =>
	client.post("/Model/AddPriority",{priority}),

    getAllPriority: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllPriority"),
	
    getPriorityById: (priorityId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetPriorityById",{priorityId}),
	
    updatePriority:(priority:IPriority):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdatePriority",{priority}),

    removePriority:(priorityId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemovePriority",{priorityId}),


    AddProfessionAsync: (profession:IProfession):Promise<EDBRequestResponse> =>
	client.post("/Model/AddProfession",{profession}),

    getAllProfession: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllProfession"),
	
    getProfessionById: (professionId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetProfessionById",{professionId}),
	
    updateProfession:(profession:IProfession):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdateProfession",{profession}),

    removeProfession:(professionId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemoveProfession",{professionId}),


    addNewNationality:(nationality:INationality):Promise<EDBRequestResponse>  =>
	client.post("/Model/AddNationality",{nationality}),
    
    getAllNationality: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllNationality"),
	
    getNationalityById: (nationalityId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetNationalityById",{nationalityId}),
	
    updateNationality:(nationality:INationality):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdateNationality",{nationality}),

    removeNationality:(nationalityId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemoveNationality",{nationalityId}),


    AddProvinceAsync: (province:IProvince):Promise<EDBRequestResponse> =>
	client.post("/Model/AddProvince",{province}),

    getAllProvince: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllProvince"),
	
    getProvinceById: (provinceId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetProvinceById",{provinceId}),
	
    updateProvince:(province:IProvince):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdateProvince",{province}),

    removeProvince:(provinceId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemoveProvince",{provinceId}),


    AddQualificationAsync: (qualification:IQualification):Promise<EDBRequestResponse> =>
	client.post("/Model/AddQualification",{qualification}),

    getAllQualification: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllQualification"),
	
    getQualificationById: (qualificationId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetQualificationById",{qualificationId}),
	
    updateQualification:(qualification:IQualification):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdateQualification",{qualification}),

    removeQualification:(qualificationId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemoveQualification",{qualificationId}),


    AddRankAsync: (rank:IRank):Promise<EDBRequestResponse> =>
	client.post("/Model/AddRank",{rank}),

    getAllRank: ():Promise<EDBRequestResponse> =>
	client.get("/Model/GetAllRank"),
	
    getRankById: (rankId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/GetRankById",{rankId}),
	
    updateRank:(rank:IRank):Promise<EDBRequestResponse> =>
	client.post("/Model/UpdateRank",{rank}),
    
    removeRank:(rankId:number):Promise<EDBRequestResponse> =>
	client.post("/Model/RemoveRank",{rankId}),
}