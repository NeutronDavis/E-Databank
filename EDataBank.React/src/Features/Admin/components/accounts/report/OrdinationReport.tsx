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
  ProgressIndicator,
  SearchBox,
} from "@fluentui/react";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { SubPageHeaderTitle } from "../../../../../shared/SubPageHeaderTitle";
import Moment from "react-moment";
import { Observer, observer } from "mobx-react-lite";

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
import OrdinationProgressionQueryDialog from "./OrdinationProgressionQueryDialog";
const masterPageStoreCtx = createContext(MasterPageStore);
const _ = require("underscore");
const adminStoreCtx = createContext<typeof AdminStore>(AdminStore);
const platformStoreCtx = createContext(platformStore);
type Props = {};

const OrdinationReport = (props: Props) => {
  const adminStore = useContext(adminStoreCtx);
  const PlatformStore = useContext(platformStoreCtx);
  let [actionTittle, setActionTittle] = useState<string | undefined>("Disable Account")

  const grid = useRef<AgGridReact>(null);
  const rowSelected = (grid: any) => {
    const selrow = grid.api.getSelectedNodes()[0];

    if (selrow) {
      adminStore.userAccount.disableToolbar = false;
    } else {
      adminStore.userAccount.disableToolbar = true;
    }

    if (selrow.data.isAccountLocked) {
      setActionTittle("Enable Account")
    } else {
      setActionTittle("Disable Account")
    }
  };
  // useEffect(() => {
  //   // async function getAllUsers() {
  //   //   await adminStore.getAllUsers();
  //   // }
  //   // getAllUsers();
  //   // return () => {};
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
        pinned: true,
        cellRendererFramework: function (props: any) {
          const { fullName } = props.data;
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
        width: 100,
        pinned: true,
      },
      {
        headerName: "Branch",
        field: "branchName",
        sortable: true,
        resizable: true,
        filter: true,
        width: 150,
        pinned: true,
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
        headerName: "Year",
        field: "rankYear",
        sortable: true,
        resizable: true,
        filter: true,
        width: 150,
      },
      {
        headerName: "NextRank",
        field: "nextRank",
        sortable: true,
        resizable: true,
        filter: true,
        width: 150,
      },
      {
        headerName: "NextRankYear",
        field: "nextRankYear",
        sortable: true,
        resizable: true,
        filter: true,
        width: 150,

      },
      {
        headerName: "YearsFromNow",
        field: "yearsFromNow",
        sortable: true,
        resizable: true,
        filter: true,
        width: 150,
      },
      {
        headerName: "Description",
        field: "description",
        sortable: true,
        resizable: true,
        filter: true,
        width: 150,
      },
    ],
  };
  const getForRefreshOrdinationProgressionReport = async () => {
    try {
      await adminStore.getOrdinationProgressionReport(adminStore.provinceVal, adminStore.branchVal, adminStore.rankVal, adminStore.yearVal)
    } catch (error: any) {
      // console.log("report error",error?.response?.body)
      //   console.log("report error",error)
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
  }
  const downloadOrdinationProgressionReport = async () => {
    try {
      await adminStore.downloadOrdinationProgressionReport(adminStore.provinceVal, adminStore.branchVal, adminStore.rankVal, adminStore.yearVal)
    } catch (error: any) {
      //convert the blob to text so that you can extract the error message sent from the server
      // note this only happens when the agent responseType("blob")
      let texError = await error?.response?.body.text();
      let jsError = JSON.parse(texError);
      if (jsError.errorType == 'timeOut') {
        notification.warning({
          message: "EDataBank Platform Feedback ",
          description: jsError.msg,
        });

      } else {
        notification.error({
          message: "EDataBank Platform Feedback ",
          description: "error occurred:" + jsError.msg,
        });
      }
    }
  }
  return (
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
          <SubPageHeaderTitle
            count={adminStore.ordinationProgression.size}
            title={"Members Ordination Recommendation Report"}
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
                disabled: (AdminStore.branchVal == 0 && AdminStore.provinceVal == 0 && AdminStore.yearVal == 0),
                onRenderIcon: () => <ReloadOutlined className="qicon" />,
                onClick: (
                  ev?:
                    | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                    | React.KeyboardEvent<HTMLElement>
                    | undefined,
                  item?: IContextualMenuItem | undefined
                ) => {
                  getForRefreshOrdinationProgressionReport();
                },
              },

              {
                key: 'gen',
                text: `Generate Ordination Recommendation Report`,
                name: 'New',
                onRenderIcon: () => <SettingOutlined className="qicon" />,
                onClick: (
                  ev?:
                    | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                    | React.KeyboardEvent<HTMLElement>
                    | undefined,
                  item?: IContextualMenuItem | undefined
                ) => {
                  AdminStore.openOrdinationProgressionReportDialog = true
                }
              },
              {
                key: 'pdf',
                text: `Download Ordination Recommendation Report`,
                name: 'New',
                //disabled: (AdminStore.branchVal == 0 && AdminStore.provinceVal == 0 && AdminStore.yearVal == 0 ),
                disabled: AdminStore.ordinationProgression.size > 0 ? false : true,
                onRenderIcon: () => <FilePdfOutlined className="qicon" />,
                onClick: (
                  ev?:
                    | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                    | React.KeyboardEvent<HTMLElement>
                    | undefined,
                  item?: IContextualMenuItem | undefined
                ) => {
                  downloadOrdinationProgressionReport();
                }
              },

              {
                key: "spacer1",
                onRender: () => <div style={{ width: "10px" }} />,
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
              // {
              //   key: "spacer1",
              //   onRender: () => <div style={{ width: "100px" }} />,
              // },

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

      <Observer>
        {() => (
          <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
            {AdminStore.isLoadingGeneralReport ? (
              <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </>
            ) : (
              <div className="ms-Grid-col ms-sm12">
                {AdminStore.isDownloading && <ProgressIndicator
                  description={`Please Wait While we generate this report...`}
                  styles={{ root: { textAlign: "center" } }}
                ></ProgressIndicator>}
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
                    rowData={[...AdminStore.ordinationProgression.values()].map((row) => toJS(row))}
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

        )}
      </Observer>
      <OrdinationProgressionQueryDialog />
    </div>
  );
};

export default observer(OrdinationReport);
