import {useContext, createContext } from "react";
import {Input, Space, notification, Form, Button } from "antd";
import {LockOutlined } from "@ant-design/icons";
import { Observer, observer } from "mobx-react-lite";
// import { toJS } from "mobx";
import { Formik } from "formik";
import FormItem from "antd/lib/form/FormItem";
import { ProgressIndicator } from "@fluentui/react";


import {ResetPasswordValidationSchema} from "../../../../Utility/Validations/profileValidation"
import {profileStore} from "../../store/ProfileStore";

const profileStoreCtx = createContext(profileStore);
export const PasswordForm = observer(()=>{
  const ProfileStore = useContext(profileStoreCtx);
  return(
    <Formik
    validateOnBlur={true}
    enableReinitialize={true}
    validateOnChange={true}
    initialValues={ProfileStore.resetPassword} //{toJS(profileStore.userprofile?.profile)}
    validationSchema={ResetPasswordValidationSchema}
    onSubmit={async (values, { setSubmitting }) => {
      try {
            ProfileStore.isUpdating = true;
            let currentUserData: any = localStorage.getItem("currentUser");
            let currentUserModifiedData: any = JSON.parse(currentUserData);
    
            const retVal = await ProfileStore.updateProfilePwd(values,currentUserModifiedData.id);
            
            if (retVal) {

                ProfileStore.setShowPasswordForm();
                notification.success({
                    message: "EDataBank Feedback",
                    description: "Password modified successfully",
                });
                ProfileStore.isUpdating = false;

            }else{

                notification.error({
                    message: "EDataBank Feedback",
                    description:"Invalid Current Password",
                });

                ProfileStore.isUpdating = false;
            }
        }  catch (error: any) {
            notification.error({
            message: "EDataBank Feedback",
            description: error.message,
            });
        } finally {
        }

      }}
    >
      {({values,errors,touched,handleChange,handleSubmit})=>(
        <Observer>
        {() => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <br />
            <div className="ms-Grid-row">
              <div>
                <FormItem
                //   label="Old Password"
                  required
                  help={touched.oldPassword && errors.oldPassword}
                >
                  <Input.Password
                    prefix={
                      <LockOutlined style={{ color: "#A0AEC0" }} />
                    }
                    placeholder="Enter your old password"
                    value={values?.oldPassword}
                    onChange={handleChange}
                    name="oldPassword"
                    allowClear
                  />
                </FormItem>
              </div>
              <br />
              <div>
                <FormItem
                //   label="New Password"
                  required
                  help={touched.newPassword && errors.newPassword}
                >
                  <Input.Password
                    prefix={
                      <LockOutlined
                        style={{ color: "#A0AEC0" }}
                      />
                    }
                    placeholder="Enter your new password"
                    value={values?.newPassword}
                    onChange={handleChange}
                    name="newPassword"
                    allowClear
                  />
                </FormItem>
              </div>
              <br />
              <div>
                <FormItem
                //   label="Confirm New Password"
                  required
                  help={touched.confirmPassword && errors.confirmPassword}
                >
                  <Input.Password
                    prefix={
                      <LockOutlined style={{ color: "#A0AEC0" }} />
                    }
                    placeholder="Confirm New Password"
                    value={values?.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    allowClear
                  />
                </FormItem>
              </div>
            </div>
            <FormItem style={{ paddingTop: "20px", textAlign: "right" }}>
                <Space>
                <Button
                    type="link"
                    onClick={() => {
                      ProfileStore.setShowPasswordForm();
                    }}
                >
                    Cancel
                </Button>
                <Button htmlType="submit" type="primary">
                    Update
                </Button>
                </Space>
            </FormItem>
            <Observer>
                {() => (
                <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    {ProfileStore.isUpdating && (
                    <ProgressIndicator
                        description="updating  your password..."
                        // styles={{ root: { textAlign: "center" } }}
                    ></ProgressIndicator>
                    )}
                </div>
                )}
            </Observer>
          </Form>
        )}
      </Observer>
      )}
    </Formik>
  )
})

export default PasswordForm;