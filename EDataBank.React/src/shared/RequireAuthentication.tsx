import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate, useLocation } from "react-router";
import { authStore } from "../Features/Home/store/AuthStore";
import { CurrentUser } from "../Features/Home/types/interfaces";
import { jwtDecode } from "jwt-decode";
const RequireAuthentication = ({ children }: { children: JSX.Element }) => {
  //let navigate = useNavigate();
  let location = useLocation();
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
      }else{
        return children;
      }
    }else{
      return <Navigate to={`/login`} state={{ from: location }} replace />;
    }
  }

  return <Navigate to={`/login`} state={{ from: location }} replace />;
};

export default RequireAuthentication;
