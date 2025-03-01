import { ObservableMap, makeAutoObservable } from "mobx";
import { EDBRequestResponse } from "../../../shared/EDBRequestResponse";
import { CalculateMemberInProvinceForPie, IDashboardStore, IMaleAndFemaleCountInProvince, ITotalMembersMaleAndFemale,IAdvisoryBoard} from "../types/interfaces";
import { dashboardServices } from "../services/dashboardService";
import { table } from "console";

class DashboardStore implements IDashboardStore{
     isLoading=false;
     totals:ITotalMembersMaleAndFemale = {} as ITotalMembersMaleAndFemale;
     provinceTotalMaleAndFemale = new ObservableMap<number,IMaleAndFemaleCountInProvince>();
     membersInProvinceForPie = new ObservableMap<number,CalculateMemberInProvinceForPie>();
     advisoryBoardMemberInfo = new ObservableMap<number,IAdvisoryBoard>();
    maximumNumberForPieData:number = 0;
    selectedTap:string = "1";
    constructor(){   
       makeAutoObservable(this);
    }
    ;
   
 async getAllDashboardData():Promise<void> {
  try {
    this.isLoading = true;
    const res = await dashboardServices.getDashData();
    if (res.success) {
        let {totals,mfcip,cmpfp,boardInfo} = res.data;

        if(totals !== null || totals !== undefined){
            this.totals = totals as ITotalMembersMaleAndFemale;
        }

        if(mfcip.length > 0){
            mfcip.forEach((d:IMaleAndFemaleCountInProvince,index:number) => {
              this.provinceTotalMaleAndFemale.set(index,d);
            });
        }

        if(cmpfp.length > 0){
           cmpfp.forEach((d:CalculateMemberInProvinceForPie,index:number) => {
              this.membersInProvinceForPie.set(index,d);
            });
        }

        if(boardInfo.length > 0){
          boardInfo.forEach((d:IAdvisoryBoard,index:number) => {
              this.advisoryBoardMemberInfo.set(index,d);
            });
        }
    }

  } catch (error) {
    throw error;
  }finally{
    this.isLoading = false;
  }
}


}

const dashboardStore=new DashboardStore();
export default  dashboardStore;