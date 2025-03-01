import { ObservableMap } from "mobx"
import { EDBRequestResponse } from "../../../../../shared/EDBRequestResponse"

export interface IChangeRequestStore{
    isSaving:boolean,
    isLoading:boolean,
    approving:boolean,
    selectedChangeRequest:IChangeView,
    changeRequests:ObservableMap<number,IChangeView>,
    selectedChangesTableData:ObservableMap<number,IChangesTableData>,
    showViewDialog:boolean,
    isLoadingTDAta:boolean,
    setSelected():void,
    submitChangeRequest(request:IChangeRequest):Promise<EDBRequestResponse>,
    approveChange(requestId:number):Promise<void>
    deleteChange(requestId:number):Promise<void>
    getAllChangeRequest():Promise<void>
}


export interface IChangeRequest{ 
    changesRequestId?:number,
    usersId:string,
    fieldsModified:string,
    fieldValue:string
    changesType:ChangesType
    ordinationId:number,
}
export interface IChangeView{
    changesRequestId:number,
    usersId:string,
    fieldsModified:string,
    fieldValue:string
    changesType:string
    otherName:string,
    lastName:string,
    fullName:string
    gender:string
    branch:string
    ordinationId:number,
    createdOn:string
}

export interface IChangesTableData{
    modifiedField:string,
    fieldValue:string
}
export interface IChanges{
   field:string,
    value:any
}

export enum ChangesType{
    Profile = 1,
    Ordination = 2,
    NewOrdination=3
}

