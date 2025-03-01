import { client } from "../../../Infrastructure/agent";
import { EDBRequestResponse  } from "../../../shared/EDBRequestResponse";
import { ILogin } from "../../../Utility/Validations/HomeValidations";

export const AuthService={

    login:(loginData:ILogin):Promise<EDBRequestResponse > =>
	client.post("/main/authenticate", { ...loginData}),
}