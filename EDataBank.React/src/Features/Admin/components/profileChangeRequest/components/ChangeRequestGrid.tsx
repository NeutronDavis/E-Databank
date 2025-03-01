import {
    FileExcelOutlined,
    ReloadOutlined,
    FolderOpenOutlined
  } from "@ant-design/icons";
  import {
    CommandBar,
    IContextualMenuItem,
    Persona,
    PersonaSize,
    SearchBox,
  } from "@fluentui/react";
  import React, { createContext, useContext, useEffect, useRef } from "react";

  import Moment from "react-moment";
  import { Observer, observer } from "mobx-react-lite";
  
  import { AgGridReact } from "ag-grid-react/lib/agGridReact";
  import "ag-grid-community/dist/styles/ag-grid.css";
  import "ag-grid-community/dist/styles/ag-theme-balham.css";
  import "ag-grid-enterprise";
  import { Button, notification, Skeleton, Space } from "antd";

//   import "../../../styles/useraccounts.css";
import svg from "../img/request.svg";
  
  import confirm from "antd/lib/modal/confirm";
  import { toJS } from "mobx";
import { changeRequestStore } from "../store/ChangeRequestStore";
import { IChangeView } from "../types/interface";
import { SubPageHeaderTitle } from "../../../../../shared/SubPageHeaderTitle";
import ViewChangeRequest from "./dialog/ViewChangeRequest";
import { platformStore } from "../../../store/platformStore";

 
  const _ = require("underscore");
  const changeRequestStoreCtx = createContext(changeRequestStore);
  const platformStoreCtx = createContext(platformStore);
 
  type Props = {};
  
  const ChangeRequestGrid = (props: Props) => {
    const ChangeRequestStore = useContext(changeRequestStoreCtx);
    const PlatformStore = useContext(platformStoreCtx);
  
    const grid = useRef<AgGridReact>(null);

    useEffect(() => {
        async function loadRequests() {
          await ChangeRequestStore.getAllChangeRequest()
          await PlatformStore.getAllRank()
          await PlatformStore.getAllNationality()
          await PlatformStore.getAllBand()
          await PlatformStore.getAllBranch()
          await PlatformStore.getAllPrincipalBand()
          await PlatformStore.getAllProfession()
          await PlatformStore.getAllQualification()
          await PlatformStore.getAllNationality()
        }
    
        loadRequests();
      }, []);

    const rowSelected = (grid: any) => {
      const selrow = grid.api.getSelectedNodes()[0];
      if (selrow) {
        ChangeRequestStore.selectedChangeRequest = selrow.data as IChangeView;
      } else {
        ChangeRequestStore.selectedChangeRequest = {} as IChangeView;
      }
    };
    // let allUserGroupAsAString = (groupIds:string):string=>{
    //     let group:Array<number> = groupIds.split(",").map(x => Number(x))
    //     let groupNames:Array<string> = [];
    //     group.forEach((value: number, index: number)=>{
    //         let allGroup = AdminStore.allGroup.get(value);
    //       if(value === allGroup?.groupId){
    //         groupNames.push(allGroup?.name as string);
    //       }
    //     })
    //     return groupNames.join(", ")
    //   }
  
    const handlePermissionsOpen = () => {}; 
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
          headerName: "FullName",
          field: "fullName",
          sortable: true,
          resizable: true,
          filter: true,
  
          cellRendererFramework: function (params: any) {
            return (
              <div>
                <Persona
                  text={`${params.data.fullName}`}
                  size={PersonaSize.size24}
                  onRenderPrimaryText={(data: any) => {
                    return <span style={{ fontSize: "12px" }}>{data.text}</span>;
                  }}
                />
              </div>
            );
          },
        },
        {
          headerName: "Gender",
          field: "gender",
          sortable: true,
          resizable: true,
          filter: true,
        },
        {
          headerName: "Branch",
          field: "branch",
          sortable: true,
          resizable: true,
          filter: true,
        },
  
        {
          headerName: "Changes Type",
          field: "changesType",
          sortable: true,
          resizable: true,
          filter: true
        },
       
        {
          headerName: "Fields Modified",
          field: "fieldsModified",
          sortable: true,
          resizable: true,
          width: 180,
          filter: true,
        },
        {
          headerName: "Request Date",
          field: "createdOn",
          sortable: true,
          resizable: true,
          width: 150,
          filter: true,
          cellRendererFramework: function (props: any) {
            const { createdOn } = props.data;
            return (
              <span title={createdOn}>
                {" "}
                {createdOn && <Moment fromNow>{createdOn}</Moment>}
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
              count={ChangeRequestStore.changeRequests.size}
              title={"Members Information Update/Add Requests"}
            />
          </div>
          <div
            className="ms-Grid-col ms-sm12 ms-md4 ms-lg4"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {ChangeRequestStore.changeRequests.size > 0 &&(
              <>
                <Space direction="horizontal">
                <Button
                  type="primary"
                  shape="round"
                  
                  disabled={ _.isUndefined(ChangeRequestStore.selectedChangeRequest.changesRequestId)}
        
                  onClick={ () => {
                    const seldata = grid?.current?.api.getSelectedNodes()[0];

                    if (!seldata) {
                      notification.info({
                        message: "EDataBank Platform Feedback ",
                        description: "select Staff to remove",
                      });
                      return;
                    }
                    //adminStore.selectedUser = seldata.data;

                    const data = seldata.data as IChangeView;
                    
                    confirm({
                      title: `Confirm Request Decline?`,
                      content: `This request will be removed from the list, you will not have access to ${data.fullName}'s request.`,
                      okText: "Yes",
                      okType: "danger",
                      cancelText: "No",
                      onOk: async () => {
                        try {
                          await ChangeRequestStore.deleteChange(data.changesRequestId)
                          ChangeRequestStore.selectedChangeRequest = {} as IChangeView;
                          notification.success({
                            message: "EDataBank Platform Feedback ",
                            description: `Decline Successful`,
                          });
                      
                        } catch (error) {
                          notification.info({
                            message: "EDataBank Platform Feedback ",
                            description: "an error occurred during the operation",
                          });
                        }
                      },
                      onCancel() {},
                    });
                  }
                  }
                >
                  Decline
                </Button>
                <Button
                  // type="primary"
                  style={{backgroundColor:"#0078d4",borderColor:"#0078d4",color:_.isUndefined(ChangeRequestStore.selectedChangeRequest.changesRequestId)?"rgba(0, 0, 0, 0.25)":"#fff"}}
                  shape="round"
                  disabled={ _.isUndefined(ChangeRequestStore.selectedChangeRequest.changesRequestId)}
        
                    onClick={async() => {
                      ChangeRequestStore.showViewDialog = true;
                      ChangeRequestStore.setSelected()
                  }}
                >
                  Approve Request
                </Button>

                </Space>
              
              </>
            )}
          </div>
        </div>
        {ChangeRequestStore.changeRequests.size < 1? (
          <EmptyRequest/>
        ):(<>
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
                      ChangeRequestStore.getAllChangeRequest();
                    },
                  },
    
                  {
                    key: "spacer1",
                    onRender: () => <div style={{ width: "300px" }} />,
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
                          console.log("searchTerms", searchTerms);
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
            </div>
          </div>
          <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
            {ChangeRequestStore.isLoading || ChangeRequestStore.approving?(
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
                  <Observer>
                    {()=>(
                      <AgGridReact
                        rowData={[...ChangeRequestStore.changeRequests.values()].map((row) =>
                          toJS(row)
                        )}
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
    
                    )}
                  </Observer>
                </div>
              </div>
            )}
          </div>
        
        </>)}
        {/* <EditStaffRequest/> */}
        <ViewChangeRequest/>
      </div>
    );
  };
  
  const EmptyRequest = () => {
    return (
      <div className="ms-Grid" dir="ltr" style={{marginTop:"140px"}}>
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
            <h2>No Member Update Request </h2>
          </div>
        </div>
      </div>
    );
  };
  export default observer(ChangeRequestGrid);
  