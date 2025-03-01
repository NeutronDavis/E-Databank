import React, { createContext, useContext } from "react";
import { observer } from "mobx-react-lite";
import { profileStore as ProfileStore } from "../store/ProfileStore";
import "../style/profile.css";


import BasicSettingsForm from "./Forms/BasicSettingsForm";
import BasicSettingsView from "./Views/BasicSettingsView";

const profilestoreConx = createContext(ProfileStore);

type Props = {};
const BasicSettings = observer((props: Props) => {
  const profileStore = useContext(profilestoreConx);

  return (
    <div className="ms-Grid" dir="ltr">
      {profileStore.showBasicSettingsForm ? (
        <BasicSettingsForm />
      ) : (
        <BasicSettingsView />
      )}
    </div>
  );
});

export default BasicSettings;
