import { DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import React, { createContext, useContext, useState } from "react";

import {
  DefaultButton,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  ProgressIndicator,
  TextField,
} from "@fluentui/react";
import { Observer, observer } from "mobx-react-lite";
import {Table, List, Select,Typography, Modal, Badge, Tag, Skeleton, Space, Button, notification } from "antd";

import { set, toJS } from "mobx";
import { Formik } from "formik";
import * as yup from "yup";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { changeRequestStore } from "../../store/ChangeRequestStore";
import { ColumnsType } from "antd/lib/table";
import { IChangeView, IChangesTableData } from "../../types/interface";
import { platformStore } from "../../../../store/platformStore";
import moment from "moment";


const _ = require("underscore");
const { Paragraph,Title } = Typography;
const { Option } = Select;
const changeRequestStoreCtx = createContext(changeRequestStore);
const platformStoreCtx = createContext(platformStore);
function ViewChangeRequest() {

  const ChangeRequestStore = useContext(changeRequestStoreCtx);
  const PlatformStore = useContext(platformStoreCtx);

  // <Tag color="#eda405e3" title={value}>{value}</Tag>
  const columns: ColumnsType<IChangesTableData> = [
    {
      title: 'ModifiedField',
      dataIndex: 'modifiedField',
      render: (text: any, record: any, index: any) => {
        let ret = record.modifiedField === "nextRankId"
        ?<a>{"NextRank"}</a>
        :record.modifiedField === "rankId"
        ?<a>{"Rank"}</a>
        :record.modifiedField === "nationality1Id" 
        ?<a>{"Nationality1"}</a>
        :record.modifiedField === "nationality2Id"
        ?<a>{"Nationality2"}</a>
        :record.modifiedField === "professionId" 
        ?<a>{"Profession"}</a>
        :record.modifiedField === "qualificationId" 
        ?<a>{"Qualification"}</a>
        :record.modifiedField === "branchId" 
        ?<a>{"Branch"}</a>
        :record.modifiedField === "bandId" 
        ?<a>{"Band"}</a>
        :record.modifiedField === "principalBandId" 
        ?<a>{"PrincipalBand"}</a>
        :<a>{text}</a>
        return ret;
      }
    },
    {
      title: 'Value',
      dataIndex: 'fieldValue',
      render: (text: any, record: any, index: any) => {
        console.log("fieldValue",record)
        
        let ret = (record.modifiedField === "ordinationRankOfSpouse" || record.modifiedField === "nextRankId")
        ?PlatformStore.ranks.get(Number(record.fieldValue))?.rankName
        :record.modifiedField === "rankId"
        ?PlatformStore.ranks.get(Number(record.fieldValue))?.rankName
        :(record.modifiedField === "nationality1Id" || record.modifiedField === "nationality2Id")
        ?PlatformStore.nationalities.get(Number(record.fieldValue))?.nationalityName
        :record.modifiedField === "professionId" 
        ?PlatformStore.professions.get(Number(record.fieldValue))?.professionName
        :record.modifiedField === "qualificationId" 
        ?PlatformStore.qualifications.get(Number(record.fieldValue))?.qualificationName
        :record.modifiedField === "branchId" 
        ?PlatformStore.branchs.get(Number(record.fieldValue))?.branchName
        :record.modifiedField === "bandId" 
        ?PlatformStore.bands.get(Number(record.fieldValue))?.bandName
        :record.modifiedField === "principalBandId" 
        ?PlatformStore.principalBands.get(Number(record.fieldValue))?.principalBandName
        :text
        return ret;
      }
    },
   
  ];
 
  const data = [
    {
      title: "",
      description:( <MessageBar messageBarType={MessageBarType.warning}>
        <b>Note:</b>This is a member updated information. 
    </MessageBar>),
    },
    {
      title: "Changes Type",
      description:<><Tag color={ChangeRequestStore.selectedChangeRequest.changesType ==="Profile"?"blue":ChangeRequestStore.selectedChangeRequest.changesType ==="Ordination"?"#d92525":"green"} title={ChangeRequestStore.selectedChangeRequest.changesType}>{ChangeRequestStore.selectedChangeRequest.changesType}</Tag></>,
    },
    {
      title: "Full Name",
      description:ChangeRequestStore.selectedChangeRequest.fullName,
    },
    {
      title: "Request Date",
      description:moment(ChangeRequestStore.selectedChangeRequest.createdOn).format("ddd Do MMM YYYY") ,
    },
    {
      title: "",
      description:(
        <Table
            style={{width:"100%"}}
            size='large'
            loading={ChangeRequestStore.isLoadingTDAta}
            bordered
            columns={columns}
            dataSource={[...ChangeRequestStore.selectedChangesTableData.values()].map((row) =>
              toJS(row)
            )}
            pagination={false}
        />
      ),
    },
    
    ];

  return (
    <Modal
        open={ChangeRequestStore.showViewDialog}
        width={"30%"}
        title={`${ChangeRequestStore.selectedChangeRequest.changesType} Update Request`}
        onCancel={() => {
          ChangeRequestStore.showViewDialog= false;
          ChangeRequestStore.selectedChangesTableData.clear()
        }}
        destroyOnClose={true}
        footer={false}
        maskClosable={false}
    >

    <div className="ms-Grid-row">
        <div className="ms-Grid-col md-12">
        {ChangeRequestStore.isLoadingTDAta  ? (
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="/#">{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
        <FormItem style={{ paddingTop: "20px", textAlign: "right" }}>
          <Space>
            {/* <Button
              type="link"
              onClick={() => {
                resetForm();
              }}
            >
              Clear Entries
            </Button> */}
            <Button 
              htmlType="button" 
              // type="primary"
              style={{backgroundColor:"#0078d4",borderColor:"#0078d4",color:"white"}}
              onClick={async() => {
                  try {
                      await ChangeRequestStore.approveChange(ChangeRequestStore.selectedChangeRequest.changesRequestId);
                      ChangeRequestStore.selectedChangeRequest = {} as IChangeView;
                      ChangeRequestStore.showViewDialog= false;
                      notification.success({
                      message: "EDataBank Platform Feedback ",
                      description: `Approval Successful`,
                      });
                  
                  } catch (error) {
                      notification.info({
                      message: "EDataBank Platform Feedback ",
                      description: (error as any).response.body.msg,
                      });
                  }
            }}
            >
              Approve Request
            </Button>
          </Space>
      </FormItem>
      <Observer>
        {() => (
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
            {ChangeRequestStore.approving  && (
              <ProgressIndicator
                description="Approving request..."
                styles={{ root: { textAlign: "center" } }}
              ></ProgressIndicator>
            )}
          </div>
        )}
      </Observer>
    </div>
    </Modal>
  );
}

export default observer(ViewChangeRequest);
