import { UserOutlined } from "@ant-design/icons";
import { ProgressIndicator } from "@fluentui/react";
import {
  Avatar,
  Button,
  List,
  notification,
  Tooltip,
  Upload,
  UploadProps,
  Divider,
  Skeleton,
} from "antd";
import { toJS } from "mobx";
import { Observer, observer } from "mobx-react-lite";
import React, { useContext, useEffect, createContext } from "react";


import {IProfile,IImage } from "../../types/interface";
import { homeStore as HomeStore } from "../../../Home/store/HomeStore";
import { CurrentUser } from "../../../Home/types/interfaces";
import {
  profileStore as ProfileStore,
  basicProfile,
} from "../../store/ProfileStore";
import moment from "moment";
import { platformStore } from "../../../Admin/store/platformStore";


let profileValue: IProfile = basicProfile;

let profileImage: IImage = {
  ProfilePics: "",
};
type Props = {};
const profilestoreCtx = createContext(ProfileStore);
const HomeStoreCtx = createContext(HomeStore);
const platformStoreCtx = createContext(platformStore);
const BasicSettingsView = observer((props: Props) => {
  const profileStore = useContext(profilestoreCtx);
  const homeStore = useContext(HomeStoreCtx);
  const PlatformStore = useContext(platformStoreCtx);
  const avatarResponsiveSize: any = {
    xs: 60,
    sm: 65,
    md: 70,
    lg: 80,
    xl: 90,
    xxl: 100,
  };
  useEffect(() => {
    async function getInitialdata() {
      try {
        profileStore.isLoading = true;
        let currentUser: CurrentUser = homeStore.authStore.currentUser;

        await profileStore.getProfile(currentUser.id);
        
      } catch (error: any) {
        if (!error.response) {
          notification.error({
            key: "error",
            message: "EDataBank Feedback",
            description:
              "EDataBank API Server is not reachable, please contact EDataBank support",
            placement: "topLeft",
          });
        } else {
          notification.error({
            key: "error",
            message: "EDataBank Feedback",
            description: error.message,
            placement: "topLeft",
          });
        }
      } finally {
        profileStore.isLoading = false;
      }
    }
    getInitialdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles: any = {
    top: {
      paddingTop: "8px",
      paddingRight: "40px",
      paddingBottom: "8px",
      paddingLeft: "40px",
    },
    title: {
      marginBottom: "12px",
      color: "rgba(0,0,0,.85)",
      fontWeight: "500",
      fontSize: "20px",
      lineHeight: "28px",
    },

    button_view: {
      width: "144px",
      textAlign: "center",
    },
    baseView: {
      display: "flex",
      paddingTop: "12px",
    },
    left: {
      minWidth: "224px",
      maxWidth: "448px",
    },
  };
  const formatEmail = (s: string): string => {
    var i = s.indexOf("@");
    var startIndex = (i * 0.2) | 0;
    var endIndex = (i * 0.9) | 0;
    return (
      s.slice(0, startIndex) +
      s.slice(startIndex, endIndex).replace(/./g, "*") +
      s.slice(endIndex)
    );
  };
  const handleChange: UploadProps["onChange"] = async (info) => {
    try {
      let src = info.file.url as string;

      profileImage.ProfilePics = src;
      let currentUser: any = homeStore.authStore.currentUser;

      profileStore.isUploading = true;
      await profileStore.uploadProfileImg(info, currentUser.id); //for production

      profileStore.isUploading = false;
    } catch (error: any) {
      if (!error.response) {
        notification.error({
          key: "error",
          message: "EDataBank Feedback",
          description:
            "EDataBank API Server is not reachable, please contact EDataBank support",
          placement: "topLeft",
        });
      } else {
        notification.error({
          key: "error",
          message: "EDataBank Feedback",
          description: error.message,
          placement: "topLeft",
        });
      }
    } finally {
      profileStore.isUploading = false;
    }
  };
  const AvatarView = ({ profile }: any) => (
    <>
      <div className={styles.avatar}></div>
      <Upload showUploadList={false} onChange={handleChange}>
        <div className={styles.button_view}>
          <Tooltip
            title={profileValue.otherName ? profileValue.otherName : "Avatar"}
            placement="top"
          >
            <Observer>
              {() => (
                <Avatar
                  style={{ backgroundColor: "#1890ff" }}
                  icon={<UserOutlined />}
                  size={avatarResponsiveSize}
                  src={profileStore.profileImg ? profileStore.profileImg : ""}
                />
              )}
            </Observer>
          </Tooltip>
        </div>
      </Upload>
      <Observer>
        {() => (
          <div>
            {profileStore.isUploading && (
              <ProgressIndicator
                description="Uploading profile picture"
                styles={{ root: { textAlign: "center" } }}
              ></ProgressIndicator>
            )}
          </div>
        )}
      </Observer>{" "}
    </>
  );
  const data = [
    {
      title: "FullName",
      description: `${
        profileStore.basicProfile.title === null
          ? ""
          : profileStore.basicProfile.title
      } ${profileStore.basicProfile.lastName} ${
        profileStore.basicProfile.otherName
      }`,
    },
    {
      title: "Email",
      description: formatEmail(profileStore.basicProfile.email),
    },
    {
      title: "Phone Number",
      description: profileStore.basicProfile.phoneNumber.replace(
        profileStore.basicProfile.phoneNumber.substring(4, 11),
        "*******"
      ),
    },
    {
      title: "Gender",
      description: profileStore.basicProfile.gender,
    },
    {
      title: "Year Of Birth",
      description:profileStore.basicProfile.yearOfBirth 
    },
    
    {
      title: "Marital Status",
      description:profileStore.basicProfile.maritalStatus?profileStore.basicProfile.maritalStatus:"",
    },
    {
      title: "Years Of Marriage",
      description:profileStore.basicProfile.yearOfMarriage
    },
    {
      title: "Number OF Children",
      description:profileStore.basicProfile.noOfChildren?profileStore.basicProfile.noOfChildren > 1?`${profileStore.basicProfile.noOfChildren} children`:`${profileStore.basicProfile.noOfChildren} child`:"",
    },
    // {
    //   title: <Divider>Ordination Information</Divider>,
    // },
    {
      title: "Current Rank",
      description:profileStore.basicProfile.rankId?platformStore.ranks.get(profileStore.basicProfile.rankId)?.rankName:"",
    },
    {
      title: "Principal Band",
      description:profileStore.basicProfile.principalBandId?platformStore.principalBands.get(profileStore.basicProfile.principalBandId)?.principalBandName:"",
    },
    {
      title: "Bands/Association",
      description:profileStore.basicProfile.bandId?platformStore.bands.get(profileStore.basicProfile.bandId)?.bandName:"",
    },
    {
      title: "Branch",
      description:profileStore.basicProfile.branchId?platformStore.branchs.get(profileStore.basicProfile.branchId)?.branchName:"",
    },
    {
      title: "Current/Pervious Position Held In Church",
      description:profileStore.basicProfile.cPPInChurch?profileStore.basicProfile.cPPInChurch:"",
    },
    {
      title: "Profession",
      description:profileStore.basicProfile.professionId?PlatformStore.professions.get(profileStore.basicProfile.professionId)?.professionName:"",
    },
    {
      title: "Occupation",
      description:profileStore.basicProfile.occupation?profileStore.basicProfile.occupation:"",
    },
    {
      title: "Qualification",
      description:profileStore.basicProfile.qualificationId?PlatformStore.qualifications.get(profileStore.basicProfile.qualificationId)?.qualificationName:"",
    },
    {
      title: "Nationality1",
      description:profileStore.basicProfile.nationality1Id?PlatformStore.nationalities.get(profileStore.basicProfile.nationality1Id)?.nationalityName :"",
    },
    {
      title: "Nationality2",
      description:profileStore.basicProfile.nationality2Id?PlatformStore.nationalities.get(profileStore.basicProfile.nationality2Id)?.nationalityName:"",
    },
  ];
  return (
    <div className="ms-Grid-row">
       {profileStore.isLoading  ? (
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          ) : (
            <>
              <div className="ms-Grid-col ms-sm8">
                <Observer>
                  {()=>(
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              title={<a>{item.title}</a>}
                              description={item.description}
                            />
                          </List.Item>
                        )}
                      />
                  )}
                </Observer>
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6"></div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      <Button
                        type="link"
                        onClick={() => {
                          profileStore.showBasicSettingsForm = true;
                        }}
                      >
                        Edit Basic Information
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-Grid-col ms-sm4">
                <AvatarView
                  profile={toJS({
                    profile: {
                      fullName: "Nick Davis",
                      jobFunction: "Member",
                      company: "EDataBank",
                    },
                  })}
                />
              </div>
              
            </>
          )}
    </div>
  );
});

export default BasicSettingsView;
