import { useContext, createContext } from "react";
import { Space, notification, Form, Button, Radio, List } from "antd";
import {
  InboxOutlined,
} from "@ant-design/icons";
import { Observer, observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Formik } from "formik";
import FormItem from "antd/lib/form/FormItem";
import { ProgressIndicator } from "@fluentui/react";
import TextArea from "antd/lib/input/TextArea";
import Dragger from "antd/lib/upload/Dragger";
import { RcFile } from "antd/lib/upload";


import { FeedbackValidationSchema } from "../../../../Utility/Validations/profileValidation";
import { profileStore} from "../../store/ProfileStore";
// import { IFeedback } from "../../types/interface";

const profileStoreCtx = createContext(profileStore);
export const Feedback = observer(() => {
  const ProfileStore = useContext(profileStoreCtx);
  return (
    <Formik
      validateOnBlur={true}
      enableReinitialize={true}
      validateOnChange={true}
      initialValues={ProfileStore.feedback} //{toJS(profileStore.userprofile?.profile)}
      validationSchema={FeedbackValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          ProfileStore.isLoading = true;

          let retVal = await ProfileStore.SubmitFeedback(values);
          let res: any = toJS(retVal);
          if (res.status) {
            notification.success({
              message: "EDataBank Feedback",
              description: "Feedback successfully Sent",
            });

            ProfileStore.isLoading = false;
            ProfileStore.showFeedbackDialog = false;
          } else {
            notification.error({
              message: "EDataBank Feedback",
              description: res.message,
            });

            ProfileStore.isLoading = false;
          }
        } catch (error: any) {
          notification.error({
            message: "EDataBank Feedback",
            description: error.message,
          });

          ProfileStore.isLoading = false;
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <Observer>
          {() => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <div className="ms-Grid-row">
                <div>
                  <FormItem
                    label="Category"
                    required
                    help={touched.feedbackCategory && errors.feedbackCategory}
                  >
                    <Radio.Group
                      onChange={handleChange}
                      name="feedbackCategory"
                      value={values?.feedbackCategory}
                    >
                      <Space direction="vertical">
                        <Radio value={"Report Bug/Error"}>
                          Report Bug/Error
                        </Radio>
                        <Radio value={"New feature Request"}>
                          New feature Request
                        </Radio>
                        <Radio value={"Complaints"}>Complaints</Radio>
                        <Radio value={"Praise/thumbs up"}>
                          Praise/thumbs up
                        </Radio>
                        <Radio value={"Frictions"}>Frictions</Radio>
                        <Radio value={"Other"}>Other</Radio>
                      </Space>
                    </Radio.Group>
                  </FormItem>
                </div>
                <br />
                <div>
                  <FormItem label="Attachment">
                    <Dragger
                      onChange={async (e) => {
                        let src: string = await new Promise((resolve) => {
                          const reader = new FileReader();
                          reader.readAsDataURL(e.file.originFileObj as RcFile);
                          reader.onload = () =>
                            resolve(reader.result as string);
                        });
                        ProfileStore.setFeedbackAttachment(src);
                      }}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                    </Dragger>
                  </FormItem>
                </div>
                <br />
                <div>
                  <FormItem
                    label="Message"
                    required
                    help={touched.feedbackText && errors.feedbackText}
                  >
                    <TextArea
                      placeholder="Message"
                      value={values?.feedbackText}
                      onChange={handleChange}
                      name="feedbackText"
                      allowClear
                      rows={5}
                    />
                  </FormItem>
                </div>
              </div>
              <FormItem style={{ paddingTop: "20px", textAlign: "right" }}>
                <Space>
                  {/* <Button
                    type="link"
                    
                >
                    Cancel
                </Button> */}
                  <Button htmlType="submit" type="primary">
                    Send Feedback
                  </Button>
                </Space>
              </FormItem>
              <Observer>
                {() => (
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    {ProfileStore.isLoading && (
                      <ProgressIndicator
                        description="submitting feedback..."
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
  );
});

export const FeedbackForm = observer(() => {
  const ProfileStore = useContext(profileStoreCtx);
  const data = [
    {
      title: "Email",
      description: ProfileStore.feedback.userEmail
        ? ProfileStore.feedback.userEmail
        : "",
    },
    {
      title: "",
      description: <Feedback />,
    },
  ];
  return (
    <>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col md-12">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="/#">{item.title}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
});
export default FeedbackForm;
