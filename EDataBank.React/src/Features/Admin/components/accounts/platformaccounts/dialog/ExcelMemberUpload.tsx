import React, { createContext, useContext, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-enterprise";

// import { Product } from "../../types/interface";
import { InboxOutlined,SaveOutlined,ExportOutlined,DeleteRowOutlined,DeleteOutlined,OrderedListOutlined,DatabaseOutlined,VerifiedOutlined} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Divider, Form, Input, message, Table, Upload } from "antd";
import {
  CommandBar,
  MessageBar,
  MessageBarType,
  ProgressIndicator,
} from "@fluentui/react";
import { remove, set, toJS } from "mobx";
import { Observer } from "mobx-react-lite";
import { notification } from "antd";
import { getCurrentUser } from "../../../../../../Utility/helper";

import { SubPageHeaderTitle } from "../../../../../../shared/SubPageHeaderTitle";
import adminStore from "../../../../store/adminstore";

import { ENV } from "../../../../../../Infrastructure/EnvironmentConfig";
import { ErrorModel, IBranch, IBranchView, IMemberUpload, IReportTableInfo, IUploadInfo } from "../../../../types/interface";
import FormItem from "antd/es/form/FormItem";
import { RcFile, UploadChangeParam } from "antd/lib/upload";


const _ = require("underscore");
const { formatNumber } = require("accounting-js");

