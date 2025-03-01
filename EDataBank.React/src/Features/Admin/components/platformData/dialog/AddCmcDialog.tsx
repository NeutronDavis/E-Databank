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
import { ICmc, IPriority } from "../../../types/interface";
const _ = require("underscore");
const { Option } = Select;
const masterPageStoreCtx = createContext(MasterPageStore);
const platformStoreCtx = createContext(platformStore);
const adminStoreCtx = createContext(adminStore);

export const cmcValidationSchema = yup.object().shape({
    cmcOrder: yup.string().required("Cmc is required").nullable(),
    priorityId: yup.string().required("Priority is required").nullable()
  });

function AddCmcDialog() {

  const MasterPageStore = useContext(masterPageStoreCtx);
 
//   
  const PlatformStore = useContext(platformStoreCtx);
  const AdminStore = useContext(adminStoreCtx);
  return (
    <DialogEx
      hidden={!AdminStore.showCmcAddDialog}
      onDismiss={() => {}}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: `${AdminStore.editMode ? "Edit " : " Add"} Cmc`,
        subText:"Add a cmc that you can't find in the suggested cmc list?",
      }}
    >
     <Formik
        initialValues={PlatformStore.cmc}
        isInitialValid={false}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            
            if(AdminStore.editMode){
              await PlatformStore.updateCmc(values);
              AdminStore.editMode = false;
              PlatformStore.cmc = {} as ICmc
            }else{
              await PlatformStore.addCmc(values);
            }
            notification.success({
              message: "EDataBank Feedback",
              description: "Cmc info saved successfully",
            });
            AdminStore.showCmcAddDialog= false;
          
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
                    help={touched.cmcOrder || errors.cmcOrder}
                    label="Cmc"
                    required
                  >
                    <InputNumber
                      placeholder="cmc"
                      name="cmcOrder"
                      value={values?.cmcOrder}
                      onChange={(val) => {
                        setFieldValue("cmcOrder", val);
                      }}
                      style={{ width: "200px" }}
                    />
                  </FormItem>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <FormItem
                    help={touched.priorityId || errors.priorityId}
                    label="Hierarchy"
                    required
                  >
                    <Select
                        style={{ width: "100%" }}
                        placeholder="select your hierarchy"
                        showSearch
                        filterOption={(input, option) =>{
                            return String(option!.key).toLowerCase().includes(input.toLowerCase())
                        }
                        }
                    
                        value={values.priorityId}
                        onChange={(val, opt: any) => {
                            setFieldValue("priorityId",val);
                        }}
                    >
                        {[...PlatformStore.prioritys.values()].map((priority:IPriority) => (
                            <Option value={priority.priorityId} key={priority.priorityName}>
                                {priority.priorityName}
                            </Option>
                        ))}
                    </Select>
            
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
                              description={`Please Wait: Saving Cmc...`}
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
                         AdminStore.showCmcAddDialog = false;
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

export default observer(AddCmcDialog);
