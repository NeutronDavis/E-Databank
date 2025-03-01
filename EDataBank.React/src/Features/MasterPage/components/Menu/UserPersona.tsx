import React, { useContext, createContext, useEffect } from "react";
import "../../styles/userPersona.css";
import "../../styles/mobilemenu.css";
import { Persona, PersonaSize } from "@fluentui/react";
import { Menu, Dropdown, Typography, Badge, Tooltip, notification } from "antd";

import { Observer, observer } from "mobx-react-lite";

import Media from "react-media";
import {
  HomeOutlined,
  LogoutOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  HelpCircle,
  MessageSquare,
  Power,
  Settings,
  Youtube,
} from "react-feather";
import { profileStore as ProfileStore } from "../../../Profile/store/ProfileStore";
import { masterPageStore } from "../../store/MasterPageStore";
import logo from "../images/EDataBank.png";
import { CurrentUser, signUpView } from "../../../Home/types/interfaces";
import { toJS } from "mobx";
import { ENV } from "../../../../Infrastructure/EnvironmentConfig";
import { permissionStore } from '../../store/PermissionStore';
import { platformStore } from "../../../Admin/store/platformStore";
import { homeStore } from "../../../Home/store/HomeStore";
import { PermissionGroup, UserPermission } from "../../types/Interfaces";
const { useNavigate } = require("react-router");

const masterstore = createContext(masterPageStore);
const { Text } = Typography;
const _ = require("underscore");
window._ = _;
const ProfileStoreCtx = createContext(ProfileStore);
const permissionStoreCtx = createContext(permissionStore);
const platformStoreCtx = createContext(platformStore);
const homeStoreCtx = createContext(homeStore);
type Props = {
  shownotofication: boolean;
  currentUser: CurrentUser;
};

