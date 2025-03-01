import { ObservableMap } from "mobx";
import { EDBRequestResponse  } from "../../../shared/EDBRequestResponse";

export type Response={
    success:boolean,data:any
}

 export interface IMasterPageStore{
    isMenuLoading:boolean;
    showFacilityDialog:boolean;
    showFacilityCreationDialog:boolean;
    curentUserShortName:string;
    curentUserFullName:string;
    globalFacilityId:number,
    globalFacility:string,
    selectedMenuId:string,
    selectedSubMenuId:string,
    isSaving:boolean,
    setUpGuideCount:number,
    appMenu:Array<any>,
    allMenu:Array<any>,
    selectedMenu:Array<any>,
    activeParentMenuName:string,
    activeTitle:string,

    submitNewMemberRegistration(registrationData:INewFaciltyRegistrationData):Promise<EDBRequestResponse >,
     loadMenu():Promise<EDBRequestResponse >,

     setUserLastVisitedProfile( userid:string,  lastVisitedSubMenuId:number,
        lastVisitedMenuId:number ,  lastVisitedMenuUrl:string,
        lastVisitedFacilityId:number ,  lastVisitedFacility:string):Promise<EDBRequestResponse >,
        reloadMenu():void
}
export interface INewFaciltyRegistrationData{
    name:string,
    facilityEmail?:string,
    phone?:string,
    requestorEmail:string,
    address:string,
    country:string,
    state:string,
    city:string,
    facilityType:number
    

}


// facilityInfo
export interface IFacilityView{
    name:string,
    email:string,
    phone:string,
    country:string,
    state:string,
    city:string,
    address:string,
    hasService:boolean,
    hasProcedure:boolean,
    hasAppointment:boolean,
    hasPayment:boolean,
 
}
export interface IFacilityUpdate{
    name:string,
    email:string,
    phone:string,
    country:string,
    state:string,
    city:string,
    address:string
}

export type UserPermission={
    display:string,
    subMenuId:number,
    menuId:number,
    groupId:number,
    name:number,
    canView:number,
    canUpdate:number,
    canDelete:number,
    canExecute:number,
    canApprove:number,
    menu:number,
    subMenu:number,
    menuIcon:number,
    id:string,
    url:string
}

export type Privilege={
    canDelete: boolean,
        canExecute: boolean,
        canUpdate: boolean,
        canView: boolean,
}

export interface IPermissionStore{

    userPermissions:ObservableMap<number,UserPermission>,
    userGroups:PermissionGroup,
    groups:string,
    getPermissions(url:string):Privilege,
    getHeaderMenuPriviledge(menuId: number):Privilege,
    setUserGroups(groups:PermissionGroup):void,
    setUserPermissionAndGroups(permission:Array<UserPermission>,group:PermissionGroup):void,
    getPermissionAndGroups(userId:string):Promise<void>,
    selectedPrivilege:Privilege,
    userGroupIds:number,

}

export type PermissionGroup={
    name:string,
    groupId:number,
    isPlatformAdmin:boolean,
    description:string

}

export interface UserGroup{
    userGroupId:number,
    userId:string,
    groupId:number
    branchId:number
}


