import { DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import React, { createContext, useContext, useState } from "react";

import {
  DefaultButton,
  PrimaryButton,
  ProgressIndicator,
  TextField,
} from "@fluentui/react";
import { Observer, observer } from "mobx-react-lite";
import { Button, Divider, Form, Input, InputNumber, Select, Space, notification } from "antd";
import DialogEx from "../../../../../Utility/IDialog";
import { masterPageStore as MasterPageStore } from "../../../../MasterPage/store/MasterPageStore";
import { getCurrentUser } from "../../../../../Utility/helper";
import { set } from "mobx";
import { platformStore } from "../../../store/platformStore";
import adminStore from "../../../store/adminstore";
import { Formik } from "formik";
import * as yup from "yup";
import FormItem from "antd/es/form/FormItem";
import { IPriority, IRank } from "../../../types/interface";
const _ = require("underscore");
const { Option } = Select;
const masterPageStoreCtx = createContext(MasterPageStore);
const platformStoreCtx = createContext(platformStore);
const adminStoreCtx = createContext(adminStore);

export const cmcValidationSchema = yup.object().shape({
    rankName: yup.string().required("Rank name is required"),
    rankOrder: yup.string().required("Rank order is required").nullable(),
    endYearCount: yup.string().required("EndYearCount is required").nullable()
  });

function AddRank() {

  const MasterPageStore = useContext(masterPageStoreCtx);
 
//   
  const PlatformStore = useContext(platformStoreCtx);
  const AdminStore = useContext(adminStoreCtx);
  return (
    <DialogEx
      hidden={!AdminStore.showRankAddDialog}
      onDismiss={() => {}}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: `${AdminStore.editMode ? "Edit " : " Add"} Rank`,
        subText:"Add a rank that you can't find in the suggested rank list?",
      }}
    >
     <Formik
        initialValues={PlatformStore.rank}
        isInitialValid={false}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
            try {
            
                if(AdminStore.editMode){
                  await PlatformStore.updateRank(values);
                  AdminStore.editMode = false;
                  PlatformStore.rank = {} as IRank
                }else{
                  await PlatformStore.addRank(values);
                }
                notification.success({
                  message: "EDataBank Feedback",
                  description: "Rank info saved successfully",
                });
                AdminStore.showRankAddDialog= false;
              
              } catch (error: any) {
                notification.error({
                  message: "EDataBank Platform Feedback ",
                  description: "error occurred:" + error?.response?.body?.msg,
                });
              }
        }}
        validationSchema={cmcValidationSchema}
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
          <Form onFinish={handleSubmit} layout="vertical">
            <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <FormItem
                    help={touched.rankName || errors.rankName}
                    label="Rank Name"
                    required
                  >
                    <Input
                      placeholder="rank name"
                      name="rankName"
                      value={values?.rankName}
                      onChange={handleChange}
                      allowClear
                    />
                  </FormItem>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <FormItem
                    help={touched.rankOrder || errors.rankOrder}
                    label="Rank Order"
                    required
                  >
                    <InputNumber
                      placeholder="rank order"
                      name="rankOrder"
                      value={values?.rankOrder}
                      onChange={(val) => {
                        setFieldValue("rankOrder", val);
                      }}
                      style={{ width: "200px" }}
                    />
                  </FormItem>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <FormItem
                    help={touched.endYearCount || errors.endYearCount}
                    label="EndYearCount"
                    required
                  >
                    <InputNumber
                      placeholder="endYearCount"
                      name="endYearCount"
                      value={values?.endYearCount}
                      onChange={(val) => {
                        setFieldValue("endYearCount", val);
                      }}
                      style={{ width: "200px" }}
                    />
                  </FormItem>
                </div>
              </div>
           
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <FormItem>
                    <Divider />
                    {PlatformStore.isSaving && (
                      <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                          <div
                            className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
                            style={{ paddingBottom: "5px" }}
                          >
                            <ProgressIndicator
                              description={`Please Wait: Saving Rank...`}
                              styles={{ root: { textAlign: "center" } }}
                            ></ProgressIndicator>
                          </div>
                        </div>
                      </div>
                    )}
                  </FormItem>
                </div>
              </div>

              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <FormItem>
                    <Space
                      align="end"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <Button
                        type="link"
                        onClick={() => {
                         AdminStore.showRankAddDialog = false;
                        }}
                      >
                        Cancel
                      </Button>

                      <Observer>
                        {()=>(
                            <Button
                                key="submit"
                                htmlType="submit"
                                type="primary"
                                disabled={!isValid}
                                loading={PlatformStore.isLoading}
                                style={{color:"wheat"}}
                            >
                                Save
                            </Button>
                        )
                        }
                    </Observer>
                    </Space>
                  </FormItem>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </DialogEx>
  );
}

export default observer(AddRank);
