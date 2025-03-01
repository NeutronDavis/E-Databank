import React, { createContext, useContext, useRef } from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-enterprise";

// import { Product } from "../../types/interface";
import { InboxOutlined,SaveOutlined,ExportOutlined,DeleteRowOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
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
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import { masterPageStore } from "../../../../../MasterPage/store/MasterPageStore";
import { SubPageHeaderTitle } from "../../../../../../shared/SubPageHeaderTitle";
import adminStore from "../../../../store/adminstore";
import writeXlsxFile from 'write-excel-file';
import * as XLSX from  'xlsx'
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { ENV } from "../../../../../../Infrastructure/EnvironmentConfig";
import { IMemberUpload, IOrdinationUpload } from "../../../../types/interface";
import { EDBRequestResponse } from "../../../../../../shared/EDBRequestResponse";
const _ = require("underscore");
const { formatNumber } = require("accounting-js");
const MySwal = withReactContent(Swal)
const masterPageStoreCtx = createContext(masterPageStore);
const adminStoreCtx = createContext(adminStore);
const { Dragger } = Upload;
const ExcelOrdinationUpload = () => {
//   const facilitySetUpStore = useContext(facilitySetUpStoreCtx);

  const masterPageStore = useContext(masterPageStoreCtx);
  const AdminStore = useContext(adminStoreCtx);
  const customProductgrid = useRef<AgGridReact>(null);
  const rowSelected = (grid: any) => {
    const selrow = grid.api.getSelectedNodes()[0];

    if (selrow !== undefined) {
 
      AdminStore.selectedOrdinationUploadedData = selrow.data  as IOrdinationUpload;
    } else {
      AdminStore.selectedOrdinationUploadedData = {...{},branchId:undefined} as IOrdinationUpload;
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
        headerName: "OtherName",
        field: "otherName",
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
        editable: true,
      },
      {
        headerName: "LastName",
        field: "lastName",
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
        editable: true,
      },
      {
        headerName: "RankId",
        field: "rankId",
        sortable: true,
        resizable: true,
        editable: true,
        filter: true,
        // width: 300,
        // valueFormatter: formatCurrency,
      },
      {
        headerName: "Year",
        field: "year",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "BranchId",
        field: "branchId",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      },
      {
        headerName: "NextRankId",
        field: "nextRankId",
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        // width: 300,
      }
    ],
  };

const downloadFile=async()=>{
    if (_.isUndefined(AdminStore.selectedBranchForUpload.branchName)) {
        notification.info({
          message: "Select a branch to export it's member template",
        });
        return;
    }else{
        await AdminStore.downloadOrdinationTemplate();
    }
}

  const uploadprops: UploadProps = {
    name: "file",
    accept: ".xlsx",
    multiple: false,
    beforeUpload: (file, fileList) => {
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
    },
    headers: {
      method: "Post",
    },

    action: `${ENV.API_ROOT}/main/importExcelOrdinations`,

    onChange:async(info)=>{
      try {
        const { status } = info.file;

        if (status === "done") {
          const { ordinations, errorMsg, success } = info.file.response;
          if (!success) {
            notification.error({
              message: "EDataBank Feedback",
              description: errorMsg,
            });

            return;
          }
          AdminStore.ordinationUploadedData.clear();
          ordinations.forEach((o: IOrdinationUpload,index:number) => {
              const newOrdination = {
                otherName:o.otherName,
                lastName:o.lastName,
                year:o.year,
                rankId:o.rankId,
                branchId:o.branchId,
                nextRankId:o.nextRankId,
                pi:index
              } as IOrdinationUpload;

              set(
                AdminStore.ordinationUploadedData,
                index,
                newOrdination
              );
            });
        }
 
      } catch (error) {
        notification.error({
          message: "EDataBank Feedback",
          description: `${info.file.name} failed to Save`,
        });
      }
    },
  };
  const curentUserFullName = getCurrentUser()?.fullName || "";

  return (
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
      <Observer>
          {()=>(
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                {_.isUndefined(
                  AdminStore.selectedBranchForUpload.branchName
                ) ? (
                  <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
                    <div className="ms-Grid-col ms-sm12">
                      <MessageBar messageBarType={MessageBarType.warning}>
                        Select a branch from the left pane to upload members.
                      </MessageBar>
                    </div>
                  </div>
                ) : (
                  AdminStore.ordinationUploadedData.size > 0?(
                    <SubPageHeaderTitle
                    count={AdminStore.ordinationUploadedData.size}
                    title={`Ordination to ${AdminStore.selectedBranchForUpload.branchName.toUpperCase()} branch`}
                    />
                    
                    ):(
                    <SubPageHeaderTitle
                      title={`Add Ordination to ${AdminStore.selectedBranchForUpload.branchName.toUpperCase()} branch`}
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
                    disabled:_.isUndefined(AdminStore.selectedOrdinationUploadedData.branchId),

                    onClick: () => {
                      const selectedRows =
                        customProductgrid.current?.api.getSelectedRows();

                      customProductgrid.current?.api.applyTransaction({
                        remove: selectedRows,
                      });
                      if (selectedRows?.length) {
                        remove(
                            AdminStore.ordinationUploadedData,
                          selectedRows[0].pi
                        );
                      }
       
                    },
                  },
                  {
                    key: "removeAll",
                    onRenderIcon: () => <DeleteOutlined className="qicon" />,
                    text: "Remove All",
                    disabled: AdminStore.ordinationUploadedData.size === 0,

                    onClick: () => {
                      AdminStore.ordinationUploadedData.clear();
                    },
                  },
                  {
                    key: "export",
                    text: "Export Ordination Template",
                    onRenderIcon: () => <ExportOutlined className="qicon" />,

                    onClick: () => {
                      downloadFile();
                    },
                  },
                ]}
                farItems={[
                  {
                    key: "save",
                    onRenderIcon: () => <SaveOutlined className="qicon" />,
                    text: "Save Ordination(s)",
                    disabled: AdminStore.ordinationUploadedData.size === 0,
                    onClick: () => {
                        try {
                          let req = AdminStore.ordinationUpload([...AdminStore.ordinationUploadedData.values()]);
                        req.then((value: EDBRequestResponse) =>{
                            if (value.success) {
                               
                                notification.success({
                                  message: "EDataBank Platform Feedback ",
                                  description:value.msg,
                                });
                            }
                        })
                       
                      } catch (error: any) {
                        notification.error({
                          message: "EDataBank Platform Feedback ",
                          description: "error occurred:" + error?.response?.body?.msg,
                        });
                      }
                    },
                  },
                ]}
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
                        description={`Please Wait: Adding ordinations to DB...`}
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
                    <Dragger {...uploadprops}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>

                    {_.isUndefined(
                        adminStore.selectedBranchForUpload.branchName
                    ) ? (
                        <MessageBar messageBarType={MessageBarType.error}>
                            No Branch Is Selected
                        </MessageBar>
                    ) : (
                        <>
                        <p className="ant-upload-text">
                            Click or drag ordination values (.xlsx) Template with Sheet name:{" "}
                            <b>
                            {
                                adminStore.selectedBranchForUpload.branchName
                            }
                            </b>{" "}
                            to this area to upload
                        </p>{" "}
                        <p className="ant-upload-hint">
                            Note: the workbook must have a sheet name must that match:{" "}
                            {
                                adminStore.selectedBranchForUpload.branchName
                            }
                        </p>
                        </>
                    )}
                    </Dragger>

                )}
            </Observer>
          </div>
        </div>
      </div>

      <div className="ms-Grid-row">
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
                      rowData={[...AdminStore.ordinationUploadedData.values()].map(
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

export default ExcelOrdinationUpload;
