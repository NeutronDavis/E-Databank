import {
    DeleteOutlined,
    FileExcelOutlined,
    ReloadOutlined,
  } from "@ant-design/icons";
  import {
    CommandBar,
    IContextualMenuItem,
    Link,
    MessageBar,
    MessageBarType,
    SearchBox,
  } from "@fluentui/react";
  import React, { createContext, useContext, useEffect, useRef, useState } from "react";
  import { SubPageHeaderTitle } from "../../../../shared/SubPageHeaderTitle";
  import Moment from "react-moment";
  import { observer } from "mobx-react-lite";
  
  import { AgGridReact } from "ag-grid-react/lib/agGridReact";
  import "ag-grid-community/dist/styles/ag-grid.css";
  import "ag-grid-community/dist/styles/ag-theme-balham.css";
  import "ag-grid-enterprise";
  import { Button, notification, Skeleton, Space, Timeline } from "antd";

  import confirm from "antd/lib/modal/confirm";
  import { toJS } from "mobx";
  import svg from "../../images/analysis.svg";

import adminStore from "../../store/adminstore";
import { IUploadAnalysis } from "../../types/interface";

  const adminStoreCtx = createContext(adminStore);
  const _ = require("underscore");
let {Item} = Timeline
  type Props = {};
  
  const UploadAnalysisGrid = observer((props: Props) => {
    const AdminStore = useContext(adminStoreCtx);

    const grid = useRef<AgGridReact>(null);
    const rowSelected = (grid: any) => {
      const selrow = grid.api.getSelectedNodes()[0];
  
      //console.log("selrow",selrow)
      if (selrow) {
        AdminStore.selectedUploadAnalysis = selrow.data as IUploadAnalysis
      } else {
        AdminStore.selectedUploadAnalysis = {} as IUploadAnalysis
      }
    };
    useEffect(() => {
      async function getData() {
        await AdminStore.getAllUploadAnalysis()
      }
      getData();
      return () => {};
    }, []);
  
    const gridcolumnDefs = {
      columnDefs: [
        {
            rowDrag: true,
            valueGetter: function(params: any) {
                return Number(params.node.id) + 1;
            },
            width: 80,
            sortable: true,
            resizable: true,
            checkboxSelection: true
        },
        {
          headerName: "CMC",
          field: "cmcId",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
       
        },
        {
          headerName: "Province",
          field: "provinceName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
          rowGroup: true
        },
        {
          headerName: "District",
          field: "districtName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
        },
        {
          headerName: "Branch",
          field: "branchName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
        },
        {
          headerName: "Total Member",
          field: "totalMember",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
        },
        {
          headerName: "Total Male",
          field: "totalMale",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
        },
        {
          headerName: "Total Female",
          field: "totalFemale",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
        },
        {
          headerName: "Upload By",
          field: "uploadedBy",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
        },
        {
            headerName: "Uploaded On",
            field: "uploadedAt",
            sortable: true,
            resizable: true,
            width: 180,
            filter: true,
            cellRendererFramework: function (props: any) {
              return (
                <span title={props.data?.uploadedAt}>
                  {" "}
                  {props.data?.uploadedAt && <Moment fromNow>{props.data?.uploadedAt}</Moment>}
                </span>
              );
            },
          },
      ],
    };
    return (
      <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
                  <SubPageHeaderTitle
                  count={AdminStore.uploadAnalysis.size}
                  title={"Upload Analysis"}
                  />
              </div>
      
            </div>
  
            {AdminStore.uploadAnalysis.size < 1?(
                <EmptyUploadAnalysis/>
            ):(
                <>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 commandbar">
                        <CommandBar
                        style={{}}
                        items={[
                            {
                            key: "refresh",
                            text: "Refresh",
                            name: "New",
                            onRenderIcon: () => <ReloadOutlined className="qicon" />,
                            onClick: (
                                ev?:
                                | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                                | React.KeyboardEvent<HTMLElement>
                                | undefined,
                                item?: IContextualMenuItem | undefined
                            ) => {
                                AdminStore.getAllUploadAnalysis()
                            },
                            },
                       
                            {
                                key: "delete",
                                text: "Delete Branch Uploaded",
                                onRenderIcon: () => <DeleteOutlined className="qicon" />,
                                disabled: _.isUndefined(AdminStore.selectedUploadAnalysis?.uploadInfoId),
                                onClick: () => {
                                    
                                    confirm({
                                        title: `Confirm Upload Data Delete`,
                                        content:<><span style={{color:"#d92525"}}>NOTE:</span> This will delete all the data uploaded for {AdminStore.selectedUploadAnalysis.branchName} branch</>,
                                        okText: "Yes",
                                        okType: "danger",
                                        cancelText: "No",
                                        onOk: async () => {
                                          try {
                                            await AdminStore.removeMemberRecordsViaUploadAnalysis(Number(AdminStore.selectedUploadAnalysis?.branchId))
                                            notification.success({
                                              message: "EDataBank Platform Feedback",
                                              description: `Members data in ${AdminStore.selectedUploadAnalysis.branchName} branch has been successfully deleted in EDataBank Platform `,
                                            });
                                          
                                            await AdminStore.getAllUploadAnalysis()
                                              
                                          } catch (error) {
                                            notification.info({
                                              message: "EDataBank Platform Feedback",
                                              description: "an error occurred during the operation",
                                            });
                                          }
                                        },
                                        onCancel() {},
                                      });
                                },
                            },
            
                            {
                            key: "spacer1",
                            onRender: () => <div style={{ width: "400px" }} />,
                            },
                            {
                            key: "search",
                            onRender: () => (
                                <SearchBox
                                placeholder="Search"
                                styles={{
                                    root: { width: "100%", borderBottomColor: "#CBD5E0" },
                                }}
                                underlined={true}
                                onChange={(
                                    ev: React.ChangeEvent<HTMLInputElement> | undefined,
                                    searchTerms: string | undefined
                                ) => {
                                    // console.log("searchTerms", searchTerms);
                                    if (searchTerms !== "") {
                                    grid?.current?.api?.setQuickFilter(searchTerms!);
                                    } else {
                                    grid?.current?.api?.setQuickFilter("");
                                    }
            
                                    // const filterValue = grid.current.api.filterManager.quickFilter;
                                }}
                                ></SearchBox>
                            ),
                            },
                            {
                            key: "spacer1",
                            onRender: () => <div style={{ width: "100px" }} />,
                            },
                    
                        ]}
                        farItems={[
                            {
                            key: "group4",
                            text: "Export to Excel",
                            name: "group",
                            onRenderIcon: () => <FileExcelOutlined className="qicon" />,
            
                            onClick: () => {
                                grid?.current?.api?.exportDataAsExcel();
                            },
                            },
                        ]}
                        />
                        {/* <MessageBar messageBarType={MessageBarType.warning}>
                        <b style={{color:"#d92525"}}>Note</b>: <span>Your current rank history is the first row in this grid.</span>
                      </MessageBar> */}
                      </div>
                    </div>
                 
                    <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
                        {AdminStore.isLoadingUploadAnalysis  ? (
                            <>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                            </>
                        ) : (
                            <div className="ms-Grid-col ms-sm12">
                                {" "}
                                <div
                                    className="ag-theme-balham"
                                    style={{
                                    minHeight: "50vh",
                                    height: "60vh",
                                    width: "100%",
                                    maxHeight: "80vh",
                                    }}
                                >
                                     
                                     <AgGridReact
                                    rowData={[...AdminStore.uploadAnalysis.values()].map((row) => toJS(row))}
                                    ref={grid}
                                    gridOptions={{
                                        defaultColDef: {
                                        sortable: true,
                                        filter: true,
                                        },
                                        rowHeight: 30,
                                        rowSelection: "single",
                                        pagination: true,
                                        columnDefs: gridcolumnDefs.columnDefs,
                                        animateRows: true,
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
                    
                                </div>
                            </div>
                        )}
                
                    </div>
                
                </>
            )}
      </div>
    );
  });


  const EmptyUploadAnalysis = () => {
    return (
      <div className="ms-Grid" dir="ltr" style={{marginTop:"190px"}}>
        <div className="ms-Grid-row">
          <div
            className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <img src={svg} style={{ width: "35%" }} alt="No service" />
          </div>
          <div
            className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Member Data is Not Yet Uploaded into the system.</h2>
            <br/>

          </div>
          <div
            className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>To get the member upload analysis, try uploading members via excel.</p>
            </div>
        </div>
      </div>
    );
  };
  
  export default UploadAnalysisGrid;
  