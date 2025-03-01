import React, { createContext, useContext, useEffect } from "react";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { observer } from "mobx-react-lite";
import { Label, Pivot, PivotItem } from "@fluentui/react";
import { profileStore as ProfileStore } from "../store/ProfileStore";
import BasicSettings from "./BasicSettings";
import SecuritySettings from "./SecuritySettings";
import NotificationSettings from "./NotificationSettings";
import { Drawer, Skeleton } from "antd";
import { getCurrentUser } from "../../../Utility/helper";

const ProfileStoreCtx = createContext(ProfileStore);
type Props = {};

const ProfileContainer = observer((props: Props) => {
  const profileStore = useContext(ProfileStoreCtx);
  useEffect(() => {
    async function LoadData() {
      await ProfileStore.getSecurityInfo(getCurrentUser().id)
    }
    LoadData();
  }, []);

  return (
    <Drawer
      open={profileStore.showSettingsDialog}
      onClose={() => {
        profileStore.showSettingsDialog = false;
      }}
      width="440"
      title="Settings"
    >
      <div className="ms-Grid" dir="ltr">
      {profileStore.isLoadingSecuritySetUp  ? (
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          ) : (
            <>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                  {" "}
                  <SecuritySettings />
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                  <NotificationSettings />
                </div>
              </div>

            </>
            )
          }
      </div>
    </Drawer>
  );
});

export default ProfileContainer;
