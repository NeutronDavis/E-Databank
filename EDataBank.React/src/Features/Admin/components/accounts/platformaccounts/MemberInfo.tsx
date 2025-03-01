import { createContext, useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  List,
  notification,
  Segmented,
  Select,
  Skeleton,
  Space,
  Tag,
  Tooltip,
  Upload,
  UploadProps,
  Typography,
  Table,
  Dropdown,
  Menu
} from "antd";
import { Observer, observer } from "mobx-react-lite"

import { KeyOutlined, ReloadOutlined, UserOutlined,EditOutlined,LockOutlined, DownOutlined } from "@ant-design/icons";
import { Edit3, Trash2 } from "react-feather";
import { CommandBar, IContextualMenuItem, Label } from "@fluentui/react";
import moment from "moment";
import { IImage } from "../../../../Profile/types/interface";
import { profileStore } from "../../../../Profile/store/ProfileStore";
import adminStore from "../../../store/adminstore";
import confirm from "antd/lib/modal/confirm";
import { IOrdination } from "../../../types/interface";
import { IOrdinationView } from "../../../../Data/types/interfaces";
const { Text } = Typography;

const profileStoreCtx = createContext(profileStore);
const adminStoreCtx = createContext(adminStore);
const { Paragraph,Title } = Typography;
let profileImage: IImage = {
    ProfilePics: "",
  };
