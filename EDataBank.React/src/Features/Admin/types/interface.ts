import { EventInput } from "@fullcalendar/react";
import { ObservableMap } from "mobx";
import { boolean } from "yup/lib/locale";

import { IRegister } from "../../../Utility/Validations/HomeValidations";
import { IHomeStore, IUser } from "../../Home/types/interfaces";
import { EDBRequestResponse } from "../../../shared/EDBRequestResponse";
import { number } from "yup";
import { IProfileView } from "../../Profile/types/interface";
import { IOrdinationView } from "../../Data/types/interfaces";
import { PermissionGroup, UserGroup } from "../../MasterPage/types/Interfaces";
import { StringifyOptions } from "querystring";



export interface IGroup {
    groupId: number,
    name?: string,
    description?: string,
    copyFromGroupId?: number

}

export interface IUserGroup {
    userId: string,
    facilityId: number,
    groupId: number,
}
export interface IFacilityUserGroup {
    userId: string,
    facilityId: number,
    groupId: number,
    groupName: string
}

export interface IAssignedFacility {
    facilityId: number
    name: string,
    phone: string
    email: string
    address: string
    state: string
    city: string
    facilityLogo: string
    lastAccessed: string
    description: string
    author: string
    createdOn: string
}
export interface IAdminStore {
    isLoading: boolean;
    isLoadingReport: boolean;
    isLoadingReportData: boolean;
    isLoadingGroup: boolean;
    isSaving: boolean;
    isRemoving: boolean;
    isDownloading: boolean;
    showGroupsDialog: boolean;
    groups: ObservableMap<number, IGroup>;
    selectedGroup: IGroup,

    users: ObservableMap<string, IUserData>;


    assignedFacility: ObservableMap<number, IAssignedFacility>,
    user: IUserData,

    facilityGroupService: IFacilityRole,
    facilityGroupServices: ObservableMap<number, IFacilityRole>,
    groupServices: ObservableMap<number, number>,
    selectedGroupName: string,
    userAssignService: ObservableMap<number, FacilityService>,
    showGroupAssignDialog: boolean,
    allUserGroup: ObservableMap<number, IUserGroup>
    selectedTap: string,
    showMemberRegistrationDialog: boolean,
    showCathedralAddDialog: boolean,
    showCmcAddDialog: boolean,
    showProvinceAddDialog: boolean,
    showDistrictAddDialog: boolean,
    showBranchAddDialog: boolean,
    showRankAddDialog: boolean,
    showPriorityAddDialog: boolean,
    isInEditMode: boolean,
    openUploadPanel: boolean,
    selectedBranchForUpload: IBranch,
    selectedMemberUploadedData: IMemberUpload,
    selectedOrdinationUploadedData: IOrdinationUpload,
    memberUploadRowSelected: boolean,
    selectedUploadPivotKey: any,
    memberUploadedData: ObservableMap<number, IMemberUpload>,
    ordinationUploadedData: ObservableMap<number, IOrdinationUpload>,
    ordinationReportData: ObservableMap<number, IMemberOrdination>,
    memberReportData: ObservableMap<number, IMemberReport>,
    queryData: IQueryData,
    ordinationQueryData: IQueryData,
    queryDisplayData: IQueryDisplayData,
    openQueryReportDialog: boolean,
    openOrdinationQueryReportDialog: boolean,
    openProvincialQueryReportDialog: boolean,
    openOrdinationProgressionReportDialog: boolean,
    isLoadingP: boolean,
    openProvincialOrdinationQueryReportDialog: boolean,
    genderValue: string,
    genderValueForRefresh: string,
    branchValueForRefresh: number | undefined,
    provinceValueForRefresh: number | undefined,

    ordinationQueryDisplayData: IQueryDisplayData,
    genderOrdinationValue: string,
    genderOrdinationValueForRefresh: string,
    branchOrdinationValueForRefresh: number | undefined,
    provinceOrdinationValueForRefresh: number | undefined,

