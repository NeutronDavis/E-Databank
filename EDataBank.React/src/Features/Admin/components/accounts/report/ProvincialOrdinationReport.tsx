import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    KeyOutlined,
    LockOutlined,
    ReloadOutlined,
    UploadOutlined,
    SettingOutlined
  } from "@ant-design/icons";
  import {
    CommandBar,
    IContextualMenuItem,
    MessageBar,
    MessageBarType,
    Persona,
    PersonaSize,
    PrimaryButton,
    SearchBox,
  } from "@fluentui/react";
  import React, { createContext, useContext, useEffect, useRef, useState } from "react";
  import { SubPageHeaderTitle } from "../../../../../shared/SubPageHeaderTitle";
  import Moment from "react-moment";
  import { observer } from "mobx-react-lite";
  
  import { AgGridReact } from "ag-grid-react/lib/agGridReact";
  import "ag-grid-community/dist/styles/ag-grid.css";
  import "ag-grid-community/dist/styles/ag-theme-balham.css";
  import "ag-grid-enterprise";
  import { Button, notification, Skeleton } from "antd";
  import AdminStore from "../../../store/adminstore";
  import "../../../styles/useraccounts.css";
  import { masterPageStore as MasterPageStore } from "../../../../MasterPage/store/MasterPageStore";
  
  import confirm from "antd/lib/modal/confirm";
  import { toJS } from "mobx";
  import { createSecureContext } from "tls";
  import { platformStore } from "../../../store/platformStore";
 
  import { IBranch, IQueryData } from "../../../types/interface";
import QueryDialog from "./QueryDialog";
import moment from "moment";
import OrdinationQueryDialog from "./OrdinationQueryDialog";
// import ProvincialOrdinationQueryDialog from "./OrdinationProgressionQueryDialog";
  const masterPageStoreCtx = createContext(MasterPageStore);
  const _ = require("underscore");
  const adminStoreCtx = createContext<typeof AdminStore>(AdminStore);
  const platformStoreCtx = createContext(platformStore);
  type Props = {};
  
  const ProvincialOrdinationReport = (props: Props) => {
    const adminStore = useContext(adminStoreCtx);
    const PlatformStore = useContext(platformStoreCtx);
    let [actionTittle,setActionTittle] = useState<string | undefined>("Disable Account")
  
    const grid = useRef<AgGridReact>(null);
    const rowSelected = (grid: any) => {
      const selrow = grid.api.getSelectedNodes()[0];
  
      if (selrow) {
        // adminStore.userAccount.disableToolbar = false;
      } else {
        // adminStore.userAccount.disableToolbar = true;
      }
      
      if(selrow.data.isAccountLocked){
        setActionTittle("Enable Account")
      }else{
        setActionTittle("Disable Account")
      }
    };
    // useEffect(() => {
    //   async function getAllUsers() {
    //     // await adminStore.getAllUsers();
    //   }
    //   getAllUsers();
    //   return () => {};
    // }, []);
  
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
          headerName: "Full Name",
          field: "fullName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
          pinned:true,
          cellRendererFramework: function (props: any) {
            const { fullName} = props.data;
            return (
              <div>
                <Persona
                  text={`${fullName}`}
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
          width: 250,
          pinned:true,
        },
        {
          headerName: "Branch",
          field: "branchName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Rank1",
          field: "rank1",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year1",
          field: "year1",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Rank2",
          field: "rank2",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year2",
          field: "year2",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
         
        },
        {
          headerName: "Rank3",
          field: "rank3",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year3",
          field: "year3",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Rank4",
          field: "rank4",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year4",
          field: "year4",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Rank5",
          field: "rank5",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year5",
          field: "year5",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Rank6",
          field: "rank6",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year6",
          field: "year6",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Rank7",
          field: "rank7",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year7",
          field: "year7",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Rank8",
          field: "rank8",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year8",
          field: "year8",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Rank9",
          field: "rank9",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year9",
          field: "year9",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
  
        {
          headerName: "Rank10",
          field: "rank10",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year10",
          field: "year10",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
  
        {
          headerName: "Rank11",
          field: "rank11",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year11",
          field: "year11",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
  
        {
          headerName: "Rank12",
          field: "rank12",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year12",
          field: "year12",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
  
        {
          headerName: "Rank13",
          field: "rank13",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year13",
          field: "year13",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
  
        {
          headerName: "Rank14",
          field: "rank14",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year14",
          field: "year14",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
  
        {
          headerName: "Rank15",
          field: "rank15",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year15",
          field: "year15",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
  
        {
          headerName: "Rank16",
          field: "rank16",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Year16",
          field: "year16",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
  
      ],
    };
    return (
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
            <SubPageHeaderTitle
              count={adminStore.ordinationReportData.size}
              title={"Members Ordination Report"}
            />
          </div>
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
                  disabled: _.isUndefined(AdminStore.branchOrdinationValueForRefresh),
                  onRenderIcon: () => <ReloadOutlined className="qicon" />,
                  onClick: (
                    ev?:
                      | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                      | React.KeyboardEvent<HTMLElement>
                      | undefined,
                    item?: IContextualMenuItem | undefined
                  ) => {
                    AdminStore.ordinationReport(Number(AdminStore.provinceOrdinationValueForRefresh),AdminStore.genderOrdinationValueForRefresh);
                  },
                },
  
                {
                    key: 'gen',
                    text: `Generate Members Ordination Report`,
                    name: 'New',
                    onRenderIcon: () => <SettingOutlined className="qicon" />,
                    onClick: (
                        ev?:
                            | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                            | React.KeyboardEvent<HTMLElement>
                            | undefined,
                        item?: IContextualMenuItem | undefined
                    ) => {
                      AdminStore.ordinationQueryData = {} as IQueryData
                      AdminStore.genderOrdinationValue = "";
                        AdminStore.openProvincialOrdinationQueryReportDialog = true;
                    }
                },
                {
                    key: 'pdf',
                    text: `Download Member Ordination Report`,
                    name: 'New',
                    disabled: true,
                    // disabled: AdminStore.ordinationReportData.size > 0?false:true,
                    onRenderIcon: () => <FilePdfOutlined className="qicon" />,
                    onClick: (
                        ev?:
                            | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                            | React.KeyboardEvent<HTMLElement>
                            | undefined,
                        item?: IContextualMenuItem | undefined
                    ) => {
                        
                        // AppointmentStore.showAppointmentDownloadDialog=true;
                    }
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
        {AdminStore.ordinationReportData.size > 0 && (
        <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
          <div className="ms-Grid-col ms-sm12">
            <MessageBar messageBarType={MessageBarType.warning}>
              <b style={{color:"#d92525"}}>Note</b>: This ordination report is generated from <b>{AdminStore.selectedGender}</b> member information in <b>{AdminStore.selectedProvince}</b> Province at CMC <b>{AdminStore.selectedCmc}</b>.
            </MessageBar>
          </div>
        </div>
        )}
        <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
          {adminStore.isLoadingReport ? (
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
                  rowData={[...adminStore.ordinationReportData.values()].map((row) => toJS(row))}
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
        {/* <ProvincialOrdinationQueryDialog/> */}
      </div>
    );
  };
  
  export default observer(ProvincialOrdinationReport);
  