const MemberInfo = observer(() => {
  const ProfileStore = useContext(profileStoreCtx);
  const AdminStore = useContext(adminStoreCtx);

      const avatarResponsiveSize: any = {
        xs: 65,
        sm: 70,
        md: 90,
        lg: 100,
        xl: 200,
      };

      const personalData = [
        {
          title: "TITLE",
          description:AdminStore.selectedMemberFromSearch.title,
        },
        {
          title: "LAST NAME",
          description:AdminStore.selectedMemberFromSearch.lastName,
        },
        {
          title: "OTHER NAME",
          description:AdminStore.selectedMemberFromSearch.otherName,
        },
        {
          title: "EMAIL",
          description:AdminStore.selectedMemberFromSearch.email,
        },
        {
          title: "PHONE NUMBER",
          description:AdminStore.selectedMemberFromSearch.phoneNumber,
        },
        {
          title: "Date OF BIRTH",
          description:AdminStore.selectedMemberFromSearch.dateOfBirth,
        },
        {
          title: "NATIONALITY 1",
          description:AdminStore.selectedMemberFromSearch.nationality1,
        },
        {
          title: "NATIONALITY 2",
          description:AdminStore.selectedMemberFromSearch.nationality2,
        },
        {
          title: "PROFESSION",
          description:AdminStore.selectedMemberFromSearch.profession,
        },
        {
          title: "QUALIFICATION",
          description:AdminStore.selectedMemberFromSearch.qualification,
        },
        {
          title: "OCCUPATION",
          description:AdminStore.selectedMemberFromSearch.occupation,
        },
      ]
      const familyData = [
        {
          title: "MARITAL STATUES",
          description:AdminStore.selectedMemberFromSearch.maritalStatus,
        },
        {
          title: "Year OF MARRIAGE",
          description:AdminStore.selectedMemberFromSearch.yearOfMarriage,
        },
        {
          title: "NAME OF SPOUSE",
          description:AdminStore.selectedMemberFromSearch.nameOfSpouse,
        },
        {
          title: "ORDINATION RANK OF SPOUSE",
          description:AdminStore.selectedMemberFromSearch.rankOfSpouse,
        },
        {
          title: "NUMBER OF CHILDREN",
          description:AdminStore.selectedMemberFromSearch.noOfChildren,
        },
      ]

      const churchData = [
        {
          title: "RANK",
          description:AdminStore.selectedMemberFromSearch.rankName,
        },
        {
          title: "BRANCH",
          description:AdminStore.selectedMemberFromSearch.branchName,
        },
        {
          title: "BAND",
          description:AdminStore.selectedMemberFromSearch.bandName
        },
        {
          title: "PRINCIPAL BAND",
          description:AdminStore.selectedMemberFromSearch.principalBandName,
        },
        {
          title: "CURRENT/PREVIOUS POSITION HELD IN CHURCH",
          description:AdminStore.selectedMemberFromSearch.cppInChurch
          ,
        },
      
      ]
      const styles: any = {
        top: {
          paddingTop: "8px",
          paddingRight: "40px",
          paddingBottom: "8px",
          paddingLeft: "40px",
        },
        title: {
          marginBottom: "12px",
          color: "rgba(0,0,0,.85)",
          fontWeight: "500",
          fontSize: "20px",
          lineHeight: "28px",
        },
    
        button_view: {
          width: "144px",
          textAlign: "center",
        },
        baseView: {
          display: "flex",
          paddingTop: "12px",
        },
        left: {
          minWidth: "224px",
          maxWidth: "448px",
        },
      };
   
      const columns = [
        {
            dataIndex: "rankName",
            title: <b>Rank</b>,
            render: (text: string, record: IOrdinationView, index: any) => {
                    return text;
                },
        },
        {
            dataIndex: "year",
            title: <b>Year</b>,
            render: (text: string, record: IOrdinationView, index: any) => {
                    return text;
                },
        },
        {
            dataIndex: "nextRank",
            title: <b>NextRank</b>,
            render: (text: string, record: IOrdinationView, index: any) => {
                    return text;
                },
        },
        {
            title: <b>Action</b>,
            dataIndex: '',
            key: 'x',
            render: (text: any, record: IOrdinationView, index: any) =><>
                <Space 
                    split={<Divider orientation="center">|</Divider>}
                 >
                 <Tooltip
                    title={"Edit"}
                    placement="right"
                >
                    <Button danger  type='link' onClick={
                        ()=>{
                            AdminStore.selectedOrdination = record;
                            AdminStore.showOrdinationDialog= true;
                        }
                    } icon={<EditOutlined style={{color:"#108ee9"}}/>}></Button>
                </Tooltip>
                <Tooltip
                    title={"Delete"}
                    placement="right"
                >
                    <Button danger  type='link' onClick={
                        ()=>{
                            confirm({
                                title: `Confirm  ${AdminStore.selectedMemberFromSearch.lastName+","+AdminStore.selectedMemberFromSearch.otherName} Ordination Delete`,
                                content: `Are you sure you want to delete this record `,
                                okText: "Yes",
                                okType: "danger",
                                cancelText: "No",
                                onOk: async () => {
                                  try {
                                    await AdminStore.removeOrdination(record.ordinationId);
                                    notification.success({
                                      message: "EDataBank Platform Feedback",
                                      description: `Ordination removal successful`,
                                    });
                                  
                                    await AdminStore.getSearchedMemberInfo(String(AdminStore.selectedMemberFromSearch.id));
                                      
                                  } catch (error) {
                                    notification.info({
                                      message: "EDataBank Platform Feedback",
                                      description: "an error occurred during the operation",
                                    });
                                  }
                                },
                                onCancel() {},
                              });
                        }
                    } icon={<Trash2/>}></Button>
                </Tooltip>
                </Space>
            </> 
          },
    ];

    const menuHeaderDropdown = (
      <Menu onClick={(e)=>{
        console.log("dropdaw",Number(e.key))
        let roleType = 0;
        let roleName = "";

        if (e.key === '1') {
          roleType = 1
          roleName = "an Admin"
        }else if (e.key === '2') {
          roleType = 2
          roleName = "a Member"
        }else{
          roleType = 3
          roleName = "a Supper Admin"
        }
        confirm({
          title: `Confirm  ${AdminStore.selectedMemberFromSearch.lastName+","+AdminStore.selectedMemberFromSearch.otherName} Role Change`,
          content:<><span style={{color:"#d92525"}}>NOTE:</span> <b>{AdminStore.selectedMemberFromSearch.lastName+","+AdminStore.selectedMemberFromSearch.otherName} </b>  will have access to EDataBank platform {roleName}</>,
          okText: "Yes",
          okType: "danger",
          cancelText: "No",
          onOk: async () => {
            try {
              await AdminStore.updateMemberRole(String(AdminStore.selectedMemberFromSearch.id),roleType);
              notification.success({
                message: "EDataBank Platform Feedback",
                description: `${AdminStore.selectedMemberFromSearch.lastName+","+AdminStore.selectedMemberFromSearch.otherName}  account has been successfully enabled as ${roleName} in EDataBank Platform `,
              });
            
              await AdminStore.getSearchedMemberInfo(String(AdminStore.selectedMemberFromSearch.id));
                
            } catch (error) {
              notification.info({
                message: "EDataBank Platform Feedback",
                description: "an error occurred during the operation",
              });
            }
          },
          onCancel() {},
        });
      }}  style={{ width: "180px" }}>
  
        <Menu.Item 
          key={3}
          disabled={AdminStore.role.groupId == 3?true:false}
          >
          <Text> Supper Admin</Text>
        </Menu.Item>
  
        <Menu.Divider />
        <Menu.Item 
          key={1}
          disabled={AdminStore.role.groupId == 1?true:false}
          >
          <Text>Admin</Text>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item 
          key={2}
          disabled={AdminStore.role.groupId == 2?true:false}
          >
          <Text>Member</Text>
        </Menu.Item>
      </Menu>
    );

    return(
        <>
            <>
              <div className="ms-Grid" dir="ltr" style={{ paddingTop: "2%" }}>
                <div className="ms-Grid-row" style={{ paddingLeft: "-10px"}}>
                    <div className="ms-Grid-col ms-sm12 ms-md7 ms-lg7">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <Observer>
                                {() => (
                                    <Avatar 
                                        style={{ backgroundColor: "#0e76bc" }} 
                                        icon={<UserOutlined />} 
                                        size={avatarResponsiveSize.xl}
                                        src={AdminStore.pic}/>
                                )}
                            </Observer>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8" style={{ paddingTop: "3%" }}>
                           <b><p style={{ fontSize: "30px" }}>{AdminStore.selectedMemberFromSearch.lastName},{AdminStore.selectedMemberFromSearch.otherName}</p></b> 
                            <Paragraph>
                              <blockquote style={{ paddingLeft: "3px",color: "#d92525",marginTop:"-20px"}}> <Tooltip
                                    title={"Current Rank"}
                                    placement="right"
                                >{AdminStore.selectedMemberFromSearch.rankName}
                                </Tooltip></blockquote>                   
                            </Paragraph>
                            <br/>
                            <Paragraph>
                               
                              <blockquote style={{ paddingLeft: "3px",marginTop:"-20px"}}>
                                <Tooltip
                                    title={"Gender"}
                                    placement="top"
                                >
                                  <Tag color="#d92525">{AdminStore.selectedMemberFromSearch.gender}</Tag>
                                  </Tooltip> 
                                 <Tooltip
                                    title={"Role"}
                                    placement="top"
                                >
                                  <Tag color="#108ee9">{AdminStore.role.groupId == 1?"Admin":AdminStore.role.groupId == 2?"Member":"Supper Admin"}</Tag> 
                                </Tooltip>
                                </blockquote>                   
                            </Paragraph>
                           
                            <div className={styles.button_view} style={{ paddingTop: "4px"}}>
                                <Tooltip
                                    title={"Click the button to grant or revoke platform access for the member."}
                                    placement="right"
                                >
                                    <Button 
                                        htmlType="button" 
                                        type="primary" 
                                        onClick={()=>{
                                            confirm({
                                                title: `Confirm  ${AdminStore.selectedMemberFromSearch.lastName+","+AdminStore.selectedMemberFromSearch.otherName}  Account Lock`,
                                                content:<><span style={{color:"#d92525"}}>NOTE:</span> <b>{AdminStore.selectedMemberFromSearch.lastName+","+AdminStore.selectedMemberFromSearch.otherName} </b> will {AdminStore.selectedMemberFromSearch.isAccountLocked?"have":"not have"} access to EDataBank platform {AdminStore.selectedMemberFromSearch.isAccountLocked?"":"as his account will be revoked but can be unlocked subsequently."} </> ,
                                                okText: "Yes",
                                                okType: "danger",
                                                cancelText: "No",
                                                onOk: async () => {
                                                  try {
                                                    await AdminStore.lockUserAccout(String(AdminStore.selectedMemberFromSearch.id));
                                                    notification.success({
                                                      message: "EDataBank Platform Feedback",
                                                      description: `${AdminStore.selectedMemberFromSearch.lastName+","+AdminStore.selectedMemberFromSearch.otherName}  account has been successfully ${AdminStore.selectedMemberFromSearch.isAccountLocked?"Unlocked":"locked"} in EDataBank Platform `,
                                                    });
                                                  
                                                    await AdminStore.getSearchedMemberInfo(String(AdminStore.selectedMemberFromSearch.id));
                                                      
                                                  } catch (error) {
                                                    notification.info({
                                                      message: "EDataBank Platform Feedback",
                                                      description: "an error occurred during the operation",
                                                    });
                                                  }
                                                },
                                                onCancel() {},
                                              });
                                        }}
                                    
                                    ><KeyOutlined/> {!AdminStore.selectedMemberFromSearch.isAccountLocked?"Disable Member":"Enable Member"}</Button>  
                                </Tooltip>
                                <Tooltip
                                    title={"Click the button to either grant or revoke a role for the member's access to the platform."}
                                    placement="right"
                                >
                                  <Dropdown
                                    overlay={menuHeaderDropdown}
                                    trigger={["click"]}
                                  >
                                    <Button
                                      htmlType="button" 
                                      style={{backgroundColor:"#108ee9",borderColor:"#108ee9",color:"white"}}
                                    >
                                      <Space>
                                        Change User Role
                                        <DownOutlined />
                                      </Space>
                                    </Button>

                                  </Dropdown> 
                                </Tooltip>
                              
                            </div>
                                  
                        </div>
                      </div>
                    </div>
                </div>
                
                <Divider>BASIC INFORMATION</Divider>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4"style={{ paddingLeft: "3%" }}>
                          <Card title={<h3>Personal Information</h3>}>
                            <Observer>
                              {()=>(
                                  <List
                                    itemLayout="horizontal"
                                    dataSource={personalData}
                                    renderItem={(item) => (
                                      <List.Item>
                                        <List.Item.Meta
                                          title={<a>{item.title}</a>}
                                          description={item.description}
                                        />
                                      </List.Item>
                                    )}
                                  />
                              )}
                            </Observer>
                          </Card>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4"style={{ paddingLeft: "3%" }}>
                          <Card title={<h3>Family Information</h3>}>
                          <Observer>
                              {()=>(
                                  <List
                                    itemLayout="horizontal"
                                    dataSource={familyData}
                                    renderItem={(item) => (
                                      <List.Item>
                                        <List.Item.Meta
                                          title={<a>{item.title}</a>}
                                          description={item.description}
                                        />
                                      </List.Item>
                                    )}
                                  />
                              )}
                            </Observer>
                          </Card>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4"style={{ paddingLeft: "3%" }}>
                          <Card title={<h3>Church Information</h3>}>
                          <Observer>
                              {()=>(
                                  <List
                                    itemLayout="horizontal"
                                    dataSource={churchData}
                                    renderItem={(item) => (
                                      <List.Item>
                                        <List.Item.Meta
                                          title={<a>{item.title}</a>}
                                          description={item.description}
                                        />
                                      </List.Item>
                                    )}
                                  />
                              )}
                            </Observer>
                          </Card>
                        </div>
                      </div>
                    </div>
                </div>
                <Divider>ORDINATION INFORMATION</Divider>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6" style={{paddingTop:"-10px"}}>
                        <Table
                            style={{ width: "100%" }}
                            size='small'
                            columns={columns}
                            bordered
                            dataSource={[...AdminStore.selectedMemberOrdinationFromSearch.values()].filter((value: IOrdinationView)=> value.rankName !== "NULL" &&value.nextRank !== "NULL")}
                            pagination={false}
                        />
                    </div>
                </div>
              </div>
            </>
       

        </>
    )
});



export default MemberInfo