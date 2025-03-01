import { loadTheme, initializeIcons } from "@fluentui/react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
// import "./shared/shared.css"
import HomeBaseView from "./Features/Home/components/HomeBaseView";
import { defaultTheme } from "./Utility/theme/theme";
import MasterPageContainer from "./Features/MasterPage/components/MasterPageContainer";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


import FeedbackPageView from "./Features/MasterPage/components/View/FeedbackPageView";
import RequireAuthentication from "./shared/RequireAuthentication";

import LandingPage from "./Features/MasterPage/components/LandingPage";
import PlatformAccountBaseView from "./Features/Admin/components/accounts/platformaccounts/PlatformAccountBaseView";
import DashboardBaseView from "./Features/Data/components/Dashboard/DashboardBaseView"
import PlatformBaseView from "./Features/Admin/components/platformData/PlatformBaseView";
import ChangeRequestGrid from "./Features/Admin/components/profileChangeRequest/components/ChangeRequestGrid";
import MemberOrdinationGrid from "./Features/Data/components/MemberOrdination/MemberOrdinationGrid";
import ProfileBaseView from "./Features/Data/components/Profile/ProfileBaseView";
import ReportBaseView from "./Features/Admin/components/accounts/report/ReportBaseView";
import UploadAnalysisGrid from "./Features/Admin/components/uploadAnalysis/UploadAnalysisGrid";
import LandingMainPage from "./Features/MasterPage/components/LandingMainPage";


initializeIcons();
loadTheme(defaultTheme);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingMainPage />} />
        <Route path="/login" element={<HomeBaseView />} />
        <Route
          element={
            <RequireAuthentication>
              <MasterPageContainer />
            </RequireAuthentication>
          }
        >
          {/* set the master page for every componet in this routes inlets */}
          <Route path="/main" element={<LandingPage />} />
          <Route path="data/dashboard" element={<DashboardBaseView/>} />
          <Route path="data/ordination" element={<MemberOrdinationGrid/>} />
          <Route path="data/profile" element={<ProfileBaseView/>} />
          <Route path="/admin/feedback" element={<FeedbackPageView />} /> 
          <Route path="/admin/platform-data" element={<PlatformBaseView/>} />
          <Route path="/admin/platform-administration" element={<PlatformAccountBaseView />} />
          <Route path="/admin/member-request" element={<ChangeRequestGrid />} />
          <Route path="/admin/report" element={<ReportBaseView/>} />
          <Route path="/admin/uploadAnalysis" element={<UploadAnalysisGrid/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
