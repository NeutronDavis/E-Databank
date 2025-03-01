import { Tabs } from "antd";
import { platformStore } from "../../../store/platformStore";
import { createContext, useContext, useEffect } from "react";
import MemberReport from "../report/MemberReport";
import OrdinationReport from "../report/OrdinationReport";
import adminStore from "../../../store/adminstore";
import MemberProvincilaReport from "../report/MemberProvincilaReport";
import ProvincialOrdinationReport from "../report/ProvincialOrdinationReport";
import GeneralReport from "./GeneralReport";
import ReportByRankAndYear from "./ReportByRankAndYear";
const platformStoreCtx = createContext(platformStore);
const adminStoreCtx = createContext(adminStore);
const { TabPane } = Tabs;
type Props = {};

const ReportBaseView = (props: Props) => {
  const PlatformStore = useContext(platformStoreCtx);
  const AdminStore = useContext(adminStoreCtx);
  useEffect(() => {
    async function getAllUsers() {
      await PlatformStore.getAllCmc();
      await PlatformStore.getAllProvince();
      await PlatformStore.getAllDistrict();
      await PlatformStore.getAllBranch();
    }
    getAllUsers();
    return () => { };
  }, []);
  return (

    <Tabs defaultActiveKey="1"
      onChange={async (key) => {
        // setTab(key.toString());
        if (key === "2") {
          AdminStore.ordinationProgression.clear()
          AdminStore.provinceVal = 0
          AdminStore.branchVal = 0
          AdminStore.yearVal = 0
        }
      }}
    >
      <TabPane tab="Members Report" key="1">
        <GeneralReport />
      </TabPane>
      <TabPane tab="Members Report By Rank And Year" key="2">
        <ReportByRankAndYear />
      </TabPane>
      <TabPane tab="Ordination Recommendation Report" key="3">
        <OrdinationReport />
      </TabPane>

    </Tabs>
  );
};

export default ReportBaseView;
