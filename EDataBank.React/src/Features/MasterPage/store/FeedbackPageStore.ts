import { makeAutoObservable } from "mobx"
import {FeedbackService} from "../services/FeedbackService"


export type Response={
    status:boolean,data:any
}
export type UpdateResponse={
    status:boolean,msg:string
}

export interface ISingleFeedback{
    feedbackActionTaken:string
    feedbackAttachment:any,
    feedbackCategory:string,
    feedbackId:number,
    feedbackOpenDate: string,
    feedbackStatus: number,
    feedbackStatusChangeDate: string,
    feedbackText: string,
    userEmail: string,
}

export interface IActionTaken{
    feedbackActionTaken:string
}

export interface IFeedbackPageStore{
    isLoading1:boolean,
    isLoading:boolean,
    showFeedbackModel:boolean,
    actionTaken:IActionTaken,
    feedbackId:number,
    feedbackData:any[],
    singleFeedback:ISingleFeedback,
    getProfile():Promise<boolean>,
    feedbackAction(feedbackText:IActionTaken,feedbackId:number,submitType:string):Promise<UpdateResponse> ,
    updateFeedbackId(id:number):void,
    setFeedbackModel():void,
    setSingleFeedback():void,
    setFeedbackStatus(status:number,msg:string):void,
    setFeedbackChatData():any
   
}

const singleFeedback = {
    feedbackActionTaken:"",
    feedbackAttachment:"",
    feedbackCategory:"",
    feedbackId:0,
    feedbackOpenDate:"",
    feedbackStatus:0,
    feedbackStatusChangeDate:"",
    feedbackText:"",
    userEmail:"",
}

const actionTaken:IActionTaken={
    feedbackActionTaken:""
}
class FeedbackPageStore implements IFeedbackPageStore{
    isLoading=false;
    isLoading1=false;
    showFeedbackModel=false;
    actionTaken = actionTaken;
    feedbackId=0;
    singleFeedback=singleFeedback;
    feedbackData:any[] =[];
    constructor(){   
        makeAutoObservable(this);
    }

    async getProfile():Promise<boolean> {
        try {
            this.isLoading1=true;
            const retVal=  await FeedbackService.allFeedback();
            
			this.feedbackData = retVal.data;
            // console.log(retVal)
            return retVal.status;
            
        } catch (error) {
            throw error;
        }finally{
            this.isLoading1=false;
        }
    }
    async feedbackAction(feedbackText:IActionTaken,feedbackId:number,submitType:string):Promise<UpdateResponse> {
        try {
      
            this.isLoading=true;
            const retVal=  await FeedbackService.updateFeedback(feedbackText.feedbackActionTaken,feedbackId,submitType);

            if (retVal.status) {
                this.actionTaken.feedbackActionTaken=feedbackText.feedbackActionTaken;
            }
            // console.log(retVal)
            return retVal;
            
            
        } catch (error) {
            throw error;
        }finally{
            this.isLoading=false;
        }
    }

    updateFeedbackId(id:number):void{
        this.feedbackId = id;
    }
    setFeedbackModel():void{
        this.showFeedbackModel = !this.showFeedbackModel;
    }
    setSingleFeedback():void{
        let single = this.feedbackData.find((e:ISingleFeedback)=>e.feedbackId === this.feedbackId);
        this.singleFeedback = single;
        this.actionTaken.feedbackActionTaken = single.feedbackActionTaken?single.feedbackActionTaken:"";
    }
    setFeedbackStatus(status:number,msg:string):void{
        let index = this.feedbackData.findIndex((e:ISingleFeedback)=>e.feedbackId === this.feedbackId);
        this.feedbackData[index].feedbackStatus = status;
        this.feedbackData[index].feedbackActionTaken = msg;
        
    }
    setFeedbackChatData():any{
        let open = [];
        let inProgress = [];
        let close = [];

        for (let index = 0; index < this.feedbackData.length; index++) {
            if (this.feedbackData[index].feedbackStatus === 1) {
                open.push(this.feedbackData[index].feedbackStatus === 1)
            }else if(this.feedbackData[index].feedbackStatus === 2){
                inProgress.push(this.feedbackData[index].feedbackStatus === 2)
            }else{
                close.push(this.feedbackData[index].feedbackStatus === 3)
            }
        }

        let data = [
            {
              type: 'Open',
              value:open.length === 0?0:open.length
            },
            {
              type: 'In Progress',
              value: inProgress.length === 0?0:inProgress.length
            },
            {
              type: 'Close',
              value: close.length === 0?0:close.length
            }           
          ];
          return data;
        
    }

}


export const feedbackPageStore=new FeedbackPageStore();