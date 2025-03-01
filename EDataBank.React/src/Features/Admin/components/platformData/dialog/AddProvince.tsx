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
import { ICmc, IProvince } from "../../../types/interface";
const _ = require("underscore");
const { Option } = Select;
const masterPageStoreCtx = createContext(MasterPageStore);
const platformStoreCtx = createContext(platformStore);
const adminStoreCtx = createContext(adminStore);

export const provinceValidationSchema = yup.object().shape({
    provinceName: yup.string().required("province name is required"),
    cmcId: yup.string().required("cmc is required").nullable()
  });

function AddProvince() {

  const MasterPageStore = useContext(masterPageStoreCtx);
 
//   
  const PlatformStore = useContext(platformStoreCtx);
  const AdminStore = useContext(adminStoreCtx);
  return (
    <DialogEx
      hidden={!AdminStore.showProvinceAddDialog}
      onDismiss={() => {}}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: `${AdminStore.editMode ? "Edit " : " Add"} Province`,

        subText:
          "Add a province that you can't find in the suggested province list?",
      }}
    >
     <Formik
        initialValues={PlatformStore.province}
        isInitialValid={false}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            
            if(AdminStore.editMode){
              await PlatformStore.updateProvince(values);
              AdminStore.editMode = false;
              PlatformStore.province = {} as IProvince
            }else{
              await PlatformStore.addProvince(values);
            }
            notification.success({
              message: "EDataBank Feedback",
              description: "Province info saved successfully",
            });
            AdminStore.showProvinceAddDialog= false;
          
          } catch (error: any) {
            notification.error({
              message: "EDataBank Platform Feedback ",
              description: "error occurred:" + error?.response?.body?.msg,
            });
          }
        }}
        validationSchema={provinceValidationSchema}
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
                    help={touched.provinceName || errors.provinceName}
                    label="Province Name"
                    required
                  >
                    <Input
                      placeholder="province name"
                      name="provinceName"
                      value={values?.provinceName}
                      onChange={handleChange}
                      allowClear
                    />
                  </FormItem>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <FormItem
                    help={touched.cmcId || errors.cmcId}
                    label="Cmc"
                    required
                  >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="select your Cmc"
                        showSearch
                        filterOption={(input, option) =>{
                            return String(option!.key).toLowerCase().includes(input.toLowerCase())
                        }
                        }
                    
                        value={values.cmcId}
                        onChange={(val, opt: any) => {
                            setFieldValue("cmcId",val);
                        }}
                    >
                        {[...PlatformStore.cmcs.values()].map((cmc:ICmc) => (
                            <Option value={cmc.cmcId} key={cmc.cmcOrder}>
                                {cmc.cmcOrder}
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
                              description={`Please Wait: Saving Province...`}
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
                         AdminStore.showProvinceAddDialog = false;
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

export default observer(AddProvince);
