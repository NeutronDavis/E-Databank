import {
  Badge,
  Button,
  Empty,
  Input,
  Layout,
  List,
  message,
  notification,
  Select,
  Skeleton,
  Table,
  Transfer,
  Typography,
} from "antd";

import difference from "lodash/difference";
import React, { createContext, useContext, useState } from "react";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import {
 
  CommandBar,

  Link,
  MessageBar,
  MessageBarType,
  Pivot,
  PivotItem,
  ProgressIndicator,
} from "@fluentui/react";
import { Observer, observer } from "mobx-react-lite";
import { get, set, toJS } from "mobx";

import {  EditOutlined,InfoCircleOutlined,SaveOutlined,SearchOutlined } from "@ant-design/icons";
import { masterPageStore } from "../../../../../MasterPage/store/MasterPageStore";
import { getCurrentUser } from "../../../../../../Utility/helper";
import { SubPageHeaderTitle } from "../../../../../../shared/SubPageHeaderTitle";
import adminStore from "../../../../store/adminstore";
import ExcelMemberUpload from "./ExcelMemberUpload";
import { platformStore } from "../../../../store/platformStore";
import { IBranch, IBranchView, IMemberUpload, IUploadInfo } from "../../../../types/interface";
import ExcelOrdinationUpload from "./ExcelOrdinationUpload";
import FormItem from "antd/es/form/FormItem";
import ErrorLog from "./ErrorLog";
import { EDBRequestResponse } from "../../../../../../shared/EDBRequestResponse";
import CurrentUploadPreview from "./CurrentUploadPreview";

let { PrimaryButton } = require("@fluentui/react/lib/Button");
const { useDevice } = require("react-use-device");

const { Paragraph } = Typography;

