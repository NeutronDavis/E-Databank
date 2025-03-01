import { makeAutoObservable } from "mobx"
import { ProfileService } from "../services/ProfileService";
import { RcFile, } from "antd/lib/upload/interface";
// import { message } from 'antd';


import { 
    IProfile,
    IFeedback,
    RequestResponse,
    FeedbackResponse,
    SecurityUpdateResponse,
    IUpdatePassword,
    IPasswordReset,
    IEmailReset,
    IPhoneNumberReset,
    IProfileStore,
    IProfileView
} from '../types/interface';




export const  basicProfile:IProfile =  {
    otherName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
    title: "",
    gender:"",
    maritalStatus:"",
    nationality1:"",
    nationality2:"",
    nationality1Id:undefined,
    nationality2Id:undefined,
    nameOfSpouse:"",
    occupation:"",
    dateOfBirth:"",
    ordinationRankOfSpouse:undefined,
    qualificationId:undefined,
    professionId:undefined,
    branchId:undefined,
    rankId:0,
    principalBandId:0,
    bandId:0,
    yearOfMarriage:0,
    address:"",
    cppInChurch:"",
    noOfChildren:0,
  };


  const resetPassword:IPasswordReset={
    oldPassword:"",
    newPassword:"",
    confirmPassword:""
}
const resetEmail:IEmailReset={
    email:""
}
const resetBackupEmail:IEmailReset={
    email:""
}
const resetPhoneNumber:IPhoneNumberReset={
    phoneNumber:""
}

const feedback:IFeedback={
    userEmail:"",
    feedbackCategory:"",
    feedbackText:""
}
class ProfileStore implements IProfileStore{

    showProfileForm = false;
    showSettingsDialog = false;
    showFeedbackDialog = false;
    showBasicSettingsForm=false
    isLoadingSecuritySetUp=false
	isLoading=false;
	isUploading=false;
	isUpdating=false;
	profileImg:any ="";
    feedbackAttachment:any="";
    showPhoneNumberForm = false;
    showEmailForm=false;
    showBackupEmailForm=false;
    showResetPwdForm=false;
    
    messagAndEmailFormat=false;
    SecurityEmail = false;
    notificationTrail = false;
    accountPassword = false;
    isUpdatingBackUpEmail=false;
    
    password="*******";
    
    basicProfile=basicProfile;
    resetPassword=resetPassword;
    resetEmail=resetEmail;
    resetBackupEmail=resetBackupEmail;
    resetPhoneNumber=resetPhoneNumber;
    feedback=feedback;

    userView:IProfileView = {} as IProfileView;
	constructor(){
		this.isLoading = false;
		this.isUploading = false;
		this.isUpdating  = false;
		makeAutoObservable(this);
	}
  
	
	
    async getProfile(userId:string):Promise<RequestResponse> {
        try {
            this.isLoading=true;
            const retVal=  await ProfileService.getBasicProfile(userId)
			this.profileImg = retVal.data.profilePics === null?"":retVal.data.profilePics;
            this.basicProfile = retVal.data as IProfile;
            this.basicProfile.dateOfBirth = retVal.data.dateOfBirth === null? "": retVal.data.dateOfBirth;
            this.basicProfile.yearOfMarriage = retVal.data.yearOfMarriage === null? "": retVal.data.yearOfMarriage;
            this.userView = retVal.userView as IProfileView
            console.log(retVal)
            return retVal as RequestResponse;
            
        } catch (error) {
            throw error;
        }finally{
            this.isLoading=false;
        }
    }
	
	async updateBasicProfile(basicData:IProfile,userId:string):Promise<RequestResponse> {
        try {
            this.isUpdating=true;
            const retVal=  await ProfileService.updateBasicProfile(basicData,userId)
           
            this.basicProfile = retVal.data as IProfile;
            return retVal;    
        } catch (error) {
            throw error;
        }finally{
           
            this.isUpdating=false;
        }
    }
	
