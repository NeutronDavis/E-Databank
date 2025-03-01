import { IAdminStore, IAssignedFacility, IGroup, initialFormValues, IUserAccount, IUserData, Permission, Privilege, IFacilityUserGroup, IFacilityRole, FacilityService, IUserGroup, IBranch, IMemberUpload, IOrdinationUpload, IMemberOrdination, IMemberReport, IQueryData, IQueryDisplayData, IOrdination, ErrorModel, IMemberGeneralReport, IUploadInfo, IBranchView, IReportTableInfo, IUploadAnalysis, IOrdinationProgressionInput, IOrdinationProgressionView, } from "../../Admin/types/interface"
import { makeAutoObservable, observable, ObservableMap, remove, set, toJS } from "mobx"

import { AdminService } from "../services/AdminService";
import { homeStore } from "../../Home/store/HomeStore";
import { IRegister } from "../../../Utility/Validations/HomeValidations";
import { log } from "console";

import { masterPageStore } from "../../MasterPage/store/MasterPageStore";
import { EDBRequestResponse } from "../../../shared/EDBRequestResponse";
import { IUser } from "../../Home/types/interfaces";
import writeXlsxFile from 'write-excel-file'
import { IProfileView } from "../../Profile/types/interface";
import { IOrdinationView } from "../../Data/types/interfaces";

import { PermissionGroup, UserGroup } from "../../MasterPage/types/Interfaces";
const { saveAs } = require("file-saver");
class AdminStore implements IAdminStore {
  isLoading = false;
  isLoadingReport = false;
  isLoadingReportData = false;
  isSaving = false;
  isRemoving = false;
  isDownloading = false;
  groups = new ObservableMap<number, IGroup>();
  selectedGroup = initialFormValues
  selectedGroupIds = new Array<number>();
  users = new ObservableMap<string, IUserData>();

  isLoadinggrouppermissions = false;
  permissions = new ObservableMap<number, Permission>();
  userAccount: IUserAccount = {
    disableToolbar: true,

    showAddNewUserDialog: false,
    isSearching: false,
    searchUsers: new ObservableMap<string, IUserData>(),
    dialogTabsKey: "1",
    newUser: {} as IRegister,
    homeStore: homeStore,
    showUserInvitationDialog: false




  }
  showGroupsDialog = false;
  isLoadingUsersInGroup = false;
  isLoadingUsersInAGroup = false;
  isLoadingGroup = false;
  usersInGroup = new ObservableMap<string, IUserData>()
  usersInAGroup = new ObservableMap<string, IUserData>()
  showAddUserToGroupDialog = false;
  isAddingUserToGroup = false;
  isloadingUserGroups = false;
  isloadingUserPermissions = false;
  userGroups = new ObservableMap<number, IGroup>()
  allGroup = new ObservableMap<number, IGroup>()
  userPermissions = new ObservableMap<number, Privilege>();
  isFetching = false;
  showRevenueDialog = false
  editMode = false
  assignedFacility = new ObservableMap<number, IAssignedFacility>()
  user: IUserData = {} as IUserData;

