import { useContext, createContext } from "react";
import { Space, notification, Form, Button } from "antd";
import { Observer, observer } from "mobx-react-lite";
import { FeedbackActionTakenValidationSchema } from "../../../../Utility/Validations/profileValidation";
import { feedbackPageStore } from "../../store/FeedbackPageStore";
import { toJS } from "mobx";
import { Formik } from "formik";
import FormItem from "antd/lib/form/FormItem";
import { ProgressIndicator } from "@fluentui/react";
import TextArea from "antd/lib/input/TextArea";

const feedbackPageStoreCtx = createContext(feedbackPageStore);
export const FeedbackActionTakenForm = observer(() => {
  const FeedbackPageStore = useContext(feedbackPageStoreCtx);
  return (
    <Formik
      validateOnBlur={true}
      enableReinitialize={true}
      validateOnChange={true}
      initialValues={FeedbackPageStore.actionTaken} //{toJS(FeedbackPageStore.userprofile?.profile)}
      validationSchema={FeedbackActionTakenValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        try {
          FeedbackPageStore.isLoading = true;
          let retVal = await FeedbackPageStore.feedbackAction(
            values,
            FeedbackPageStore.singleFeedback.feedbackId,
            "close"
          );
          let res: any = toJS(retVal);
          if (res.status) {
            FeedbackPageStore.setFeedbackStatus(3, values.feedbackActionTaken);
            FeedbackPageStore.setFeedbackModel();
            notification.success({
              message: "EDataBank Feedback",
              description: "Feedback update successful",
            });
            FeedbackPageStore.isLoading = false;
          } else {
            notification.error({
              message: "EDataBank Feedback",
              description: res.message,
            });
            FeedbackPageStore.isLoading = false;
          }
        } catch (error: any) {
          notification.error({
            message: "EDataBank Feedback",
            description: error.message,
          });
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        isValidating,
        handleChange,
        handleSubmit,
        validateField,
        setErrors,
        setFieldError,
        validateForm,
        setTouched,
      }) => (
        <Observer>
          {() => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <div className="ms-Grid-row">
                <div>
                  <FormItem
                    label="Action Taken"
                    required
                    help={
                      touched.feedbackActionTaken && errors.feedbackActionTaken
                    }
                  >
                    <TextArea
                      placeholder="Message"
                      value={values?.feedbackActionTaken}
                      onChange={handleChange}
                      name="feedbackActionTaken"
                      allowClear
                      rows={5}
                    />
                  </FormItem>
                </div>
              </div>
              <FormItem style={{ paddingTop: "20px", textAlign: "right" }}>
                <Space>
                  <Button
                    htmlType="button"
                    type="dashed"
                    onClick={async () => {
                      if (values.feedbackActionTaken == "") {
                        isValidating = true;
                        setErrors({
                          feedbackActionTaken: "an action message is required",
                        });
                        setFieldError(
                          "feedbackActionTaken",
                          "an action message is required"
                        );
                        validateField("feedbackActionTaken");
                        setTouched({ feedbackActionTaken: true }, true);
                        validateForm(values.feedbackActionTaken);
                      } else {
                        try {
                          console.log(values);
                          FeedbackPageStore.isLoading = true;
                          let retVal = await FeedbackPageStore.feedbackAction(
                            values,
                            FeedbackPageStore.singleFeedback.feedbackId,
                            "save"
                          );
                          let res: any = toJS(retVal);
                          if (res.status) {
                            FeedbackPageStore.setFeedbackStatus(
                              2,
                              values.feedbackActionTaken
                            );
                            FeedbackPageStore.setFeedbackModel();
                            notification.success({
                              message: "EDataBank Feedback",
                              description: "Feedback update successful",
                            });
                            FeedbackPageStore.isLoading = false;
                          } else {
                            notification.error({
                              message: "EDataBank Feedback",
                              description: res.message,
                            });
                            FeedbackPageStore.isLoading = false;
                          }
                        } catch (error: any) {
                          notification.error({
                            message: "EDataBank Feedback",
                            description: error.message,
                          });
                        }
                      }
                    }}
                  >
                    Save
                  </Button>
                  <Button htmlType="submit" type="primary">
                    Close
                  </Button>
                </Space>
              </FormItem>
              <Observer>
                {() => (
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    {FeedbackPageStore.isLoading && (
                      <ProgressIndicator
                        description="Please Wait :we are updating your feedback..."
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
export default FeedbackActionTakenForm;