	async uploadProfileImg(imageInfo:any,userId:string):Promise<boolean>{
        try {
            this.isUploading=true;
			//convert image to Base64Sting
			let	src:string = await new Promise(resolve => {
					const reader = new FileReader();
					reader.readAsDataURL(imageInfo.file.originFileObj as RcFile);
					reader.onload = () => resolve(reader.result as string);
				});

            let extension = src.slice(11,src.indexOf(";"))
         
            const retVal=  await ProfileService.uploadProfileImg(src,extension,userId)
            if (retVal.success) {
                
                this.profileImg = src;
            }
            return retVal.success;
            
        } catch (error) {
            throw error;
        }finally{
            this.isUploading=false;
        }
    }

    async getSecurityInfo(userId:string):Promise<boolean> {
        try {
            this.isLoadingSecuritySetUp=true;
            const retVal=  await ProfileService.getBasicProfile(userId)
            // console.log(retVal)     
            if (retVal.success) {       
                this.resetEmail.email = retVal.data.email;
                this.resetPhoneNumber.phoneNumber = retVal.data.phoneNumber;
                this.resetBackupEmail.email = retVal.data.backupEmail
            }
            return retVal.success;
            
        } catch (error) {
            throw error;
        }finally{
            this.isLoadingSecuritySetUp=false;
        }
    }
	
	async updateProfilePwd(pwdData:IUpdatePassword,userId:string):Promise<boolean> {
        try {
            this.isUpdating=true;
            const retVal=  await ProfileService.updateUserPassword(pwdData,userId)
                if (retVal.status) {
                    this.password = "*********"                 
                }
                
                return retVal.status;    
        } catch (error) {
            throw error;
        }finally{    
            this.isUpdating=false;
        }
    }
	async updateProfileEmail(email:string,userId:string):Promise<SecurityUpdateResponse> {
        try {
            this.isUpdating=true;
            const retVal=  await ProfileService.updateUserEmail(email,userId)
        
            if (retVal.status) {
                this.resetEmail.email = email;
            }
            return retVal;    
        } catch (error) {
            throw error;
        }finally{    
            this.isUpdating=false;
        }
    }
	async updateBackupEmail(email:string,userId:string):Promise<SecurityUpdateResponse> {
        try {
            this.isUpdatingBackUpEmail=true;
            const retVal=  await ProfileService.updateBackupEmail(email,userId)
        
            if (retVal.status) {
                this.resetBackupEmail.email = email;
            }
            return retVal;    
        } catch (error) {
            throw error;
        }finally{    
            this.isUpdatingBackUpEmail=false;
        }
    }
	async updateProfilePhoneNumber(phone:string,userId:string):Promise<SecurityUpdateResponse> {
        try {
            this.isUpdating=true;
            const retVal=  await ProfileService.updateUserPhoneNumber(phone,userId)
            if (retVal.status) {
                this.resetPhoneNumber.phoneNumber = phone;
            }
            return retVal;    
    } catch (error) {
            throw error;
        }finally{    
            this.isUpdating=false;
        }
    }

    setShowPasswordForm():void{
        this.showResetPwdForm = !this.showResetPwdForm;
    }
    setShowEmailForm():void{
        this.showEmailForm = !this.showEmailForm;
    }
    setShowBackupEmailForm():void{
        this.showBackupEmailForm = !this.showBackupEmailForm;
    }
    setShowPhoneNumberForm():void{
        this.showPhoneNumberForm = !this.showPhoneNumberForm;
    }
    setShowFeedbackDialog():void{
        this.showFeedbackDialog = !this.showFeedbackDialog;
    }

    getEmailForFeedback(email:string):void{
        this.feedback.userEmail = email;
    }
    setFeedbackAttachment(url:any):void{
        this.feedbackAttachment = url;
    }
   

    async SubmitFeedback(data:IFeedback):Promise<FeedbackResponse>{
       try {        
           const retVal = await ProfileService.sendFeedback(data,this.feedbackAttachment)
           console.log(this.feedbackAttachment)
           return retVal;
       } catch (error) {
            throw error;
       }
    }
	
}

export const profileStore=new ProfileStore();