import { UrlWithStringQuery } from "url";
import { EDBRequestResponse  } from "../../../shared/EDBRequestResponse";
import { ILogin, IRegister, ITokenValidation } from "../../../Utility/Validations/HomeValidations";
import { Permission } from "../../Admin/types/interface";
import { PermissionGroup, UserPermission } from "../../MasterPage/types/Interfaces";

export const enum  signUpView {
    Login,
    Register,
    ForgotPassword,
    ValidateToken
    
    }
    
    export const enum PrivacyPolicy{
        Privacy='0',
        Terms='1',
        Conditions='2'
    }
    
    export interface IHomeStore{
        signUpView:signUpView;
        showPrivacyPanel:boolean;
        privacyPanel:PrivacyPolicy,
        authStore:IAuthStore,
        registerUser:(userData:IRegister)=>Promise<EDBRequestResponse > ,
        validateAccount:(validationData:ITokenValidation)=>Promise<EDBRequestResponse > ,
       
        isLoading:boolean,
        
        username:string|undefined,
        password:string|undefined
       
        forgotPassword(email:string):Promise<boolean | undefined>,
        getAllBranch():Promise<void>,
        getAllBand():Promise<void>,
        getAllPrincipalBand():Promise<void>,
        getAllRank():Promise<void>,
        getAllNationality():Promise<void>,
        getAllQualification():Promise<void>,
        getAllProfession():Promise<void>
    }


        export interface IAuthStore{
            loginInProgress:boolean;
            login(loginData:ILogin):Promise<EDBRequestResponse >;
            currentUser:CurrentUser,
        }

        export type CurrentUser={
            username: string,
            fullName:string,
            initials:string,
            otherName: string,
            id: string, 
            isAccountLocked: boolean, 
            isAcountValidated: boolean,
            lastName: string,
            token: string,
            lastVisitedSubMenuId:number ,
            lastVisitedMenuId:number,
            lastVisitedMenuUrl:string ,
            permissions:Array<UserPermission>,
            groups:PermissionGroup
            
        }

    export interface IUser{
        otherName:string,
        lastName:string,
        email:string,
        phoneNumber:string,
        gender: string,
        title: string,
        maritalStatus:string,
        dateOfBirth:string,
        nationality1Id?:number,
        nationality2Id?:number,
        nameOfSpouse:string,
        occupation:string,
        ordinationRankOfSpouse?:number | undefined,
        qualificationId?:number | undefined,
        professionId?:number | undefined,
        branchId?:number | undefined,
        usersId:string,
        rankId:number | undefined,
        principalBandId:number | undefined,
        bandId:number | undefined,
        yearOfMarriage:number | undefined,
        address:string,
        cPPInChurch:string,
        noOfChildren:number,
        ordinationYear?:string
    }
          