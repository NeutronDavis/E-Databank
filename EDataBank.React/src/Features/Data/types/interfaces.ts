import { ObservableMap } from "mobx"

export interface IDashboardStore{
    isLoading:boolean,
    totals:ITotalMembersMaleAndFemale,
    provinceTotalMaleAndFemale:ObservableMap<number,IMaleAndFemaleCountInProvince>,
    membersInProvinceForPie:ObservableMap<number,CalculateMemberInProvinceForPie>,
    advisoryBoardMemberInfo:ObservableMap<number,IAdvisoryBoard>,
    maximumNumberForPieData:number,
    selectedTap:string,
    getAllDashboardData():Promise<void>
}
export interface IAdvisoryBoard{
    title:string,
    otherName:string,
    lastName:string,
    currentPosition:string,
    rank:string,
    rankOrder:number,
    pic:string

}

export interface ITotalMembersMaleAndFemale{
    total:number,
    male:number,
    female:number
}
export interface IMaleAndFemaleCountInProvince{
    provinceName:string,
    male:number,
    female:number
}
export interface CalculateMemberInProvinceForPie{
    provinceName:string,
    members:number,
    membersDivTotalMembers:number
    membersDivTotalMembersMulByThreeSixty:number
}
export interface IPieChartReturn{
    name:string,
    y:number,
    sliced: boolean,
    selected: boolean
}

export interface IMemberOrdinationStore{
    isLoading:boolean,
    selectedOrdination:IOrdinationView,
    ordinations:ObservableMap<number,IOrdinationView>,
    showEditDialog:boolean,
    showAddDialog:boolean,
    getOrdination(memberId:string):Promise<void>
}
export interface IEditOrdination{
    rankId:number,
    nextRankId:number
    year:number,
}
export interface IOrdinationView{
    [key: string]: any | undefined,
    ordinationId:number,
    rankId:number,
    nextRankId:number
    year:number,
    usersId:string,
    branchId:number,
    rankOrder:number
    fullName:string
    gender:string
    rankName:string
    nextRank:string
    branchName:string
}

