import { makeAutoObservable } from "mobx"


import { PaymentService } from "../services/paymentService";
import { 
    IBankAccountValue,
    ICreditCardValue,
    IDebitCardValue,
    IPaypalId,
    MainDataResponse,
    IPaymentStore
} from '../types/interface';




let debitCard:IDebitCardValue = {
    DebitNameOnCard:"",
    DebitCardNumber:"",
    DebitCardExpiry:"",
    DebitCardType:"",
    DebitCVVNumber:"",
};

let creditCard:ICreditCardValue = {
    CreditNameOnCard:"",
    CreditCardNumber:"",
    CreditCardExpiry:"",
    CreditCardType:"",
    CreditCVVNumber:"",
};

let bankAccount:IBankAccountValue ={
    BankName:"",
    AccountName:"",
    AccountNumber:""
};

let payPal:IPaypalId= {
    PayPalEmailId:""
};

class PaymentStore implements IPaymentStore{
    showProfileDialog=false;

    isLoading:boolean;
    isUpdating:boolean;
	isAdding:boolean;
    addOrUpdate:string ="add";
    showDebitCardSettingsForm=false;
    showCreditCardSettingsForm=false;
    showBankAccountSettingsForm=false;
    showPayPalSettingsForm=false;

    debitCard =debitCard;
    creditCard = creditCard;
    bankAccount=bankAccount;
    payPalId = payPal;

    debitLabel=false;
    creditLabel=false;
    bankLabel=false;
    paypalLabel=false;
   
    constructor(){
        this.isLoading=false;
        this.isUpdating = false;
		this.isAdding = false;
        makeAutoObservable(this);
    }

    async paymentInfo(userId:string):Promise<MainDataResponse>  {
        try {
            this.isLoading=true;
            const retVal=  await PaymentService.paymentDetails(userId)
            if (retVal.success) {
                this.debitCard.DebitNameOnCard = retVal.data.debitNameOnCard
                this.debitCard.DebitCardNumber = retVal.data.debitCardNumber
                this.debitCard.DebitCardType = retVal.data.debitCardType
                this.debitCard.DebitCardExpiry = retVal.data.debitCardExpiry
                this.debitCard.DebitCVVNumber = retVal.data.debitCVVNumber
    
                this.creditCard.CreditNameOnCard = retVal.data.creditNameOnCard
                this.creditCard.CreditCardNumber = retVal.data.creditCardNumber
                this.creditCard.CreditCardType = retVal.data.creditCardType
                this.creditCard.CreditCardExpiry = retVal.data.creditCardExpiry
                this.creditCard.CreditCVVNumber = retVal.data.creditCVVNumber
    
                this.bankAccount.AccountName = retVal.data.accountName
                this.bankAccount.BankName = retVal.data.bankName
                this.bankAccount.AccountNumber = retVal.data.accountNumber
    
                this.payPalId.PayPalEmailId = retVal.data.payPalEmailId

                this.addOrUpdate = retVal.data.userId === userId?"update":"add";

            }

            return {"success":retVal.success};
               
        } catch (error) {
            throw error;
        }finally{
            this.isLoading=false;
        }
    }
   

