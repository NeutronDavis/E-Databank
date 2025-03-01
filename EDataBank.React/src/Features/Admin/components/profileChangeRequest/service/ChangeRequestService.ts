import { client } from "../../../../../Infrastructure/agent";
import { EDBRequestResponse } from "../../../../../shared/EDBRequestResponse";
import { IChangeRequest } from "../types/interface";


export const ChangeRequestService={
    getChangesRequests:():Promise<EDBRequestResponse>=>client.get('/main/getAllChangesRequest'),
    submitChangesRequest:(request:IChangeRequest):Promise<EDBRequestResponse>=>client.post('/main/addChanges',{request}),
    approveRequest:(requestId:number):Promise<EDBRequestResponse>=>client.post('/main/approveChangesRequest',{requestId}),
    declineRequest:(requestId:number):Promise<EDBRequestResponse>=>client.post('/main/deleteChangesRequest',{requestId}),
   
}