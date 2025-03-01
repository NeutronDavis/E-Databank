import { client } from "../../../Infrastructure/agent";
import {Response, IActionTaken,UpdateResponse } from "../store/FeedbackPageStore";

export const FeedbackService={

    allFeedback: ():Promise<Response> =>
	client.get("/feedback/loadFeedbackProfile"),
    
    updateFeedback:(feedbackText:string,feedbackId:number,submitType:string):Promise<UpdateResponse> =>
     client.post("/feedback/updateFeedback",{feedbackText,feedbackId,submitType})
}