  facilityGroupService: IFacilityRole = {} as IFacilityRole;
  facilityGroupServices = new ObservableMap<number, IFacilityRole>();
  groupServices = new ObservableMap<number, number>();
  selectedGroupName: string = "";
  userAssignService = new ObservableMap<number, FacilityService>();
  allUserGroup = new ObservableMap<number, IUserGroup>();
  showGroupAssignDialog = false;
  selectedTap: string = "1";
  showMemberRegistrationDialog: boolean = false;
  showCathedralAddDialog: boolean = false;
  showCmcAddDialog: boolean = false;
  showProvinceAddDialog: boolean = false;
  showDistrictAddDialog: boolean = false;
  showBranchAddDialog: boolean = false;
  showRankAddDialog: boolean = false;
  showPriorityAddDialog: boolean = false;
  isInEditMode: boolean = false;
  openUploadPanel: boolean = false;
  selectedBranchForUpload: IBranch = {} as IBranch;
  selectedMemberUploadedData: IMemberUpload = {} as IMemberUpload;
  selectedOrdinationUploadedData: IOrdinationUpload = {} as IOrdinationUpload;
  memberUploadedData = new ObservableMap<number, IMemberUpload>();
  ordinationUploadedData = new ObservableMap<number, IOrdinationUpload>();
  ordinationReportData = new ObservableMap<number, IMemberOrdination>();
  memberReportData = new ObservableMap<number, IMemberReport>();
  selectedUploadPivotKey: any = "1";
  memberUploadRowSelected: boolean = false;
  queryData: IQueryData = {} as IQueryData;
  ordinationQueryData: IQueryData = {} as IQueryData;
  openQueryReportDialog: boolean = false;
  openOrdinationQueryReportDialog: boolean = false;
  openProvincialQueryReportDialog: boolean = false;

  openProvincialOrdinationQueryReportDialog: boolean = false;
  queryDisplayData: IQueryDisplayData = {} as IQueryDisplayData;
  genderValue: string = "";
  genderValueForRefresh: string = "";
  branchValueForRefresh: number | undefined = undefined;
  provinceValueForRefresh: number | undefined = undefined;

  ordinationQueryDisplayData: IQueryDisplayData = {} as IQueryDisplayData;
  genderOrdinationValue: string = "";
  genderOrdinationValueForRefresh: string = "";
  branchOrdinationValueForRefresh: number | undefined = undefined;
  provinceOrdinationValueForRefresh: number | undefined = undefined;
  // 
  selectedCmc: number | undefined = undefined;
  selectedProvince: string | undefined = undefined;
  selectedDistrict: string | undefined = undefined;
  selectedBranch: string | undefined = undefined;
  selectedGender: string | undefined = undefined;

  searchedMembers = new ObservableMap<string, IProfileView>();
  selectedMemberFromSearch: IProfileView = {} as IProfileView;
  selectedMemberOrdinationFromSearch = new ObservableMap<number, IOrdinationView>()
  isSearching: boolean = false;
  isLoadingSearchedInfo: boolean = false;
  isUpdatingOrdination: boolean = false;
  isRemovingOrdination: boolean = false;
  showOrdinationDialog: boolean = false;
  isUpdatingMemberRole: boolean = false;
  selectedOrdination: IOrdinationView = {} as IOrdinationView;
  pic: string = "";
  role: PermissionGroup = {} as PermissionGroup

  errorModels = new ObservableMap<number, ErrorModel>();
  uploadInfo: IUploadInfo = {} as IUploadInfo;


  // General Report
  selectedBranchForGeneralReportReport: IBranch = {} as IBranch;
  selectedBranchIdForGeneralReportReport: number = 0;
  selectedProfessionIdForGeneralReportReport: number = 0;
  selectedProfOption: string = "All Profession";
  selectedProfOptionProf: string = "All Profession";
  isLoadingGeneralReport: boolean = false;
  memberGeneralReportData = new ObservableMap<number, IMemberGeneralReport>();

  showCurrentUploadDialog: boolean = false;
  branchInfoForReport: IBranchView = {} as IBranchView;
  reportTableContent = new ObservableMap<number, IReportTableInfo>();
  isUploaded: boolean = false
  // 

  //Upload Analysis
  uploadAnalysis = new ObservableMap<number, IUploadAnalysis>();
  selectedUploadAnalysis: IUploadAnalysis = {} as IUploadAnalysis
  selectedBranchIdFromAnalysis: number | undefined = undefined
  isLoadingUploadAnalysis: boolean = false;

  //ordination progression
  openOrdinationProgressionReportDialog: boolean = false;
  isLoadingP: boolean = false
  duplicateAvailable: boolean = false
  ordinationProgressionQuery: IOrdinationProgressionInput = {} as IOrdinationProgressionInput
  provinceSwitchVal: string = "All";
  branchSwitchVal: string = "All";
  yearSwitchVal: string = "All";
  rankSwitchVal: string = "All";

