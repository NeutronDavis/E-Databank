import { ObservableMap, makeAutoObservable } from "mobx";
import { EDBRequestResponse } from "../../../shared/EDBRequestResponse";
import { CalculateMemberInProvinceForPie, IDashboardStore, IMaleAndFemaleCountInProvince, IMemberOrdinationStore, IOrdinationView, ITotalMembersMaleAndFemale } from "../types/interfaces";
import { dashboardServices } from "../services/dashboardService";
import { table } from "console";
import { memberOrdinationService } from "../services/memberOrdinationService";

class MemberOrdinationStore implements IMemberOrdinationStore{
     isLoading=false;
     selectedOrdination:IOrdinationView = {} as IOrdinationView;
     ordinations = new ObservableMap<number,IOrdinationView>();
    showEditDialog:boolean = false;
    showAddDialog:boolean = false;
    
    constructor(){   
       makeAutoObservable(this);
    }
    ;
   
 async getOrdination(memberId:string):Promise<void> {
  try {
    this.isLoading = true;
    const res = await memberOrdinationService.getMemberOrdination(memberId);
    if (res.success) {
        this.ordinations.clear();
        res.data.forEach((d:IOrdinationView) => {
          this.ordinations.set(d.ordinationId,d);
        });   
    }
  } catch (error) {
    throw error;
  }finally{
    this.isLoading = false;
  }
}


}

const memberOrdinationStore=new MemberOrdinationStore();
export default  memberOrdinationStore;