    selectedCmc: number | undefined,
    selectedProvince: string | undefined,
    selectedDistrict: string | undefined,
    selectedBranch: string | undefined,
    selectedGender: string | undefined,
    searchedMembers: ObservableMap<string, IProfileView>,
    selectedMemberFromSearch: IProfileView,
    selectedMemberOrdinationFromSearch: ObservableMap<number, IOrdinationView>,
    isSearching: boolean,
    isLoadingSearchedInfo: boolean,
    isUpdatingOrdination: boolean,
    isRemovingOrdination: boolean,
    showOrdinationDialog: boolean,
    isUpdatingMemberRole: boolean,
    selectedOrdination: IOrdinationView,
    pic: string,
    role: PermissionGroup,
    errorModels: ObservableMap<number, ErrorModel>,
    uploadInfo: IUploadInfo,
    selectedBranchForGeneralReportReport: IBranch,
    selectedBranchIdForGeneralReportReport: number,
    selectedProfessionIdForGeneralReportReport: number,
    selectedProfOption: string,
    selectedProfOptionProf: string,
    isLoadingGeneralReport: boolean,
    showCurrentUploadDialog: boolean,
    branchInfoForReport: IBranchView,
    reportTableContent: ObservableMap<number, IReportTableInfo>,
    isUploaded: boolean,
    memberGeneralReportData: ObservableMap<number, IMemberGeneralReport>,
    selectedUploadAnalysis: IUploadAnalysis,
    uploadAnalysis: ObservableMap<number, IUploadAnalysis>,
    selectedBranchIdFromAnalysis: number | undefined,
    isLoadingUploadAnalysis: boolean,
    duplicateAvailable: boolean,
    ordinationProgressionQuery: IOrdinationProgressionInput,
    provinceSwitchVal: string,
    branchSwitchVal: string,
    yearSwitchVal: string,
    rankSwitchVal: string,
    provinceVal: number,
    branchVal: number,
    yearVal: number,
    rankVal: string,
    isDownloadingTemplate: boolean,
    ordinationProgression: ObservableMap<number, IOrdinationProgressionView>,
    reportRank: string,
    reportYear: number,
    getAllUploadAnalysis(): Promise<void>,
    removeMemberRecordsViaUploadAnalysis(branchId: number): Promise<void>,
    getOrdinationProgressionReport(provinceId: number, branchId: number, rank: string, year: number): Promise<void>,
    downloadOrdinationProgressionReport(provinceId: number, branchId: number, rank: string, year: number): Promise<void>,
    genReport(branchId: number, professionId: number): Promise<void>,
    genReportByRankAndYear(rank: string, year: number): Promise<void>,
    updateMemberRole(userId: string, roleType: number): Promise<void>,
    updateOrdination(ordination: IOrdination): Promise<void>,
    removeOrdination(ordinationId: number): Promise<void>
    getSearchedMemberInfo(userId: string): Promise<void>,
    search(searchStr: string): Promise<void>,
    downloadMembersTemplate(): Promise<void>,
    downloadOrdinationTemplate(): Promise<void>,
    addSaveUploadedDataToStore(data: Array<IMemberUpload>): void,
    registerMemberFromSystem(userData: IUser): Promise<EDBRequestResponse>,
    ordinationReport(branchId: number, gender: string): Promise<void>,
    memberReport(branchId: number, gender: string): Promise<void>,
    geAllUserGroups(): Promise<EDBRequestResponse>,

    downloadMembersTemplate(): Promise<void>,
    downloadOrdinationTemplate(): Promise<void>,
    memberUpload(memberData: Array<IMemberUpload>, branchId: number, uploadInfo: IUploadInfo, userId: string): Promise<EDBRequestResponse>,
    ordinationUpload(ordinationData: Array<IOrdinationUpload>): Promise<EDBRequestResponse>,
    getAllGroup(): Promise<EDBRequestResponse>,
    getAUser(userId: string): Promise<EDBRequestResponse>,
    saveGroup(group: IGroup): Promise<EDBRequestResponse>
    removeGroup(group: IGroup): Promise<EDBRequestResponse>
    userAccount: IUserAccount,
    searchUser(searchTerms: string, searchCategory: string): Promise<EDBRequestResponse>,
    selectedGroupIds: Array<number>,
    registerSatff(userId: string, facilityId: number, groupIds: Array<number>): Promise<EDBRequestResponse>,
    sendInivite(email: string): Promise<EDBRequestResponse>,