  provinceVal: number = 0;
  branchVal: number = 0;
  yearVal: number = 0;
  rankVal: string = "";
  isDownloadingTemplate: boolean = false;
  reportRank: string = "";
  reportYear: number = 0;
  ordinationProgression = new ObservableMap<number, IOrdinationProgressionView>();
  constructor() {
    makeAutoObservable(this);
    this.groups = observable.map({})

  }
  ;

  async getAllUploadAnalysis(): Promise<void> {
    try {
      this.isLoadingUploadAnalysis = true;
      let res = await AdminService.getMembersUploadAnalysis()
      if (res.success) {
        this.uploadAnalysis.clear();
        if (res.data.length > 0) {
          res.data.forEach((e: IUploadAnalysis) => {
            this.uploadAnalysis.set(e.uploadInfoId, e)
          })
        }
      }
    } catch (error) {
      throw error
    } finally {
      this.isLoadingUploadAnalysis = false;
    }
  }
  async getOrdinationProgressionReport(provinceId: number, branchId: number, rank: string, year: number): Promise<void> {
    try {
      this.isLoadingReport = true;
      let data = await AdminService.getOrdinationP(provinceId, branchId, rank, year)
      if (data.success) {
        this.ordinationProgression.clear()
        if (data.data.length > 0) {
          data.data.forEach((e: IOrdinationProgressionView, i: number) => {
            this.ordinationProgression.set(i, e);
          });
        }
      }
      //  console.log(data)
    } catch (error) {
      throw error
    } finally {
      this.isLoadingReport = false;
    }
  }

  async removeMemberRecordsViaUploadAnalysis(branchId: number): Promise<void> {
    try {
      await AdminService.deleteMembersUploadFromAnalysis(branchId)
    } catch (error) {
      throw error
    }
  }

