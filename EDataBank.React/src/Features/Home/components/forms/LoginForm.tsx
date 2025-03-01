import { Link, MessageBar, MessageBarType, ProgressIndicator } from "@fluentui/react";

import { Stack } from "@fluentui/react/lib/Stack";
import React, { createContext, useContext } from "react";
import { Form, Input, Button, notification, Divider } from "antd";
import { LockOutlined, CheckOutlined, MailOutlined,UserOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { FormBanner } from "./FormBanner";
import { signUpView, CurrentUser } from "../../types/interfaces";
import { homeStore as HomeStore } from "../../store/HomeStore";
import { permissionStore as PermissionStore  } from "../../../MasterPage/store/PermissionStore";
import { masterPageStore as MasterPageStore } from "../../../MasterPage/store/MasterPageStore";
import "../../../../shared/shared.css"
import {
  ILogin,
  LoginValidationSchema,
} from "../../../../Utility/Validations/HomeValidations";
import { Observer, observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { PermissionGroup, UserPermission } from "../../../MasterPage/types/Interfaces";
import { platformStore } from "../../../Admin/store/platformStore";
type Props = {};
const _ = require("underscore");
const initLoginData: ILogin = {
  username: "",
  password: "",
};
const HomeStoreCtx = createContext(HomeStore);
const permissionStoreCtx = createContext(PermissionStore);
const platformStoreCtx = createContext(platformStore);
const LoginForm: React.FunctionComponent = observer((props: Props) => {
  const homeStore = useContext(HomeStoreCtx);
  const permissionStore = useContext(permissionStoreCtx);
  const PlatformStore = useContext(platformStoreCtx);
  let navigate = useNavigate();
  let location = useLocation();
  let redirectTo = (location.state as any)?.from?.pathname || undefined;
  let redirectToSearch = (location.state as any)?.from?.search || undefined;
  // let from = (location.state as any)?.from?.pathname || "/main";
  function addSlashToStart(str:string) {
    // Check if the string is null or undefined
    if (str === null || str === undefined) {
      // If null or undefined, return '/' as the string
      return '';
    }
    
    // Check if the string starts with '/'
    if (str.charAt(0) !== '/') {
      // If not, add '/' at the beginning
      str = '/' + str;
    }
    return str;
  }
  return (
    <Stack horizontalAlign="start" className="ms-motion-fadeIn">
      <FormBanner />
      <Formik
        initialValues={initLoginData}
        validationSchema={LoginValidationSchema}
        isInitialValid={false}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            homeStore.authStore.loginInProgress = true;
            const retVal = await homeStore.authStore.login({
              ...values,
            } as ILogin);
            let loginResponse: any = toJS(retVal);
            let redirectStr = `${redirectTo === undefined ?"":redirectTo}${redirectToSearch === undefined ?"":redirectToSearch}`
            let from = redirectStr || "/main";
            if (loginResponse.isAcountValidated) {
              const cuser = loginResponse as CurrentUser;
              homeStore.authStore.currentUser = cuser;
              sessionStorage.setItem("qrjwt",cuser.token)
              sessionStorage.setItem("specimen",cuser.id)
              localStorage.setItem("currentUser", JSON.stringify(cuser));
              // navigate("/main",{ replace: true });
              //console.log("lastVisitedMenuUrl", cuser.lastVisitedMenuUrl);
              PermissionStore.groups = cuser.groups.name;
              permissionStore.setUserPermissionAndGroups(cuser.permissions as Array<UserPermission>,cuser.groups as PermissionGroup);
             
            await PlatformStore.getAllBand()
            await PlatformStore.getAllBranch()
            await PlatformStore.getAllCathedral()
            await PlatformStore.getAllDistrict()
            await PlatformStore.getAllPrincipalBand()
            await PlatformStore.getAllProfession()
            await PlatformStore.getAllQualification()
            await PlatformStore.getAllRank()
              
              // navigate(from, { replace: true });
              if (!_.isEmpty(cuser.lastVisitedMenuUrl)) {
                let lastV = redirectStr || addSlashToStart(cuser.lastVisitedMenuUrl)
                navigate(lastV);
              } else {
                navigate(from, { replace: true });
              } 
            } else {
              notification.info({
                message: "Credentials Manager Feedback",
                description: loginResponse.msg,
              });
              homeStore.authStore.loginInProgress = false;
              return;
            }
          } catch (error: any) {
            if (error?.response?.status === 404) {
              notification.error({
                message: "Credentials Manager Feedback",
                description: "Username or password is incorrect",
              });
              homeStore.authStore.loginInProgress = false;
              return;
            }

            console.log(error);
            if (!error.response) {
              notification.error({
                message: "Credentials Manager Feedback",
                description:
                  "ESOCS api server is not reachable, please contact ESOCS support",
              });
              homeStore.authStore.loginInProgress = false;
            }

            notification.error({
              message: "Credentials Manager Feedback",
              description: error?.response?.body?.message,
            });
            homeStore.authStore.loginInProgress = false;
          } finally {
            homeStore.authStore.loginInProgress = false;
            setSubmitting(true);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          validateForm,
          isValid,
        }) => (
          <Form onFinish={handleSubmit}>
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12">
                  <MessageBar messageBarType={MessageBarType.info}>
                    <b style={{color:"#d92525"}}>Note</b>:LastName OtherNames.
                  </MessageBar>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 login-text">
                  <Form.Item
                    help={touched.username && errors.username}
                    className=""
                  >
                    <Input
                      placeholder="Your Full Name"
                      prefix={<UserOutlined style={{ color: "#0E7BC4" }} />}
                      name="username"
                      value={values?.username}
                      onChange={handleChange}
                      allowClear
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 login-text">
                  <Form.Item
                    name="password"
                    help={touched.password && errors.password}
                  >
                    <Input.Password
                      placeholder="Password"
                      prefix={<LockOutlined style={{ color: "#0E7BC4" }} />}
                      name="password"
                      value={values?.password}
                      onChange={handleChange}
                      allowClear
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 login-text">
                <Form.Item style={{ textAlign: "right" }}>
                  <Observer>
                    {() => (
                      <Button
                        type="primary"
                        htmlType="submit"
                        
                        style={{backgroundColor:"#D92525"}}
                        icon={<CheckOutlined />}
                        loading={homeStore.authStore.loginInProgress}
                        disabled={!isValid}
                      >
                        Login
                      </Button>
                    )}
                  </Observer>
                </Form.Item>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 login-text">
                <Observer>
                  {() => (
                    <Form.Item style={{ textAlign: "right" }}>
                      {homeStore.authStore.loginInProgress && (
                        <ProgressIndicator description="Please Wait :We are validating your credentials" />
                      )}
                    </Form.Item>
                  )}
                </Observer>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="ms-Grid-row" style={{ marginTop: "25px" }}>
        <div className="ms-Grid-col ms-sm12 ms-fontSize-12">
          <span>
            Don't have Account?
            <br />
            <Link
              onClick={() => {
                homeStore.signUpView = signUpView.Register;
              }}
              style={{ color: "#0D75BB" }}
              className=" ms-sm12 ms-fontSize-12"
            >
              SignUp Now{" "}
            </Link>
          </span>
        </div>
        <div style={{ height: "10px" }} />
        <br />
        <Divider />

        <div
          className="ms-Grid-col ms-sm12 ms-fontSize-12"
          style={{ textAlign: "left" }}
        >
          <span>
            Forgot your Password?
            <br />
            <Link
              onClick={() => {
                homeStore.signUpView = signUpView.ValidateToken;
              }}
              style={{ color: "#0D75BB" }}
            >
              Reset your password{" "}
            </Link>
          </span>
        </div>
      </div>
    </Stack>
  );
});

export default LoginForm;
