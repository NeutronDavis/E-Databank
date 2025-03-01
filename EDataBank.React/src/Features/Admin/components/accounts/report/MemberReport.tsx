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
  const masterPageStoreCtx = createContext(MasterPageStore);
  const _ = require("underscore");
  const adminStoreCtx = createContext<typeof AdminStore>(AdminStore);
  const platformStoreCtx = createContext(platformStore);
  type Props = {};
  
  const MemberReport = (props: Props) => {
    const adminStore = useContext(adminStoreCtx);
    const PlatformStore = useContext(platformStoreCtx);
    let [actionTittle,setActionTittle] = useState<string | undefined>("Disable Account")
  
    const grid = useRef<AgGridReact>(null);
    const rowSelected = (grid: any) => {
      const selrow = grid.api.getSelectedNodes()[0];
  
      if (selrow) {
        adminStore.userAccount.disableToolbar = false;
      } else {
        adminStore.userAccount.disableToolbar = true;
      }
      
      if(selrow.data.isAccountLocked){
        setActionTittle("Enable Account")
      }else{
        setActionTittle("Disable Account")
      }
    };
    // useEffect(() => {
    //   // async function getAllUsers() {
    //   //   await adminStore.getAllUsers();
    //   // }
    //   // getAllUsers();
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
            const { lastName,otherName } = props.data;
            return (
              <div>
                <Persona
                  text={`${lastName} ${otherName}`}
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
          headerName: "OtherName",
          field: "otherName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 250,
        },
        {
          headerName: "LastName",
          field: "lastName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Phone",
          field: "phoneNumber",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Email",
          field: "email",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Gender",
          field: "gender",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
          pinned:true,
        },
        {
          headerName: "Date of birth",
          field: "dateOfBirth",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
         
        },
        {
          headerName: "Rank",
          field: "rankName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Principal Band",
          field: "principalBandName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Band",
          field: "bandName",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
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
          headerName: "Marital Status",
          field: "maritalStatus",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Marital Date",
          field: "yearOfMarriage",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Rank Of Spouse",
          field: "rankOfSpouse",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Number Of Children",
          field: "noOfChildren",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Nationality1",
          field: "nationality1",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Nationality2",
          field: "nationality2",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Address",
          field: "address",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Qualification",
          field: "qualification",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Occupation",
          field: "occupation",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Profession",
          field: "profession",
          sortable: true,
          resizable: true,
          filter: true,
          width: 150,
        },
        {
          headerName: "Current/Previous Position Held In Church",
          field: "cppInChurch",
          sortable: true,
          resizable: true,
          filter: true,
          width: 550,
        },
      ],
    };
    return (
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
            <SubPageHeaderTitle
              count={adminStore.memberReportData.size}
              title={"Members Report"}
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
                  disabled: _.isUndefined(AdminStore.branchValueForRefresh),
                  onRenderIcon: () => <ReloadOutlined className="qicon" />,
                  onClick: (
                    ev?:
                      | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                      | React.KeyboardEvent<HTMLElement>
                      | undefined,
                    item?: IContextualMenuItem | undefined
                  ) => {
                    AdminStore.memberReport(Number(AdminStore.branchValueForRefresh),AdminStore.genderValueForRefresh);
                  },
                },
  
                {
                    key: 'gen',
                    text: `Generate Member Report`,
                    name: 'New',
                    onRenderIcon: () => <SettingOutlined className="qicon" />,
                    onClick: (
                        ev?:
                            | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                            | React.KeyboardEvent<HTMLElement>
                            | undefined,
                        item?: IContextualMenuItem | undefined
                    ) => {
                      AdminStore.queryData = {} as IQueryData
                      AdminStore.genderValue = "";
                        AdminStore.openQueryReportDialog = true;
                    }
                },
                {
                    key: 'pdf',
                    text: `Download Member Report`,
                    name: 'New',
                    disabled:true,
                    // disabled: AdminStore.memberReportData.size > 0?false:true,
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
        {AdminStore.memberReportData.size > 0 && (
        <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
          <div className="ms-Grid-col ms-sm12">
            <MessageBar messageBarType={MessageBarType.warning}>
              <b style={{color:"#d92525"}}>Note</b>:This report is generated from <b>{AdminStore.selectedGender}</b> member information in the <b>{AdminStore.selectedBranch}</b> Branch, at <b>{AdminStore.selectedDistrict}</b> District in <b>{AdminStore.selectedProvince}</b> Province, which is in CMC <b>{AdminStore.selectedCmc}</b>.
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
                  rowData={[...adminStore.memberReportData.values()].map((row) => toJS(row))}
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
        <QueryDialog/>
      </div>
    );
  };
  
  export default observer(MemberReport);
  