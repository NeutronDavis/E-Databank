export interface IProfile{
    [key: string]: any | undefined,
    otherName:string,
    lastName:string,
    email:string,
    phoneNumber:string,
    title: string,
    gender: string,
    maritalStatus:string,
    nationality1:string,
    nationality2:string,
    nationality1Id?:number,
    nationality2Id?:number,
    nameOfSpouse:string,
    occupation:string,
    ordinationRankOfSpouse?:number,
    qualificationId?:number,
    professionId?:number,
    branchId?:number,
    dateOfBirth:string,
    rankId:number,
    principalBandId:number,
    bandId:number,
    yearOfMarriage:number,
    address:string,
    cppInChurch:string,
    noOfChildren:number
  }
export interface IProfileView{
    id:string | undefined,
    otherName:string,
    lastName:string,
    email:string,
    phoneNumber:string,
    title: string,
    gender: string,
    maritalStatus:string,
    nameOfSpouse:string,
    occupation:string,
    ordinationRankOfSpouse?:number,
    qualificationId?:number,
    professionId?:number,
    branchId?:number,
    dateOfBirth:string,
    rankId:number,
    principalBandId:number,
    bandId:number,
    yearOfMarriage:number,
    address:string,
    cppInChurch:string,
    noOfChildren:number

    nationality1:string,
    nationality2:string,
    profession:string,
    qualification:string,
    rankName:string,
    principalBandName:string,
    bandName:string,
    branchName:string,
    rankOfSpouse:string

    lastAccessDate:string,
    isAcountValidated:boolean,
    isAccountLocked:boolean
  }
  
  
  export interface IImage{
      ProfilePics:string
  }

  export interface IFeedbackF {
    userEmail:string,
    feedbackCategory:string,
    feedbackText:string,
    feedbackAttachment:any
}
export interface IFeedback {
    userEmail:string,
    feedbackCategory:string,
    feedbackText:string
}

export type RequestResponse2={
    success:boolean,msg:string,data:any
}
export type RequestResponse={
    success:boolean,msg:string,data:any
}
export type UpdateResponse={
    success:boolean,msg:string
}

export type FeedbackResponse={
    status:boolean,msg:string
}

export type SecurityUpdateResponse={
    status:boolean,msg:string
}
export interface IUpdatePassword{
    oldPassword:string,
    newPassword:string,
}

export interface IPasswordReset{
    oldPassword:string,
    newPassword:string,
    confirmPassword:string,
}
export interface IEmailReset{
    email:string,
}
export interface IPhoneNumberReset{
    phoneNumber:string,
}

export type securityResponse={
    success:boolean,data:any
}


export interface IProfileStore{
   
showBasicSettingsForm:boolean
	isUploading:boolean,
	isUpdating:boolean;
	showProfileForm:boolean;
	showSettingsDialog:boolean;
	isLoadingSecuritySetUp:boolean;
    profileImg:any;
    basicProfile:IProfile;
	//Security
    showPhoneNumberForm:boolean,
    showEmailForm:boolean,
    showResetPwdForm:boolean,
    isUpdatingBackUpEmail:boolean,

    messagAndEmailFormat:boolean,
    SecurityEmail:boolean,
    notificationTrail:boolean,
    accountPassword:boolean,
	
    isLoading:boolean;
  
    resetPassword:IPasswordReset;
    resetEmail:IEmailReset;
    resetBackupEmail:IEmailReset;
    resetPhoneNumber:IPhoneNumberReset;
    feedback:IFeedback,
    getProfile(userId:string):Promise<RequestResponse>,
    updateBasicProfile(basicData:IProfile,userId:string):Promise<RequestResponse>,
    uploadProfileImg(imageInfo:any,userId:string):Promise<boolean>
     
    // security
    getSecurityInfo(userId:string):Promise<boolean>,
    updateProfilePwd(pwdData:IUpdatePassword,userId:string):Promise<boolean>,
    updateProfileEmail(email:string,userId:string):Promise<SecurityUpdateResponse>,
    updateProfilePhoneNumber(phone:string,userId:string):Promise<SecurityUpdateResponse>,
    setShowPasswordForm():void,
    setShowEmailForm():void,
    setShowPhoneNumberForm():void,
    setShowFeedbackDialog():void,
    getEmailForFeedback(email:string):void
    updateBackupEmail(email:string,userId:string):Promise<SecurityUpdateResponse>
}

  //payment types///
  export interface IDebitCardValue{
    DebitNameOnCard:string,
    DebitCardNumber:string,
    DebitCardExpiry:string,
    DebitCardType:string,
    DebitCVVNumber:string,
}
export interface ICreditCardValue{
    CreditNameOnCard:string,
    CreditCardNumber:string,
    CreditCardExpiry:string,
    CreditCardType:string,
    CreditCVVNumber:string,
}
export interface IBankAccountValue{
  BankName:string,
  AccountName:string,
  AccountNumber:string
}
export interface IPaypalId{
    PayPalEmailId:string
}
export interface IUserId{
    userId:any
}

export type DataResponse={
    success:boolean,data:any
}

export type MainDataResponse={
    success:boolean
}
export type DbDataResponse={
    success:boolean,
    msg:string
}
export interface IPaymentStore{
    showProfileDialog:boolean,
    isLoading:boolean,
    isUpdating:boolean,
	isAdding:boolean,
    showDebitCardSettingsForm:boolean,
    showCreditCardSettingsForm:boolean,
    showBankAccountSettingsForm:boolean,
    showPayPalSettingsForm:boolean,
    debitLabel:boolean,
    creditLabel:boolean,
    bankLabel:boolean,
    paypalLabel:boolean,

    debitCard:IDebitCardValue,
	creditCard:ICreditCardValue,
    bankAccount:IBankAccountValue,
    payPalId:IPaypalId,

    addOrUpdate:string,

    paymentInfo:(userPassword:string)=>Promise<MainDataResponse> ,
    updateCreditCard:(creditCardInfo:ICreditCardValue,userPassword:string)=>Promise<MainDataResponse> ,
    updateDebitCard:(debitCardInfo:IDebitCardValue,userPassword:string) =>Promise<MainDataResponse> ,
    updateBankInfo:(bankInfo:IBankAccountValue,userPassword:string)=>Promise<MainDataResponse> ,
    updatePaypalInfo:(paypalId:IPaypalId,userPassword:string)=>Promise<MainDataResponse> ,
   
    addCreditCard:(creditCardInfo:ICreditCardValue,userPassword:string)=>Promise<MainDataResponse> ,
    addDebitCard:(debitCardInfo:IDebitCardValue,userPassword:string) =>Promise<MainDataResponse> ,
    addBankInfo:(bankInfo:IBankAccountValue,userPassword:string)=>Promise<MainDataResponse> ,
    addPaypalInfo:(paypalId:IPaypalId,userPassword:string)=>Promise<MainDataResponse>,

    setDebitModifyLink():void,
    setCreditModifyLink():void,
    setBankModifyLink():void,
    setPaypalModifyLink():void,

    setDebitLabel():Promise<void>,
    setCreditLabel():Promise<void>,
    setBankLabel():Promise<void>,
    setPayPalLabel():Promise<void>,
  
}