    lockUserAccout(userId: string): Promise<EDBRequestResponse>,
    getAllUsers(): Promise<EDBRequestResponse>,
    reInitalizePermissions(): Promise<EDBRequestResponse>,
    ///permissions and priviledges
    permissions: ObservableMap<number, Permission>
    isLoadinggrouppermissions: boolean,
    getGroupPermissions(groupId: number): Promise<EDBRequestResponse>,
    isLoadingUsersInGroup: boolean,
    isLoadingUsersInAGroup: boolean,
    usersInGroup: ObservableMap<string, IUserData>,
    usersInAGroup: ObservableMap<string, IUserData>,

    getUsersInAGroup(groupId: number): Promise<void>,
    removeUserFromGroup(userId: string, groupId: number, facilityId: number): Promise<EDBRequestResponse>,
    showAddUserToGroupDialog: boolean,
    isAddingUserToGroup: boolean,
    isloadingUserGroups: boolean,
    isloadingUserPermissions: boolean
    isFetching: boolean,
    showRevenueDialog: boolean,
    editMode: boolean,
    addUsersToGroup(users: Array<IUserData>, groupId: number, facilityId: number): Promise<EDBRequestResponse>,
    getUserGroups(userId: string, facilityId: number): Promise<IGroup[]>,
    getUserPermissions(userId: string, facilityId: number): Promise<EDBRequestResponse>,
    userPermissions: ObservableMap<number, Privilege>,
    userGroups: ObservableMap<number, IGroup>,
    allGroup: ObservableMap<number, IGroup>,
    downloadBranchTemplate(branchId: number, professionId: number): Promise<void>,
    provincialMemberReport(provinceId: number, professionId: number): Promise<void>

}

export interface IOrdinationProgressionInput {
    provinceId: number,
    branchId: number,
    rank: string,
    year: number
}
export interface IOrdinationProgressionView {
    fullName: string,
    gender: string,
    branchName: string,
    rankName: string,
    rankYear: number,
    nextRank: string,
    nextRankYear: number,
    yearsFromNow: number,
    description: string
}

export interface IQueryData {
    cmc: number | undefined,
    provinceId: number | undefined,
    districtId: number | undefined,
    branchId: number | undefined,
    professionId: number | undefined,
    gender: string
}
export interface IQueryDisplayData {
    cmc: number,
    province: string,
    district: string
    branch: string,
    gender: string
}

export interface IMemberReport {
    otherName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    gender: string,
    dateOfBirth: string,
    rankName: string,
    principalBandName: string,
    bandName: string,
    branchName: string,
    maritalStatus: string,
    yearOfMarriage: number,
    nameOfSpouse: string,
    rankOfSpouse: string,
    noOfChildren: number,
    nationality1: string,
    nationality2: string,
    address: string,
    qualification: string,
    occupation: string,
    cppInChurch: string,
    profession: string
}

export interface IMemberGeneralReport {
    otherName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    gender: string,
    dateOfBirth: string,
    currentRank: string,
    currentRankOrder: number,
    principalBandName: string,
    bandName: string,
    branchName: string,
    maritalStatus: string,
    yearOfMarriage: number,
    nameOfSpouse: string,
    rankOfSpouse: string,
    noOfChildren: number,
    nationality1: string,
    nationality2: string,
    address: string,
    qualification: string,
    occupation: string,
    cppInChurch: string,
    profession: string
    rank1: string,
    year1: number,
    rank2: string,
    year2: number,
    rank3: string,
    year3: number,
    rank4: string,
    year4: number,
    rank5: string,
    year5: number,
    rank6: string,
    year6: number,
    rank7: string,
    year7: number,
    rank8: string,
    year8: number,
    rank9: string,
    year9: number,
    rank10: string,
    year10: number,
    rank11: string,
    year11: number,
    rank12: string,
    year12: number,
    rank13: string,
    year13: number,
    rank14: string,
    year14: number,
    rank15: string,
    year15: number,
    rank16: string,
    year16: number
}


export interface IMemberOrdination {
    fullName: string,
    gender: string,
    branchName: string,
    rank1: string,
    year1: number,
    rank2: string,
    year2: number,
    rank3: string,
    year3: number,
    rank4: string,
    year4: number,
    rank5: string,
    year5: number,
    rank6: string,
    year6: number,
    rank7: string,
    year7: number,
    rank8: string,
    year8: number,
    rank9: string,
    year9: number,
    rank10: string,
    year10: number,
    rank11: string,
    year11: number,
    rank12: string,
    year12: number,
    rank13: string,
    year13: number,
    rank14: string,
    year14: number,
    rank15: string,
    year15: number,
    rank16: string,
    year16: number,
}

