import React, { createContext, useContext } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Link, Stack } from "@fluentui/react";
import { Button, Divider, Form, notification, Space } from "antd";
import FormItem from "antd/lib/form/FormItem";
import Input from "antd/lib/input/Input";
import { Formik } from "formik";

import forgotpasswordsvg from "../../img/forgot.svg";
import { homeStore as HomeStore } from "../../store/HomeStore";
import { signUpView } from "../../types/interfaces";
import { toJS } from 'mobx';
import {
  IResetPassword,
  PasswordResetValidationSchema,
} from "../../../../Utility/Validations/HomeValidations";
import "../../../../shared/shared.css"

const HomeStoreCtx = createContext(HomeStore);
type Props = {};
const initPasswordReset: IResetPassword = {
  email: "",
};
const ResetPassword: React.FC = (props: Props) => {
  const homeStore = useContext(HomeStoreCtx);
  return (
    <Stack horizontalAlign="center" className="ms-motion-fadeIn">
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row ">
          <div className="ms-Grid-col ms-sm12">
            <img
              src={forgotpasswordsvg}
              alt="EDataBank pass"
              style={{ width: "200px" }}
            />
          </div>
        </div>
      </div>
      <p style={{ paddingTop: "10px" }} className="ms-fontSize-12">
        Provide your ESOCS username ( email) to enable us send your
        password reset to you via mail{" "}
      </p>
      <Formik
        initialValues={initPasswordReset}
        validationSchema={PasswordResetValidationSchema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const retVal = await homeStore.forgotPassword(values.email);
          
            
            if (retVal) {
              notification.success({
                message: "EDataBank Feedback",
                description:
                  "Password reset successful with notifications to your email",
              });
              homeStore.isLoading = false;
              homeStore.signUpView = signUpView.Login;
            } else {
              notification.error({
                message: "EDataBank Feedback",
                description:
                  "Sorry, your record does not exit,request for an account",
              });
            }
          } catch (error: any) {
            if (error?.response?.status === 404) {
              notification.error({
                message: "Credentials Manager Feedback",
                description:
                  "User not found, please confirm your email and try agin ",
              });
              homeStore.authStore.loginInProgress = false;
              return;
            }

            if (!error.response) {
              notification.error({
                message: "Credentials Manager Feedback",
                description:
                  "EDataBank API Server is not reachable, please contact EDataBank support",
              });
              homeStore.authStore.loginInProgress = false;
            }

            notification.error({
              message: "Credentials Manager Feedback",
              description: error?.response?.body?.message,
            });
            homeStore.authStore.loginInProgress = false;
          }
        }}
        validate={(values) => {
          let errors = {};

          return errors;
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

            <Stack
              horizontalAlign="space-between"
              style={{ marginTop: "10px" }}
            >
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Reset My Password
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <Divider style={{ marginTop: "20px" }} />
      <Space>
        <div className="ms-fontSize-12">Have an account?</div>
        <Link
          style={{ color: "#0D75BB" }}
          className="ms-fontSize-12"
          onClick={() => {
            homeStore.signUpView = signUpView.Login;
          }}
        >
          Login
        </Link>
      </Space>

      <Space style={{ marginTop: "20px" }}>
        <div className="ms-fontSize-12">Don't have Account?</div>
        <Link
          style={{ color: "#0D75BB" }}
          className="ms-fontSize-12"
          onClick={() => {
            homeStore.signUpView = signUpView.Register;
          }}
        >
          Register Now{" "}
        </Link>
      </Space>
    </Stack>
  );
};

export default ResetPassword;
