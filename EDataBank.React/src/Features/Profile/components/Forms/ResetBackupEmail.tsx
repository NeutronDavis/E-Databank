import{useContext, createContext } from "react";
import {Input, Space, notification, Form, Button } from "antd";
import {MailOutlined} from "@ant-design/icons";
import { Observer, observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Formik } from "formik";
import FormItem from "antd/lib/form/FormItem";
import { ProgressIndicator } from "@fluentui/react";


import {ResetEmailValidation} from "../../../../Utility/Validations/profileValidation"
import {profileStore} from "../../store/ProfileStore"

const profileStoreCtx = createContext(profileStore);
 export const ResetBackupEmail = observer(()=>{
  const ProfileStore = useContext(profileStoreCtx);
  return(
    <Formik
    validateOnBlur={true}
    enableReinitialize={true}
    validateOnChange={true}
    initialValues={ProfileStore.resetBackupEmail} //{toJS(profileStore.userprofile?.profile)}
    validationSchema={ResetEmailValidation}
    onSubmit={async (values, { setSubmitting }) => {
      try {
            ProfileStore.isUpdatingBackUpEmail = true;
            let currentUserData: any = localStorage.getItem("currentUser");
            let currentUserModifiedData: any = JSON.parse(currentUserData);
        
            const retVal = await ProfileStore.updateBackupEmail(values.email,currentUserModifiedData.id);
        
            let res:any = toJS(retVal);

            if (res.status) {
                
                ProfileStore.setShowBackupEmailForm()
                notification.success({
                    message: "EDataBank Feedback",
                    description: "Email modified successfully",
                });
    
                ProfileStore.isUpdatingBackUpEmail = false;

            }else{
                notification.error({
                    message: "EDataBank Feedback",
                    description:res.msg,
                });
                ProfileStore.isUpdatingBackUpEmail = false;
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
                //   label="Email"
                  required
                  help={touched.email && errors.email}
                >
                  <Input
                    prefix={
                      <MailOutlined style={{ color: "#A0AEC0" }} />
                    }
                    placeholder="Enter your Email"
                    value={values?.email}
                    onChange={handleChange}
                    name="email"
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
                      ProfileStore.setShowBackupEmailForm();
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
                    {ProfileStore.isUpdatingBackUpEmail && (
                    <ProgressIndicator
                        description="updating  your backupEmail..."
                        styles={{ root: { textAlign: "center" } }}
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

export default ResetBackupEmail;