export interface IUploadInfo {
    cmc: string,
    branch: string,
    district: string,
    province: string,
    branchAddress: string,
    districtAddress: string,
    provinceAddress: string,
    elderInChargeName: string,
    elderInChargeRank: string,
    elderInChargeEmail: string,
    elderInChargePhoneNumber: string,
    secretaryName: string,
    secretaryRank: string,
    secretaryEmail: string,
    secretaryPhoneNumber: string,
    financialSecretaryName: string,
    financialSecretaryRank: string,
    financialSecretaryEmail: string,
    financialSecretaryPhoneNumber: string,
}


export interface IUploadAnalysis {
    uploadInfoId: number,
    cmcId: number,
    provinceId: number,
    districtId: number,
    branchId: number,
    totalMale: number,
    totalFemale: number,
    totalMember: number,
    usersId: string,
    uploadedAt: string,
    provinceName: string,
    districtName: string,
    branchName: string,
    uploadedBy: string
}

export enum UserAccountDialogTab {
    SearchUser = "1",
    CreateUser = "2"
}

export let initialFormValues: IGroup = {
    groupId: 0,
    name: "",
    description: "",
    copyFromGroupId: 1
};

export interface IUserData {
    title?: string,
    fullName?: string,
    email?: string,
    phone?: string,
    id: string,
    lastName?: string,
    otherName?: string,
    profilePicExtention?: string,
    currentRank?: number,

    principalBandId?: number,

    bandId?: number,

    otherBandsAssociation?: number,
    maritalStatus?: string,
    dearOfMarriage?: string,
    nationality1?: string,
    nationality2?: string,
    nameOfSpouse?: string,
    ordinationRankOfSpouse?: number,
    address?: string,
    qualification?: string,
    profession?: string,
    occupation?: string,
    cppInChurch?: string,
    branchId?: number,
    userName?: string
}

export interface IUserAccount {
    disableToolbar: boolean

    showAddNewUserDialog: boolean,
    isSearching: boolean,
    searchUsers: ObservableMap<string, IUserData>;
    dialogTabsKey: string,
    homeStore: IHomeStore,
    newUser: IRegister,
    showUserInvitationDialog: boolean,

}


export interface IManageFacilityStore {
    isLoading: boolean;
    showValidateDialog: boolean;
    showValidateDialogForPendingValidation: boolean;
    isSaving: boolean;
    disableManageFacilityToolbar: boolean;
    facilityRequests: ObservableMap<[]>;
    facilities: ObservableMap<[]>;
    facilityRequest: object;
    getAllFacilityRequests(): Promise<EDBRequestResponse>,
    getAllFacilities(): Promise<EDBRequestResponse>,
    getAllFacilities2(): Promise<void>,
    getFacilityRequestById(id: number): Promise<EDBRequestResponse>
    validateFacility(facilityRequestId: number, requestorEmail: string, authCode: string): Promise<EDBRequestResponse>
    lockAndUnlockFacility(facilityId: number, status: boolean): Promise<EDBRequestResponse>
}




export type FacilityService = {
    facilityServiceId: number,
    facilityServiceName: string,
    facilityId: number,
    serviceId: number,
    isActive: boolean,
    isDisabled: boolean,
    softDelete: boolean,
}

export interface IFacilityRole {
    facilityRoleId: number,
    serviceIds: string,
    facilityId: number,
    groupId: number
}

export type Privilege = {
    display?: string,
    subMenuId: number,
    menuId: number,
    groupId: number,
    name?: string,
    canView: boolean,
    canUpdate: boolean,
    canDelete: boolean,
    canExecute: boolean,
    canApprove: boolean,
    menu?: string,
    subMenu?: string,
    menuIcon?: string,
    id?: string,
    url?: string,

}

export type Permission = {
    menu: string,
    menuIcon: string,
    menuId: number,
    privileges: Array<Privilege>

}


// me
export interface IService {
    serviceId: number,
    serviceName: string,
    isActive: number,
    isDisabled: number,
    author: string,
    softDelete: number,
}

export interface IProduct {
    productId: number,
    productName: string,
    productDescription: string,
    productPrice: number,
    serviceId: number,
    isActive: number,
    isDisabled: number,
    softDelete: number,
}

