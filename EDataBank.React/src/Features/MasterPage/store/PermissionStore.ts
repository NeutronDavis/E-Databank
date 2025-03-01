import { ObservableMap, makeAutoObservable, toJS } from "mobx";
import { IPermissionStore, PermissionGroup, Privilege, UserPermission} from "../types/Interfaces";
import { PermissionService } from "../services/PermissionService";
import { authStore } from "../../Home/store/AuthStore";
import { CurrentUser } from "../../Home/types/interfaces";
import { json } from "stream/consumers";

const _ = require("underscore");

class PermissionStore implements  IPermissionStore{

    userPermissions=new ObservableMap<number,UserPermission>()
    userGroups={} as PermissionGroup
    selectedPrivilege={} as Privilege;
    selectedHeaderPrivilege={} as Privilege;
    userGroupIds= 0;
    groups="";
    constructor(){
        makeAutoObservable(this);
     
    } 
    getHeaderMenuPriviledge(): Privilege {

        let userGroups
        userGroups=JSON.parse(localStorage.getItem("userGroups") ||'{}')|| this.userGroups 
        
        // const groupId = _.uniq(_.pluck(userGroups,'groupId' ));
        const groupId = userGroups.groupId;
      
        let canView=false;

        // if(groupId.length===1 && _.first(groupId)===2){
        //     canView=false
        // }else{
        //     canView=true
        // }
        console.log('groupId',groupId)
        // this.selectedHeaderPrivilege = {canDelete: false,canExecute: false,canUpdate: false,canView: canView}as Privilege;
    //    localStorage.setItem('canViewFacilityMenu',String(this.selectedHeaderPrivilege.canView)) 
        return {
            canDelete: false,
            canExecute: false,
            canUpdate: false,
            canView: canView,
        };
    }
    getPermissions(url: string): Privilege {

        let storePermissions=[...this.userPermissions.values()];
        let sperms;
        if(storePermissions.length){
            sperms=storePermissions.map(p=>toJS(p));
        }
        let p;
        let ls=localStorage.getItem("userPermissions") as string;
        if(ls){
            p=JSON.parse(ls);
        }

        
        let permissions=( p as Privilege[])||sperms;

        const role = _.first(_.where(permissions, { url: url }));
      
        if(!role){
            return {
                canDelete: false,
                canExecute: false,
                canUpdate: false,
                canView: true,
              } as Privilege;
        }

       
        this.selectedPrivilege = {} as Privilege
        const { canDelete, canExecute, canUpdate, canView } = role;
    
         const retVal={
          canDelete: canDelete,
          canExecute: canExecute,
          canUpdate: canUpdate,
          canView: canView,
        } as Privilege;

        this.selectedPrivilege = retVal;
     
       console.log('url is',url,role)
      
        return retVal
      }

      setUserGroups(groups:PermissionGroup):void{
        this.userGroups = {} as PermissionGroup
        if(groups !== undefined){
            this.userGroups = groups as PermissionGroup;
            this.userGroupIds  = groups.groupId;
            this.groups = groups.name;
            localStorage.setItem("userGroupIds",JSON.stringify(toJS(this.userGroupIds)));
            localStorage.setItem("userGroups",JSON.stringify(toJS(this.userGroups)));
        }
     
      }

     async getPermissionAndGroups(userId:string):Promise<void> {
        try {
            let retVal = await PermissionService.getUserPermissionAndGroupForFacility(userId);
            if(retVal.success){
                this.userPermissions.clear()
                retVal.data.permissions.forEach((p:UserPermission,index:number)=>{
                    this.userPermissions.set(index,p)
                });
                localStorage.setItem("userPermissions",JSON.stringify(toJS([...this.userPermissions.values()])))


               this.setUserGroups(retVal.data.groups as PermissionGroup);
               
            }
        } catch (error) {
            throw error;
        }
    }

     setUserPermissionAndGroups(permission:Array<UserPermission>,group:PermissionGroup):void{
        permission.forEach((p:UserPermission,index:number)=>{
            this.userPermissions.set(index,p)
        });
        localStorage.setItem("userPermissions",JSON.stringify(toJS([...this.userPermissions.values()])))
        
        this.userGroups = {} as PermissionGroup
       
        this.userGroups = group as PermissionGroup;
        this.userGroupIds  = group.groupId;
        this.groups = group.name;
        localStorage.setItem("userGroupIds",JSON.stringify(toJS(this.userGroupIds)));
        localStorage.setItem("userGroups",JSON.stringify(toJS(this.userGroups)));
        
     }
    }
   




export const permissionStore=new PermissionStore();