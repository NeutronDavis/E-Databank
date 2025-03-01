import { client,registerClient } from "../../../Infrastructure/agent";
import { EDBRequestResponse  } from "../../../shared/EDBRequestResponse";
import { IRegister, ITokenValidation } from "../../../Utility/Validations/HomeValidations";


export const HomeService={
    register: (userData:IRegister,password:string):Promise<EDBRequestResponse > =>
    client.post("/main/registeruser", { userData,password}),
    validateAccount:(data:ITokenValidation):Promise<EDBRequestResponse > =>
    client.post("/main/validatetoken", { ...data}),
	
    forgotPassword:(email:string):Promise<EDBRequestResponse >=>
    client.post("/main/resetPassword",{email}),
    
    getAllBranch: ():Promise<EDBRequestResponse> =>
	client.get("/main/GetAllBranch"),
    getAllBand: ():Promise<EDBRequestResponse> =>
	client.get("/main/GetAllBand"),
    getAllPrincipalBand: ():Promise<EDBRequestResponse> =>
	client.get("/main/GetAllPrincipalBand"),
    getAllRanks: ():Promise<EDBRequestResponse> =>
	client.get("/main/GetAllRank"),
    getAllNationality: ():Promise<EDBRequestResponse> =>
	client.get("/main/GetAllNationality"),
    getAllProfessions: ():Promise<EDBRequestResponse> =>
	client.get("/main/GetAllProfession"),
    getAllQualifications: ():Promise<EDBRequestResponse> =>
	client.get("/main/GetAllQualification"),
}
