import React, {
  Fragment,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
import {
  Button,
  Layout,
  Menu,
  notification,
  PageHeader,
  Spin,
  Tooltip,
} from "antd";

import { Offline, PollingConfig } from "react-detect-offline";
import { ApiOutlined } from "@ant-design/icons";
import { Observer, observer } from "mobx-react-lite";

import Text from "antd/lib/typography/Text";

import { ArrowLeft } from "react-feather";
import SubMenu from "antd/lib/menu/SubMenu";
import {
  getAntIconEquivalent,
  getCurrentUser,
  getMenuBreadCrumd,
} from "../../../Utility/helper";
import { masterPageStore as MasterPageStore } from "../store/MasterPageStore";
import { North } from "./Menu/North";
import "../styles/mastepagecontainer.css";

import { HTMLComponent } from "react-typescript-raw-html";
import { CurrentUser } from "../../Home/types/interfaces";
import { authStore } from "../../Home/store/AuthStore";
import { Navigate,useLocation} from "react-router";
import { jwtDecode } from "jwt-decode";
import { permissionStore } from "../store/PermissionStore";
const { Outlet, useNavigate } = require("react-router");
const { Link } = require("react-router-dom");
const _ = require("underscore");
const { Content, Footer, Sider } = Layout;
const { useDevice } = require("react-use-device");
// const masterstore = createContext(masterPageStore);
const masterPageStoreCtx = createContext(MasterPageStore);
const permissionStoreCtx = createContext(permissionStore);
const MasterPageContainer = observer(() => {
  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(false);
  const [breadcrumb, setBreadcrumb] = useState("");
  const { isMOBILE } = useDevice();
  let navigate = useNavigate();
  const masterPageStore = useContext(masterPageStoreCtx);
  const PermissionStore = useContext(permissionStoreCtx);
  const year= (new Date()).getFullYear();
  let location = useLocation();
  useEffect(() => {
    async function Auth() {

      let currentUserData: any = localStorage.getItem("currentUser");
      if(currentUserData !== null){

        let currentUserModifiedData: any = JSON.parse(currentUserData);
        const userToken = window.sessionStorage.getItem("qrjwt")
      
        if (userToken && currentUserModifiedData) {
          authStore.currentUser = currentUserModifiedData as CurrentUser;
          let tokenExpiration = jwtDecode(userToken).exp;
          let dateNow = new Date();
          if(Number(tokenExpiration) < dateNow.getTime()/1000){
            return <Navigate to={`/login`} state={{ from: location }} replace />
          }
        }
      }else{
        return <Navigate to={`/login`} state={{ from: location }} replace />
      }
  
    }
    async function loadMenu() {
      let menu = await masterPageStore.loadMenu();
      window.appMenu = menu;
    }
    Auth()
    loadMenu();
  }, []);
  const subMenuClick = async (smId: any, mId: any, url: string) => {
    try {
      let userId = getCurrentUser()?.id;
      console.log("url", url, mId, smId);
      masterPageStore.selectedMenuId = mId;
      setBreadcrumb(url);
      await masterPageStore.setUserLastVisitedProfile(
        userId,
        smId,
        mId,
        url,
        masterPageStore.globalFacilityId,
        masterPageStore.globalFacility
      );
    } catch (error: any) {
      notification.error({
        message: "EDataBank Feedback",
        description: error.response && error.response.text,
      });
    }
  };

  const headersize = isMOBILE ? "mobileheader" : "desktopheader";
  return (
    <Layout>
      <North>
        <></>
      </North>
      <Content
        className="site-layout ms-depth-4"
        style={
          !isMOBILE
            ? {
                borderTop: "3px solid #191B40",
                margin: "20px",
                padding: "0 20px",
                paddingLeft: "0px",
                paddingBottom: "10px",
              }
            : { borderTop: "3px solid #191B40" }
        }
      >
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
              {" "}
              <PageHeader
                className="site-page-header"
                onBack={() => {
                  navigate(-1);
                }}
                title={
                  <HTMLComponent
                    rawHTML={`<div class='${headersize}'>${getMenuBreadCrumd(
                      breadcrumb
                    )??masterPageStore.activeTitle}</div>`}
                  ></HTMLComponent>
                }
                /*  subTitle="EDataBank" */
                backIcon={
                  <Tooltip title="Go Back">
                    {/*  <ChevronLeft style={{ marginTop: "5px", color: "red" }} /> */}
                    <ArrowLeft
                      style={{ marginTop: "5px", color: "red" }}
                      size="30"
                    />
                  </Tooltip>
                }
                style={{ fontSize: "12px" }}
              />
            </div>
          </div>
        </div>

        <Layout className="site-layout-background">
          <Sider
            collapsible={true}
            className="site-layout-background"
            width={200}
            theme="light"
            breakpoint="lg"
            collapsedWidth="50"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              //console.log(collapsed, type);
              setMenuCollapsed(collapsed);
            }}
          >
            {masterPageStore.isMenuLoading ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50vh",
                  }}
                >
                  <Spin tip="loading..." size="large"></Spin>
                </div>
              </>
            ) : (
              <Observer>
                {() => (
                    <Menu
                    theme="dark"
                    mode="inline"
                    forceSubMenuRender={true}
                    defaultOpenKeys={["1", "2", "3", "4"]}
                    defaultSelectedKeys={["1", "10"]}
                    selectedKeys={[masterPageStore.selectedSubMenuId]}
                    onClick={async (menu: any) => {
                      localStorage.setItem(
                        "selectedSubMenuId",
                        menu.keyPath[0]
                      );
                      localStorage.setItem("selectedMenuId", menu.keyPath[1]);
                      masterPageStore.selectedMenuId = menu.keyPath[1];
                      masterPageStore.selectedSubMenuId = menu.keyPath[0];
                      console.log("menu",menu)
                    
                      // mainStore.menuSelectedKey = menu.keyPath[0];
                      //  mainStore.menuOpenKey = menu.keyPath[1]; */
                    }}
                  >
                    {masterPageStore.selectedMenu.map((menu: any) => (
                      <SubMenu
                        title={
                          <span>
                            {getAntIconEquivalent(menu.menuIcon, menuCollapsed)}
                            <Text style={{ color: "inherit" }}>
                              {menu.menu}
                            </Text>
                          </span>
                        }
                        key={menu.menuId}
                        // style={{display:`${menu.renderMenu?"block":"none"}`}}
                      >
                        {menu.subMenus.map((sm: any) => (

                        PermissionStore.getPermissions(sm.url).canView &&(

                          <Menu.Item
                            key={sm.subMenuId}
                            style={{ cursor: "pointer" }}
                          
                            onClick={async () => {
                              await subMenuClick(
                                sm.subMenuId,
                                menu.menuId,
                                sm.url
                              );
                            }}
                          >
                            <Link to={sm.url ? sm.url : "#"}>{sm.name}</Link>
                          </Menu.Item>
                        )
                        ))}
                      </SubMenu>
                    ))}
                  </Menu>
                )}
              </Observer>
            )}
          </Sider>
          <Content>
            <div
              className="site-layout-background"
              style={{
                paddingTop: "0px",
                marginLeft: "5px",
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ESOCS Data Bank ©{year} All Rights Reserved
      </Footer>
      <Offline
         polling={

          {interval:300000,
            url:"https://ipv4.icanhazip.com"
          } as PollingConfig
        }
        onChange={(args: any) => {
          if (args === true) {
            notification.success({
              message: `Connected `,
              description: "successfully connected to the internet",
              placement: "bottomRight",
            });
          } else {
            notification.warning({
              message: `Not Connected `,
              description:
                "it looks like you're not connected to the internet or temporarily disconnected,please check your internet connection",
              placement: "bottomRight",
              icon: <ApiOutlined style={{ color: "red" }} />,
            });
          }
        }}
      ></Offline>
    </Layout>
  );
});

export default MasterPageContainer;
