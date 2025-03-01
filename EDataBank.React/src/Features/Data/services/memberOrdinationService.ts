import { client } from "../../../Infrastructure/agent";
import { EDBRequestResponse } from "../../../shared/EDBRequestResponse";
export const memberOrdinationService={

    getMemberOrdination:(memberId:string):Promise<EDBRequestResponse>=>client.post('/ordination/getAMemberOrdination',{memberId})
}