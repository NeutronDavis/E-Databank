import {  get, makeAutoObservable,ObservableMap, set} from "mobx"
import {platformService} from "../services/platformService";
import { IService, IProduct, IProductForm,IServiceForm,IPlatformStore, IBand, IBranch, ICathedral, ICmc, IDistrict, IOrdination, IPrincipalBand, IPriority, IQualification, IProvince, IRank, IProfession, INationality} from '../types/interface';
import adminStore from "./adminstore";
import { EDBRequestResponse } from "../../../shared/EDBRequestResponse";

class PlatformStore implements IPlatformStore {
    isLoading=false;
    isLoadingRank=false;
    isSaving=false;
    isUpdating=false;
    isRemoving=false;
    bands = new ObservableMap<number,IBand>()
    branchs = new ObservableMap<number,IBranch>()
    cathedrals = new ObservableMap<number,ICathedral>()
    cmcs = new ObservableMap<number,ICmc>()
    districts = new ObservableMap<number,IDistrict>()
    ordinations = new ObservableMap<number,IOrdination>()
    principalBands = new ObservableMap<number,IPrincipalBand>()
    prioritys = new ObservableMap<number,IPriority>()
    qualifications = new ObservableMap<number,IQualification>()
    provinces = new ObservableMap<number,IProvince>()
    ranks = new ObservableMap<number,IRank>()
    professions = new ObservableMap<number,IProfession>()
    nationalities = new ObservableMap<number,INationality>()

    band:IBand = {} as IBand;
    branch:IBranch = {} as IBranch
    cathedral:ICathedral = {} as ICathedral
    cmc:ICmc = {} as ICmc
    district:IDistrict = {} as IDistrict
    ordination:IOrdination = {} as IOrdination
    principalBand:IPrincipalBand = {} as IPrincipalBand
    priority:IPriority = {} as IPriority
    qualification:IQualification = {} as IQualification
    province:IProvince = {} as IProvince
    rank:IRank = {} as IRank
    profession:IProfession = {} as IProfession
    nationality:INationality = {} as INationality
    branchFilterString:string = ""


