import { client } from "../../../Infrastructure/agent";
import { EDBRequestResponse  } from "../../../shared/EDBRequestResponse";

export const PermissionService={
    getUserPermissionAndGroupForFacility:(userId:string):Promise<EDBRequestResponse> =>
        client.post("/main/getPermissionAndGroups",{userId})
}