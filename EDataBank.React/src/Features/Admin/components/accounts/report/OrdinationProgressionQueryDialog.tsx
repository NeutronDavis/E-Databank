import { DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import React, { createContext, useContext, useEffect, useState } from "react";

import {
  DefaultButton,
  PrimaryButton,
  ProgressIndicator,
  TextField,
} from "@fluentui/react";
import { Observer, observer } from "mobx-react-lite";
import { Button, DatePicker, Divider, Form, Input, InputNumber, Modal, Segmented, Select, Space, notification } from "antd";
import DialogEx from "../../../../../Utility/IDialog";
import { masterPageStore as MasterPageStore } from "../../../../MasterPage/store/MasterPageStore";
import { getCurrentUser } from "../../../../../Utility/helper";
import { set } from "mobx";
import { platformStore } from "../../../store/platformStore";
import adminStore from "../../../store/adminstore";
import { Formik } from "formik";
import * as yup from "yup";
import FormItem from "antd/es/form/FormItem";
import { IBranch, ICmc, IDistrict, IOrdinationProgressionInput, IProvince, IQueryData, IRank } from "../../../types/interface";
import { SegmentedValue } from "antd/lib/segmented";
const _ = require("underscore");
const { Option } = Select;
const masterPageStoreCtx = createContext(MasterPageStore);
const platformStoreCtx = createContext(platformStore);
const adminStoreCtx = createContext(adminStore);

// export const provinceValidationSchema = yup.object().shape({
//     cmc: yup.string().required("cmc is required").nullable(),
//     provinceId: yup.string().required("province is required").nullable(),
//     gender: yup.string().required("gender is required"),
//   });
let initials: IOrdinationProgressionInput = {
  provinceId: 0,
  branchId: 0,
  rank: "",
  year: 0
}
function OrdinationProgressionQueryDialog() {

  const MasterPageStore = useContext(masterPageStoreCtx);

  //   
  const PlatformStore = useContext(platformStoreCtx);
  const AdminStore = useContext(adminStoreCtx);
  const [disableProv, setDisableProv] = useState(true)
  const [disableBranch, setDisableBranch] = useState(true)
  const [disableYear, setDisableYear] = useState(true)
  const [disableRank, setDisableRank] = useState(true)
  const [disableProL, setDisableProL] = useState("Select province")
  const [disableBranchL, setDisableBranchL] = useState("Select branch")
  const [disableRankL, setDisableRankL] = useState("Select rank")

  // useEffect(() => {
  //   async function getData() {



  //   }
  //   getData();
  //   return () => {};
  // }, []);

  return (
    <Modal
      open={AdminStore.openOrdinationProgressionReportDialog}
      width={"40%"}
      title="Ordination Progression Report query Dialog"
      onCancel={() => {
        AdminStore.openOrdinationProgressionReportDialog = false;
        AdminStore.ordinationProgressionQuery = {} as IOrdinationProgressionInput
        AdminStore.provinceSwitchVal = "All"
        AdminStore.branchSwitchVal = "All"
        AdminStore.yearSwitchVal = "All"
        AdminStore.rankSwitchVal = "All"
        setDisableProv(true)
        setDisableProL("Select province")

        setDisableBranch(true)
        setDisableBranchL("Select branch")

        setDisableYear(true)

        setDisableRank(true)
        setDisableRankL("Select rank")
        initials.branchId = 0
        initials.provinceId = 0
        initials.year = 0
        initials.rank = ""
      }}
      destroyOnClose={true}
      footer={false}
      maskClosable={false}
    >
      <Formik
        initialValues={initials}
        isInitialValid={false}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log("foo", values)
            AdminStore.provinceVal = values.provinceId
            AdminStore.branchVal = values.branchId
            AdminStore.yearVal = values.year
            AdminStore.rankVal = values.rank
            await AdminStore.getOrdinationProgressionReport(values.provinceId, values.branchId, values.rank, values.year);
            AdminStore.openOrdinationProgressionReportDialog = false
          } catch (error: any) {
            // console.log("report error",error?.response?.body)
            // console.log("report error",error)
            if (error?.response?.body?.errorType == "timeOut") {
              notification.warning({
                message: "EDataBank Platform Feedback ",
                description: error?.response?.body?.msg,
              });

            } else {
              notification.error({
                message: "EDataBank Platform Feedback ",
                description: "error occurred:" + error?.response?.body?.msg,
              });
            }
          }
        }}
      // validationSchema={provinceValidationSchema}
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
                <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4 ">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                      <Segmented
                        options={["All", "Select"]}
                        value={AdminStore.provinceSwitchVal}
                        onChange={(value: SegmentedValue) => {
                          AdminStore.provinceSwitchVal = String(value)
                          setDisableProv(value == "Select" ? false : true)
                          setDisableProL(value == "Select" ? "Select province" : "Select province")
                          if (value == "All") {
                            setFieldValue("provinceId", 0);
                          }
                        }}
                      ></Segmented>
                    </div>
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
                          disabled={disableProv}
                          filterOption={(input, option) => {
                            // console.log(input,option)
                            return String(option!.value).toLowerCase().includes(input.toLowerCase())
                          }
                          }

                          value={disableProL}
                          onChange={(val, opt: any) => {
                            setFieldValue("provinceId", opt.key);
                            setDisableProL(val)
                          }}
                        >
                          {[...PlatformStore.provinces.values()].map((province: IProvince) => (
                            <Option value={province.provinceName} key={province.provinceId}>
                              {province.provinceName}
                            </Option>
                          ))}
                        </Select>

                      </Form.Item>
                    </div>
                  </div>

                </div>
                <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4 ">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                      <Segmented
                        options={["All", "Select"]}
                        value={AdminStore.branchSwitchVal}
                        onChange={(value: SegmentedValue) => {
                          AdminStore.branchSwitchVal = String(value)
                          setDisableBranch(value == "Select" ? false : true)
                          setDisableBranchL(value == "Select" ? "Select branch" : "Select branch")
                          if (value == "All") {
                            setFieldValue("branchId", 0);
                          }
                        }}
                      ></Segmented>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                      <Form.Item label="Branch" help={touched.branchId || errors.branchId} required>
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select your branch"
                          disabled={disableBranch}
                          showSearch
                          filterOption={(input, option) => {
                            return String(option!.value).toLowerCase().includes(input.toLowerCase())
                          }
                          }

                          value={disableBranchL}
                          onChange={(val, opt: any) => {
                            setFieldValue("branchId", opt.key);
                            setDisableBranchL(val)
                          }}
                        >
                          {[...PlatformStore.branchs.values()].map((branch: IBranch) => (
                            <Option value={branch.branchName} key={branch.branchId}>
                              {branch.branchName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>

                </div>
                <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4 ">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                      <Segmented
                        options={["All", "Select"]}
                        value={AdminStore.branchSwitchVal}
                        onChange={(value: SegmentedValue) => {
                          AdminStore.branchSwitchVal = String(value)
                          setDisableRank(value == "Select" ? false : true)
                          setDisableRankL(value == "Select" ? "Select rank" : "Select rank")
                          if (value == "All") {
                            setFieldValue("rank", "");
                          }
                        }}
                      ></Segmented>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                      <Form.Item label="Rank" help={touched.rank || errors.rank} required>
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select your rank"
                          disabled={disableRank}
                          showSearch
                          filterOption={(input, option) => {
                            return String(option!.value).toLowerCase().includes(input.toLowerCase())
                          }
                          }

                          value={disableRankL}
                          onChange={(val, opt: any) => {
                            setFieldValue("rank", val);
                            // console.log(val)
                            setDisableRankL(val)
                          }}
                        >
                          {[...PlatformStore.ranks.values()].map((rank: IRank) => (
                            <Option value={rank.rankName} key={rank.rankId}>
                              {rank.rankName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>

                </div>
                <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4 ">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                      <Segmented
                        options={["All", "Select"]}
                        value={AdminStore.yearSwitchVal}
                        onChange={(value: SegmentedValue) => {
                          AdminStore.yearSwitchVal = String(value)
                          setDisableYear(value == "Select" ? false : true)
                          if (value == "All") {
                            setFieldValue("year", 0);
                          }
                        }}
                      ></Segmented>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                      <Form.Item label="Year" help={touched.year || errors.year} required>
                        <DatePicker
                          disabled={disableYear}
                          onChange={(value: moment.Moment | null, dateString: string) => {
                            setFieldValue("year", Number(dateString));
                          }} picker="year" />
                      </Form.Item>
                    </div>
                  </div>

                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                  <Observer>
                    {() => (
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
                                  description={`Please Wait: Generating Ordination Progression Report...`}
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
                          AdminStore.openOrdinationProgressionReportDialog = false
                          AdminStore.ordinationProgressionQuery = {} as IOrdinationProgressionInput
                          AdminStore.provinceSwitchVal = "All"
                          AdminStore.branchSwitchVal = "All"
                          AdminStore.yearSwitchVal = "All"
                          AdminStore.rankSwitchVal = "All"
                          setDisableProv(true)
                          setDisableProL("Select province")

                          setDisableBranch(true)
                          setDisableBranchL("Select branch")

                          setDisableYear(true)
                          setDisableRank(true)
                          setDisableRankL("Select rank")
                          initials.branchId = 0
                          initials.provinceId = 0
                          initials.year = 0
                          initials.rank = ""
                        }}
                      >
                        Cancel
                      </Button>

                      <Observer>
                        {() => (
                          <Button
                            key="submit"
                            htmlType="submit"
                            type="primary"
                            //disabled={(!isValid || (values.branchId == 0 && values.provinceId == 0 && values.year == 0 ))}
                            style={{ color: "wheat" }}
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
    </Modal>
  );
}

export default observer(OrdinationProgressionQueryDialog);
