import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Coachmark,
  IButtonProps,
  Link,
  MessageBar,
  MessageBarType,
  Persona,
  PersonaSize,
  TeachingBubble,
} from "@fluentui/react";
import Media from "react-media";
import { MobileMenu } from "./MobileMenu";
import "../../styles/north.css";
import { UserPersona } from "./UserPersona";
import { HomeOutlined } from "@ant-design/icons";
import { Button, notification, Tooltip } from "antd";
import { homeStore as HomeStore } from "../../../Home/store/HomeStore";

import { Observer, observer } from "mobx-react-lite";
import ProfileContainer from "../../../Profile/components/ProfileContainer";
import { masterPageStore as MasterPageStore } from "../../store/MasterPageStore";
import FeedbackFormContainer from "../../../Profile/components/FeedbackFormContainer";

import logo from "../../../Home/img/logo.gif"
const { useDevice } = require("react-use-device");
type Props = {
  children: React.ReactNode;
};
const masterPageStoreCtx = createContext(MasterPageStore);
const HomeStoreCtx = createContext(HomeStore);

export const North = observer(({ children }: Props) => {
  const targetButton = React.useRef<HTMLDivElement>(null);
  const { isDESKTOP } = useDevice();
  const [showBubble, setShowBubble] = useState<boolean>(true);
  const masterPageStore = useContext(masterPageStoreCtx);
  const homeStore = useContext(HomeStoreCtx);
  useEffect(() => {
    async function getInitialData() {
      // const currentUser = JSON.parse(
      //   window.localStorage.getItem("currentUser") || "{}"
      // );
      // await masterPageStore.getFacilityInfo(masterPageStore.globalFacilityId)
      // if (currentUser) {
      //   homeStore.authStore.currentUser = currentUser;
      // }
      // notification.info({
      //   message: "Register or switch to a facility",
      //   description:
      //     "click on the home icon to switch facility or register new facility",
      //   placement: "topLeft",
      // });
      
    }
    getInitialData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {};
  }, []);

  return (
    <div className="ms-Grid home-top-menu" dir="ltr">
      <div className="ms-Grid-row">
        {/* <div className="ms-Grid-col ms-sm1 ms-md1 sm-lg1 home">
          {" "}
          <Tooltip title="Switch workspace to another facility  ">
            <Button
              id="hospitalswitch"
              type="link"
              ref={targetButton}
              icon={
                <HomeOutlined style={{ color: "white", fontSize: "30px" }} />
              }
              onClick={() => {
                masterPageStore.showFacilityDialog = true;
              }}
            ></Button>
          </Tooltip>
        </div> */}
        {showBubble && (
          <Coachmark
            target={targetButton.current}
            ariaAlertText="A coachmark has appeared"
            ariaDescribedBy="coachmark-desc1"
            ariaLabelledBy="coachmark-label1"
            ariaDescribedByText="Press enter or alt + C to open the coachmark notification"
            ariaLabelledByText="Coachmark notification"
          ></Coachmark>
        )}
        <div className="ms-Grid-col ms-sm6 ms-md6 sm-lg6">
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <Observer>
                {() => (
                  <>
                    <div className="ms-Grid-col ms-sm6 ms-md3 ms-lg3 hospital-name ">
                      <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row" style={{ width: "100%" }}>
                          <div className="ms-Grid-col ms-sm12 ms-md3 ms-lg3">
                            <div className="ms-Grid-col ms-sm12 ms-md2 ms-lg2">
                              <img
                                src={logo}
                                alt="ESOCS Logo"
                                style={{
                                  height: "40px",
                                  marginLeft:"4px",
                                  float:"left"
                                }}
                              />
                            </div>
                          </div>
                          {isDESKTOP && (
                            <div
                              className="ms-Grid-col ms-sm12 ms-md9 ms-lg9"
                              style={{ paddingTop: "10px",paddingLeft:"30px" }}
                            >
                              <Tooltip
                                title={`The Eternal Sacred Order Of THe Cherubim And Seraphim data bank`}
                              >
                                <span
                                  style={{
                                    color: "#D92525",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                  }}
                                >
                                  ESOCS Data Bank
                                </span>
                              </Tooltip>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Observer>
               {/* <div
                    className="ms-Grid-col ms-md2 ms-lg2"
                    style={{
                      paddingBottom: "10px",
                      borderRight: "1px solid #f0f2f5",
                    }}
                  >
                   
                  </div> */}
              <div className="ms-Grid-col ms-sm12 ms-md9 ms-lg9">
                <nav
                  className="top-menu-nav"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {children}
                </nav>
              </div>
            </div>
          </div>
        </div>

        <UserPersona
          shownotofication={true}
          currentUser={homeStore.authStore.currentUser}
        />
        <ProfileContainer />
        <FeedbackFormContainer />
      </div>
    </div>
  );
});
