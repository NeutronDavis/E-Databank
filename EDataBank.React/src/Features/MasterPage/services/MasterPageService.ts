import { client } from "../../../Infrastructure/agent";
import { IFacilityUpdate,INewFaciltyRegistrationData } from "../types/Interfaces";
import { EDBRequestResponse  } from "../../../shared/EDBRequestResponse";

export const MasterPageService={
    loadMenu:()=>client.get('/main/GetApplicationMenu'),
    submitNewFaciltiyRequest:(registrationData:INewFaciltyRegistrationData)=>client.post('/facility/registerfacility',{facility:registrationData}),
    setUserLastVisitedProfile:( userid:string,  lastVisitedSubMenuId:number,
        lastVisitedMenuId:number ,  lastVisitedMenuUrl:string,
        lastVisitedFacilityId:number ,  lastVisitedFacility:string)=>client.post('/main/SetUserLastVisitedProfile',{userid
            ,lastVisitedSubMenuId,lastVisitedMenuId,lastVisitedMenuUrl,lastVisitedFacilityId,lastVisitedFacility}),
    

        // facility
    getSingleFacility:(facilityId:number):Promise<EDBRequestResponse > =>
        client.post("/facility/getfacilityInfo",{facilityId}),

    updateFacilityInfo:(facilityId:number,facilityData:IFacilityUpdate):Promise<EDBRequestResponse >=>
        client.post("/facility/updateFacilityInfo",{facilityId,facilityData}),
    
    uploadFacilityLogog:(base64String:string,extension:string,facilityId:number):Promise<EDBRequestResponse >=>
        client.post("/facility/uploadFacilityLogo",{base64String,extension,facilityId})
}