  async genReport(branchId: number, professionId: number): Promise<void> {
    try {
      this.isLoadingGeneralReport = true;
      let res = await AdminService.getGeneralReport(branchId, professionId)
      if (res.success) {
        // console.log("branchData",res.data)
        this.memberGeneralReportData.clear();
        this.branchInfoForReport = {} as IBranchView;

        let branchUploadData = res.data.branchData as IBranchView;
        let uploadData: Array<IMemberGeneralReport> = res.data.res as Array<IMemberGeneralReport>;
        if (branchUploadData !== undefined && uploadData !== undefined) {
          // console.log("branchData2",branchUploadData,uploadData)
          this.branchInfoForReport = branchUploadData
          let tableReportList: Array<IReportTableInfo> = [];
          let t1: IReportTableInfo = {
            title: "ELDER-IN-CHARGE",
            names: branchUploadData && branchUploadData.elderInChargeName !== null && branchUploadData.elderInChargeName !== undefined
              ? branchUploadData.elderInChargeName
              : "",
            ranks: branchUploadData && branchUploadData.elderInChargeRank !== null && branchUploadData.elderInChargeRank !== undefined
              ? branchUploadData.elderInChargeRank
              : "",
            phone: branchUploadData && branchUploadData.elderInChargePhoneNumber !== null && branchUploadData.elderInChargePhoneNumber !== undefined
              ? branchUploadData.elderInChargePhoneNumber
              : "",
            email: branchUploadData && branchUploadData.elderInChargeEmail !== null && branchUploadData.elderInChargeEmail !== undefined
              ? branchUploadData.elderInChargeEmail
              : ""
          }
          tableReportList.push(t1)
          let t2: IReportTableInfo = {
            title: "SECRETARY",
            names: branchUploadData && branchUploadData.secretaryName !== null && branchUploadData.secretaryName !== undefined ? branchUploadData.secretaryName : "",
            ranks: branchUploadData && branchUploadData.secretaryRank !== null && branchUploadData.secretaryRank !== undefined ? branchUploadData.secretaryRank : "",
            phone: branchUploadData && branchUploadData.secretaryPhoneNumber !== null && branchUploadData.secretaryPhoneNumber !== undefined ? branchUploadData.secretaryPhoneNumber : "",
            email: branchUploadData && branchUploadData.secretaryEmail !== null && branchUploadData.secretaryEmail !== undefined ? branchUploadData.secretaryEmail : ""
          }
          tableReportList.push(t2)
          let t3: IReportTableInfo = {
            title: "FINANCIAL SECRETARY",
            names: branchUploadData && branchUploadData.financialSecretaryName !== null && branchUploadData.financialSecretaryName !== undefined ? branchUploadData.financialSecretaryName : "",
            ranks: branchUploadData && branchUploadData.financialSecretaryRank !== null && branchUploadData.financialSecretaryRank !== undefined ? branchUploadData.financialSecretaryRank : "",
            phone: branchUploadData && branchUploadData.financialSecretaryPhoneNumber !== null && branchUploadData.financialSecretaryPhoneNumber !== undefined ? branchUploadData.financialSecretaryPhoneNumber : "",
            email: branchUploadData && branchUploadData.financialSecretaryEmail !== null && branchUploadData.financialSecretaryEmail !== undefined ? branchUploadData.financialSecretaryEmail : ""
          }
          tableReportList.push(t3)

          tableReportList.forEach((value: IReportTableInfo, index: number) => {
            this.reportTableContent.set(index, value)
          });

          if (res.data.res.length > 0) {
            res.data.res.forEach((x: IMemberGeneralReport, i: number) => {
              this.memberGeneralReportData.set(i, x)
            })
          }

        }
      }

    } catch (error) {
      throw error
    } finally {
      this.isLoadingGeneralReport = false;
    }
  }
  async genReportByRankAndYear(rank: string, year: number): Promise<void> {
    try {
      this.isLoadingGeneralReport = true;
      let res = await AdminService.getMemberReportByRankAndYear(rank, year)
      if (res.success) {
        // console.log("branchData",res.data)
        this.memberGeneralReportData.clear();

        // let uploadData:Array<IMemberGeneralReport> = res.data.res as Array<IMemberGeneralReport>;
        if (res.data.res.length > 0) {
          res.data.res.forEach((x: IMemberGeneralReport, i: number) => {
            this.memberGeneralReportData.set(i, x)
          })
        }

      }

    } catch (error) {
      throw error
    } finally {
      this.isLoadingGeneralReport = false;
    }
  }

  async updateMemberRole(userId: string, roleType: number): Promise<void> {
    try {
      this.isUpdatingMemberRole = true
      await AdminService.updateGroup(userId, roleType)
    } catch (error) {
      throw error;
    } finally {
      this.isUpdatingMemberRole = false;
    }
  }
  async updateOrdination(ordination: IOrdination): Promise<void> {
    try {
      this.isUpdatingOrdination = true
      await AdminService.updateOrdination(ordination)
    } catch (error) {
      throw error;
    } finally {
      this.isUpdatingOrdination = false;
    }
  }

