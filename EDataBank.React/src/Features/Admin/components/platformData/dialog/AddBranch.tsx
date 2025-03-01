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
import { IBranch, IDistrict, IPriority, IProvince } from "../../../types/interface";
import TextArea from "antd/lib/input/TextArea";
const _ = require("underscore");
const { Option } = Select;
const masterPageStoreCtx = createContext(MasterPageStore);
const platformStoreCtx = createContext(platformStore);
const adminStoreCtx = createContext(adminStore);

export const branchValidationSchema = yup.object().shape({
    branchName: yup.string().required("branch name is required"),
    branchAddress: yup.string().required("branch address is required"),
    districtId: yup.string().required("district is required").nullable()
  });

function AddBranch() {

  const MasterPageStore = useContext(masterPageStoreCtx);
 
//   
  const PlatformStore = useContext(platformStoreCtx);
  const AdminStore = useContext(adminStoreCtx);
  return (
    <DialogEx
      hidden={!AdminStore.showBranchAddDialog}
      onDismiss={() => {}}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: `${AdminStore.editMode ? "Edit " : " Add"} Branch`,

        subText:
          "Add a branch that you can't find in the suggested branch list?",
      }}
    >
     <Formik
        initialValues={PlatformStore.branch}
        isInitialValid={false}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
            try {
            
                if(AdminStore.editMode){
                  await PlatformStore.updateBranch(values);
                  AdminStore.editMode = false;
                  PlatformStore.branch = {} as IBranch
                }else{
                  await PlatformStore.addBranch(values);
                }
                notification.success({
                  message: "EDataBank Feedback",
                  description: "Branch info saved successfully",
                });
                AdminStore.showBranchAddDialog= false;
              
              } catch (error: any) {
                notification.error({
                  message: "EDataBank Platform Feedback ",
                  description: "error occurred:" + error?.response?.body?.msg,
                });
              }
        }}
        validationSchema={branchValidationSchema}
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
                        help={touched.branchName || errors.branchName}
                        label="Branch Name"
                        required
                    >
                        <Input
                        placeholder="Branch name"
                        name="branchName"
                        value={values?.branchName}
                        onChange={handleChange}
                        allowClear
                        />
                    </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                        <FormItem
                            help={touched.branchAddress || errors.branchAddress}
                            label="Branch Address"
                            required
                        >
                            <TextArea
                                placeholder="branch address"
                                name="branchAddress"
                                value={values?.branchAddress}
                                onChange={handleChange}
                                allowClear
                            />
                        </FormItem>
                    </div>
                </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <Form.Item
                    help={touched.districtId || errors.districtId}
                    label="District"
                    required
                  >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="select district"
                        showSearch
                        filterOption={(input, option) =>{
                            return String(option!.key).toLowerCase().includes(input.toLowerCase())
                        }
                        }
                    
                        value={values.districtId}
                        onChange={(val, opt: any) => {
                            setFieldValue("districtId",val);
                        }}
                    >
                        {[...PlatformStore.districts.values()].map((district:IDistrict) => (
                            <Option value={district.districtId} key={district.districtName}>
                                {district.districtName}
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
                              description={`Please Wait: Saving Branch...`}
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
                         AdminStore.showBranchAddDialog = false;
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

export default observer(AddBranch);
