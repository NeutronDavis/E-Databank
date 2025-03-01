import React, { createContext, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import ProfileView from "./ProfileView";
import { profileStore } from "../../../Profile/store/ProfileStore";
import ProfileForm from "./ProfileForm";
import { getCurrentUser } from "../../../../Utility/helper";
import { platformStore } from "../../../Admin/store/platformStore";
const profileStoreCtx = createContext(profileStore);
const platformStoreCtx = createContext(platformStore);
type Props = {};
const ProfileBaseView = observer((props: Props) => {
  const ProfileStore = useContext(profileStoreCtx);
  const PlatformStore = useContext(platformStoreCtx);
  useEffect(() => {
    async function LoadData() {
      await ProfileStore.getProfile(getCurrentUser().id)
      await PlatformStore.getAllBand()
      await PlatformStore.getAllBranch()
      await PlatformStore.getAllPrincipalBand()
      await PlatformStore.getAllProfession()
      await PlatformStore.getAllQualification()
      await PlatformStore.getAllRank()
      await PlatformStore.getAllNationality()
    }
    LoadData();
  }, []);
  return (
    <div className="ms-Grid" dir="ltr">
      <ProfileView/>
      <ProfileForm/>
    </div>
  );
});

export default ProfileBaseView;