    constructor(){
        makeAutoObservable(this);
    }
    async addBand(newBand:IBand):Promise<void>{
        try {
            this.isLoading = true;
            let band = await platformService.AddBandAsync(newBand)
            let newB = band.data as IBand;
            this.bands.set(newB.bandId,newB);
         
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getAllBand():Promise<void>{
        try {
            if([...this.bands.values()].length < 1){
                this.isLoading = true;
                let band = await platformService.getAllBand()
                if (band.success) {
                    this.bands.clear();
                    band.data.forEach((b:IBand)=>{
                        this.bands.set(b.bandId,b);
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getBandByIdAsync(bandId:number):Promise<void>{
        try {
            let band = await platformService.getBandById(bandId)
            if (band.success) {
                this.band = band.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getBandById(bandId:number):void{
        try {
            if([...this.bands.values()].length > 0){
                let band = this.bands.get(bandId)
                
                if (band) {
                    this.band = band;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updateBand(band:IBand):Promise<void>{
        try {
            let res = await platformService.updateBand(band)
            if (res.success) {
                let data = res.data as IBand
                this.bands.set(data.bandId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async removeBand(bandId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removeBand(bandId)
            if (res.success) {
                let bd = [...this.bands.values()].filter((value: IBand, index: number, array: IBand[])=> value.bandId !== bandId)
                this.bands.clear();
                bd.forEach((value: IBand, index: number, array: IBand[])=>{
                    this.bands.set(value.bandId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    //

    async addBranch(newBranch:IBranch):Promise<void>{
        try {
            this.isLoading = true;
            let band = await platformService.AddBranchAsync(newBranch)
            let newBr = band.data as IBranch;
            this.branchs.set(newBr.branchId,newBr);
         
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getAllBranch():Promise<void>{
        try {
            if([...this.branchs.values()].length < 1){
                this.isLoading = true;
                let branch = await platformService.getAllBranch()
                if (branch.success) {
                    this.branchs.clear();
                    branch.data.forEach((b:IBranch)=>{
                        if(b.branchId !== 253){
                            this.branchs.set(b.branchId,b);
                        }
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getBranchByIdAsync(branchId:number):Promise<void>{
        try {
            let branch = await platformService.GetBranchById(branchId)
            if (branch.success) {
                this.branch = branch.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getBranchById(branchId:number):void{
        try {
            if([...this.branchs.values()].length > 0){
                let branch = this.branchs.get(branchId)
                
                if (branch) {
                    this.branch = branch;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updateBranch(branch:IBranch):Promise<void>{
        try {
            let res = await platformService.UpdateBranch(branch)
            if (res.success) {
                let data = res.data as IBranch
                this.branchs.set(data.branchId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }

    
    async removeBranch(branchId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removeBranch(branchId)
            if (res.success) {
                let bd = [...this.branchs.values()].filter((value: IBranch, index: number, array: IBranch[])=> value.branchId !== branchId)
                this.branchs.clear();
                bd.forEach((value: IBranch, index: number, array: IBranch[])=>{
                    this.branchs.set(value.branchId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    //

    async addCathedral(newCathedral:ICathedral):Promise<void>{
        try {
            this.isLoading = true;
            let cathedral = await platformService.AddCathedralAsync(newCathedral)
            let newC = cathedral.data as ICathedral;
            this.cathedrals.set(newC.cathedralId,newC);
         
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }

    async getAllCathedral():Promise<void>{
        try {
            if([...this.cathedrals.values()].length < 1){
                this.isLoading = true;
                let cathedral = await platformService.getAllCathedral()
                if (cathedral.success) {
                    this.cathedrals.clear();
                    cathedral.data.forEach((b:ICathedral)=>{
                        this.cathedrals.set(b.cathedralId,b);
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getCathedralByIdAsync(cathedralId:number):Promise<void>{
        try {
            let cathedral = await platformService.GetCathedralById(cathedralId)
            if (cathedral.success) {
                this.cathedrals = cathedral.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getCathedralId(CathedralId:number):void{
        try {
            if([...this.cathedrals.values()].length > 0){
                let cathedral = this.cathedrals.get(CathedralId)
                
                if (cathedral) {
                    this.cathedral = cathedral;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updateCathedral(cathedral:ICathedral):Promise<void>{
        try {
            this.isLoading =  true;
            let res = await platformService.updateCathedral(cathedral)
            if (res.success) {
                let data = res.data as ICathedral
                this.cathedrals.set(data.cathedralId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async removeCathedral(cathedralId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removeCathedral(cathedralId)
            if (res.success) {
                let bd = [...this.cathedrals.values()].filter((value: ICathedral, index: number, array: ICathedral[])=> value.cathedralId !== cathedralId)
                this.cathedrals.clear();
                bd.forEach((value: ICathedral, index: number, array: ICathedral[])=>{
                    this.cathedrals.set(value.cathedralId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    //
    async addCmc(newCmc:ICmc):Promise<void>{
        try {
            this.isLoading = true;
            let cmc = await platformService.AddCmcAsync(newCmc)
            let newCm = cmc.data as ICmc;
            this.cmcs.set(newCm.cmcId,newCm);
         
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getAllCmc():Promise<void>{
        try {
            if([...this.cmcs.values()].length < 1){
                this.isLoading = true;
                let cmc = await platformService.getAllCmc()
                if (cmc.success) {
                    this.cmcs.clear();
                    cmc.data.forEach((c:ICmc)=>{
                        if(c.cmcId !== 13){
                            this.cmcs.set(c.cmcId,c);
                        }
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getCmcByIdAsync(cmcId:number):Promise<void>{
        try {
            let cmc = await platformService.getCmcById(cmcId)
            if (cmc.success) {
                this.cmc = cmc.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getCmcId(cmcId:number):void{
        try {
            if([...this.cathedrals.values()].length > 0){
                let cmc = this.cmcs.get(cmcId)            
                if (cmc) {
                    this.cmc = cmc;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updateCmc(cmc:ICmc):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.updateCmc(cmc)
            if (res.success) {
                let data = res.data as ICmc
                this.cmcs.set(data.cmcId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }

    
    async removeCmc(cmcId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removeCmc(cmcId)
            if (res.success) {
                let bd = [...this.cmcs.values()].filter((value: ICmc, index: number, array: ICmc[])=> value.cmcId !== cmcId)
                this.cmcs.clear();
                bd.forEach((value: ICmc, index: number, array: ICmc[])=>{
                    this.cmcs.set(value.cmcId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
//

    async addDistrict(newDistrict:IDistrict):Promise<void>{
        try {
            this.isLoading = true;
            let district = await platformService.AddDistrictAsync(newDistrict)
            let newD = district.data as IDistrict;
            this.districts.set(newD.districtId,newD);
        
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getAllDistrict():Promise<void>{
        try {
            if([...this.districts.values()].length < 1){
                this.isLoading = true;
                let district = await platformService.getAllDistrict()
                if (district.success) {
                    this.districts.clear();
                    district.data.forEach((d:IDistrict)=>{
                        if(d.districtId !== 115){
                            this.districts.set(d.districtId,d);
                        }
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getDistrictByIdAsync(districtId:number):Promise<void>{
        try {
            let district = await platformService.getDistrictById(districtId)
            if (district.success) {
                this.district = district.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getDistrictId(districtId:number):void{
        try {
            if([...this.districts.values()].length > 0){
                let district = this.districts.get(districtId)            
                if (district) {
                    this.district = district;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updateDistrict(district:IDistrict):Promise<void>{
        try {
            let res = await platformService.UpdateDistrict(district)
            if (res.success) {
                let data = res.data as IDistrict
                this.districts.set(data.districtId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }

    async removeDistrict(districtId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removeDistrict(districtId)
            if (res.success) {
                let bd = [...this.districts.values()].filter((value: IDistrict, index: number, array: IDistrict[])=> value.districtId !== districtId)
                this.districts.clear();
                bd.forEach((value: IDistrict, index: number, array: IDistrict[])=>{
                    this.districts.set(value.districtId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    //
    async addOrdination(newOrdination:IOrdination):Promise<void>{
        try {
            this.isLoading = true;
            let ordination = await platformService.AddOrdinationAsync(newOrdination)
            let newOR = ordination.data as IOrdination;
            this.ordinations.set(newOR.ordinationId,newOR);
        
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getAllOrdination():Promise<void>{
        try {
            if([...this.ordinations.values()].length < 1){
                this.isLoading = true;
                let ordination = await platformService.getAllOrdination()
                if (ordination.success) {
                    this.ordinations.clear();
                    ordination.data.forEach((o:IOrdination)=>{
                        this.ordinations.set(o.ordinationId,o);
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getOrdinationByIdAsync(ordinationId:number):Promise<void>{
        try {
            let ordination = await platformService.GetOrdinationById(ordinationId)
            if (ordination.success) {
                this.ordination = ordination.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getOrdinationId(ordinationId:number):void{
        try {
            if([...this.ordinations.values()].length > 0){
                let ordination = this.ordinations.get(ordinationId)            
                if (ordination) {
                    this.ordination = ordination;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updateOrdination(ordination:IOrdination):Promise<void>{
        try {
            let res = await platformService.updateOrdination(ordination)
            if (res.success) {
                let data = res.data as IOrdination
                this.ordinations.set(data.ordinationId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }

    async removeOrdination(ordinationId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removeOrdination(ordinationId)
            if (res.success) {
                let bd = [...this.ordinations.values()].filter((value: IOrdination, index: number, array: IOrdination[])=> value.ordinationId !== ordinationId)
                this.ordinations.clear();
                bd.forEach((value: IOrdination, index: number, array: IOrdination[])=>{
                    this.ordinations.set(value.ordinationId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    //

    
    async addPrincipalBand(newPrincipalBand:IPrincipalBand):Promise<void>{
        try {
            this.isLoading = true;
            let principalBand = await platformService.AddPrincipalBandAsync(newPrincipalBand)
            let newPB = principalBand.data as IPrincipalBand;
            this.principalBands.set(newPB.principalBandId,newPB);
        
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getAllPrincipalBand():Promise<void>{
        try {
            if([...this.principalBands.values()].length < 1){
                this.isLoading = true;
                let principalBand = await platformService.getAllPrincipalBand()
                if (principalBand.success) {
                    this.principalBands.clear();
                    principalBand.data.forEach((p:IPrincipalBand)=>{
                        this.principalBands.set(p.principalBandId,p);
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getPrincipalBandByIdAsync(principalBandId:number):Promise<void>{
        try {
            let principalBand = await platformService.getPrincipalBandById(principalBandId)
            if (principalBand.success) {
                this.principalBand = principalBand.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getPrincipalBandId(principalBandId:number):void{
        try {
            if([...this.principalBands.values()].length > 0){
                let principalBand = this.principalBands.get(principalBandId)            
                if (principalBand) {
                    this.principalBand = principalBand;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updatePrincipalBand(principalBand:IPrincipalBand):Promise<void>{
        try {
            let res = await platformService.updatePrincipalBand(principalBand)
            if (res.success) {
                let data = res.data as IPrincipalBand
                this.principalBands.set(data.principalBandId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }

    async removePrincipalBand(principalBandId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removePrincipalBand(principalBandId)
            if (res.success) {
                let bd = [...this.principalBands.values()].filter((value: IPrincipalBand, index: number, array: IPrincipalBand[])=> value.principalBandId !== principalBandId)
                this.principalBands.clear();
                bd.forEach((value: IPrincipalBand, index: number, array: IPrincipalBand[])=>{
                    this.principalBands.set(value.principalBandId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    //
    async addPriority(newPriority:IPriority):Promise<void>{
        try {
            this.isLoading = true;
            let priority = await platformService.AddPriorityAsync(newPriority)
            let newPR = priority.data as IPriority;
            this.prioritys.set(newPR.priorityId,newPR);
        
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getAllPriority():Promise<void>{
        try {
            if([...this.prioritys.values()].length < 1){
                this.isLoading = true;
                let priority = await platformService.getAllPriority()
                if (priority.success) {
                    this.prioritys.clear();
                    priority.data.forEach((p:IPriority)=>{
                        this.prioritys.set(p.priorityId,p);
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getPriorityByIdAsync(priorityId:number):Promise<void>{
        try {
            let priority = await platformService.getPrincipalBandById(priorityId)
            if (priority.success) {
                this.priority = priority.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getPriorityId(priorityId:number):void{
        try {
            if([...this.prioritys.values()].length > 0){
                let priority = this.prioritys.get(priorityId)            
                if (priority) {
                    this.priority = priority;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updatePriority(priority:IPriority):Promise<void>{
        try {
            let res = await platformService.updatePriority(priority)
            if (res.success) {
                let data = res.data as IPriority
                this.prioritys.set(data.priorityId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }

    async removePriority(priorityId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removePriority(priorityId)
            if (res.success) {
                let bd = [...this.prioritys.values()].filter((value: IPriority, index: number, array: IPriority[])=> value.priorityId !== priorityId)
                this.prioritys.clear();
                bd.forEach((value: IPriority, index: number, array: IPriority[])=>{
                    this.prioritys.set(value.priorityId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    //
    async addQualification(newQualification:IQualification):Promise<void>{
        try {
            this.isLoading = true;
            let qualification = await platformService.AddQualificationAsync(newQualification)
            let newQ = qualification.data as IQualification;
            this.qualifications.set(newQ.qualificationId,newQ);
        
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getAllQualification():Promise<void>{
        try {
            if([...this.qualifications.values()].length < 1){
                this.isLoading = true;
                let qualification = await platformService.getAllQualification()
                if (qualification.success) {
                    this.qualifications.clear();
                    qualification.data.forEach((q:IQualification)=>{
                        this.qualifications.set(q.qualificationId,q);
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getQualificationByIdAsync(qualificationId:number):Promise<void>{
        try {
            let qualification = await platformService.getQualificationById(qualificationId)
            if (qualification.success) {
                this.qualification = qualification.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getQualificationId(qualificationId:number):void{
        try {
            if([...this.qualifications.values()].length > 0){
                let qualification = this.qualifications.get(qualificationId)            
                if (qualification) {
                    this.qualification = qualification;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updateQualification(qualification:IQualification):Promise<void>{
        try {
            let res = await platformService.updateQualification(qualification)
            if (res.success) {
                let data = res.data as IQualification
                this.qualifications.set(data.qualificationId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }

    async removeQualification(qualificationId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removeQualification(qualificationId)
            if (res.success) {
                let bd = [...this.qualifications.values()].filter((value: IQualification, index: number, array: IQualification[])=> value.qualificationId !== qualificationId)
                this.qualifications.clear();
                bd.forEach((value: IQualification, index: number, array: IQualification[])=>{
                    this.qualifications.set(value.qualificationId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    //
    async addProvince(newProvince:IProvince):Promise<void>{
        try {
            this.isLoading = true;
            let province = await platformService.AddProvinceAsync(newProvince)
            let newP = province.data as IProvince;
            this.provinces.set(newP.provinceId,newP);
        
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getAllProvince():Promise<void>{
        try {
            if([...this.provinces.values()].length < 1){
                this.isLoading = true;
                let province = await platformService.getAllProvince()
                if (province.success) {
                    this.provinces.clear();
                    province.data.forEach((q:IProvince)=>{
                        if(q.provinceId !== 112){
                            this.provinces.set(q.provinceId,q);
                        }
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getProvinceByIdAsync(provinceId:number):Promise<void>{
        try {
            let province = await platformService.getProvinceById(provinceId)
            if (province.success) {
                this.province = province.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getProvinceId(provinceId:number):void{
        try {
            if([...this.provinces.values()].length > 0){
                let province = this.provinces.get(provinceId)            
                if (province) {
                    this.province = province;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updateProvince(province:IProvince):Promise<void>{
        try {
            let res = await platformService.updateProvince(province)
            if (res.success) {
                let data = res.data as IProvince
                this.provinces.set(data.provinceId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async removeProvince(provinceId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removeProvince(provinceId)
            if (res.success) {
                let bd = [...this.provinces.values()].filter((value: IProvince, index: number, array: IProvince[])=> value.provinceId !== provinceId)
                this.provinces.clear();
                bd.forEach((value: IProvince, index: number, array: IProvince[])=>{
                    this.provinces.set(value.provinceId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    //
    async addRank(newRank:IRank):Promise<void>{
        try {
            this.isLoading = true;
            let rank = await platformService.AddRankAsync(newRank)
            let newRK = rank.data as IRank;
            this.ranks.set(newRK.rankId,newRK);
        
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getAllRank():Promise<void>{
        try {
            if([...this.ranks.values()].length < 1){
                this.isLoading = true;
                this.isLoadingRank = true;
                let rank = await platformService.getAllRank()
                if (rank.success) {
                 
                    this.ranks.clear();
                    rank.data.forEach((r:IRank)=>{
                        this.ranks.set(r.rankId,r);
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
            this.isLoadingRank = false;
        }
    }
    async getRankByIdAsync(rankId:number):Promise<void>{
        try {
            let rank = await platformService.getRankById(rankId)
            if (rank.success) {
                this.rank = rank.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getRankId(rankId:number):void{
        try {
            if([...this.ranks.values()].length > 0){
                let rank = this.ranks.get(rankId)            
                if (rank) {
                    this.rank = rank;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updateRank(rank:IRank):Promise<void>{
        try {
            let res = await platformService.updateRank(rank)
            if (res.success) {
                let data = res.data as IRank
                this.ranks.set(data.rankId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async removeRank(rankId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removeRank(rankId)
            if (res.success) {
                let bd = [...this.ranks.values()].filter((value: IRank, index: number, array: IRank[])=> value.rankId !== rankId)
                this.ranks.clear();
                bd.forEach((value: IRank, index: number, array: IRank[])=>{
                    this.ranks.set(value.rankId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    //
    async getAllProfession():Promise<void>{
        try {
            if([...this.professions.values()].length < 1){
                let profession = await platformService.getAllProfession()
                if (profession.success) {
                    this.professions.clear();
                    profession.data.forEach((r:IProfession)=>{
                        this.professions.set(r.professionId,r);
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getProfessionByIdAsync(professionId:number):Promise<void>{
        try {
            let profession = await platformService.getProfessionById(professionId)
            if (profession.success) {
                this.profession = profession.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getProfessionId(professionId:number):void{
        try {
            if([...this.professions.values()].length > 0){
                let profession = this.professions.get(professionId)            
                if (profession) {
                    this.profession = profession;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updateProfession(profession:IProfession):Promise<void>{
        try {
            let res = await platformService.updateProfession(profession)
            if (res.success) {
                let data = res.data as IProfession
                this.professions.set(data.professionId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }

    async removeProfession(professionId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removeProfession(professionId)
            if (res.success) {
                let bd = [...this.professions.values()].filter((value: IProfession, index: number, array: IProfession[])=> value.professionId !== professionId)
                this.professions.clear();
                bd.forEach((value: IProfession, index: number, array: IProfession[])=>{
                    this.professions.set(value.professionId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    //
    async getAllNationality():Promise<void>{
        try {
            if([...this.nationalities.values()].length < 1){
                let nationality = await platformService.getAllNationality()
                if (nationality.success) {
                    this.nationalities.clear();
                    nationality.data.forEach((n:INationality)=>{
                        this.nationalities.set(n.nationalityId,n);
                    })
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    async getNationalityByIdAsync(nationalityId:number):Promise<void>{
        try {
            let nationality = await platformService.getNationalityById(nationalityId)
            if (nationality.success) {
                this.nationality = nationality.data;
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    getNationalityId(nationalityId:number):void{
        try {
            if([...this.professions.values()].length > 0){
                let nationality = this.nationalities.get(nationalityId)            
                if (nationality) {
                    this.nationality = nationality;
                }
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
    
    async updateNationality(nationality:INationality):Promise<void>{
        try {
            let res = await platformService.updateNationality(nationality)
            if (res.success) {
                let data = res.data as INationality
                this.nationalities.set(data.nationalityId,data)
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }

    async removeNationality(nationalityId:number):Promise<void>{
        try {
            this.isLoading = true;
            let res = await platformService.removeNationality(nationalityId)
            if (res.success) {
                let bd = [...this.nationalities.values()].filter((value: INationality, index: number, array: INationality[])=> value.nationalityId !== nationalityId)
                this.nationalities.clear();
                bd.forEach((value: INationality, index: number, array: INationality[])=>{
                    this.nationalities.set(value.nationalityId,value)
                })
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }


}

export const platformStore=new PlatformStore();