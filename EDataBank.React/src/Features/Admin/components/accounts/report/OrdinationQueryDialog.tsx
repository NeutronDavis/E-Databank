import { DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import React, { createContext, useContext, useState } from "react";

import {
  DefaultButton,
  PrimaryButton,
  ProgressIndicator,
  TextField,
} from "@fluentui/react";
import { Observer, observer } from "mobx-react-lite";
import { Button, Divider, Form, Input, InputNumber, Segmented, Select, Space, notification } from "antd";
import DialogEx from "../../../../../Utility/IDialog";
import { masterPageStore as MasterPageStore } from "../../../../MasterPage/store/MasterPageStore";
import { getCurrentUser } from "../../../../../Utility/helper";
import { set } from "mobx";
import { platformStore } from "../../../store/platformStore";
import adminStore from "../../../store/adminstore";
import { Formik } from "formik";
import * as yup from "yup";
import FormItem from "antd/es/form/FormItem";
import { IBranch, ICmc, IDistrict, IProvince, IQueryData } from "../../../types/interface";
import { SegmentedValue } from "antd/lib/segmented";
const _ = require("underscore");
const { Option } = Select;
const masterPageStoreCtx = createContext(MasterPageStore);
const platformStoreCtx = createContext(platformStore);
const adminStoreCtx = createContext(adminStore);

export const provinceValidationSchema = yup.object().shape({
    cmc: yup.string().required("cmc is required").nullable(),
    provinceId: yup.string().required("province is required").nullable(),
    districtId: yup.string().required("district is required").nullable(),
    branchId: yup.string().required("branch is required").nullable(),
    gender: yup.string().required("gender is required"),
  });

function OrdinationQueryDialog() {

  const MasterPageStore = useContext(masterPageStoreCtx);
 
//   
  const PlatformStore = useContext(platformStoreCtx);
  const AdminStore = useContext(adminStoreCtx);
  return (
    <DialogEx
      hidden={!AdminStore.openOrdinationQueryReportDialog}
      onDismiss={() => {}}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: `Ordination Report query Dialog`,

        subText:
          "This query dialog helps to query the database for a member report at the cmc level.",
      }}
    >
     <Formik
        initialValues={AdminStore.ordinationQueryData}
        isInitialValid={false}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await AdminStore.ordinationReport(Number(values.branchId),values.gender);   
            AdminStore.openOrdinationQueryReportDialog = false
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
                    help={touched.cmc || errors.cmc}
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
                    
                        value={values.cmc}
                        onChange={(val, opt: any) => {
                            setFieldValue("cmc",val);
                            AdminStore.selectedCmc = val;
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
                <Form.Item
                    help={touched.provinceId || errors.provinceId}
                    label="province"
                    required
                  >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="select province"
                        showSearch
                        disabled={_.isUndefined(values.cmc)}
                        filterOption={(input, option) =>{
                            return String(option!.key).toLowerCase().includes(input.toLowerCase())
                        }
                        }
                    
                        value={values.provinceId}
                        onChange={(val, opt: any) => {
                            setFieldValue("provinceId",val);
                            AdminStore.selectedProvince = opt.key;
                        }}
                    >
                        {[...PlatformStore.provinces.values()].filter((value: IProvince)=> value.cmcId === values.cmc).map((province:IProvince) => (
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
                  <Form.Item
                      help={touched.districtId || errors.districtId}
                      label="District"
                      required
                    >
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select district"
                          disabled={_.isUndefined(values.provinceId)}
                          showSearch
                          filterOption={(input, option) =>{
                              return String(option!.key).toLowerCase().includes(input.toLowerCase())
                          }
                          }
                      
                          value={values.districtId}
                          onChange={(val, opt: any) => {
                              setFieldValue("districtId",val);
                              AdminStore.selectedDistrict = opt.key;
                          }}
                      >
                          {[...PlatformStore.districts.values()].filter((value: IDistrict)=> value.provinceId === values.provinceId).map((district:IDistrict) => (
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
                  <Form.Item label="Branch"  help={touched.branchId || errors.branchId} required>
                    <Select
                        style={{ width: "100%" }}
                        placeholder="select your branch"
                        disabled={_.isUndefined(values.districtId)}
                        showSearch
                        filterOption={(input, option) =>{
                            return String(option!.key).toLowerCase().includes(input.toLowerCase())
                        }
                        }
                    
                        value={values.branchId}
                        onChange={(val, opt: any) => {
                            setFieldValue("branchId",val);
                            AdminStore.branchOrdinationValueForRefresh = val
                            AdminStore.selectedBranch = opt.key;
                    
                        }}
                    >
                        {[...PlatformStore.branchs.values()].filter((value: IBranch)=> value.districtId === values.districtId).map((branch:IBranch) => (
                            <Option value={branch.branchId} key={branch.branchName}>
                            {branch.branchName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <Observer>
                      {()=>(
                      <Form.Item
                          help={touched.gender || errors.gender}
                          label="Gender"
                          required
                        >
                        <Segmented
                          options={["Male", "Female","All"]}   
                          value={AdminStore.genderOrdinationValue}                 
                          onChange={(value: SegmentedValue) => {
                            setFieldValue("gender", value);
                            AdminStore.genderOrdinationValue = String(value)
                            AdminStore.genderOrdinationValueForRefresh = String(value)
                            AdminStore.selectedGender = String(value)
                          }}
                        ></Segmented>
                        </Form.Item>
                      )}
                  </Observer>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <Observer>
                    {()=>(
                      <FormItem>
                        <Divider />
                        {AdminStore.isLoadingReport && (
                          <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                              <div
                                className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
                                style={{ paddingBottom: "5px" }}
                              >
                                <ProgressIndicator
                                  description={`Please Wait: Generating Ordination Report...`}
                                  styles={{ root: { textAlign: "center" } }}
                                ></ProgressIndicator>
                              </div>
                            </div>
                          </div>
                        )}
                      </FormItem>
                    )}
                  </Observer>
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
                         AdminStore.openOrdinationQueryReportDialog = false;
                         AdminStore.ordinationQueryData = {} as IQueryData
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
                                style={{color:"wheat"}}
                            >
                                Generate
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

export default observer(OrdinationQueryDialog);
