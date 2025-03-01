import React, { createContext, useContext, useEffect, useState } from "react";
import { Tabs } from "antd";
import AdminStore from "../../Admin/store/adminstore";
// import GroupPermisionBaseView from "./accounts/groupspermission/GroupPermisionBaseView";
// import UserAccountBaseView from "./accounts/useraccounts/UserAccountBaseView";
import { masterPageStore as MasterPageStore } from "../../MasterPage/store/MasterPageStore";
import { observer } from "mobx-react-lite";
// import { UserPermission } from "./accounts/groupspermission/UserPermission";
const adminStoreCtx = createContext(AdminStore);
const masterPageStoreCtx = createContext(MasterPageStore);
const { TabPane } = Tabs;
const AdminBaseView = () => {
  const [tab, setTab] = useState<string>("1");
  const adminStore = useContext(adminStoreCtx);
  const masterPageStore = useContext(masterPageStoreCtx);
  useEffect(() => {
    async function LoadData(globalFacilityId: number) {
      // await adminStore.getUsersAndGroups(globalFacilityId);
    }
    LoadData(masterPageStore.globalFacilityId);
  }, [masterPageStore.globalFacilityId]);
  return (
    <Tabs
      defaultActiveKey="1"
      activeKey={tab}
      onChange={async(key) => {
        setTab(key.toString());
        if(key === "2"){
        //  await adminStore.getAllFacilityGroupServices();
        }
      }}
    >
      {/* <TabPane tab="Facility Staff Accounts" key="1">
        <UserAccountBaseView />
      </TabPane>
      <TabPane tab="Groups and Permissions" key="2">
        <GroupPermisionBaseView />
      </TabPane>
      <TabPane tab="User Permissions" key="3">
        <UserPermission />
      </TabPane> */}
    </Tabs>
  );
};

export default observer(AdminBaseView);
