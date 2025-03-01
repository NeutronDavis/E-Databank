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
import { IDistrict, IPriority, IProvince } from "../../../types/interface";
import TextArea from "antd/lib/input/TextArea";
const _ = require("underscore");
const { Option } = Select;
const masterPageStoreCtx = createContext(MasterPageStore);
const platformStoreCtx = createContext(platformStore);
const adminStoreCtx = createContext(adminStore);

export const districtValidationSchema = yup.object().shape({
    districtName: yup.string().required("district name is required"),
    districtAddress: yup.string().required("district address is required"),
    provinceId: yup.string().required("province is required").nullable()
  });

function AddDistrict() {

  const MasterPageStore = useContext(masterPageStoreCtx);
 
//   
  const PlatformStore = useContext(platformStoreCtx);
  const AdminStore = useContext(adminStoreCtx);
  return (
    <DialogEx
      hidden={!AdminStore.showDistrictAddDialog}
      onDismiss={() => {}}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: `${AdminStore.editMode ? "Edit " : " Add"} District`,

        subText:
          "Add a district that you can't find in the suggested district list?",
      }}
    >
     <Formik
        initialValues={PlatformStore.district}
        isInitialValid={false}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
            try {
            
                if(AdminStore.editMode){
                  await PlatformStore.updateDistrict(values);
                  AdminStore.editMode = false;
                  PlatformStore.district = {} as IDistrict
                }else{
                  await PlatformStore.addDistrict(values);
                }
                notification.success({
                  message: "EDataBank Feedback",
                  description: "District info saved successfully",
                });
                AdminStore.showDistrictAddDialog= false;
              
              } catch (error: any) {
                notification.error({
                  message: "EDataBank Platform Feedback ",
                  description: "error occurred:" + error?.response?.body?.msg,
                });
              }
        }}
        validationSchema={districtValidationSchema}
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
                        help={touched.districtName || errors.districtName}
                        label="District Name"
                        required
                    >
                        <Input
                        placeholder="district name"
                        name="districtName"
                        value={values?.districtName}
                        onChange={handleChange}
                        allowClear
                        />
                    </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                        <FormItem
                            help={touched.districtAddress || errors.districtAddress}
                            label="District Address"
                            required
                        >
                            <TextArea
                                placeholder="district address"
                                name="districtAddress"
                                value={values?.districtAddress}
                                onChange={handleChange}
                                allowClear
                            />
                        </FormItem>
                    </div>
                </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <Form.Item
                    help={touched.provinceId || errors.provinceId}
                    label="province"
                    required
                  >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="select province"
                        showSearch
                        filterOption={(input, option) =>{
                            return String(option!.key).toLowerCase().includes(input.toLowerCase())
                        }
                        }
                    
                        value={values.provinceId}
                        onChange={(val, opt: any) => {
                            setFieldValue("provinceId",val);
                        }}
                    >
                        {[...PlatformStore.provinces.values()].map((province:IProvince) => (
                            <Option value={province.provinceId} key={province.provinceName}>
                                {province.provinceName}
                            </Option>
                        ))}
                    </Select>
                  
                  </Form.Item>
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
                              description={`Please Wait: Saving District...`}
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
                         AdminStore.showDistrictAddDialog = false;
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

export default observer(AddDistrict);
