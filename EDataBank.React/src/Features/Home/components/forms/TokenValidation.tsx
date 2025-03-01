import { KeyOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, ProgressIndicator, Stack } from "@fluentui/react";
import { Button, Divider, Form, Space, Input, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";

import { Formik } from "formik";
import { toJS } from "mobx";
import { Observer, observer } from "mobx-react-lite";
import React, { createContext, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  ILogin,
  ITokenValidation,
  TokenValidationSchema,
} from "../../../../Utility/Validations/HomeValidations";
import { homeStore as HomeStore } from "../../store/HomeStore";
import { signUpView, CurrentUser } from "../../types/interfaces";
import tokenPics from "../../style/images/token.svg";
import { permissionStore } from "../../../MasterPage/store/PermissionStore";
import { masterPageStore } from "../../../MasterPage/store/MasterPageStore";
import { platformStore } from "../../../Admin/store/platformStore";
import { PermissionGroup, UserPermission } from "../../../MasterPage/types/Interfaces";

type Props = {};

const HomeStoreCtx = createContext(HomeStore);
const permissionStoreCtx = createContext(permissionStore);
const masterPageStoreCtx = createContext(masterPageStore);
const TokenValidation = observer((props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams(
    window.location.search
  );
  const token = searchParams.get("token") ?? "";
  const homeStore = useContext(HomeStoreCtx);
  const PermissionStore = useContext(permissionStoreCtx);
  const MasterPageStore = useContext(masterPageStoreCtx);
  const validationData: ITokenValidation = {
    email: searchParams.get("email") ?? homeStore.username,

    password: "",
    token: token,
  };
  let navigate = useNavigate();
  return (
    <Stack horizontalAlign="center" className="ms-motion-fadeIn">
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row ">
          <div className="ms-Grid-col ms-sm12">
            <img
              src={tokenPics}
              alt="EDataBank pass"
              style={{ width: "200px" }}
            />
          </div>
        </div>
      </div>
      <p style={{ paddingTop: "10px" }} className="ms-fontSize-12">
        {`Validate your account by entering the OTP(one-time password) sent to `}
        <span style={{ color: "red" }}>{validationData.email}</span>
      </p>
      <Formik
        initialValues={validationData}
        validationSchema={TokenValidationSchema}
        enableReinitialize={true}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          try {
            const retVal = await homeStore.validateAccount(values);
            if (retVal.success) {
                notification.success({
                  message: "EDataBank Feedback",
                  description: retVal.msg,
                });
                const loginRetVal = await homeStore.authStore.login({
                  username: retVal.data.fullName,
                  password: values.password,
                } as ILogin);
                let loginResponse: any = toJS(loginRetVal);
              let redirectTo = "/main";
              if (loginResponse.isAcountValidated) {
                const cuser = loginResponse as CurrentUser;
                homeStore.authStore.currentUser = cuser;
                sessionStorage.setItem("qrjwt",cuser.token)
                  sessionStorage.setItem("specimen",cuser.id)
                localStorage.setItem("currentUser", JSON.stringify(cuser));
                // navigate("/main",{ replace: true });
                console.log("lastVisitedMenuUrl", cuser.lastVisitedMenuUrl);
                PermissionStore.groups = cuser.groups.name;
                permissionStore.setUserPermissionAndGroups(cuser.permissions as Array<UserPermission>,cuser.groups as PermissionGroup);
              
                await platformStore.getAllBand()
                await platformStore.getAllBranch()
                await platformStore.getAllCathedral()
                await platformStore.getAllDistrict()
                await platformStore.getAllPrincipalBand()
                await platformStore.getAllProfession()
                await platformStore.getAllQualification()
                await platformStore.getAllRank()
                  
                  // navigate(from, { replace: true });
                  navigate(redirectTo, { replace: true });
              
              } else {
                notification.info({
                  message: "Credentials Manager Feedback",
                  description: loginResponse.msg,
                });
                return;
              }
            } else {
              notification.error({
                message: "EDataBank Feedback",
                description: retVal.msg,
              });
            }
          } catch (error: any) {
            notification.error({
              key: "error",
              message: "EDataBank Feedback",
              description: error?.msg,
            });
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,

          handleSubmit,
          isSubmitting,
        }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <FormItem
              label="Your Email"
              required
              help={touched.email && errors.email}
            >
              <Input
                placeholder="Enter a valid  email for verification"
                name="email"
                style={{ width: "300px" }}
                value={values.email}
                onChange={handleChange}
                allowClear
                prefix={<MailOutlined style={{ color: "#0D75BB" }} />}
              />
            </FormItem>
            <Form.Item
              required
              label="Your Password"
              help={touched.password && errors.password}
            >
              <Input.Password
                placeholder="Password"
                defaultValue={validationData?.password}
                prefix={<LockOutlined style={{ color: "#0E7BC4" }} />}
                name="password"
                value={values?.password}
                onChange={handleChange}
                allowClear
              />
            </Form.Item>

            <Form.Item label="Your OTP" help={touched.token && errors.token}>
              <Input
                style={{ width: "300px" }}
                addonBefore={<KeyOutlined style={{ color: "#0E7BC4" }} />}
                prefix="NFT-"
                name="token"
                onChange={handleChange}
                value={values?.token}
              />
            </Form.Item>

            <Stack
              horizontalAlign="space-between"
              style={{ marginTop: "10px" }}
            >
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Validate My Account
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <Divider style={{ marginTop: "5px" }} />
      <Observer>
        {() => (
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
            {homeStore.isLoading && (
              <ProgressIndicator
                description="Please Wait :We are validating your account..."
                styles={{ root: { textAlign: "center" } }}
              ></ProgressIndicator>
            )}
          </div>
        )}
      </Observer>{" "}
      <Space>
        <div className="ms-fontSize-12">Have an account?</div>
        <Link
          style={{ color: "#0D75BB" }}
          className="ms-fontSize-12"
          onClick={() => {
            setSearchParams("");
            homeStore.signUpView = signUpView.Login;
          }}
        >
          Login
        </Link>
      </Space>
      <Space style={{ marginTop: "5px" }}>
        <div className="ms-fontSize-12">Don't have Account?</div>
        <Link
          style={{ color: "#0D75BB" }}
          className="ms-fontSize-12"
          onClick={() => {
            setSearchParams("");
            homeStore.signUpView = signUpView.Register;
          }}
        >
          SignUp Now{" "}
        </Link>
      </Space>
    </Stack>
  );
});

export default TokenValidation;
