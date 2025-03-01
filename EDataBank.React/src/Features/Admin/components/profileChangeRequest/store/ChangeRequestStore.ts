import { RcFile } from "antd/lib/upload";
import { ObservableMap, makeAutoObservable, remove, toJS } from "mobx";
import { EDBRequestResponse } from "../../../../../shared/EDBRequestResponse";
import { IChangeRequest, IChangeView, IChangeRequestStore, IChangesTableData } from "../types/interface";
import { ChangeRequestService } from "../service/ChangeRequestService";
import { string } from "yup";


const _ = require("underscore");

class ChangeRequestStore implements IChangeRequestStore{
    isSaving:boolean = false;
    isLoading:boolean = false;
    approving:boolean = false;
    selectedChangeRequest:IChangeView = {} as IChangeView;
    changeRequests = new ObservableMap<number,IChangeView>();
    selectedChangesTableData = new ObservableMap<number,IChangesTableData>();
    showViewDialog:boolean = false;
    isLoadingTDAta:boolean = false;


    constructor(){   
        makeAutoObservable(this);
        
    }

    setSelected():void{
        this.isLoadingTDAta = true
        this.selectedChangesTableData.clear();
       let fields =  this.selectedChangeRequest.fieldsModified.split(",")
       let values =  this.selectedChangeRequest.fieldValue.split(",")
       fields.forEach((f:string,i:number)=>{
            this.selectedChangesTableData.set(i,{modifiedField:f,fieldValue:values[i]})
       })
       this.isLoadingTDAta = false
    }

    async submitChangeRequest(request:IChangeRequest):Promise<EDBRequestResponse>{
        try {
            this.isSaving = true
            const retVal =  await ChangeRequestService.submitChangesRequest(request);
            return retVal;
        } catch (error) {
            throw error;
        }finally{
            this.isSaving = false;
        }
    }
    async approveChange(requestId:number):Promise<void>{
        try {
            this.approving = true
            const retVal =  await ChangeRequestService.approveRequest(requestId);
            remove<number, IChangeView>(this.changeRequests,requestId)
        } catch (error) {
            throw error;
        }finally{
            this.approving = false;
        }
    }
    async deleteChange(requestId:number):Promise<void>{
        try {
            this.isLoading = true
            const retVal =  await ChangeRequestService.declineRequest(requestId);
            remove<number, IChangeView>(this.changeRequests,requestId)
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }

    async getAllChangeRequest():Promise<void>{
        try {
            this.isLoading = true;
            const retVal =  await ChangeRequestService.getChangesRequests();
            if(retVal.success){
                retVal.data.forEach((c:IChangeView) => {
                    this.changeRequests.set(c.changesRequestId,c)
                });
            }
        } catch (error) {
            throw error;
        }finally{
            this.isLoading = false;
        }
    }
   

}


export const changeRequestStore=new ChangeRequestStore();