import { Tabs } from "antd";


import PlatformAccessControl from "./PlatformAccessControl";
import { platformStore } from "../../../store/platformStore";
import { createContext,useContext, useEffect } from "react";
import MemberReport from "../report/MemberReport";
import OrdinationReport from "../report/OrdinationReport";
import adminStore from "../../../store/adminstore";
import MemberProvincilaReport from "../report/MemberProvincilaReport";
import ProvincialOrdinationReport from "../report/ProvincialOrdinationReport";
import { IProfileView } from "../../../../Profile/types/interface";
import { IOrdinationView } from "../../../../Data/types/interfaces";
const platformStoreCtx = createContext(platformStore);
const adminStoreCtx = createContext(adminStore);
const { TabPane } = Tabs;
type Props = {};

const PlatformAccountBaseView = (props: Props) => {
  const PlatformStore = useContext(platformStoreCtx);
  const AdminStore = useContext(adminStoreCtx);
  useEffect(() => {
    async function loadRequests() {
      
      AdminStore.searchedMembers.clear();
      AdminStore.selectedMemberFromSearch = {} as IProfileView;
      AdminStore.selectedMemberOrdinationFromSearch.clear();
      AdminStore.selectedOrdination= {} as IOrdinationView;
      AdminStore.pic = "";
      await PlatformStore.getAllCmc();
      await PlatformStore.getAllProvince();
      await PlatformStore.getAllDistrict()
      await PlatformStore.getAllBranch();
      await PlatformStore.getAllRank();
    }

    loadRequests();
  }, []);
  return (
    <PlatformAccessControl />
  );
};

export default PlatformAccountBaseView;
