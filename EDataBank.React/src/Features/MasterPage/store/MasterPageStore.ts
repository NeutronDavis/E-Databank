import { RcFile } from "antd/lib/upload";
import { makeAutoObservable, toJS } from "mobx"
import { EDBRequestResponse  } from "../../../shared/EDBRequestResponse";
import { getCurrentUser } from "../../../Utility/helper";
import { MasterPageService } from "../services/MasterPageService";

import { IMasterPageStore, INewFaciltyRegistrationData,IFacilityView, IFacilityUpdate  } from "../types/Interfaces";
import { permissionStore } from "./PermissionStore";
const _ = require("underscore");
export const facility:IFacilityView = {
    name:"",
    email:"",
    phone:"",
    country:"",
    state:"",
    city:"",
    address:"",
    hasService:false,
    hasProcedure:false,
    hasAppointment:false,
    hasPayment:false,
  
}
 export const facilityUpdate:IFacilityUpdate = {
    name:"",
    email:"",
    phone:"",
    country:"",
    state:"",
    city:"",
    address:""
}

class MasterPageStore implements IMasterPageStore{
    isMenuLoading=false;
    showFacilityDialog=false;
    showFacilityCreationDialog=false;
    curentUserShortName = ""
    curentUserFullName = ""
    globalFacilityId=2;
    globalFacility="First Rivers Hospital";
    isSaving=false;
    selectedMenuId:string= localStorage.getItem("selectedMenuId") || getCurrentUser()?.lastVisitedMenuId;
    selectedSubMenuId:string=localStorage.getItem("selectedSubMenuId") || getCurrentUser()?.lastVisitedSubMenuId;
    appMenu=[];
    allMenu=[];
    selectedMenu=[];
    isUpdating=false;
    isLoading=false;
    isUploading=false;
    facilityLogo:any="";
    facilityInfo = facility;
    facilityUpdate = facilityUpdate;
	showFacilityEditDialog=false;
	showFacilityEditForm = false;
    setUpGuideCount=0;
    activeParentMenuName="My Health";
    activeTitle="";
    constructor(){   
        makeAutoObservable(this);
    }
    async loadMenu():Promise<EDBRequestResponse >{
        try {
            this.isMenuLoading = true;
            const retVal = await MasterPageService.loadMenu();
            this.allMenu=retVal;
           this.reloadMenu();
        return retVal;
        } catch (error) {
            throw error;
        }finally{
this.isMenuLoading = false;
        }
        
    }
    async submitNewMemberRegistration(registrationData:INewFaciltyRegistrationData):Promise<EDBRequestResponse >{
        try {
            this.isSaving = true;
            const retVal = await MasterPageService.submitNewFaciltiyRequest(registrationData);
           
        //    console.log('request',retVal);
           
        return retVal;
        } catch (error) {
            // console.log('eroor',error)
            throw error;
        }finally{
            this.isSaving = false;
        }
    }
    async setUserLastVisitedProfile( userId:string,  lastVisitedSubMenuId:number,
        lastVisitedMenuId:number ,  lastVisitedMenuUrl:string,
        lastVisitedFacilityId:number ,  lastVisitedFacility:string):Promise<EDBRequestResponse >{
            try {

                this.isSaving = true;
                const retVal = await MasterPageService.setUserLastVisitedProfile(userId,  lastVisitedSubMenuId,
                    lastVisitedMenuId,  lastVisitedMenuUrl,
                    lastVisitedFacilityId,  lastVisitedFacility);
                
            return retVal;
            } catch (error) {
                throw error;
            }finally{
    this.isSaving = false;
            }
        }


   async uploadProfileImg(imageInfo:any,facilityId:number):Promise<boolean>{
        try {
            this.isUploading=true;
            //convert image to Base64Sting
            let	src:string = await new Promise(resolve => {
                    const reader = new FileReader();
                    reader.readAsDataURL(imageInfo.file.originFileObj as RcFile);
                    reader.onload = () => resolve(reader.result as string);
                });
                // console.log(src);
                
            let extension = src.slice(11,src.indexOf(";"))
        
            const retVal=  await MasterPageService.uploadFacilityLogog(src,extension,facilityId)
            if (retVal.success) {
                
                this.facilityLogo = src;
            }
            return true;
            
        } catch (error) {
            throw error;
        }finally{
            this.isUploading=false;
        }
    }
    reloadMenu():void{
        let menus=[]
       if (permissionStore.userGroupIds == 2){
            menus=_.filter(this.allMenu,(m:any)=>m.menuId!==0 && m.menuId === 1).map((m:any)=>toJS(m));
            this.selectedMenu=menus;
       }else if(permissionStore.userGroupIds == 1 || permissionStore.userGroupIds == 3){
           menus=_.filter(this.allMenu,(m:any)=>m.menuId!==0).map((m:any)=>toJS(m));
           this.selectedMenu=menus;

       }
    }
}


export const masterPageStore=new MasterPageStore();