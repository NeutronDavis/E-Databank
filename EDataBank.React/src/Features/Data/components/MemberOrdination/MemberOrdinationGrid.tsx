import {
    CheckOutlined,
    ClockCircleOutlined,
    CloseOutlined,
    DeleteOutlined,
    FileExcelOutlined,
    KeyOutlined,
    LockOutlined,
    PlusOutlined,
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
//   import "../../styles/useraccounts.css";
  
  import confirm from "antd/lib/modal/confirm";
  import { toJS } from "mobx";
  import svg from "../../images/rank.svg";
//   import { createSecureContext } from "tls";
  import { platformStore } from "../../../Admin/store/platformStore";
import { Edit3, Plus, Trash2 } from "react-feather";
import { changeRequestStore } from "../../../Admin/components/profileChangeRequest/store/ChangeRequestStore";
import memberOrdinationStore from "../../store/memberOrdinationStore";
import { IOrdinationView } from "../../types/interfaces";
import { getCurrentUser } from "../../../../Utility/helper";
import OrdinationEditDialog from "./dialog/OrdinationEditDialog";
import { profileStore } from "../../../Profile/store/ProfileStore";
import AddOrdinationDialog from "./dialog/AddOrdinationDialog";
  const changeRequestStoreCtx = createContext(changeRequestStore);
  const platformStoreCtx = createContext(platformStore);
  const memberOrdinationStoreCtx = createContext(memberOrdinationStore);
  const profileStoreCtx = createContext(profileStore);
  const _ = require("underscore");
let {Item} = Timeline
  type Props = {};
  
  const MemberOrdinationGrid = observer((props: Props) => {
    const ChangeRequestStore = useContext(changeRequestStoreCtx);
    const PlatformStore = useContext(platformStoreCtx);
    const MemberOrdinationStore = useContext(memberOrdinationStoreCtx);
    
  
    const grid = useRef<AgGridReact>(null);
    const rowSelected = (grid: any) => {
      const selrow = grid.api.getSelectedNodes()[0];
  
      if (selrow) {
        MemberOrdinationStore.selectedOrdination = selrow.data as IOrdinationView
      } else {
        MemberOrdinationStore.selectedOrdination = {} as IOrdinationView
      }
    };
    useEffect(() => {
      async function getData() {
        await MemberOrdinationStore.getOrdination(getCurrentUser().id)
        await  PlatformStore.getAllRank()
      }
      getData();
      return () => {};
    }, []);
  
    const gridcolumnDefs = {
      columnDefs: [
        {
          rowDrag: true,
          valueGetter: function (params: any) {
            return Number(params.node.id) + 1;
          },
          width: 100,
          sortable: true,
          resizable: true,
          checkboxSelection: true,
        },
        {
          headerName: "Rank Name",
          field: "rankName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
       
        },
        {
          headerName: "Ordination Year",
          field: "year",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
        },
        {
          headerName: "NextRank",
          field: "nextRank",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
        },
      ],
    };
    return (
      <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
                  <SubPageHeaderTitle
                  count={[...MemberOrdinationStore.ordinations.values()].filter((value: IOrdinationView)=> value.rankName !== "NULL" &&value.nextRank !== "NULL").length}
                  title={"Member Ordinations "}
                  />
              </div>
              <div
                className="ms-Grid-col ms-sm12 ms-md4 ms-lg4"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                    <Button
                      type="primary"
                      shape="round"
                      onClick={()=>{
                        MemberOrdinationStore.showAddDialog= true;
                      }}
                    >
                      <Space>
                        Add New Ordination
                        <PlusOutlined />
                      </Space>
                    </Button>

              </div>
            </div>
  
            {MemberOrdinationStore.ordinations.size < 1?(
                <EmptyOrdination/>
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
                                MemberOrdinationStore.getOrdination(getCurrentUser().id)
                            },
                            },
                       
                            {
                                key: "edit",
                                text: "Edit Ordination",
                                onRenderIcon: () => <Edit3 className="qicon" />,
                                disabled: _.isUndefined(
                                    MemberOrdinationStore.selectedOrdination.ordinationId
                                
                                ),
                                onClick: () => {
                                    MemberOrdinationStore.showEditDialog = true;
                                    PlatformStore.getAllRank();
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
                        <MessageBar messageBarType={MessageBarType.warning}>
                        <b style={{color:"#d92525"}}>Note</b>: <span>Your current rank history is the first row in this grid.</span>
                      </MessageBar>
                      </div>
                    </div>
                 
                    <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
                        {MemberOrdinationStore.isLoading  ? (
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
                                    rowData={[...MemberOrdinationStore.ordinations.values()].filter((value: IOrdinationView)=> value.rankName !== "NULL" &&value.nextRank !== "NULL").map((row) => toJS(row))}
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
        <OrdinationEditDialog/>
        <AddOrdinationDialog/>
      </div>
    );
  });


  const EmptyOrdination = () => {
    const ProfileStore = useContext(profileStoreCtx);
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
            <h2>Your Ordination Progression is Not Yet Uploaded.</h2>
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
            <p>Contact the church authorities or you can easily <Link
                        onClick={() => {
                            ProfileStore.setShowFeedbackDialog();
                        }}
                        >
                        <b>click hear </b>
                      </Link>{" "} to send a feedback</p>
            </div>
        </div>
      </div>
    );
  };
  
  export default MemberOrdinationGrid;
  