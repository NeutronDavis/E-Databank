import { client } from "../../../Infrastructure/agent";
import { EDBRequestResponse } from "../../../shared/EDBRequestResponse";
export const dashboardServices={

    getDashData:():Promise<EDBRequestResponse>=>client.get('/dashboard/getDashboardData')
}