import { client } from "../../../Infrastructure/agent";
import { EDBRequestResponse } from "../../../shared/EDBRequestResponse";
import { IGroup, IMemberUpload, IOrdination, IOrdinationUpload, IUploadInfo, IUserData } from "../../Admin/types/interface";
import { IUser } from "../../Home/types/interfaces";
export const AdminService = {

  registerMemberFromPlatform: (userData: IUser, password: string): Promise<EDBRequestResponse> => client.post('/main/registerUserFromSystem', { userData, password }),

  memberUploadFromExcel: (members: Array<IMemberUpload>, branchId: number, uploadInfo: IUploadInfo, userId: string): Promise<EDBRequestResponse> => client.post('/main/RegisterMembersFromUploadData', { members, branchId, uploadInfo, userId }),
  ordinationUploadFromExcel: (ordinations: Array<IOrdinationUpload>): Promise<EDBRequestResponse> => client.post('/main/OrdinationsFromUploadData', { ordinations }),
  getGeneralReport: (branchId: number, professionId: number): Promise<EDBRequestResponse> => client.post('/main/generateMemberReport', { branchId, professionId }),
  getMemberReportByRankAndYear: (rank: string, year: number): Promise<EDBRequestResponse> => client.post('/main/generateMemberReportByRankAndYear', { rank, year }),

  searchFroMember: (searchString: string): Promise<EDBRequestResponse> => client.post('/main/memberDetailsSearch', { searchString }),
  updateOrdination: (ordination: IOrdination): Promise<EDBRequestResponse> => client.post('/ordination/modifyOrdination', { ordination }),
  deleOrdination: (ordinationId: number): Promise<EDBRequestResponse> => client.post('/ordination/deleteOrdination', { ordinationId }),
  getSearchedMemberAndOrdination: (userId: string) => client.post('/main/loadUserProfileAndOrdination', { userId }),
  updateGroup: (userId: string, roleType: number): Promise<EDBRequestResponse> => client.post('/administration/changeUserGroup', { userId, roleType }),

  getUsersAndGroups: (facilityId: number) => client.post('/administration/getaccountgroups', { facilityId }),
  getAllUsersGroup: (facilityId: number) => client.post('/administration/getAllUserGroups', { facilityId }),
  saveAccountGroups: (group: IGroup) => client.post('/administration/saveaccountgroups', { group, copyFrom: group.copyFromGroupId }),
  removeGroup: (group: IGroup) => client.post('/administration/removeaccountgroups', { group }),
  searchUser: (searchTerms: string, searchCategory: string) => client.post('/administration/searchUser', { searchTerms, searchCategory }),
  sendInivite: (email: string) => client.post('/administration/InviteSatff', { email }),
  registerSatff: (userId: string, facilityId: number, groupIds: Array<number>) => client.post('/administration/registerSatff', { userId, facilityId, groupIds }),
  removeFacilityUser: (id: string, facilityId: number) => client.post('/administration/removeFacilityUser', { id, facilityId }),
  lockUserAccout: (userId: string): Promise<EDBRequestResponse> => client.post('/administration/lockuseraccount', { userId }),
  getAllUsers: () => client.get('/administration/getallusers'),
  getSingleUsers: (userId: string): Promise<EDBRequestResponse> => client.post('/administration/getAUsers', { userId }),
  getAllGroupAsync: (): Promise<EDBRequestResponse> => client.get('/administration/getAllGroup'),
  reInitalizePermissions: () => client.post('/administration/ReInitializePermisions'),
  getGroupPermissions: (groupId: number) => client.post('/administration/GetGroupPermissions', { groupId }),
  getUsersInGroup: (groupId: number, facilityId: number) => client.post('/administration/getUsersInGroup', { groupId, facilityId }),
  getUsersInAGroup: (groupId: number): Promise<EDBRequestResponse> => client.post('/administration/getUsersInAGroup', { groupId }),
  removeUserFromGroup: (userId: string, groupId: number, facilityId: number) => client.post('/administration/RemoveUserFromGroup', { userId, groupId, facilityId }),
  addUsersToGroup: (users: Array<IUserData>, groupId: number, facilityId: number) => client.post('/administration/AddUsersToGroup', { users, groupId, facilityId }),

  getUserGroups: (userId: string, facilityId: number) => {
    return client.post("/administration/GetUserGroups", { userId, facilityId });
  },
  getUserPermissions: (userId: string, facilityId: number) => {
    return client.post("/administration/getuserpermissions", { userId, facilityId });
  },

  // report
  getOrdinationReportFromDb: (branchId: number, gender: string) => client.post('/ordination/getAMemberOrdinationReport', { branchId, gender }),
  getMemberReportFromDb: (branchId: number, gender: string) => client.post('/ordination/getAMemberReport', { branchId, gender }),

  //upload analysis
  getMembersUploadAnalysis: (): Promise<EDBRequestResponse> => client.get('/ordination/getAllUploadAnalysis'),
  deleteMembersUploadFromAnalysis: (branchId: number): Promise<EDBRequestResponse> => client.post('/ordination/RemoveUploadedData', { branchId }),

  // Provincial Level Report
  getProvincialLevelOrdinationReportFromDb: (provinceId: number, gender: string) => client.post('/ordination/getAProvinceMemberOrdinationReport', { provinceId, gender }),
  getProvincialLevelMemberReportFromDb: (provinceId: number, professionId: number) => client.getFile('/main/renderProvincialReport', { provinceId, professionId }),
  downloadBranchTemplate: (branchId: number, professionId: number) => client.getFile("/main/RenderBranchReport", { branchId, professionId }),
  downloadRankReport: (rank: string, year: number) => client.getFile("/main/RenderRankYearReport", { rank, year }),

  downloadMemberTemplate: () => client.getFile("/main/GetMemberUploadTemplate"),

  //ordination progression
  downloadOrdinationP: (cmc: number, provinceId: number, branchId: number, rank: string, year: number) => client.getFile('/main/RenderOrdinationProgressionReport', { cmc, provinceId, branchId, rank, year }),
  getOrdinationP: (cmc: number, provinceId: number, branchId: number, rank: string, year: number): Promise<EDBRequestResponse> => client.post('/main/GenerateOrdinationProgressionReport', { cmc, provinceId, branchId, rank, year }),
}