  async removeOrdination(ordinationId: number): Promise<void> {
    try {
      this.isRemovingOrdination = true
      await AdminService.deleOrdination(ordinationId)
    } catch (error) {
      throw error;
    } finally {
      this.isRemovingOrdination = false;
    }
  }
  async getSearchedMemberInfo(userId: string): Promise<void> {
    try {
      this.isLoadingSearchedInfo = true;
      let retVal = await AdminService.getSearchedMemberAndOrdination(userId);
      if (retVal.success) {
        this.pic = ""
        this.selectedMemberFromSearch = {} as IProfileView;
        this.selectedMemberOrdinationFromSearch.clear()
        this.role = {} as PermissionGroup;

        this.role = retVal.userGroup as PermissionGroup;
        this.selectedMemberFromSearch = retVal.data as IProfileView;
        this.pic = retVal.picture;
        if (retVal.ordination.length > 0) {
          retVal.ordination.forEach((value: IOrdinationView) => {
            this.selectedMemberOrdinationFromSearch.set(value.ordinationId, value);
          });
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this.isLoadingSearchedInfo = false;
    }
  }
  async search(searchStr: string): Promise<void> {
    try {
      this.isSearching = true;
      let retVal = await AdminService.searchFroMember(searchStr);
      if (retVal.success) {
        if (retVal.data.length > 0) {
          this.searchedMembers.clear()
          retVal.data.forEach((value: IProfileView) => {
            this.searchedMembers.set(String(value.id), value);
          });
        } else {
          this.searchedMembers.clear()
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this.isSearching = false;
    }
  }

  async downloadMembersTemplate(): Promise<void> {
    try {
      this.isDownloadingTemplate = true;

      let data = await AdminService.downloadMemberTemplate();
      saveAs(data, `Generated-Member-Upload-File.xlsx`);
    } catch (error) {
      throw error;
    } finally {
      this.isDownloadingTemplate = false;
    }

  }
  async downloadOrdinationTemplate(): Promise<void> {
    try {
      this.isDownloading = true;
      const objects = [
        // Object #1
        {
          OtherName: 'John Doe',
          LastName: 'Davis',
          RankId: 1,
          Year: new Date().getFullYear(),
          BranchId: this.selectedBranchForUpload.branchId,
          NextRankId: 1
        },
      ]
      const schema = [
        // Column #1
        {
          column: 'OtherName',
          type: String,
          value: (x: any) => x.OtherName
        },
        {
          column: 'LastName',
          type: String,
          value: (x: any) => x.LastName
        },
        {
          column: 'RankId',
          type: Number,
          value: (x: any) => x.RankId
        },
        {
          column: 'Year',
          type: Number,
          value: (x: any) => x.Year
        },
        {
          column: 'BranchId',
          type: Number,
          value: (x: any) => x.BranchId
        },
        {
          column: 'NextRankId',
          type: Number,
          value: (x: any) => x.NextRankId
        }
      ]
      let res = await writeXlsxFile(objects, {
        schema,
        fileName: `${this.selectedBranchForUpload.branchName.toUpperCase()}MembersOrdination.xlsx`,

      })

      saveAs(res, `${this.selectedBranchForUpload.branchName.toUpperCase()}MembersOrdination.xlsx`);



    } catch (error) {
      console.log(error)
      throw error;

    } finally {
      this.isDownloading = false;
    }
  }
  addSaveUploadedDataToStore(data: Array<IMemberUpload>): void {
    if (data.length > 0) {
      this.memberUploadedData.clear()
      data.forEach((value: IMemberUpload, index: number) => {
        this.memberUploadedData.set(index, { ...value, id: index });
      });
    }
  }

  async memberUpload(memberData: Array<IMemberUpload>, branchId: number, uploadInfo: IUploadInfo, userId: string): Promise<EDBRequestResponse> {
    try {
      this.isSaving = true;
      let retVal = await AdminService.memberUploadFromExcel(memberData, branchId, uploadInfo, userId);
      if (retVal.success) {
        this.memberUploadedData.clear();
      }
      return retVal
    } catch (error) {
      throw error;
    } finally {
      this.isSaving = false;
    }
  }
  async ordinationUpload(ordinationData: Array<IOrdinationUpload>): Promise<EDBRequestResponse> {
    try {
      this.isSaving = true;
      let retVal = await AdminService.ordinationUploadFromExcel(ordinationData);
      this.selectedBranchForUpload = {} as IBranch;
      if (retVal.success) {
        if (retVal.data.length > 0) {
          this.ordinationUploadedData.clear()
          retVal.data.forEach((value: IOrdinationUpload, index: number) => {
            this.ordinationUploadedData.set(index, { ...value, pi: index });
          });
        } else {
          this.ordinationUploadedData.clear()
        }
      }
      return retVal
    } catch (error) {
      throw error;
    } finally {
      this.isSaving = false;
    }
  }

  async ordinationReport(branchId: number, gender: string): Promise<void> {
    try {
      this.isLoadingReport = true;
      let retVal = await AdminService.getOrdinationReportFromDb(branchId, gender);
      if (retVal.success) {
        if (retVal.data.length > 0) {
          this.ordinationReportData.clear()
          retVal.data.forEach((value: IMemberOrdination, index: number) => {
            this.ordinationReportData.set(index, value);
          });
        } else {
          this.ordinationReportData.clear()
        }
      }
      return retVal
    } catch (error) {
      throw error;
    } finally {
      this.isLoadingReport = false;
    }
  }
  async memberReport(branchId: number, gender: string): Promise<void> {
    try {
      this.isLoadingReport = true;
      let retVal = await AdminService.getMemberReportFromDb(branchId, gender);

      if (retVal.success) {
        if (retVal.data.length > 0) {
          this.memberReportData.clear()
          retVal.data.forEach((value: IMemberReport, index: number) => {
            this.memberReportData.set(index, value);
          });
        } else {
          this.memberReportData.clear()
        }
      }
      return retVal
    } catch (error) {
      throw error;
    } finally {
      this.isLoadingReport = false;
    }
  }
  async provincialOrdinationReport(provinceId: number, gender: string): Promise<void> {
    try {
      this.isLoadingReport = true;
      let retVal = await AdminService.getProvincialLevelOrdinationReportFromDb(provinceId, gender);
      if (retVal.success) {
        if (retVal.data.length > 0) {
          this.ordinationReportData.clear()
          retVal.data.forEach((value: IMemberOrdination, index: number) => {
            this.ordinationReportData.set(index, value);
          });
        } else {
          this.ordinationReportData.clear()
        }
      }
      return retVal
    } catch (error) {
      throw error;
    } finally {
      this.isLoadingReport = false;
    }
  }

  async registerMemberFromSystem(userData: IUser): Promise<EDBRequestResponse> {
    try {
      let retVal = await AdminService.registerMemberFromPlatform(userData, "12345");
      if (retVal.success) {
        let user: IUserData = retVal.data
        this.users.set(user.id, user);
      }
      return retVal
    } catch (error) {
      throw error;
    }
  }


  async getAUser(userId: string): Promise<EDBRequestResponse> {
    try {
      let retVal = await AdminService.getSingleUsers(userId);
      if (retVal.success) {
        this.user = retVal.data;
      }
      return retVal;
    } catch (error) {
      throw error;
    }
  }
  async getAllUsers(): Promise<EDBRequestResponse> {
    try {
      this.isLoading = true;
      const retVal = await AdminService.getAllUsers();


      this.userAccount.disableToolbar = true;

      this.users.clear();


      retVal.users.forEach((user: IUserData) => {
        this.users.set(user.id, user)
      });
      //this.groups=retVal.data;
      return retVal;
    } catch (error) {
      throw error;
    } finally {
      this.isLoading = false;
    }

  }


  async lockUserAccout(userId: string): Promise<EDBRequestResponse> {
    try {
      this.isSaving = true;
      const retVal = await AdminService.lockUserAccout(userId);
      return retVal;
    } catch (error) {
      throw error;
    } finally {
      this.isSaving = false;
    }
  }
  async sendInivite(email: string): Promise<EDBRequestResponse> {

    try {
      this.isSaving = true;
      const retVal = await AdminService.sendInivite(email);
      return retVal;
    } catch (error) {
      throw error;
    } finally {
      this.isSaving = false;
    }
  }
  async saveGroup(group: IGroup): Promise<EDBRequestResponse> {

    try {
      this.isSaving = true;
      const retVal = await AdminService.saveAccountGroups(group);
      return retVal;
    } catch (error) {
      throw error;
    } finally {
      this.isSaving = false;
    }
  }
  async removeGroup(group: IGroup): Promise<EDBRequestResponse> {
    try {
      this.isRemoving = true;
      const retVal = await AdminService.removeGroup(group);
      remove(this.groups, group.groupId);
      console.log('vals', toJS(this.groups))

      return retVal;
    } catch (error) {
      throw error;
    } finally {
      this.isRemoving = false;
    }
  }


  updateLocalGroups(group: IGroup): void {
    set(this.groups, group.groupId, group)
    this.showGroupsDialog = false;
    console.log('vals', toJS(this.groups))
  }

  async searchUser(searchTerms: string, searchCategory: string): Promise<EDBRequestResponse> {
    try {
      this.userAccount.isSearching = true;
      const retVal = await AdminService.searchUser(searchTerms, searchCategory);
      this.userAccount.searchUsers.clear();
      retVal.data.forEach((user: IUserData) => {
        this.userAccount.searchUsers.set(user.id, user)
      })
      console.log('search user', retVal);

      return retVal;
    } catch (error) {
      throw error;
    } finally {
      this.userAccount.isSearching = false;
    }
  }

  async registerSatff(userId: string, facilityId: number, groupIds: Array<number>): Promise<EDBRequestResponse> {
    try {
      this.isSaving = true;
      const retVal = await AdminService.registerSatff(userId, facilityId, groupIds);
      return retVal;

    } catch (error) {
      throw error;
    } finally {
      this.isSaving = true;
    }
  }
  async reInitalizePermissions(): Promise<EDBRequestResponse> {
    try {
      this.isSaving = true;
      const retVal = await AdminService.reInitalizePermissions();
      return retVal;

    } catch (error) {
      throw error;
    } finally {
      this.isSaving = true;
    }
  }
  async getGroupPermissions(groupId: number): Promise<EDBRequestResponse> {

    try {
      this.isLoadinggrouppermissions = true;

      const retVal = await AdminService.getGroupPermissions(groupId);
      this.permissions.clear();

      if (retVal && retVal.permissions.length) {
        retVal.permissions.forEach((p: Permission) => {
          this.permissions.set(p.menuId, p);
        });
      }
      this.isLoadinggrouppermissions = false;
      return retVal;



    } catch (error) {
      throw error;
    } finally {
      this.isLoadinggrouppermissions = false;

    }
  }


  async getAllGroup(): Promise<EDBRequestResponse> {
    try {
      this.isLoadingGroup = true;
      let retVal = await AdminService.getAllGroupAsync();

      if (retVal.success) {
        retVal.data.length > 0 && retVal.data.forEach((g: IGroup) => {
          this.allGroup.set(g.groupId, g);
        })
      }
      return retVal;
    } catch (error) {
      throw error;
    } finally {
      this.isLoadingGroup = false;
    }
  }


  async getUsersInGroup(groupId: number, facilityId: number): Promise<EDBRequestResponse> {

    try {
      this.isLoadingUsersInGroup = true;

      const retVal = await AdminService.getUsersInGroup(groupId, facilityId);

      this.usersInGroup.clear();

      if (retVal && retVal.users.length) {
        retVal.users.forEach((user: IUserData) => {
          this.usersInGroup.set(user.id, user);
        });
      }
      this.isLoadingUsersInGroup = false;
      return retVal;



    } catch (error) {
      throw error;
    } finally {
      this.isLoadingUsersInGroup = false;

    }
  }
  async getUsersInAGroup(groupId: number): Promise<void> {

    try {
      this.isLoadingUsersInAGroup = true;

      const retVal = await AdminService.getUsersInAGroup(groupId);
      if (retVal.success) {
        this.usersInAGroup.clear();
        if (retVal.data.length > 0) {
          retVal.data.forEach((user: IUserData) => {
            this.usersInAGroup.set(user.id, user)
          })
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this.isLoadingUsersInAGroup = false;
    }
  }


  async removeUserFromGroup(userId: string, groupId: number, facilityId: number): Promise<EDBRequestResponse> {

    try {


      const retVal = await AdminService.removeUserFromGroup(userId, groupId, facilityId);

      remove(this.usersInGroup, userId);


      return retVal;



    } catch (error) {
      throw error;
    } finally {
      this.isLoadinggrouppermissions = false;

    }
  }

  async addUsersToGroup(users: Array<IUserData>, groupId: number, facilityId: number): Promise<EDBRequestResponse> {
    try {

      this.isAddingUserToGroup = true;
      const retVal = await AdminService.addUsersToGroup(users, groupId, facilityId);

      retVal.forEach((user: IUserData) => {
        this.usersInGroup.set(user.id, {
          ...user,
          fullName: user.fullName,
        });
      });
      this.isAddingUserToGroup = false;


      return retVal;



    } catch (error) {
      throw error;
    } finally {
      this.isLoadinggrouppermissions = false;

    }
  }
  async getUserGroups(userId: string, facilityId: number): Promise<IGroup[]> {
    try {
      this.isloadingUserGroups = true;


      const res = await AdminService.getUserGroups(userId, facilityId);

      this.userGroups.clear();
      if (res.length) {
        res.forEach((g: IGroup) => {
          this.userGroups.set(g.groupId, g);
        });
      }

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getUserPermissions(userId: string, facilityId: number): Promise<EDBRequestResponse> {
    try {
      this.isloadingUserPermissions = true;

      const res = await AdminService.getUserPermissions(userId, facilityId);
      console.log(res);
      this.userPermissions.clear();
      if (res.length) {
        res.forEach((p: Privilege) => {
          this.userPermissions.set(p.subMenuId, p);
        });
      }


      window.localStorage.setItem("permissions", JSON.stringify(res));
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async geAllUserGroups(): Promise<EDBRequestResponse> {
    try {

      const res = await AdminService.getAllUsersGroup(masterPageStore.globalFacilityId);
      if (res.success) {
        this.allUserGroup.clear();
        res.data.forEach((f: IUserGroup, index: number) => {
          if (f.facilityId !== 1) {
            this.allUserGroup.set(f.groupId, f);
          }
        });
      }

      return res;
    } catch (error) {
      throw error;
    }
  }


  async downloadBranchTemplate(branchId: number, professionId: number): Promise<void> {
    try {
      this.isDownloading = true;

      let data = await AdminService.downloadBranchTemplate(branchId, professionId);
      saveAs(data, `report.pdf`);
    } catch (error) {
      console.log("Error: ", error)
      throw error;
    } finally {
      this.isDownloading = false;
    }

  }
  async downloadReport(rank: string, year: number): Promise<void> {
    try {
      this.isDownloading = true;

      let data = await AdminService.downloadRankReport(rank, year);
      saveAs(data, `report.pdf`);
    } catch (error) {
      console.log("Error: ", error)
      throw error;
    } finally {
      this.isDownloading = false;
    }

  }

  async provincialMemberReport(provinceId: number, professionId: number): Promise<void> {
    try {
      this.isLoadingReport = true;
      let data = await AdminService.getProvincialLevelMemberReportFromDb(provinceId, professionId);

      saveAs(data, `province_report.pdf`);
    } catch (error) {
      throw error;
    } finally {
      this.isLoadingReport = false;
    }
  }
  async downloadOrdinationProgressionReport(provinceId: number, branchId: number, rank: string, year: number): Promise<void> {
    try {
      this.isDownloading = true;
      let data = await AdminService.downloadOrdinationP(provinceId, branchId, rank, year)
      saveAs(data, `ordination_recommendation_report.pdf`);
      console.log(data)
    } catch (error) {
      throw error
    } finally {
      this.isDownloading = false;
    }
  }

}

const adminStore = new AdminStore();
export default adminStore;