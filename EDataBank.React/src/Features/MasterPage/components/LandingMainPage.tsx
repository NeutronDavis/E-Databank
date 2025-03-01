import React, { useContext, createContext, useEffect } from "react";
import { Avatar, Button, Card, Space, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { CompoundButton, Link } from "@fluentui/react";

import { masterPageStore as MasterPageStore } from "../store/MasterPageStore";
import svg from "../../MasterPage/components/images/landingpage.svg";
import IMG1 from "../img/baba1.jpg"
import IMG2 from "../img/baba2.jpg"
import IMG3 from "../img/baba3.jpg"
import IMG4 from "../img/baba4.jpg"
import IMG5 from "../img/baba5.jpg"
import logo from "../../Home/img/logo.gif"
import { getCurrentUser } from "../../../Utility/helper";
import { useParams } from "react-router";
import { permissionStore } from "../store/PermissionStore";
import { UserOutlined } from "@ant-design/icons";
import { North } from "./Menu/North";
import "../styles/landingMainPageStyle.css"
import { homeStore } from "../../Home/store/HomeStore";
import { signUpView } from "../../Home/types/interfaces";
// const { useDevice } = require("react-use-device");
const { Title } = Typography;
type Props = {};
const greet = require("greet-by-time");
const masterPageStoreCtx = createContext(MasterPageStore);
const permissionStoreCtx = createContext(permissionStore);
const { Meta } = Card;
const LandingMainPage = (props: Props) => {
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
  const year= (new Date()).getFullYear();

  return (
    <>
        <body>
  <nav className="navbar">
    <div className="logo" style={{
                                  height: "40px",
                                  marginLeft:"4px",
                                  float:"left",
                                  display:"flex",
                                  justifyContent:"center",
                                  alignItems:"center"
                                }}>
      <img src={logo} alt="Logo" width="40px"/>
      <p style={{paddingLeft:"7px",paddingTop:"20px", fontSize:"10px"}}>ESOCS DATA BANK</p>
    </div>
    <div className="nav-links">
      {/* <a href="/login">Login</a> */} 
      <Space
            align="end"
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
            }}
        >
      <Button
         type="link"
         htmlType="button"
        onClick={() => {
            homeStore.signUpView = signUpView.Login;
            navigate("/login");
        }}
        style={{ color: "#fff" }}
        className=" ms-sm12 ms-fontSize-12"
    >
        Login{" "}
    </Button>
      <Button
         type="link"
         htmlType="button"
        onClick={() => {
            homeStore.signUpView = signUpView.Register;
            navigate("/login");
        }}
        style={{ color: "#fff" }}
        className=" ms-sm12 ms-fontSize-12"
    >
        SignUp Now{" "}
    </Button>
    </Space>
      {/* <a href="#">Register</a> */}
    </div>
  </nav>

  <header>
    {/* <h1>{greet("Dear", hour)}</h1> */}
    <h1 style={{color:"#d92525"}}>Welcome to ESOCS DATA BANK</h1>
    <p>We are glad to have you!</p>
  </header>
	<section className="features">
    <div className="feature">
      <img src={IMG5} alt="Feature 1"/>
      <p>HIS MOST EMINENCE, BABA ALADURA</p>
      <h2>(DR) DAVID D.L BOBMANUEL</h2>
    </div>
	</section>
  <section className="features">
    <div className="feature">
      <img src={IMG4} alt="Feature 1"/>
      <p>HIS EMINENCE, DEPUTY BABA ALADURA </p>
      <h2>NATHAN OJIAKOR</h2>
    </div>
    <div className="feature">
      <img src={IMG3} alt="Feature 2"/>
      <p>HIS EMINENCE, DEPUTY BABA ALADURA </p>
      <h2>J. F. FARINLOYE</h2>
    </div>
    <div className="feature">
      <img src={IMG1} alt="Feature 3"/>
      <p>HIS EMINENCE, DEPUTY BABA ALADURA </p>
      <h2>(DR) HAROLD DUMUREN</h2>
    </div>
  </section>
  <section className="features">
    <div className="feature">
      <img src={IMG2} alt="Feature 1"/>
      <p>HIS EMINENCE, SENIOR APOSTLE GENERAL</p>
      <h2>(DR) NAPO EMUCHAY</h2>
    </div>
	</section>
  <footer>
    <p>&copy; ESOCS Data Bank ©{year} All Rights Reserved</p>
  </footer>
</body>
    </>
  );
};


export default LandingMainPage;