export const UserPersona = observer(
  ({ currentUser, shownotofication }: Props) => {
    const profileStore = useContext(ProfileStoreCtx);
    const masterPStore = useContext(masterstore);
    const PermissionStore = useContext(permissionStoreCtx);
    const PlatformStore = useContext(platformStoreCtx);
    const HomeStore = useContext(homeStoreCtx);
    let navigate = useNavigate();

    const logOut = () => {
      localStorage.clear();
      PermissionStore.userPermissions.clear();
      PermissionStore.userGroups = {} as PermissionGroup;
      HomeStore.signUpView = signUpView.Login;
      navigate("/");
    };

    useEffect(() => {
      async function loadRule() {
        // PermissionStore.getPermissions("/roster");
        let ls = localStorage.getItem('userGroups');
        let up = localStorage.getItem('userPermissions');
        if (ls && up) {
          let g = JSON.parse(ls);
          let p = JSON.parse(up);
          permissionStore.setUserPermissionAndGroups(p as Array<UserPermission>,g as PermissionGroup);
        }
      }
      loadRule();
    }, []);

    const menuHeaderDropdown = (
      <Menu /* onClick={onMenuClick} */ style={{ width: "180px" }}>
        {/* <Menu.Item
          key="center"
          onClick={() => {
            //history.push("/main/userprofile/settings");
            //profileStore.selectKey = "3";
          }}
        >
          <UserOutlined /> &nbsp; <Text>My Privileges</Text>
        </Menu.Item> */}

        <Menu.Item
          key="settings"
          onClick={async() => {  
            profileStore.showSettingsDialog = true;
            // history.push("/main/userprofile/settings");
           
          }}
        >
          <SettingOutlined /> &nbsp;<Text>Settings</Text>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="logout" onClick={logOut}>
          <LogoutOutlined /> &nbsp;
          <Text>Logout</Text>
        </Menu.Item>
      </Menu>
    );

    return (
      <Media query={{ minWidth: 1024 }}>
        {(matches) =>
          matches ? (
            <div
              className="ms-Grid-col ms-sm5 ms-md5  ms-lg5"
              style={{ cursor: "pointer" }}
            >
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  {/* <div className="ms-Grid-col ms-md1 ms-lg1 light-border notification">
                    <Badge
                      
                      color="#0078D4"
                      
                      count={0}
                
                      style={{
                        cursor: "pointer!important",
                        backgroundColor: "red",
                      }}
                    >
                      <NotificationOutlined
                    
                      color="lightgray"
                        style={{ color: "#0078D4" }}
                        onClick={() => {
                          notification.info({
                            message: ENV.APP_NAME + " Notification",
                            description:
                              "This feature is actively being developed and its coming soon in the next deployment",
                            placement: "top",
                          });
                        }}
                      />
                    </Badge>
                  </div> */}
                  <div className="ms-Grid-col ms-md1 ms-lg1 top-menu-buttons">
                    <Tooltip title="User Preference">
                      <Settings
                      
                      color="lightgray"
                        size="18"
                        
                        onClick={() => {
                          notification.info({
                            message: ENV.APP_NAME + " User Preference",
                            description:
                              "This feature is actively being developed and its coming soon in the next deployment",
                            placement: "top",
                          });
                        }}
                      />
                    </Tooltip>
                  </div>
                  <div className="ms-Grid-col ms-md1 ms-lg1 top-menu-buttons">
                    <Tooltip title={ENV.APP_NAME +" Support"}>
                      <HelpCircle
                        color="lightgray"
                        size="18"
                        onClick={() => {
                          notification.info({
                            message: ENV.APP_NAME + " Support",
                            description:
                              "This feature is actively being developed and its coming soon in the next deployment",
                            placement: "top",
                          });
                        }}
                      />
                    </Tooltip>
                  </div>
                  <div className="ms-Grid-col ms-md1 ms-lg1 top-menu-buttons">
                    <Tooltip title={ENV.APP_NAME + " Training/Guides"}>
                      <Youtube
                         color="lightgray"
                        size="18"
                        onClick={() => {
                          notification.info({
                            message:ENV.APP_NAME + " Training/Guides",
                            description:
                              "This feature is actively being developed and its coming soon in the next deployment",
                              placement: "top",
                            });
                        }}
                      />
                    </Tooltip>
                  </div>
                  <div className="ms-Grid-col ms-md1 ms-lg1 top-menu-buttons">
                    <Tooltip title="Submit Feedback">
                      <MessageSquare
                        color="#0078D4"
                        size="18"
                        onClick={() => {
                          ProfileStore.setShowFeedbackDialog();
                        }}
                      />
                    </Tooltip>
                  </div>
                  <Observer>
                    {()=>(
                    <div className="ms-Grid-col ms-md4 ms-lg4 persona light-border">
                      <Tooltip
                        title={currentUser.fullName}
                        /* title={currentUser?.fullName} */
                        key="Reject"
                        placement="right"
                      >
                        <Dropdown
                          overlay={menuHeaderDropdown}
                          trigger={["click"]}
                        >
                          <Persona
                            imageInitials={currentUser.initials}
                            text={currentUser.fullName}
                            secondaryText={PermissionStore.groups}
                            size={PersonaSize.size40}
                          />
                        </Dropdown>
                      </Tooltip>
                    </div>
                    )}
                  </Observer>
                  <div
                    className="ms-Grid-col ms-md1 ms-lg1 top-menu-buttons"
                    style={{ paddingLeft: "10px" }}
                  >
                    <Tooltip title={"Log Out from "+ ENV.APP_NAME}>
                      <Power color="red" size="25" onClick={logOut} />
                    </Tooltip>
                  </div>
                 
                </div>
              </div>
            </div>
          ) : (
            <Observer>
              {()=>(
                <div className="ms-Grid-col ms-sm1  user-personal-mobile">
                
                      <Dropdown overlay={menuHeaderDropdown} trigger={["click"]}>
                        <Persona
                          imageInitials={currentUser.initials}
                          text={currentUser.fullName}
                          secondaryText={PermissionStore.groups}
                          size={PersonaSize.size40}
                        />
                      </Dropdown>
                  
                </div>

              )}
            </Observer>
          )
        }
      </Media>
    );
  }
);
