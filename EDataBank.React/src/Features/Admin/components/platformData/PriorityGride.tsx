import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    FileExcelOutlined,
    KeyOutlined,
    LockOutlined,
    ReloadOutlined,
  } from "@ant-design/icons";
  import {
    CommandBar,
    IContextualMenuItem,

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
  import { Button, notification, Skeleton } from "antd";
  import AdminStore from "../../store/adminstore";
  import "../../styles/useraccounts.css";
  import { masterPageStore as MasterPageStore } from "../../../MasterPage/store/MasterPageStore";
  
  import confirm from "antd/lib/modal/confirm";
  import { remove, toJS } from "mobx";
//   import { createSecureContext } from "tls";
  import { platformStore } from "../../store/platformStore";
import { Edit3, Plus, Trash2 } from "react-feather";
import { ICathedral, IPriority } from "../../types/interface";
import AddCathedral from "./dialog/AddCathedral";
import AddPriority from "./dialog/AddPriority";
//   import MemberRegistrationDialog from "./dialog/MemberRegistrationDialog";
  const masterPageStoreCtx = createContext(MasterPageStore);
  const _ = require("underscore");
  const adminStoreCtx = createContext<typeof AdminStore>(AdminStore);
  const platformStoreCtx = createContext(platformStore);
  type Props = {};
  
  const PriorityGride = observer((props: Props) => {
    const adminStore = useContext(adminStoreCtx);
    const PlatformStore = useContext(platformStoreCtx);
    let [actionTittle,setActionTittle] = useState<string | undefined>("Disable Account")
  
    const grid = useRef<AgGridReact>(null);
    const rowSelected = (grid: any) => {
      const selrow = grid.api.getSelectedNodes()[0];
  
      if (selrow) {
        PlatformStore.priority = selrow.data
        adminStore.editMode = true;
      } else {
        PlatformStore.priority = {} as IPriority
        adminStore.editMode = false;
   
      }
      
    };

  
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
          headerName: "Hierarchy Name",
          field: "priorityName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
       
        },
        {
          headerName: "Hierarchy Level",
          field: "priorityLevel",
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
              count={PlatformStore.prioritys.size}
              title={"Hierarchy "}
            />
          </div>
          {/* <div
            className="ms-Grid-col ms-sm12 ms-md4 ms-lg4"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="primary"
              shape="round"
              onClick={async() => {
                await PlatformStore.getAllBand()
                await PlatformStore.getAllBranch()
                await PlatformStore.getAllPrincipalBand()
                await PlatformStore.getAllProfession()
                await PlatformStore.getAllQualification()
                await PlatformStore.getAllRank()
                AdminStore.showMemberRegistrationDialog = true;
              }}
            >
              Add New Member
            </Button>
          </div> */}
        </div>
  
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
                    PlatformStore.getAllPriority();
                  },
                },
  
                {
                    key: "add",
                    text: "Add Hierarchy",
                    onRenderIcon: () => <Plus className="qicon" />,
                    disabled:adminStore.editMode,
                    onClick: (
                      ev?:
                        | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                        | React.KeyboardEvent<HTMLElement>
                        | undefined,
                      item?: IContextualMenuItem | undefined
                    ) => {
                        adminStore.editMode = false;
                        PlatformStore.priority = {} as IPriority
                        adminStore.showPriorityAddDialog = true;
                    },
                  },
                  {
                    key: "edit",
                    text: "Edit Hierarchy",
                    onRenderIcon: () => <Edit3 className="qicon" />,
                    disabled: _.isUndefined(
                        PlatformStore.priority.priorityId
                    ),
                    onClick: () => {
                        adminStore.showPriorityAddDialog = true;
                    },
                  },
                  {
                    key: "delete",
                    text: "Remove Priority",
                    onRenderIcon: () => <Trash2 className="qicon" />,
                    disabled: _.isUndefined(
                      PlatformStore.priority.priorityId
                    ),
                    onClick: () => {
                      let priority = PlatformStore.priority;
                      confirm({
                        title: `Confirm  ${priority.priorityName}  Hierarchy`,
                        content: `${priority.priorityName} Hierarchy will be remove from this list`,
                        okText: "Yes",
                        okType: "danger",
                        cancelText: "No",
                        onOk: async () => {
                          try {
                            await PlatformStore.removePriority(priority.priorityId)
                            notification.success({
                              message: "EDataBank Platform Feedback",
                              description: `${priority.priorityName} removed successfully`,
                            });
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
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
          {PlatformStore.isLoading ? (
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
                  rowData={[...PlatformStore.prioritys.values()].map((row) => toJS(row))}
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
        <AddPriority/>
      </div>
    );
  });
  
  export default PriorityGride;
  