const adminStoreCtx = createContext(adminStore);
const platformStoreCtx = createContext(platformStore);
const { Option } = Select;
const _ = require("underscore");
const MemberUploadPanel = () => {
  const { isMOBILE, isDESKTOP } = useDevice();
  const AdminStore = useContext(adminStoreCtx);
  const PlatformStore = useContext(platformStoreCtx);
  const { Title } = Typography;
  const { Content, Sider } = Layout;

  return (
    <Panel
    // customWidth="5000px"
    style={{marginLeft:"-400px"}}
      isOpen={AdminStore.openUploadPanel}
      onDismiss={() => {
        AdminStore.openUploadPanel = false;
        AdminStore.uploadInfo={} as IUploadInfo;
        PlatformStore.branchFilterString = "";
        AdminStore.selectedBranchForUpload = {} as IBranch;
        AdminStore.selectedUploadPivotKey = "1";
        AdminStore.isUploaded = false;
        AdminStore.reportTableContent.clear();
        AdminStore.branchInfoForReport =  {} as IBranchView;
        AdminStore.memberUploadedData.clear()
        AdminStore.errorModels.clear();
        AdminStore.duplicateAvailable = false;
      }}
      onOpen={()=>{
        AdminStore.isUploaded = false;
        AdminStore.reportTableContent.clear();
        AdminStore.memberUploadedData.clear()
        AdminStore.branchInfoForReport =  {} as IBranchView;
        AdminStore.uploadInfo={} as IUploadInfo;
        AdminStore.errorModels.clear();
        AdminStore.duplicateAvailable = false;
      }}
      closeButtonAriaLabel="Close"
      isFooterAtBottom={true}
      type={PanelType.large}
      headerText={!isMOBILE ? "Member Registration" : ""}
    >
      {isMOBILE ? (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <span className="panel-header"> Member Upload</span>
        </div>
      ) : (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}></div>
      )}
      {!isDESKTOP && (
        <CommandBar
          styles={{ root: { width: "100%" } }}
          items={[
            {
              key: "1",
              onRender: () => (
                <Observer>
                  {() => (
                    <div className="ms-Grid" dir="ltr">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2">
                          <SubPageHeaderTitle title="Branch"></SubPageHeaderTitle>
                        </div>
                        <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10">
                          <Select
                            style={{ width: 350 }}
                            placeholder="select your branch"
                            showSearch
                            filterOption={(input, option) =>{
                                return String(option!.key).toLowerCase().includes(input.toLowerCase())
                            }
                            }
                        
                          //   value={values.branchId}
                            onChange={(val, opt: any) => {
                              //   setFieldValue("branchId",val);
                            }}
                        >
                            {[...PlatformStore.branchs.values()].map((branch:IBranch) => (
                                <Option value={branch.branchId} key={branch.branchName}>
                                {branch.branchName}
                                </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                </Observer>
              ),
            },
          ]}
          style={{ marginTop: "10px" }}
        />
      )}

      {PlatformStore.isSaving && (
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div
              className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
              style={{ paddingBottom: "5px" }}
            >
              <ProgressIndicator
                description={`Please Wait :Loading Branches...`}
                styles={{ root: { textAlign: "center" } }}
              ></ProgressIndicator>
            </div>
          </div>
        </div>
      )}
      {PlatformStore.isLoading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
      
        <Layout
          className="site-layout-background"
          style={{
            backgroundColor: "white",
          }}
        >
          {/* {isDESKTOP && (
            <Sider
              width={350}
              theme="light"
              breakpoint="lg"
              style={{
                borderRight: "1px solid #ececec",
                marginRight: "1px",
                backgroundColor: "white",
              }}
            >
              <Observer>
                {() => (
                  <List
                    itemLayout="vertical"
                    dataSource={PlatformStore.branchFilterString === ""?[...PlatformStore.branchs.values()].sort((a: IBranch, b: IBranch)=>{
                          // Convert names to lowercase for case-insensitive sorting
                          const nameA = a.branchName.toLowerCase();
                          const nameB = b.branchName.toLowerCase();

                          // Compare names
                          if (nameA < nameB) {
                              return -1;
                          } else if (nameA > nameB) {
                              return 1;
                          } else {
                              return 0;
                          }
                    }).map((branch:IBranch) =>toJS(branch) ):[...PlatformStore.branchs.values()].sort((a: IBranch, b: IBranch)=>{
                      // Convert names to lowercase for case-insensitive sorting
                      const nameA = a.branchName.toLowerCase();
                      const nameB = b.branchName.toLowerCase();

                      // Compare names
                      if (nameA < nameB) {
                          return -1;
                      } else if (nameA > nameB) {
                          return 1;
                      } else {
                          return 0;
                      }
                }).map((branch:IBranch) =>toJS(branch) ).filter((value: IBranch)=> value.branchName.toLowerCase().includes(PlatformStore.branchFilterString.toLowerCase()))}
                    size="small"
                    style={{ width: "95%" }}
                    header={
                      <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-sm12">
                            {" "}
                            <Title
                              level={4}
                              style={{
                                display: "inline-block",
                                marginRight: "5px",
                                fontSize: "16px",
                                color: "red",
                              }}
                            >
                              Branches
                            </Title>
                            <Badge
                              count={PlatformStore.branchs.size}
                            />
                          </div>
                        </div>
                        <div
                          className="ms-Grid-row"
                          style={{ paddingTop: "10px" }}
                        >
                          <div className="ms-Grid-col ms-sm12">
                            <MessageBar messageBarType={MessageBarType.warning}>
                              click a branch to select for members upload.
                            </MessageBar>
                          </div>
                          <div className="ms-Grid-col ms-sm12">
                            <FormItem
                              // required
                              label="Search Branch Names"
                              
                            >
                              <Input
                                placeholder="Search... "
                                value={PlatformStore.branchFilterString}
                                prefix={<SearchOutlined style={{ color: "#A0AEC0" }} />}
                                onChange={(e)=>{
                                  PlatformStore.branchFilterString = e.target.value
                                  }
                                }
                                name="otherName"
                                allowClear
                                
                              />
                            </FormItem>
                          </div>
                        </div>
                      </div>
                    }
                    renderItem={(item) => (
                      <List.Item>
                        <div className="ms-Grid" dir="ltr">
                          <div className="ms-Grid-row">
                            <div
                              // className={selItem===item.serviceId.toString()?`ms-Grid-col ms-sm12 ms-md12 ms-lg12 selservice`:"ms-Grid-col ms-sm12 ms-md12 ms-lg12"}
                              style={{ paddingBottom: "10px",  }}
                            >
                              <Button
                                type="link"
                                style={{
                                  fontSize: "14px",
                                  color: "#108ee9",
                                  fontWeight: "bold",
                                }}
                                onClick={async (ev) => {
                                    AdminStore.selectedBranchForUpload = item as IBranch;
                                    notification.info({
                                      message:`${item?.branchName.toUpperCase()} selected`,
                                      placement:"topRight"
                                      
                                    });
                                   
                                }}
                              >
                                <span>
                                  {item?.branchName.toUpperCase()}
                                </span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                )}
              </Observer>
            </Sider>
          )} */}
          <Content className="site-layout-background">
          <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{display:'flex',justifyContent:'end',marginTop:'10px',marginRight:'30px'}}>
        <Button type='primary' disabled={AdminStore.memberUploadedData.size===0 || AdminStore.errorModels.size>0} onClick={async()=>{
           let req = AdminStore.memberUpload([...AdminStore.memberUploadedData.values()],AdminStore.selectedBranchForUpload.branchId,AdminStore.uploadInfo,getCurrentUser().id);
                      
           req.then((value: EDBRequestResponse) =>{
             if (value.success) {
                 AdminStore.isUploaded = true;
                 AdminStore.duplicateAvailable = false;
                 AdminStore.reportTableContent.clear();
                  AdminStore.memberUploadedData.clear()
                  AdminStore.branchInfoForReport =  {} as IBranchView;
                  AdminStore.uploadInfo={} as IUploadInfo;
                 notification.success({
                   message: "EDataBank Platform Feedback ",
                   description:value.msg,
                 });
             }else{

              AdminStore.duplicateAvailable = true;
              AdminStore.memberUploadedData.clear();
                value.data.forEach((m: IMemberUpload,index:number) => {
                  const newMember = {...m,id:index} as IMemberUpload;
                  set(
                    AdminStore.memberUploadedData,
                    index,
                    newMember
                  );
                });

                notification.info({
                  message: "EDataBank Platform Feedback ",
                  description:value.msg,
                });
             }
         }).catch((error: any)=>{
          if(error?.response?.body?.errorType == "timeOut"){
            notification.warning({
              message: "EDataBank Platform Feedback ",
              description:error?.response?.body?.msg,
            });

          }else{
            notification.error({
              message: "EDataBank Platform Feedback ",
              description: "error occurred:" + error?.response?.body?.msg,
            });
          }
         })

        }}> Save Imported Data</Button>
       
      </div>
    </div>

          <Observer>
            {()=>(
              <Pivot
                aria-label="Basic Pivot Example"
                selectedKey={AdminStore.selectedUploadPivotKey}
                onLinkClick={(item) => {
                  if (item?.props.itemKey) {
                    AdminStore.selectedUploadPivotKey=item?.props.itemKey;
                  }
                }}
              >
            
                
                  <PivotItem headerText="Import Excel Template " itemKey="3">
                  <ExcelMemberUpload/>
                  {/* <CurrentUploadPreview/> */}
                  </PivotItem>
                  <PivotItem headerText="Data Validation Errors" itemKey="4"  onRenderItemLink={(link, defaultRenderer) => (
                    <Observer>{()=> <span>
                      <InfoCircleOutlined style={{ color: "red" }} />
                 Branch    Data Validation Errors
                      <Badge
                        count={AdminStore.errorModels.size}
                      />
                    </span>}</Observer>
                     
                    )}>
                 <ErrorLog/>

                  </PivotItem>
                
                 
        
              {/*   <PivotItem headerText="Add Ordinations From Excel" itemKey="2">
                  <ExcelOrdinationUpload/>
                </PivotItem> */}
              </Pivot>

            )}
          </Observer>
          </Content>
        </Layout>
      )}
    </Panel>
  );
};

export default observer(MemberUploadPanel);
