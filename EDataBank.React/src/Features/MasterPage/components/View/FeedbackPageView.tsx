import { useContext, createContext, useEffect, useRef } from "react";
import {
  Badge,
  Divider,
  Modal,
  notification,
  Skeleton,
  Tooltip,
} from "antd";
import "../../styles/mastepagecontainer.css";
import {
  FileExcelOutlined,
  ReloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { feedbackPageStore } from "../../store/FeedbackPageStore";
import { observer } from "mobx-react-lite";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import FeedbackModelView from "../View/FeedbackModelView";
import { CommandBar, Link, SearchBox } from "@fluentui/react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Meta from "antd/lib/card/Meta";
import "../../styles/grid.css";
import { BookOpen, CheckCircle, Database } from "react-feather";
// import AdminStore from "../../../Admin/store/adminstore";
const feedbackPageStoreCtx = createContext(feedbackPageStore);
// const adminStoreCtx = createContext<typeof AdminStore>(AdminStore);
const FeedbackPageView = observer(() => {
  const FeedbackPageStore = useContext(feedbackPageStoreCtx);
  // const adminStore = useContext(adminStoreCtx);
  const grid = useRef<AgGridReact>(null);

  const rowSelected = (grid: any) => {
      const selrow = grid.api.getSelectedNodes()[0];

      // if (selrow) {
      //  adminStore.userAccount.disableToolbar = false;
      // } else {
      //     adminStore.userAccount.disableToolbar = true;
      // }
  };
  useEffect(() => {
    async function getInitialdata() {
      try {
        FeedbackPageStore.isLoading = true;
        const data = await FeedbackPageStore.getProfile();
      } catch (error: any) {
        if (!error.response) {
          notification.error({
            key: "error",
            message: "EDataBank Feedback",
            description:
              "EDataBank API Server is not reachable, please contact EDataBank support",
            placement: "topLeft",
          });
        } else {
          notification.error({
            key: "error",
            message: "EDataBank Feedback",
            description: error.message,
            placement: "topLeft",
          });
        }
      } finally {
        FeedbackPageStore.isLoading = false;
      }
    }
    getInitialdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const MyRTag = (props: any) => {
    return (
      <>
        {/* <Tag color="volcano" title="OPEN">
          OPEN
        </Tag> */}
        <Tooltip title="Open">
            <Badge
              color="volcano"
              size="default"
              className="request-badge"
              style={{ fontSize: "16px" }}
            />
        </Tooltip>
      </>
    );
  };
  const MyYTag = (props: any) => {
    return (
      <>
        {/* <Tag color="yellow" title="IN PROGRESS">
          IN PROGRESS
        </Tag> */}
        <Tooltip title="In Progress">
            <Badge
              color="yellow"
              size="default"
              className="request-badge"
              style={{ fontSize: "16px" }}
            />
        </Tooltip>
      </>
    );
  };
  const MyGTag = (props: any) => {
    return (
      <>
        {/* <Tag color="green" title="CLOSE">
          CLOSE
        </Tag> */}
        <Tooltip title="Close">
            <Badge
              color="green"
              size="default"
              className="request-badge"
              style={{ fontSize: "16px" }}
            />
        </Tooltip>
      </>
    );
  };
  const Attachment = (props: any) => {
    return (
      <>
        <Link
          download={
            "File." +
            props.feedbackAttachment.slice(
              props.feedbackAttachment.indexOf(";") + 1,
              props.feedbackAttachment.indexOf(";")
            )
          }
          href={props.feedbackAttachment}
        >
          download attachment
        </Link>
      </>
    );
  };

  const columnDefs = [
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
    { headerName: "Email", field: "userEmail", filter: true, width: 220 },
    {
      headerName: "FeedbackText",
      field: "feedbackText",
      filter: true,
      width: 220,
    },
    {
      headerName: "Attachment",
      // field:"feedbackAttachment",
      cellRenderer: (e: any) => {
        return e.data.feedbackAttachment != null
          ? Attachment({ feedbackAttachment: e.data.feedbackAttachment })
          : "";
      },
    },
    
    {
      headerName: "Status",
      field: "feedbackStatus",
      filter: true,
      cellRendererSelector: (e: any) => {
        const type = e.data.feedbackStatus;

        if (type === 1) {
          return {
            component: MyRTag,
          };
        } else if (type === 2) {
          return {
            component: MyYTag,
          };
        } else if (type === 3) {
          return {
            component: MyGTag,
          };
        }
      },
      width: 130,
    },
    {
      headerName: "Category",
      field: "feedbackCategory",
      filter: true,
      width: 170,
    },

    {
      headerName: "Action Taken",
      field: "feedbackActionTaken",
      filter: true,
      width: 220,
    },
    {
      headerName: "Open Date",
      field: "feedbackOpenDate",
      width: 160,
      valueGetter: (d: any) => {
        let dd = new Date(d.data.feedbackOpenDate).toDateString();
        return dd;
      },
    },
    {
      headerName: "StatusChange Date",
      field: "feedbackStatusChangeDate",
      width: 160,
      valueGetter: (d: any) => {
        let dd = new Date(d.data.feedbackStatusChangeDate).toDateString();
        return dd;
      },
    },
    {
      field: "Duration",
      valueGetter: (p: any) => {
        var start = moment(new Date(p.data.feedbackOpenDate));
        var end = moment(new Date(p.data.feedbackStatusChangeDate));

        let ans = "";
        let da = end.diff(start, "days");
        let wek = end.diff(start, "week");
        let mn = end.diff(start, "month");
        let yea = end.diff(start, "year");
        if (da <= 7 && wek < 1) {
          ans = da <= 1 ? `${da} day` : `${da} days`;
        } else if (da > 7 && wek <= 4) {
          ans = wek <= 1 ? `${wek} week` : `${wek} weeks`;
        } else if (wek > 4 && mn <= 12) {
          ans = mn <= 1 ? `${mn} month` : `${mn} months`;
        } else if (mn > 12 && yea >= 1) {
          ans = yea <= 1 ? `${yea} year` : `${yea} years`;
        }
        return ans;
      },
      width: 120,
    },
  ];

  return (
    <div>
      <Modal
        title="Feedback Action"
        open={FeedbackPageStore.showFeedbackModel}
        onCancel={() => FeedbackPageStore.setFeedbackModel()}
        footer={null}
      >
        <div style={{ padding: "24px" }}>
          <FeedbackModelView />
        </div>
      </Modal>

      <Divider orientation="left">
        <h3 style={{ padding: "5px", color: "#0e76bc" }}>Feedback</h3>
      </Divider>

      <div className="cards">
        <div className="card">
          <Meta
            avatar={<BookOpen style={{ color: "red" }} size={50} />}
            title={<h1 style={{ color: "red" }}>OPEN</h1>}
            description={
              <span className="feedback-dashboard-value">
                {FeedbackPageStore.setFeedbackChatData()[0].value}
              </span>
            }
          />
        </div>
        <div className="card">
          <Meta
            avatar={<Database style={{ color: "#c7c739" }} size={50} />}
            title={<h1 style={{ color: "#c7c739" }}>IN PROGRESS</h1>}
            description={
              <span className="feedback-dashboard-value">
                {FeedbackPageStore.setFeedbackChatData()[1].value}
              </span>
            }
          />
        </div>
        <div className="card">
          <Meta
            avatar={<CheckCircle style={{ color: "green" }} size={60} />}
            title={<h1 style={{ color: "green" }}>CLOSE</h1>}
            description={
              <span className="feedback-dashboard-value">
                {FeedbackPageStore.setFeedbackChatData()[2].value}
              </span>
            }
          />
        </div>
      </div>

      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 commandbar">
          <CommandBar
            style={{
              paddingTop: "20px",
              // paddingLeft: "20px",
              // paddingRight: "25px",
            }}
            items={[
              {
                key: "refresh",
                text: "Refresh",
                name: "New",
                onRenderIcon: () => <ReloadOutlined style={{ color: "red" }} />,

                onClick: () => {
                  FeedbackPageStore.getProfile();
                },
              },

              {
                key: "edit",
                text: "Edit",
                name: "edit",
                
                onRenderIcon: () =>  <EditOutlined className="qicon" />,
                // disabled: adminStore.userAccount.disableToolbar,
                onClick: () =>{
                  const selData:any = grid?.current?.api.getSelectedNodes()[0];
                  FeedbackPageStore.updateFeedbackId(selData.data.feedbackId);
                  FeedbackPageStore.setFeedbackModel();
                  FeedbackPageStore.setSingleFeedback();
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
                onRenderIcon: () => (
                  <FileExcelOutlined style={{ color: "red" }} />
                ),

                onClick: () => {
                  grid?.current?.api?.exportDataAsExcel({
                    author: "EDataBank",
                    sheetName: "EDataBank_Feedback",
                  });
                },
              },
            ]}
          />
        </div>
      </div>
      <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
        {FeedbackPageStore.isLoading1 ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <div className="ms-Grid-col ms-sm12">
            {" "}
            <div style={{ width: "100%", height: "100%" }}>
              <div
                style={{
                  height: "60vh",
                  width: "100%",
                  border: "none",
                  margin: "auto",

                  minHeight: "60vh",
                  maxHeight: "84vh",
                }}
                className="ag-theme-balham"
                // className="ag-theme-alpine"
              >
                <AgGridReact
                  ref={grid}
                  rowData={FeedbackPageStore.feedbackData}
                  columnDefs={columnDefs}
                  defaultColDef={{ resizable: true }}
                  copyHeadersToClipboard={true}
                  overlayLoadingTemplate={`${(
                    <span className="ag-overlay-loading-center">
                      Please wait while your rows are loading
                    </span>
                  )}`}
                  statusBar={{
                    statusPanels: [
                      {
                        statusPanel: "agTotalRowCountComponent",
                        align: "center",
                      },
                    ],
                  }}
                  pagination={true}
                  animateRows={true}
                  rowSelection="single"
                  onSelectionChanged={rowSelected}
                ></AgGridReact>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default FeedbackPageView;
