import React, { createContext, useContext, useEffect } from "react";

import FormContainer from "../components/forms/FormContainer";
import LoginForm from "./forms/LoginForm";
import Register from "./forms/Register";
import ResetPassword from "./forms/ResetPassword";
import TokenValidation from "./forms/TokenValidation";
import { observer } from "mobx-react-lite";
import LeftBanner from "./LeftBanner";
import LoginPageContainer from "./LoginPageContainer";

import { homeStore as HomeStore } from "../store/HomeStore";
import { signUpView } from "../types/interfaces";

import PrivacyandTermsContainer from "../components/privacyandterms/PrivacyandTermsContainer";
const _ = require("underscore");
type Props = {};

const HomeStoreCtx = createContext(HomeStore);

const HomeBaseView = observer((props: Props) => {
  const homeStore = useContext(HomeStoreCtx);

  useEffect(() => {
    async function loadData() {
      await homeStore.getAllBranch()
      await homeStore.getAllBand()
      await homeStore.getAllPrincipalBand()
      await homeStore.getAllRank()
      await homeStore.getAllNationality()
      await homeStore.getAllProfession()
      await homeStore.getAllQualification()
      if (!_.isEmpty(window.location.search))
        homeStore.signUpView = signUpView.ValidateToken;
    
    }
    loadData()
    // return () => {};
  }, []);

  //console.log(searchParams);

  return (
    <LoginPageContainer>
      <LeftBanner />
      <FormContainer>
        {homeStore.signUpView === signUpView.Login && <LoginForm />}
        {homeStore.signUpView === signUpView.Register && <Register />}
        {homeStore.signUpView === signUpView.ForgotPassword && (
          <ResetPassword />
        )}
        {homeStore.signUpView === signUpView.ValidateToken && (
          <TokenValidation />
        )}
      </FormContainer>
      {/* <PrivacyandTermsContainer /> */}
    </LoginPageContainer>
  );
});
export default HomeBaseView;