    async updateCreditCard(creditCardInfo:ICreditCardValue,userId:string):Promise<MainDataResponse>  {
        try {
            this.isUpdating=true;
            const retVal=  await PaymentService.updateCreditCard(creditCardInfo,userId)
            if (retVal.success) {
                this.creditCard.CreditNameOnCard = creditCardInfo.CreditNameOnCard;
                this.creditCard.CreditCardNumber = creditCardInfo.CreditCardNumber;
                this.creditCard.CreditCardType = creditCardInfo.CreditCardType;
                this.creditCard.CreditCardExpiry = creditCardInfo.CreditCardExpiry;
                this.creditCard.CreditCVVNumber = creditCardInfo.CreditCVVNumber;
            }

            return {"success":retVal.success};
            
        } catch (error) {
            throw error;
        }finally{
            this.isUpdating=false;
        }
    }
    async updateDebitCard(debitCardInfo:IDebitCardValue,userId:string):Promise<MainDataResponse>  {
        try {
            this.isUpdating=true;
            const retVal=  await PaymentService.updateDebitCard(debitCardInfo,userId)
            if (retVal.success) {
                this.debitCard.DebitNameOnCard = debitCardInfo.DebitNameOnCard;
                this.debitCard.DebitCardNumber = debitCardInfo.DebitCardNumber;
                this.debitCard.DebitCardType = debitCardInfo.DebitCardType;
                this.debitCard.DebitCardExpiry = debitCardInfo.DebitCardExpiry;
                this.debitCard.DebitCVVNumber = debitCardInfo.DebitCVVNumber;

            }

            return {"success":retVal.success};
            
        } catch (error) {
            throw error;
        }finally{
            this.isUpdating=false;
        }
    }
    async updateBankInfo(bankInfo:IBankAccountValue,userId:string):Promise<MainDataResponse>  {
        try {
            this.isUpdating=true;
            const retVal=  await PaymentService.updateBankInfo(bankInfo,userId)
            if (retVal.success) {
                
                this.bankAccount.AccountName = bankInfo.AccountName;
                this.bankAccount.BankName = bankInfo.BankName;
                this.bankAccount.AccountNumber = bankInfo.AccountNumber;
            }

            return {"success":retVal.success};
            
        } catch (error) {
            throw error;
        }finally{
            this.isUpdating=false;
        }
    }
    async updatePaypalInfo(paypalId:IPaypalId,userId:string):Promise<MainDataResponse>  {
        try {
            this.isUpdating=true;
            const retVal=  await PaymentService.updatePaypalInfo(paypalId,userId)
            if (retVal.success) {          
                this.payPalId.PayPalEmailId = paypalId.PayPalEmailId
            }
           
            return {"success":retVal.success};
            
        } catch (error) {
            throw error;
        }finally{
            this.isUpdating=false;
        }
    }
	//add
	    async addCreditCard(creditCardInfo:ICreditCardValue,userId:string):Promise<MainDataResponse>  {
        try {
            this.isAdding=true;
            const retVal=  await PaymentService.addCreditCard(creditCardInfo,userId)
            if (retVal.success) {
                this.creditCard.CreditNameOnCard = creditCardInfo.CreditNameOnCard;
                this.creditCard.CreditCardNumber = creditCardInfo.CreditCardNumber;
                this.creditCard.CreditCardType = creditCardInfo.CreditCardType;
                this.creditCard.CreditCardExpiry = creditCardInfo.CreditCardExpiry;
                this.creditCard.CreditCVVNumber = creditCardInfo.CreditCVVNumber;
         
            }

            return {"success":retVal.success};
            
        } catch (error) {
            throw error;
        }finally{
            this.isAdding=false;
        }
    }
    async addDebitCard(debitCardInfo:IDebitCardValue,userId:string):Promise<MainDataResponse>  {
        try {
            this.isAdding=true;
            const retVal=  await PaymentService.addDebitCard(debitCardInfo,userId)
            if (retVal.success) {
                this.debitCard.DebitNameOnCard = debitCardInfo.DebitNameOnCard;
                this.debitCard.DebitCardNumber = debitCardInfo.DebitCardNumber;
                this.debitCard.DebitCardType = debitCardInfo.DebitCardType;
                this.debitCard.DebitCardExpiry = debitCardInfo.DebitCardExpiry;
                this.debitCard.DebitCVVNumber = debitCardInfo.DebitCVVNumber;
              
            }

            return {"success":retVal.success};
            
        } catch (error) {
            throw error;
        }finally{
            this.isAdding=false;
        }
    }
    async addBankInfo(bankInfo:IBankAccountValue,userId:string):Promise<MainDataResponse>  {
        try {
            this.isAdding=true;
            const retVal=  await PaymentService.addBankInfo(bankInfo,userId)
            if (retVal.success) {
                this.bankAccount.AccountName = bankInfo.AccountName;
                this.bankAccount.BankName = bankInfo.BankName;
                this.bankAccount.AccountNumber = bankInfo.AccountNumber;          
            }

            return {"success":retVal.success};
            
        } catch (error) {
            throw error;
        }finally{
            this.isAdding=false;
        }
    }
    async addPaypalInfo(paypalId:IPaypalId,userId:string):Promise<MainDataResponse>  {
        try {
            this.isAdding=true;
            const retVal=  await PaymentService.addPaypalInfo(paypalId,userId)
            if (retVal.success) {
                this.payPalId.PayPalEmailId = paypalId.PayPalEmailId;          
            }

            return {"success":retVal.success};;
            
        } catch (error) {
            throw error;
        }finally{
            this.isAdding=false;
        }
    }

    setDebitModifyLink():void{
        this.showDebitCardSettingsForm = !this.showDebitCardSettingsForm;
    }
    setCreditModifyLink():void{
        this.showCreditCardSettingsForm = !this.showCreditCardSettingsForm;
    }
    setBankModifyLink():void{
        this.showBankAccountSettingsForm = !this.showBankAccountSettingsForm;
    }
    setPaypalModifyLink():void{
        this.showPayPalSettingsForm = !this.showPayPalSettingsForm;
    }

    async setDebitLabel():Promise<void>{
        if (this.debitCard.DebitCardNumber) {
            this.debitLabel = true;
        }
    }
    async setCreditLabel():Promise<void>{
        if (this.creditCard.CreditCardNumber) {
            this.creditLabel = true;
        }
    }
    async setBankLabel():Promise<void>{
        if (this.bankAccount.AccountNumber) {
            this.bankLabel = true;
        }
    }
    async setPayPalLabel():Promise<void>{
        if (this.payPalId.PayPalEmailId) {
            this.paypalLabel = true;
        }
    }

}

export const paymentStore=new PaymentStore();
