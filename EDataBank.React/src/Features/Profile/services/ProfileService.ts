import { client } from "../../../Infrastructure/agent";
import {RequestResponse,SecurityUpdateResponse,IUpdatePassword,FeedbackResponse,IFeedback,IProfile} from "../types/interface";

export const ProfileService={

    updateBasicProfile: (userData:IProfile,userId:string):Promise<RequestResponse> =>
	client.post("/main/UpdateUserBasicProfile", {userData,userId}),
	
    getBasicProfile:(userId:string):Promise<any> =>
	client.post("/main/loadUserProfile",{userId}),
	
    uploadProfileImg:(base64String:any,extension:string,userId:string):Promise<RequestResponse> =>
	client.post("/main/UploadProfileImage",{base64String,extension,userId}),

//security
    updateUserPassword: (pwdData:IUpdatePassword,userId:string):Promise<SecurityUpdateResponse> =>
	client.post("/main/UpdateUserPassword", {oldPassword:pwdData.oldPassword,newPassword:pwdData.newPassword,userId}),
	
    updateUserEmail:(email:string,userId:string):Promise<SecurityUpdateResponse> =>
	client.post("/main/UpdateUserEmail",{email,userId}),
    
    updateBackupEmail:(email:string,userId:string):Promise<SecurityUpdateResponse> =>
	client.post("/main/UpdateUserBackUpEmail",{email,userId}),

    updateUserPhoneNumber:(phone:string,userId:string):Promise<SecurityUpdateResponse> =>
	client.post("/main/UpdateUserPhoneNumber",{phone,userId}),
    
    // feedback
    sendFeedback:(feedbackData:IFeedback,base64String:any):Promise<FeedbackResponse> =>
    client.post("/feedback/feedback",{feedbackData,base64String}),
}