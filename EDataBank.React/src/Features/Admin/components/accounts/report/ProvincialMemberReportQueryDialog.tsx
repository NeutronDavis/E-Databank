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
import { IBranch, ICmc, IDistrict, IProfession, IProvince, IQueryData } from "../../../types/interface";
import { SegmentedValue } from "antd/lib/segmented";
const _ = require("underscore");
const { Option } = Select;
const masterPageStoreCtx = createContext(MasterPageStore);
const platformStoreCtx = createContext(platformStore);
const adminStoreCtx = createContext(adminStore);

export const provinceValidationSchema = yup.object().shape({
  cmc: yup.string().required("cmc is required").nullable(),
  provinceId: yup.string().required("province is required").nullable(),
});

function ProvincialMemberReportQueryDialog() {
  let [disableProf,setDisableProf] = useState(true)
  const AdminStore = useContext(adminStoreCtx);

  const MasterPageStore = useContext(masterPageStoreCtx);
 
//   
  const PlatformStore = useContext(platformStoreCtx);
  return (
    <DialogEx
      hidden={!AdminStore.openProvincialQueryReportDialog}
      onDismiss={() => {}}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: `Member Provincial Report Query Dialog`,

        subText:
          "This query dialog helps to query the database for a member report at the  level.",
      }}
    >
     <Formik
        initialValues={AdminStore.queryData}
        isInitialValid={false}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await AdminStore.provincialMemberReport(Number(values.provinceId),Number(values.professionId));   
            AdminStore.openProvincialQueryReportDialog = false;
          } catch (error: any) {
             //convert the blob to text so that you can extract the error message sent from the server
          // note this only happens when the agent responseType("blob")
          let texError = await error?.response?.body.text();
          let jsError = JSON.parse(texError);
          if(jsError.errorType =='timeOut'){
            notification.warning({
              message: "EDataBank Platform Feedback ",
              description: jsError.msg,
            });

          }else{
            notification.error({
              message: "EDataBank Platform Feedback ",
              description: "error occurred:" +jsError.msg,
            });
          }
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
                            setFieldValue("professionId",0);
                            AdminStore.selectedProvince = opt.key;
                            AdminStore.provinceValueForRefresh = opt.key;
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
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                  <br/>
                    <Segmented
                      options={["All Profession","Select Profession"]}   
                      value={AdminStore.selectedProfOptionProf}                 
                      onChange={(value: SegmentedValue) => {
                        AdminStore.selectedProfOptionProf = String(value)
                        setDisableProf(value == "Select Profession"?false:true)
                        setFieldValue("professionId",value == "All Profession"?0:undefined);
                      }}
                    ></Segmented>
                    <FormItem
                        label="Profession"
                        >
                          <Observer>
                            {()=>(
                              <Select
                                  style={{ width: "100%" }}
                                  placeholder="select profession"
                                  disabled={disableProf}
                                  showSearch
                                  filterOption={(input, option) =>{
                                      return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                  }
                                  }
                              
                                  value={values.professionId}
                                  onChange={async(val, opt: any) => {
                                    setFieldValue("professionId",Number(val))
                                  }}
                              >
                                  {[...PlatformStore.professions.values()].map((p:IProfession) => (
                                      <Option value={p.professionId} key={p.professionName}>
                                        {p.professionName}
                                      </Option>
                                  ))}
                              </Select>
                            )}
                          </Observer>
                    </FormItem>
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
                                  description={`Please Wait: Generating Members Report...`}
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
                         AdminStore.openProvincialQueryReportDialog = false;
                         AdminStore.queryData = {} as IQueryData
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

export default observer(ProvincialMemberReportQueryDialog);
