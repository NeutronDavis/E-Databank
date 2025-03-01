import { Tabs } from "antd";
import { createContext,useContext, useEffect } from "react";
import { platformStore } from "../../store/platformStore";
import adminStore from "../../store/adminstore";
import CathedralGride from "./CathedralGride";
import CmcGride from "./CmcGride";
import ProvinceGride from "./ProvinceGride";
import DistrictGride from "./DistrictGride";
import BranchGride from "./BranchGride";
import RankGride from "./RankGride";
import PriorityGride from "./PriorityGride";
const platformStoreCtx = createContext(platformStore);
const adminStoreCtx = createContext(adminStore);
const { TabPane } = Tabs;
type Props = {};

const PlatformBaseView = (props: Props) => {
  const PlatformStore = useContext(platformStoreCtx);
  const AdminStore = useContext(adminStoreCtx);
  useEffect(() => {
    async function getAllUsers() {
      adminStore.editMode = false;
      await PlatformStore.getAllPriority();
    }
    getAllUsers();
    return () => {};
  }, []);
  
  return (
    <Tabs 
      defaultActiveKey={AdminStore.selectedTap}
      onChange={async(key) => {
        AdminStore.selectedTap = key.toString()
        AdminStore.editMode = false;
        // setTab(key.toString());
        // if(key === "5"){
        //  await PlatformStore.getPaystackTransactions();
        // }
      }}
    >
      <TabPane tab="HIERARCHY" key="1">
        <PriorityGride/>
      </TabPane>
      <TabPane tab="CATHEDRAL" key="2">
        <CathedralGride/>
      </TabPane>
      <TabPane tab="CMC" key="3">
        <CmcGride/>
      </TabPane>
      <TabPane tab="PROVINCE" key="4">
        <ProvinceGride/>
      </TabPane>
      <TabPane tab="DISTRICT" key="5">
        <DistrictGride/>
      </TabPane>
      <TabPane tab="BRANCH" key="6">
        <BranchGride/>
      </TabPane>
      <TabPane tab="RANK" key="7">
        <RankGride/>
      </TabPane>
    </Tabs>
  );
};

export default PlatformBaseView;
