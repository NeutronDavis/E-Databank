import { configure, makeAutoObservable } from "mobx"
import { EDBRequestResponse  } from "../../../shared/EDBRequestResponse";

import {
    IRegister, ITokenValidation,
      
  } from "../../../Utility/Validations/HomeValidations";
    import {HomeService  } from "../services/HomeService";
import {   IHomeStore, PrivacyPolicy, signUpView } from "../types/interfaces";
import { authStore } from "./AuthStore";
import { platformStore } from "../../Admin/store/platformStore";
import { IBand, IBranch, INationality, IPrincipalBand, IProfession, IQualification, IRank } from "../../Admin/types/interface";
import { platformService } from "../../Admin/services/platformService";
configure({
    enforceActions: "never",
    
})
class HomeStore implements IHomeStore{
    showPrivacyPanel=false;
    signUpView:signUpView;
    privacyPanel:PrivacyPolicy;
    isLoading:boolean;
    username:string=""
    password:string="";
   authStore=authStore;
	
    
   
    constructor(){
        this.signUpView=signUpView.Login;
        this.privacyPanel=PrivacyPolicy.Privacy;
        
        this.isLoading=false;
		
        makeAutoObservable(this);
    }
    async validateAccount(validationData:ITokenValidation) : Promise<EDBRequestResponse > {
        try {
            this.isLoading=true;
          const retVal=  await HomeService.validateAccount(validationData) 
          console.log(retVal)
        return retVal;
            
        } catch (error) {
            throw error;
            
        }finally{
        this.isLoading=false;
        }
    };
    
    async registerUser(userData:IRegister): Promise<EDBRequestResponse > {
		try {
			this.isLoading=true;
		  const retVal=  await HomeService.register(userData,userData.password) 
		  console.log(retVal)
		return retVal;
			
		} catch (error) {
			throw error;
			
		}finally{
		this.isLoading=false;
		}
    }
	
	
    async forgotPassword(email:string):Promise<boolean | undefined>{
        try {
            this.isLoading = true
            const retVal = await HomeService.forgotPassword(email);
            console.log('retVal',retVal);
            return retVal.success;
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
   }
   async getAllBranch():Promise<void>{
    try {
        if([...platformStore.branchs.values()].length < 1){
            platformStore.isLoading = true;
            let branch = await HomeService.getAllBranch()
            if (branch.success) {
                platformStore.branchs.clear();
                branch.data.forEach((b:IBranch)=>{
                    platformStore.branchs.set(b.branchId,b);
                })
            }
        }
    } catch (error) {
        throw error;
    }finally{
        platformStore.isLoading = false;
    }
}
async getAllBand():Promise<void>{
    try {
        if([...platformStore.bands.values()].length < 1){
            platformStore.isLoading = true;
            let band = await HomeService.getAllBand()
            if (band.success) {
                platformStore.bands.clear();
                band.data.forEach((b:IBand)=>{
                    platformStore.bands.set(b.bandId,b);
                })
            }
        }
    } catch (error) {
        throw error;
    }finally{
        platformStore.isLoading = false;
    }
}

async getAllPrincipalBand():Promise<void>{
    try {
        if([...platformStore.principalBands.values()].length < 1){
            platformStore.isLoading = true;
            let principalBand = await HomeService.getAllPrincipalBand()
            if (principalBand.success) {
                platformStore.principalBands.clear();
                principalBand.data.forEach((p:IPrincipalBand)=>{
                    platformStore.principalBands.set(p.principalBandId,p);
                })
            }
        }
    } catch (error) {
        throw error;
    }finally{
        platformStore.isLoading = false;
    }
}

async getAllRank():Promise<void>{
    try {
        if([...platformStore.ranks.values()].length < 1){
            platformStore.isLoading = true;
            platformStore.isLoadingRank = true;
            let rank = await HomeService.getAllRanks()
            if (rank.success) {
             
                platformStore.ranks.clear();
                rank.data.forEach((r:IRank)=>{
                    platformStore.ranks.set(r.rankId,r);
                })
            }
        }
    } catch (error) {
        throw error;
    }finally{
        platformStore.isLoading = false;
        platformStore.isLoadingRank = false;
    }
}

async getAllNationality():Promise<void>{
    try {
        if([...platformStore.nationalities.values()].length < 1){
            let nationality = await HomeService.getAllNationality()
            if (nationality.success) {
                platformStore.nationalities.clear();
                nationality.data.forEach((n:INationality)=>{
                    platformStore.nationalities.set(n.nationalityId,n);
                })
            }
        }
    } catch (error) {
        throw error;
    }finally{
        platformStore.isLoading = false;
    }
}
async getAllQualification():Promise<void>{
    try {
        if([...platformStore.qualifications.values()].length < 1){
            platformStore.isLoading = true;
            let qualification = await HomeService.getAllQualifications()
            if (qualification.success) {
                platformStore.qualifications.clear();
                qualification.data.forEach((q:IQualification)=>{
                    platformStore.qualifications.set(q.qualificationId,q);
                })
            }
        }
    } catch (error) {
        throw error;
    }finally{
        platformStore.isLoading = false;
    }
}
async getAllProfession():Promise<void>{
    try {
        if([...platformStore.professions.values()].length < 1){
            let profession = await HomeService.getAllProfessions()
            if (profession.success) {
                platformStore.professions.clear();
                profession.data.forEach((r:IProfession)=>{
                    platformStore.professions.set(r.professionId,r);
                })
            }
        }
    } catch (error) {
        throw error;
    }finally{
        platformStore.isLoading = false;
    }
}
 
}


export const homeStore=new HomeStore();
 