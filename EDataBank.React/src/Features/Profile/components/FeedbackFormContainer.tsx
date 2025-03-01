import React, { createContext, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Drawer, notification } from "antd";

import FeedbackForm from "./Forms/FeedbackForm";
import { profileStore as ProfileStore } from "../store/ProfileStore";

const ProfileStoreCtx = createContext(ProfileStore);
type Props = {};

const FeedbackFormContainer = observer((props: Props) => {
  const profileStore = useContext(ProfileStoreCtx);
  useEffect(() => {
    async function getInitialdata() {
      try {
        let currentUserData: any = localStorage.getItem("currentUser");
        let currentUserModifiedData: any = JSON.parse(currentUserData);

        ProfileStore.getEmailForFeedback(currentUserModifiedData.username);
      } catch (error: any) {
        if (!error.response) {
          notification.error({
            key: "error",
            message: "EDataBank Feedback",
            description:
              "EDataBank API Server is not reachable, please contact EDataBank support",
          });
        } else {
          notification.error({
            key: "error",
            message: "EDataBank Feedback",
            description: error.message,
          });
        }
      } finally {
      }
    }
    getInitialdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Drawer
      open={profileStore.showFeedbackDialog}
      onClose={() => {
        profileStore.setShowFeedbackDialog();
      }}
      width="400"
      title="Submit Feedback"
    >
      <FeedbackForm />
    </Drawer>
  );
});

export default FeedbackFormContainer;
