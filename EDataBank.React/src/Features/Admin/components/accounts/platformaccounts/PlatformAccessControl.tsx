import {
  CheckOutlined,
  CloseOutlined,
  DownOutlined,
  SearchOutlined,
  UploadOutlined,
  FormOutlined
} from "@ant-design/icons";
import {
  CommandBar,
  IContextualMenuItem,
  Persona,
  PersonaSize,
  PrimaryButton,
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
import { Button, Dropdown, Menu, notification, Select, Skeleton, Space, Typography } from "antd";
import AdminStore from "../../../store/adminstore";
import "../../../styles/useraccounts.css";
import { masterPageStore as MasterPageStore } from "../../../../MasterPage/store/MasterPageStore";

import confirm from "antd/lib/modal/confirm";
import { toJS } from "mobx";
import { createSecureContext } from "tls";
import { platformStore } from "../../../store/platformStore";
import MemberRegistrationDialog from "./dialog/MemberRegistrationDialog";
import MemberUploadPanel from "./dialog/MemberUploadPanel";
import { IBranch } from "../../../types/interface";
import { IProfileView } from "../../../../Profile/types/interface";
import MemberInfo from "./MemberInfo";
import svg from "./img/search.svg"
import UpdateOrdinationFromAdmin from "./dialog/UpdateOrdinationFromAdmin";
const masterPageStoreCtx = createContext(MasterPageStore);
const _ = require("underscore");
const adminStoreCtx = createContext<typeof AdminStore>(AdminStore);
const platformStoreCtx = createContext(platformStore);
const { Option } = Select;
const { Text } = Typography;
type Props = {};
const UserGrid = (props: Props) => {
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
  useEffect(() => {
    async function getAllUsers() {
      await adminStore.getAllUsers();
    }
    getAllUsers();
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
        headerName: "Name",
        field: "fullName",
        sortable: true,
        resizable: true,
        filter: true,
        width: 250,
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
        headerName: "Email",
        field: "email",
        sortable: true,
        resizable: true,
        filter: true,
        width: 250,
      },
      {
        headerName: "Status",
        field: "isAccountLocked",
        sortable: true,
        resizable: true,
        filter: true,
        width: 180,
        cellRendererFramework: function (props: any) {
          const { isAccountLocked } = props.data;
          return !isAccountLocked ? (
            <CheckOutlined
              className="qicon"
              style={{ color: "green" }}
              title={`${props.data.fullName}  can access the system`}
            />
          ) : (
            <CloseOutlined
              className="qicon"
              style={{ color: "red" }}
              title={`${props.data.fullName}  has been locked out of the system`}
            />
          );
        },
      },
      {
        headerName: "Mobile",
        field: "phone",
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
        headerName: "Occupation",
        field: "occupation",
        sortable: true,
        resizable: true,
        filter: true,
        width: 150,
      },

      {
        headerName: "Account Audit",
        children: [
          {
            headerName: "Last Logged-on",
            field: "lastAccessDate",
            sortable: true,
            resizable: true,

            width: 230,
            filter: true,
            cellRendererFramework: function (props: any) {
              const { lastAccessDate } = props.data;
              return (
                <span title={lastAccessDate}>
                  {" "}
                  {lastAccessDate && <Moment fromNow>{lastAccessDate}</Moment>}
                </span>
              );
            },
          },
          {
            headerName: "Registered On",
            field: "createdOn",
            sortable: true,
            resizable: true,
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
            width: 120,
          },
        ],
      },
    ],
  };

  const menuHeaderDropdown = (
    <Menu /* onClick={onMenuClick} */ style={{ width: "180px" }}>

      <Menu.Item 
        key="register" 
        onClick={async()=>{
          await PlatformStore.getAllBand();
          await PlatformStore.getAllBranch();
          await PlatformStore.getAllPrincipalBand();
          await PlatformStore.getAllProfession();
          await PlatformStore.getAllQualification();
          await PlatformStore.getAllRank();
          await PlatformStore.getAllNationality();
          AdminStore.showMemberRegistrationDialog = true;
        }}>
        <FormOutlined /> &nbsp;
        <Text>Member Registration</Text>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item
        key="upload"
        onClick={async() => {  
          PlatformStore.getAllBranch()
          AdminStore.openUploadPanel = true;
          PlatformStore.branchFilterString = "";
          AdminStore.selectedBranchForUpload = {} as IBranch;
          AdminStore.selectedUploadPivotKey = "1";
        }}
      >
        <UploadOutlined /> &nbsp;<Text>Upload Members</Text>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md3 ms-lg3">
          {/* <SubPageHeaderTitle
            count={adminStore.users.size}
            title={"Platform Accounts "}
          /> */}
        </div>
        <div className="ms-Grid-col ms-sm12 ms-md5 ms-lg5">
          <Observer>
            {() => (
              <Select
                showSearch
                style={{ width: "100%" }}
                size="large"
                // value={values.searchTerms}
                defaultActiveFirstOption={false}
                showArrow={false}
                allowClear
                filterOption={false}
                loading={AdminStore.isSearching}
                placeholder={<><SearchOutlined style={{ color: "#A0AEC0" }} /> search by LastName, Email, PhoneNumber</>}
                onSearch={async (value: string) => {
                  if (value.length > 2) {
                    await AdminStore.search(value);
                  }
                }}
                onChange={async(value) => {
                  if(value !== undefined){
                    await AdminStore.getSearchedMemberInfo(value);
                  }
                }}
                onBlur={() => {
                  AdminStore.isSearching = true
                }}
              >
                {[
                  ...AdminStore.searchedMembers.values(),
                ].map((user:IProfileView ) => (
                  <Option key={user.id} value={user.id}>
                    {`${user.lastName+','+user.otherName},  ${user.email === null?"":user.email},  ${user.phoneNumber=== null?"":user.phoneNumber}`}
                  </Option>
                ))}
              </Select>
            )}
          </Observer>
        </div>
        <div
          className="ms-Grid-col ms-sm12 ms-md4 ms-lg4"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
           <Dropdown
              overlay={menuHeaderDropdown}
              trigger={["click"]}
            >
              <Button
                type="primary"
                shape="round"
              >
                <Space>
                  Add New Member
                  <DownOutlined />
                </Space>
              </Button>

            </Dropdown>
        </div>
      </div>

    
      <div className="ms-Grid-row" style={{ paddingTop: "10px" }}>
        {adminStore.isLoadingSearchedInfo ? (
          <>
          <Skeleton avatar paragraph={{ rows:20 }} active style={{height:"200px"}} />
          </>
        ) : (
          <div className="ms-Grid-col ms-sm12">
            { _.isUndefined(AdminStore.selectedMemberFromSearch.id)?(
              <EmptySearch/>
              ):(
              <MemberInfo/>
            )}
          </div>
        )}
      <MemberRegistrationDialog/>
      <MemberUploadPanel/>
      <UpdateOrdinationFromAdmin/>
      </div>
    </div>
  );
};

const EmptySearch = () => {
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
          <h2>NO MEMBER INFORMATION TO DISPLAY</h2>
        </div>
        <div
            className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Please search for a member via his/her lastName, email or phoneNumber </p>
            </div>
      </div>
    </div>
  );
};

export default observer(UserGrid);
