import { client } from "../../../Infrastructure/agent";
import {DataResponse,DbDataResponse,IDebitCardValue,ICreditCardValue,IBankAccountValue,IPaypalId } from "../types/interface";

export const PaymentService={

    //get details
	paymentDetails: (userId:string):Promise<DataResponse> =>
    client.post("/PaymentProfile/loadUserPaymentProfile",{userId}),

    //update
    updateCreditCard: (creditCardData:ICreditCardValue,userId:string):Promise<DbDataResponse> =>
    client.post("/paymentProfile/creditCard", {creditCardData,userId}),

    updateDebitCard: (debitCardData:IDebitCardValue,userId:string):Promise<DbDataResponse> =>
    client.post("/paymentProfile/debitCard",{debitCardData,userId}),

    updateBankInfo: (bankData:IBankAccountValue,userId:string):Promise<DbDataResponse> =>
    client.post("/paymentProfile/bankAccount",{bankData,userId}),

    updatePaypalInfo: (paypalInfo:IPaypalId,userId:string):Promise<DbDataResponse> =>
    client.post("/paymentProfile/paypal", {paypalInfo,userId}),
	
	
	//add
	addCreditCard: (creditCardData:ICreditCardValue,userId:string):Promise<DbDataResponse> =>
    client.post("/paymentProfile/addCreditCard", {creditCardData,userId}),

    addDebitCard: (debitCardData:IDebitCardValue,userId:string):Promise<DbDataResponse> =>
    client.post("/paymentProfile/addDebitCard",{debitCardData,userId}),

    addBankInfo: (bankData:IBankAccountValue,userId:string):Promise<DbDataResponse> =>
    client.post("/paymentProfile/addBankAccount",{bankData,userId}),

    addPaypalInfo: (paypalInfo:IPaypalId,userId:string):Promise<DbDataResponse> =>
    client.post("/paymentProfile/addPayPal", {paypalInfo,userId}),
	
}