import { makeAutoObservable } from "mobx";


import { EDBRequestResponse  } from "../../../shared/EDBRequestResponse";
import { ILogin } from "../../../Utility/Validations/HomeValidations";
import { AuthService } from "../services/AuthService";
import { CurrentUser, IAuthStore } from "../types/interfaces";



class AuthStore implements IAuthStore{
    loginInProgress=false;
    currentUser={} as CurrentUser;
    constructor(){
       
		
        makeAutoObservable(this);
    }
    async login(loginData:ILogin):Promise<EDBRequestResponse >{

		try{
			this.loginInProgress=true;
			const retVal=  await AuthService.login(loginData) 
			console.log('login',retVal)
			return retVal;
		}catch(error){
			throw error;
		}finally{
			this.loginInProgress=false;
		}
	
	}
}

export const authStore=new AuthStore();