export interface IProductForm {
    serviceId: number,
    productName: string,
    productDescription: string,
    productPrice: number,
}

export interface IServiceForm {
    serviceName: string
}



export interface IPlatformStore {
    isLoading: boolean,
    isLoadingRank: boolean,
    isSaving: boolean,
    isUpdating: boolean,
    isRemoving: boolean,
    bands: ObservableMap<number, IBand>,
    branchs: ObservableMap<number, IBranch>,
    cathedrals: ObservableMap<number, ICathedral>,
    cmcs: ObservableMap<number, ICmc>,
    districts: ObservableMap<number, IDistrict>,
    ordinations: ObservableMap<number, IOrdination>,
    principalBands: ObservableMap<number, IPrincipalBand>,
    prioritys: ObservableMap<number, IPriority>,
    qualifications: ObservableMap<number, IQualification>,
    provinces: ObservableMap<number, IProvince>,
    ranks: ObservableMap<number, IRank>,
    professions: ObservableMap<number, IProfession>,
    nationalities: ObservableMap<number, INationality>,

    band: IBand,
    branch: IBranch,
    cathedral: ICathedral,
    cmc: ICmc,
    district: IDistrict,
    ordination: IOrdination,
    principalBand: IPrincipalBand,
    priority: IPriority,
    qualification: IQualification,
    province: IProvince,
    rank: IRank,
    branchFilterString: string,
    profession: IProfession,
    nationality: INationality
    getAllBand(): Promise<void>,
    getBandByIdAsync(bandId: number): Promise<void>,
    getBandById(bandId: number): void,
    updateBand(band: IBand): Promise<void>,
    getAllBranch(): Promise<void>,
    getBranchByIdAsync(branchId: number): Promise<void>,
    getBranchById(branchId: number): void,
    updateBranch(branch: IBranch): Promise<void>,
    getAllCathedral(): Promise<void>,
    getCathedralByIdAsync(cathedralId: number): Promise<void>,
    getCathedralId(CathedralId: number): void,
    updateCathedral(cathedral: ICathedral): Promise<void>,
    getAllCmc(): Promise<void>,
    getCmcByIdAsync(cmcId: number): Promise<void>,
    getCmcId(cmcId: number): void,
    updateCmc(cmc: ICmc): Promise<void>,
    getAllDistrict(): Promise<void>,
    getDistrictByIdAsync(districtId: number): Promise<void>,
    getDistrictId(districtId: number): void,
    updateDistrict(district: IDistrict): Promise<void>,
    getAllOrdination(): Promise<void>,
    getOrdinationByIdAsync(ordinationId: number): Promise<void>,
    getOrdinationId(ordinationId: number): void,
    updateOrdination(ordination: IOrdination): Promise<void>,
    getAllPrincipalBand(): Promise<void>,
    getPrincipalBandByIdAsync(principalBandId: number): Promise<void>,
    getPrincipalBandId(principalBandId: number): void,
    updatePrincipalBand(principalBand: IPrincipalBand): Promise<void>,
    getAllPriority(): Promise<void>,
    getPriorityByIdAsync(priorityId: number): Promise<void>,
    getPriorityId(priorityId: number): void,
    updatePriority(priority: IPriority): Promise<void>,
    getAllQualification(): Promise<void>,
    getQualificationByIdAsync(qualificationId: number): Promise<void>,
    getQualificationId(qualificationId: number): void,
    updateQualification(qualification: IQualification): Promise<void>,
    getAllProvince(): Promise<void>,
    getProvinceByIdAsync(provinceId: number): Promise<void>,
    getProvinceId(provinceId: number): void,
    updateProvince(province: IProvince): Promise<void>,
    getAllRank(): Promise<void>,
    getRankByIdAsync(rankId: number): Promise<void>,
    getRankId(rankId: number): void,
    updateRank(rank: IRank): Promise<void>,
    getAllProfession(): Promise<void>,
    getProfessionByIdAsync(professionId: number): Promise<void>,
    getProfessionId(professionId: number): void,
    updateProfession(profession: IProfession): Promise<void>
    removeProfession(professionId: number): Promise<void>,
    getAllNationality(): Promise<void>,
    getNationalityByIdAsync(nationalityId: number): Promise<void>,
    getNationalityId(nationalityId: number): void,
    updateNationality(nationality: INationality): Promise<void>,
    removeNationality(nationalityId: number): Promise<void>
}
export interface IAppointmentSlot {
    appointmentSlotId: number,
    facilityServiceId: number,
    facilityId: number,
    from: string,
    to: string,
    breakFrom: string,
    breakTo: string,
    interval: number,
    doctorCount: number | null
}

