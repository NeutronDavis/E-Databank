import { useContext, createContext } from "react";
import {Space, notification, Form, Button } from "antd";
import { Observer, observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Formik } from "formik";
import FormItem from "antd/lib/form/FormItem";
import { ProgressIndicator } from "@fluentui/react";
import PhoneInput from "react-phone-input-2";


import {ResetPhoneNumberValidation} from "../../../../Utility/Validations/profileValidation";
import {profileStore} from "../../store/ProfileStore";

const profileStoreCtx = createContext(profileStore);
export const PhoneNumberForm = observer(()=>{
  const ProfileStore = useContext(profileStoreCtx);
  return(
    <Formik
    validateOnBlur={true}
    enableReinitialize={true}
    validateOnChange={true}
    initialValues={ProfileStore.resetPhoneNumber} //{toJS(profileStore.userprofile?.profile)}
    validationSchema={ResetPhoneNumberValidation}
    onSubmit={async (values, { setSubmitting }) => {
      try {
            ProfileStore.isUpdating = true;
            let currentUserData: any = localStorage.getItem("currentUser");
            let currentUserModifiedData: any = JSON.parse(currentUserData);
        
            const retVal = await ProfileStore.updateProfilePhoneNumber(values.phoneNumber,currentUserModifiedData.id);

            let res:any = toJS(retVal);

            if (res.status) {
                ProfileStore.setShowPhoneNumberForm();
                notification.success({
                    message: "EDataBank Feedback",
                    description: "PhoneNumber modified successfully",
                });

                ProfileStore.isUpdating = false;
            }else{
                notification.error({
                    message: "EDataBank Feedback",
                    description:res.msg,
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
      {({values,errors,touched,handleSubmit,setFieldValue})=>(
        <Observer>
        {() => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <br />
            <div className="ms-Grid-row">
              <div>
                <FormItem
                //   label="PhoneNumber"
                  required
                  help={touched.phoneNumber && errors.phoneNumber}
                >
                <PhoneInput
                    country={"ng"}
                    enableSearch={true}
                    value={values?.phoneNumber}
                    onChange={(phoneNumber) => {
                        setFieldValue("phoneNumber", phoneNumber);
                    }}
                />
              
                </FormItem>
              </div>
            </div>
            <FormItem style={{ paddingTop: "20px", textAlign: "right" }}>
                <Space>
                <Button
                    type="link"
                    onClick={() => {
                      ProfileStore.setShowPhoneNumberForm();
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
export default PhoneNumberForm;