const adminStoreCtx = createContext(adminStore);
const { Dragger } = Upload;
const ExcelMemberUpload = () => {
//   const facilitySetUpStore = useContext(facilitySetUpStoreCtx);


  const AdminStore = useContext(adminStoreCtx);
  const customProductgrid = useRef<AgGridReact>(null);
  const rowSelected = (grid: any) => {
    const selrow = grid.api.getSelectedNodes()[0];

    if (selrow !== undefined) {
 
      AdminStore.selectedMemberUploadedData = selrow.data  as IMemberUpload;

    } else {
      AdminStore.selectedMemberUploadedData = {...{}} as IMemberUpload;

    }
  };
  const formatCurrency = (params: any) => {
    const { value } = params;

    if (value) {
      return formatNumber(value, {
        precision: 2,
        thousand: ",",
      });
    }
  };
  const gridcolumnDefs = {
    columnDefs: [
      {
        rowDrag: true,
        valueGetter: function (params: any) {
          return Number(params.node.id) + 1;
        },
        width: 80,
        sortable: true,
        resizable: true,
        checkboxSelection: true,
      },

      {
        headerName: "S/N",
        field: "sn",
        sortable: true,
        resizable: true,
        filter: true,
        width: 70,
        editable: true,
      },
      {
        headerName: "Current Rank",
        field: "rank",
        sortable: true,
        resizable: true,
        editable: true,
        filter: true,
        // width: 300,
        // valueFormatter: formatCurrency,
    
      },
      {
        headerName: "SurName",
        field: "lastName",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
      
        // width: 300,
      },
      {
        headerName: "Other Names (First & Middle)",
        field: "otherName",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
    
        // width: 300,
      },
      {
        headerName: "Gender",
        field: "gender",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
      
        // width: 300,
      },
      {
        headerName: "Principal Band",
        field: "principalBand",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
      
        // width: 300,
      },{
        headerName: "Other Band /Association",
        field: "otherBandsAssociation",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
      
        // width: 300,
      },{
        headerName: "Date of Birth (dd-mm-yyyy)",
        field: "dateofBirth",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
      
        // width: 300,
      }
      ,{
        headerName: "Year of Marriage",
        field: "yearOfMarriage",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
      
        // width: 300,
      },
      {
        headerName: "Nationality 1",
        field: "nationality1",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
      
        // width: 300,
      },{
        headerName: "Nationality 2",
        field: "nationality2",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
      
        // width: 300,
      },
      {
        headerName: "No. of Children",
        field: "numberofChildren",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
     
        // width: 300,
      },{
        headerName: "Name of Spouse  (First, Middle, Surname)",
        field: "nameOfSpouse",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
     
        // width: 300,
      },
      {
        headerName: "Ordination Rank of Spouse",
        field: "spouseRank",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
       
        // width: 300,
      },
      {
        headerName: "Address",
        field: "address",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
       
        // width: 300,
      },
      {
        headerName: "Telephone Contact",
        field: "phoneNumber",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Email Contact",
        field: "emailContact",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Highest Qualification",
        field: "qualification",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Profession",
        field: "profession",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Occupation",
        field: "occupation",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Current/previous Position Held In Church",
        field: "cppInChurch",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      
      
      {
        headerName: "Qualification",
        field: "qualification",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Profession",
        field: "profession",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Occupation",
        field: "occupation",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Rank ",
        field: "rank1",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year1",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Rank ",
        field: "rank2",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year2",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },{
        headerName: "Rank ",
        field: "rank3",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year3",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },{
        headerName: "Rank ",
        field: "rank4",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year4",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },{
        headerName: "Rank ",
        field: "rank5",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year5",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },{
        headerName: "Rank ",
        field: "rank6",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year6",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },{
        headerName: "Rank ",
        field: "rank7",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year7",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },{
        headerName: "Rank ",
        field: "rank8",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year8",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },{
        headerName: "Rank ",
        field: "rank9",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year9",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      }
      ,{
        headerName: "Rank ",
        field: "rank10",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year10",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },{
        headerName: "Rank ",
        field: "rank11",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year11",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },{
        headerName: "Rank ",
        field: "rank12",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year12",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },{
        headerName: "Rank ",
        field: "rank13",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year13",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },{
        headerName: "Rank ",
        field: "rank14",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "Year ",
        field: "year14",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      }
    ],
  };

  const columns = [
    {
        dataIndex: "title",
        title:<></>,
        width: '20%',
        render: (text: string, record: IReportTableInfo, index: any) => {
                return text;
            },
    },
    {
        dataIndex: "names",
        title: <b>NAME</b>,
        width: '20%',
        render: (text: string, record: IReportTableInfo, index: any) => {
                return text;
            },
    },
    {
        dataIndex: "ranks",
        title: <b>RANK</b>,
        width: '20%',
        render: (text: string, record: IReportTableInfo, index: any) => {
                return text;
            },
    },
    {
        dataIndex: "phone",
        title: <b>PHONE NUMBER</b>,
        width: '20%',
        render: (text: string, record: IReportTableInfo, index: any) => {
                return text;
            },
    },
    {
        dataIndex: "email",
        title: <b>EMAIL</b>,
        width: '20%',
        render: (text: string, record: IReportTableInfo, index: any) => {
                return text;
            },
    },
  
];
// 
const downloadFile=async()=>{
  try {
    await AdminStore.downloadMembersTemplate();
  }catch (error:any) {
    //convert the blob to text so that you can extract the error message sent from the server
    // note this only happens when the agent responseType("blob")
    let texError = await error?.response?.body.text();
    let jsError = JSON.parse(texError);
    if(jsError.errorType =='timeOut' || jsError.errorType == "notfound"){
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

}

  const uploadprops: UploadProps = {
    name: "file",
    accept: ".xlsx",
    multiple: false,
    /* beforeUpload: (file, fileList) => {
      if (
        _.isUndefined(
            AdminStore.selectedBranchForUpload.branchName
        )
      ) {
        notification.error({
          key: "error",
          message: "EDataBank Feedback",
          description: "Please select a branch",
        });

        return false;
      }
      return true;
    }, */
    headers: {
      method: "Post",
    },

    action: `${ENV.API_ROOT}/main/importExcelMembers`,
   
    onChange:async(info:UploadChangeParam<UploadFile<any>>)=>{
      try {
        const { status } = info.file;
        if (status === "done") {
          const { members, errorMsg, success,errormodels,selBrach,uploadInfo } = info.file.response;
          if (!success) {
            notification.error({
              message: "EDataBank Feedback ",
              description: errorMsg,
            });

            return;
          }
          AdminStore.selectedBranchForUpload=selBrach as IBranch;
          AdminStore.uploadInfo=uploadInfo as IUploadInfo;
          let branchUploadData = uploadInfo as IUploadInfo;
          AdminStore.memberUploadedData.clear();
          // console.log("uploadInfo",uploadInfo)
          if(branchUploadData !== undefined){
            // console.log("branchData2",branchUploadData,uploadData)
            //AdminStore.branchInfoForReport = branchUploadData
            let tableReportList:Array<IReportTableInfo> = [];
            let t1:IReportTableInfo = {
              title:"ELDER-IN-CHARGE",
              names:branchUploadData && branchUploadData.elderInChargeName !== null && branchUploadData.elderInChargeName !== undefined?branchUploadData.elderInChargeName:"",
              ranks:branchUploadData && branchUploadData.elderInChargeRank !== null && branchUploadData.elderInChargeRank !== undefined?branchUploadData.elderInChargeRank:"",
              phone:branchUploadData && branchUploadData.elderInChargePhoneNumber !== null && branchUploadData.elderInChargePhoneNumber !== undefined?branchUploadData.elderInChargePhoneNumber:"",
              email:branchUploadData && branchUploadData.elderInChargeEmail !== null && branchUploadData.elderInChargeEmail !== undefined?branchUploadData.elderInChargeEmail:""
            }
            tableReportList.push(t1)
            let t2:IReportTableInfo = {
              title:"SECRETARY",
              names:branchUploadData && branchUploadData.secretaryName !== null && branchUploadData.secretaryName !== undefined?branchUploadData.secretaryName:"",
              ranks:branchUploadData && branchUploadData.secretaryRank !== null && branchUploadData.secretaryRank !== undefined?branchUploadData.secretaryRank:"",
              phone:branchUploadData && branchUploadData.secretaryPhoneNumber !== null && branchUploadData.secretaryPhoneNumber !== undefined?branchUploadData.secretaryPhoneNumber:"",
              email:branchUploadData && branchUploadData.secretaryEmail !== null && branchUploadData.secretaryEmail !== undefined ? branchUploadData.secretaryEmail:""
            }
            tableReportList.push(t2)
            let t3:IReportTableInfo = {
              title:"FINANCIAL SECRETARY",
              names:branchUploadData && branchUploadData.financialSecretaryName !== null && branchUploadData.financialSecretaryName !== undefined?branchUploadData.financialSecretaryName:"",
              ranks:branchUploadData && branchUploadData.financialSecretaryRank !== null && branchUploadData.financialSecretaryRank !== undefined?branchUploadData.financialSecretaryRank:"",
              phone:branchUploadData && branchUploadData.financialSecretaryPhoneNumber !== null && branchUploadData.financialSecretaryPhoneNumber !== undefined?branchUploadData.financialSecretaryPhoneNumber:"",
              email:branchUploadData && branchUploadData.financialSecretaryEmail !== null && branchUploadData.financialSecretaryEmail !== undefined?branchUploadData.financialSecretaryEmail:""
            }
            tableReportList.push(t3)
  
            tableReportList.forEach((value: IReportTableInfo,index:number)=>{
              AdminStore.reportTableContent.set(index,value)
            });

          }

          members.forEach((m: IMemberUpload,index:number) => {
              const newMember = {...m,id:index} as IMemberUpload;

              set(
                AdminStore.memberUploadedData,
                index,
                newMember
              );
            });

            AdminStore.errorModels.clear();
            errormodels.forEach((e:ErrorModel,index:number)=>{
              const error={...e,id:index} as ErrorModel

              set(AdminStore.errorModels,index,error)

            });
        }else if(status === "error"){
          let fileError = info.file.response;
          notification.warning({
            message: "EDataBank Feedback",
            description: `${fileError.msg}`,
          });
        }
      } catch (error) {
        notification.error({
          message: "EDataBank Feedback",
          description: `${info.file.name} failed to Upload`,
          
        });
      }
    },
  };
  const curentUserFullName = getCurrentUser()?.fullName || "";
  
  return (
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row ">
      <Observer>
          {()=>(
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                {_.isUndefined(
                  AdminStore.selectedBranchForUpload?.branchName
                ) ? (
                  <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
                    <div className="ms-Grid-col ms-sm12">
                      <MessageBar messageBarType={MessageBarType.warning}>
                        Select a branch from the left pane to upload members.
                      </MessageBar>
                    </div>
                  </div>
                ) : (
                  AdminStore.memberUploadedData.size > 0?(
                    <SubPageHeaderTitle
                    count={AdminStore.memberUploadedData.size}
                    title={`  ${(AdminStore.selectedBranchForUpload?.branchName == null || AdminStore.selectedBranchForUpload?.branchName == undefined)?"":AdminStore.selectedBranchForUpload?.branchName.toUpperCase()} branch Members Data`}
                  />
                    ):(
                      
                      <SubPageHeaderTitle
                        title={`Add Members to ${(AdminStore.selectedBranchForUpload?.branchName == null || AdminStore.selectedBranchForUpload?.branchName == undefined)?"":AdminStore.selectedBranchForUpload?.branchName.toUpperCase()} branch`}
                      />
                  )
                )}
              </div>
          )}
      </Observer>
      </div>
     
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <Observer>
            {() => (
              <CommandBar
                items={[
                  {
                    key: "remove",
                    onRenderIcon: () => <DeleteRowOutlined className="qicon" />,
                    text: "Remove Row",
                    disabled:_.isUndefined(AdminStore.selectedMemberUploadedData?.id),

                    onClick: () => {
                      const selectedRows =
                        customProductgrid.current?.api.getSelectedRows();

                      customProductgrid.current?.api.applyTransaction({
                        remove: selectedRows,
                      });
                      if (selectedRows?.length) {
                        remove(
                            AdminStore.memberUploadedData,
                          selectedRows[0].id
                        );
                      }
       
                    },
                  },
                  {
                    key: "removeAll",
                    onRenderIcon: () => <DeleteOutlined className="qicon" />,
                    text: "Remove All",
                    disabled: AdminStore.memberUploadedData.size === 0,

                    onClick: () => {
                      AdminStore.memberUploadedData.clear();
                      AdminStore.errorModels.clear()
                      adminStore.duplicateAvailable = false;

                      AdminStore.isUploaded = false;
                      AdminStore.reportTableContent.clear();
                      AdminStore.memberUploadedData.clear()
                      AdminStore.branchInfoForReport =  {} as IBranchView;
                      AdminStore.uploadInfo={} as IUploadInfo;
                      AdminStore.selectedBranchForUpload = {} as IBranch;
                    },
                  },
                  {
                    key: "export",
                    text: "Export Member Template",
                    onRenderIcon: () => <ExportOutlined className="qicon" />,

                    onClick: () => {
                      downloadFile();
                    },
                  },
                ]}
              //   farItems={[
              //     {
              //     key: "group4",
              //     text: "Revalidate",
              //     name: "group",
              //     disabled:AdminStore.isUploaded?false:true,
              //     onRenderIcon: () => <VerifiedOutlined className="qicon" />,

              //     onClick: () => {
              //       // AdminStore.openUploadPanel = false;
              //       // AdminStore.showCurrentUploadDialog = true;
              //       // AdminStore.genReport(AdminStore.selectedBranchForUpload.branchId);
              //         //grid?.current?.api?.exportDataAsExcel();
              //     },
              //     },
              // ]}
               
              />
            )}
          </Observer>
        </div>
      </div>
      <Observer>
        {()=>(
          <>
            {AdminStore.isSaving && (
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <div
                    className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
                    style={{ paddingBottom: "5px" }}
                  >
                    <ProgressIndicator
                      description={`Please Wait: Adding member to DB...`}
                      styles={{ root: { textAlign: "center" } }}
                    ></ProgressIndicator>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Observer>
      <div className="ms-Grid" dir="ltr" style={{ marginBottom: "10px" }}>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
            <Observer>
                {()=>(
                  <>
                  { AdminStore.isDownloadingTemplate && <ProgressIndicator
                description={`Please Wait While we generate the template...`}
                styles={{ root: { textAlign: "center" } }}
              ></ProgressIndicator>}
          
                    <Dragger {...uploadprops}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>

                  
                        <>
                        <p className="ant-upload-text">
                            Click or drag members values (.xlsx) Template with Sheet name:{" "}
                            <b>
                            
                                Database
                            
                            </b>{" "}
                            to this area to upload
                        </p>{" "}
                        <p className="ant-upload-hint">
                            Note: the workbook must have a sheet name must that match:{" "}
                            Database
                        </p>
                        </>
                
                    </Dragger>
                </>

                )}
            </Observer>
          </div>
        </div>
      </div>
      {/*  */}

<Divider>SANCTUARY DETAILS</Divider>
        <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md3 ms-lg3" style={{marginTop:"35px"}}>
                <Form layout="vertical">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                            <FormItem
                                label={<b>Cmc</b>}
                               
                                >
                                <Input
                               
                                    value={AdminStore.uploadInfo && AdminStore.uploadInfo.cmc !== null && AdminStore.uploadInfo.cmc !== undefined?AdminStore.uploadInfo.cmc:""}
                                    bordered={false}
                                />
                            </FormItem>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                            <FormItem
                                label={<b>Province</b>}
                               
                                >
                                <Input
                                
                                    value={AdminStore.uploadInfo && AdminStore.uploadInfo.province !== null && AdminStore.uploadInfo.province !== undefined?AdminStore.uploadInfo.province:""}
                                    // name="email"
                                   bordered={false}
                                />
                            </FormItem>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                            <FormItem
                                label={<b>District</b>}
                                >
                                <Input
                              
                                    value={AdminStore.uploadInfo && AdminStore.uploadInfo.district !== null && AdminStore.uploadInfo.district !== undefined?AdminStore.uploadInfo.district:""}
                                    // name="email"
                                    bordered={false}
                                />
                            </FormItem>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                            <FormItem
                                label={<b>Branch</b>}
                                >
                                <Input
                           
                                    value={AdminStore.uploadInfo && AdminStore.uploadInfo.branch !== null && AdminStore.uploadInfo.branch !== undefined?AdminStore.uploadInfo.branch:""}
                                    name="email"
                                    bordered={false}
                                />
                            </FormItem>
                        </div>
                    </div>
                  </Form>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md5 ms-lg5" style={{marginTop:"100px"}}>
                <Form layout="vertical">
                <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                            <FormItem
                                label={<b>Province Address</b>}
                                >
                                <Input
                                // disabled= {true}
                                    value={AdminStore.uploadInfo && AdminStore.uploadInfo.provinceAddress !== null && AdminStore.uploadInfo.provinceAddress !== undefined?AdminStore.uploadInfo.provinceAddress:""}
                                    readOnly
                                        bordered={false}
                                />
                            </FormItem>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                            <FormItem
                                label={<b>District Address</b>}
                                >
                                <Input
                                // disabled= {true}
                                    value={AdminStore.uploadInfo && AdminStore.uploadInfo.districtAddress !== null && AdminStore.uploadInfo.districtAddress !== undefined?AdminStore.uploadInfo.districtAddress:""}
                                    readOnly
                                        bordered={false}
                                />
                            </FormItem>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                            <FormItem
                                label={<b>Branch Address</b>}
                                >
                                <Input
                                // disabled= {true}
                                    value={AdminStore.uploadInfo && AdminStore.uploadInfo.branchAddress !== null && AdminStore.uploadInfo.branchAddress !== undefined?AdminStore.uploadInfo.branchAddress:""}
                                    readOnly
                                        bordered={false}
                                />
                            </FormItem>
                        </div>
                    </div>
                  </Form>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4" style={{marginTop:"30px"}}>
                    <Divider>DETAILS OF PRINCIPAL OFFICERS OF THE BRANCH</Divider>
                    <Table
                        style={{ width: "100%" }}
                        size='small'
                        columns={columns}
                        bordered
                        dataSource={[...AdminStore.reportTableContent.values()]}
                        pagination={false}
                    />
                </div>
            </div>
     

      <div className="ms-Grid-row" style={{marginTop:'10px'}}>
        {adminStore.errorModels.size>0 &&<MessageBar messageBarType={MessageBarType.error} > Oops!!! We found some not so clean data in this branch data import,please review the <b>Branch Data Validation Errors</b> and re-import the cleaned data </MessageBar>}
        {adminStore.duplicateAvailable &&<MessageBar messageBarType={MessageBarType.warning} > Oops! Duplicate data has been identified in this branch data import, and the existing duplicate entries are already listed in the data grid. Please review and re-import the cleaned data.</MessageBar>}
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <div
            className="ag-theme-balham"
            style={{
              minHeight: "50vh",
              height: "60vh",
              width: "100%",
              maxHeight: "80vh",
            }}
          >
            <Observer>
              {()=>(
                <AgGridReact
                  rowData={[...AdminStore.memberUploadedData.values()].map(
                    (row) => toJS(row)
                  )}
                  ref={customProductgrid}
                  gridOptions={{
                    defaultColDef: {
                      sortable: true,
                      filter: true,
                    },
                    rowHeight: 30,
                    rowSelection: "multiple",
                    pagination: true,
                    columnDefs: gridcolumnDefs.columnDefs,
                    animateRows: true,
                    singleClickEdit: true,
                    statusBar: {
                      statusPanels: [
                        {
                          statusPanel: "agTotalRowCountComponent",
                          align: "center",
                        },
                      ],
                    },
                  }}
                  rowSelection="single"
                  onSelectionChanged={rowSelected}
                  copyHeadersToClipboard={true}
                  overlayLoadingTemplate={`${(
                    <span className="ag-overlay-loading-center">
                      Please wait while your rows are loading
                    </span>
                  )}`}
                ></AgGridReact>

              )}
            </Observer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelMemberUpload;