export interface IBand {
    bandId: number,
    bandName: string
}

export interface IBranch {
    branchId: number,
    branchName: string,
    branchAddress: string,
    districtId: number
    provinceId: number
    provinceAddress: string,
    districtAddress: string,
    elderInChargeName: string,
    elderInChargeRank: string,
    elderInChargeEmail: string,
    elderInChargePhoneNumber: string,

    secretaryName: string,
    secretaryRank: number,
    secretaryEmail: string,
    secretaryPhoneNumber: string,

    financialSecretaryName: string,
    financialSecretaryRank: number,
    financialSecretaryEmail: string,
    financialSecretaryPhoneNumber: string,
}
export interface IBranchView {
    branchId: number,
    branchName: string,
    branchAddress: string,
    districtName: string,
    provinceName: string,
    provinceAddress: string,
    districtAddress: string,
    elderInChargeName: string,
    elderInChargeRank: string,
    elderInChargeEmail: string,
    elderInChargePhoneNumber: string,

    secretaryName: string,
    secretaryRank: string,
    secretaryEmail: string,
    secretaryPhoneNumber: string,

    financialSecretaryName: string,
    financialSecretaryRank: string,
    financialSecretaryEmail: string,
    financialSecretaryPhoneNumber: string,
}

export interface ICathedral {
    cathedralId: number,
    cathedralName: string,
    priorityId: number
}

export interface ICmc {
    cmcId: number,
    cmcOrder: number,
    priorityId: number
}

export interface IDistrict {
    districtId: number,
    districtName: string,
    districtAddress: string,
    provinceId: number
}

export interface IOrdination {
    [key: string]: any | undefined,
    ordinationId: number,
    rankId: number,
    nextRankId: number,
    year: number,
    usersId: string,
    branchId: number
}

export interface IPrincipalBand {
    principalBandId: number,
    principalBandName: string,
    principalBandOrder: number
}


export interface IPriority {
    priorityId: number,
    priorityName: string,
    priorityLevel: number
}

export interface IProfession {
    professionId: number,
    professionName: string,
}
export interface INationality {
    nationalityId: number,
    nationalityName: string,
}

export interface IQualification {
    qualificationId: number,
    qualificationName: string,
}

export interface IProvince {
    provinceId: number,
    provinceName: string,
    cmcId: number
}
export interface IRank {
    rankId: number,
    rankName: string,
    rankOrder: number,
    rankGender: string,
    endYearCount: number
}

export interface IMemberUpload {
    id: number,
    sn: string,
    rank: string,
    lastName: string,
    otherName: string,
    gender: string,
    principalBand: string,
    otherBandsAssociation: string,
    dateofBirth: string,
    maritalStatus: string,
    yearOfMarriage: string,
    nationality1: string,
    nationality2: string,
    numberofChildren: string,
    nameOfSpouse: string,
    spouseRank: string,
    address: string,
    phoneNumber: string,
    emailContact: string,
    qualification: string,
    profession: string,
    occupation: string,
    cppInChurch: string,
    rank1: string,
    year1: string,
    rank2: string,
    year2: string,
    rank3: string,
    year3: string,
    rank4: string,
    year4: string,
    rank5: string,
    year5: string,
    rank6: string,
    year6: string,
    rank7: string,
    year7: string,
    rank8: string,
    year8: string,
    rank9: string,
    year9: string,
    rank10: string,
    year10: string,
    rank11: string,
    year11: string,
    rank12: string,
    year12: string,
    rank13: string,
    year13: string,
    rank14: string,
    year14: string,
    rank15: string,
    year15: string,
    rank16: string,
    year16: string,
    rank17: string,
    year17: string,
}
export interface IOrdinationUpload {
    otherName: string
    lastName: string,
    rankId: number,
    year: number,
    branchId: number | undefined,
    nextRankId: number,
    pi: number
}

export type ErrorModel = {
    type: string,
    message: string,
    group: string,
    id: number
}

export interface IReportTableInfo {
    title: string,
    names: string,
    ranks: string,
    phone: string,
    email: string
}