import React, { useContext, createContext, useEffect } from "react";
import { Avatar, Card, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { CompoundButton } from "@fluentui/react";

import { masterPageStore as MasterPageStore } from "../store/MasterPageStore";
import svg from "../../MasterPage/components/images/landingpage.svg";
import IMG1 from "../img/baba1.jpg"
import IMG2 from "../img/baba2.jpg"
import IMG3 from "../img/baba3.jpg"
import IMG4 from "../img/baba4.jpg"
import IMG5 from "../img/baba5.jpg"
import { getCurrentUser } from "../../../Utility/helper";
import { useParams } from "react-router";
import { permissionStore } from "../store/PermissionStore";
import { UserOutlined } from "@ant-design/icons";
// const { useDevice } = require("react-use-device");
const { Title } = Typography;
type Props = {};
const greet = require("greet-by-time");
const masterPageStoreCtx = createContext(MasterPageStore);
const permissionStoreCtx = createContext(permissionStore);
const { Meta } = Card;
const LandingPage = (props: Props) => {
  // let { reqId } = useParams();
  const hour = new Date().getHours();
  greet.morningGreetings = ["Good Morning", "Awesome Morning", "Welcome Back"];
  greet.dayGreetings = ["Good Afternoon", "Awesome Afternoon", "Welcome Back"];
  greet.eveningGreetings = ["Good Evening", "Awesome Evening", "Welcome Back"];
  const masterPageStore = useContext(masterPageStoreCtx);
  // const ManageFacilityStore = useContext(manageFacilityStoreCtx);
  const PermissionStore = useContext(permissionStoreCtx);
  let navigate = useNavigate();
  const user = getCurrentUser()?.fullName;
  // const { isMOBILE, isDESKTOP,isTABLET } = useDevice();


  useEffect(() => {
    if (window.location.pathname.includes("/main")){
      PermissionStore.getHeaderMenuPriviledge();
    }

    return () => {};
  }, []);
  
  if (window.location.pathname.includes("/main")){
    PermissionStore.getHeaderMenuPriviledge();
  }
  const avatarResponsiveSize: any = {
    xs: 60,
    sm: 65,
    md: 70,
    lg: 80,
    xl: 90,
    xxl: 100,
    xxxl:200
  };
  return (
    <div
      className="ms-Grid"
      dir="ltr"
      style={{ height: "90vh", width: "100%" }}
    >
      <div className="ms-Grid-row">
        <div
          className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Title level={3} style={{ color: "red" }}>
            {" "}
            {greet(user, hour)}
          </Title>
        </div>
      </div>
     
      <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "18px",
          }}
        >
          <h3>
          Welcome to ESOCS Data Bank. We are glad to have you!
          </h3>
      </div>
      <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
      <br />
      <br />
      <br />
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div
                className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                <Title
                  level={4}
                  style={{
                    color: "#1890ff",
                  }}
                >
                  To Get you Started:
                </Title>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div
                className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "18px",
                  paddingTop: "20px",
                }}
              >
                <CompoundButton
                  secondaryText="For your analysis, click here to easily navigate to your dashboard."
                  onClick={() => {
                    masterPageStore.selectedMenuId = "2"; //my dashboard
                    masterPageStore.selectedSubMenuId = "3";
                    sessionStorage.setItem("selectedSubMenuId", "3");
                    sessionStorage.setItem("selectedMenuId", "2");
                    masterPageStore.activeTitle=`<span style="font-weight:400;">Data </span>| <span style="font-weight:400;color:#1890FF">Dashboard</span>`
                    navigate("/data/dashboard");
                  }}
                >
                 My Dashboard
                </CompoundButton>
              </div>
            </div>

            <div className="ms-Grid-row">
              {/* <div
                className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "18px",
                  paddingTop: "20px",
                }}
              >
                <CompoundButton
                  secondaryText="Register your facility,clinics,pharmarcy or any other health facility on pur platform"
                  onClick={() => {
                    masterPageStore.showFacilityCreationDialog = true;
                  }}
                >
                  Register a Facility
                </CompoundButton>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
          {/* <img src={svg} alt="welcome" /> */}
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center"
            }}>
                <Card
                  hoverable
                  style={{ width: 560 }}
                  cover={<img alt="example" src={IMG5} />}
                >
                  <Tooltip title="HIS MOST EMINENCE, BABA ALADURA (DR) DAVID D. l BOBMANUEL">
                    <Meta title=" HIS MOST EMINENCE, BABA ALADURA (DR) DAVID D. l BOBMANUEL" description="HME" />
                  </Tooltip>
                </Card>
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg4" >
                <Card
                  hoverable
                  style={{ width: 540 }}
                  cover={<img alt="example" src={IMG4} />}
                >
                  <Tooltip title="HIS EMINENCE, DEPUTY BABA ALADURA NATHAN OJIAKOR">
                    <Meta title="HIS EMINENCE, DEPUTY BABA ALADURA NATHAN OJIAKOR" description="..." />
                  </Tooltip>
                </Card>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg4">
                <Card
                  hoverable
                  style={{ width: 540 }}
                  cover={<img alt="example" src={IMG3} />}
                >
                  <Tooltip title="HIS EMINENCE, DEPUTY BABA ALADURA J. F. FARINLOYE">
                    <Meta title="HIS EMINENCE, DEPUTY BABA ALADURA J. F. FARINLOYE" description="Board - 11th April-41" />
                  </Tooltip>
                </Card>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg4">
                <Card
                  hoverable
                  style={{ width: 540 }}
                  cover={<img alt="example" src={IMG1} />}
                >
                  <Tooltip title="HIS EMINENCE, DEPUTY BABA ALADURA (DR) HAROLD DUMUREN">
                    <Meta title="HIS EMINENCE, DEPUTY BABA ALADURA (DR) HAROLD DUMUREN" description="Board - 11th April-16" />
                  </Tooltip>
                </Card>
            </div>
          </div>
          <div className="ms-Grid-row" >
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center"
            }}>
                <Card
                  hoverable
                  style={{ width: 540 }}
                  cover={<img alt="example" src={IMG2} />}
                >
                  <Tooltip title="HIS EMINENCE, SENIOR APOSTLE GENERAL (DR) NAPO EMUCHAY">
                    <Meta title="HIS EMINENCE, SENIOR APOSTLE GENERAL (DR) NAPO EMUCHAY" description="Board - 11th April-18" />
                  </Tooltip>
                </Card>
            </div>
          
          </div>
        
        </div>
        
      </div>
    </div>
  );
};


export default LandingPage;
