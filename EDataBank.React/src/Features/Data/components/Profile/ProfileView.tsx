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
  Typography
} from "antd";
import { Observer, observer } from "mobx-react-lite"
import { profileStore } from "../../../Profile/store/ProfileStore";
import { getCurrentUser } from "../../../../Utility/helper";
import { ReloadOutlined, UserOutlined } from "@ant-design/icons";
import { Edit3 } from "react-feather";
import { CommandBar, IContextualMenuItem } from "@fluentui/react";
import moment from "moment";

import { IImage } from "../../../Profile/types/interface";

const profileStoreCtx = createContext(profileStore);
const { Paragraph,Title } = Typography;
let profileImage: IImage = {
    ProfilePics: "",
  };
const ProfileView = observer(() => {
  const ProfileStore = useContext(profileStoreCtx);

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
          description:ProfileStore.userView.title,
        },
        {
          title: "LAST NAME",
          description:ProfileStore.userView.lastName,
        },
        {
          title: "OTHER NAME",
          description:ProfileStore.userView.otherName,
        },
        {
          title: "EMAIL",
          description:ProfileStore.userView.email,
        },
        {
          title: "PHONE NUMBER",
          description:ProfileStore.userView.phoneNumber,
        },
        {
          title: "Date OF BIRTH",
          description:profileStore.userView.dateOfBirth,
        },
        {
          title: "NATIONALITY 1",
          description:ProfileStore.userView.nationality1,
        },
        {
          title: "NATIONALITY 2",
          description:ProfileStore.userView.nationality2,
        },
        {
          title: "PROFESSION",
          description:ProfileStore.userView.profession,
        },
        {
          title: "QUALIFICATION",
          description:ProfileStore.userView.qualification,
        },
        {
          title: "OCCUPATION",
          description:ProfileStore.userView.occupation,
        },
      ]
      const familyData = [
        {
          title: "MARITAL STATUES",
          description:ProfileStore.userView.maritalStatus,
        },
        {
          title: "Year OF MARRIAGE",
          description:profileStore.userView.yearOfMarriage,
        },
        {
          title: "NAME OF SPOUSE",
          description:ProfileStore.userView.nameOfSpouse,
        },
        {
          title: "ORDINATION RANK OF SPOUSE",
          description:ProfileStore.userView.rankOfSpouse,
        },
        {
          title: "NUMBER OF CHILDREN",
          description:ProfileStore.userView.noOfChildren,
        },
      ]

      const churchData = [
        {
          title: "RANK",
          description:ProfileStore.userView.rankName,
        },
        {
          title: "BRANCH",
          description:ProfileStore.userView.branchName,
        },
        {
          title: "BAND",
          description:ProfileStore.userView.bandName
        },
        {
          title: "PRINCIPAL BAND",
          description:ProfileStore.userView.principalBandName,
        },
        {
          title: "CURRENT/PREVIOUS POSITION HELD IN CHURCH",
          description:ProfileStore.userView.cppInChurch
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
      const handleChange: UploadProps["onChange"] = async (info) => {
        try {
          let src = info.file.url as string;
    
          profileImage.ProfilePics = src;
        
          ProfileStore.isUploading = true;
          await ProfileStore.uploadProfileImg(info,getCurrentUser().id); //for production
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
          profileStore.isUploading = false;
        }
      };

    return(
        <>
          <Divider orientation="left">
            <h3 style={{ padding: "5px", color: "#0e76bc" }}>PROFILE</h3>
          </Divider>
          {ProfileStore.isLoading  ? (
            <>
              <Skeleton avatar paragraph={{ rows:20 }} active style={{height:"200px"}} />
            </>
          ) : (
            <>
              <div className="ms-Grid" dir="ltr" style={{ paddingTop: "2%" }}>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md7 ms-lg7">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <Observer>
                                {() => (
                                    <Avatar 
                                        style={{ backgroundColor: "#0e76bc" }} 
                                        icon={<UserOutlined />} 
                                        size={avatarResponsiveSize.xl}
                                        src={profileStore.profileImg ? profileStore.profileImg : ""}/>
                                )}
                            </Observer>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8" style={{ paddingTop: "3%" }}>
                           <b><p style={{ fontSize: "30px" }}>{ProfileStore.userView.lastName},{ProfileStore.userView.otherName}</p></b> 
                            <Paragraph>
                              <blockquote style={{ paddingLeft: "3px",color: "#d92525",marginTop:"-20px"}}>{ProfileStore.userView.rankName}</blockquote>                   
                            </Paragraph>
                           <Tag color="#108ee9">{ProfileStore.userView.gender}</Tag> 
                           <Upload showUploadList={false} onChange={handleChange}>
                                <div className={styles.button_view}>
                                    <Tooltip
                                        title={"Click the button to change your profile picture"}
                                        placement="right"
                                    >
                                        <Button htmlType="button" type="primary" loading={ProfileStore.isUploading}>{ProfileStore.isUploading?"Loading...":"Change Photo"}</Button>  
                                    </Tooltip>
                                </div>
                            </Upload>            
                        </div>
                      </div>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 commandbar" style={{ paddingLeft: "3%" }}>
                        <CommandBar
                        style={{}}
                        items={[
                            {
                            key: "refresh",
                            text: "Refresh Profile",
                            name: "New",
                            onRenderIcon: () => <ReloadOutlined className="qicon" />,
                            onClick: (
                                ev?:
                                | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                                | React.KeyboardEvent<HTMLElement>
                                | undefined,
                                item?: IContextualMenuItem | undefined
                            ) => {
                                ProfileStore.getProfile(getCurrentUser().id)
                            },
                            },
            
                       
                    
                        ]}
                        farItems={[
                            {
                            key: "group4",
                            text: "Edit Profile Information",
                            name: "group",
                            onRenderIcon: () => <Edit3 className="qicon" />,
            
                            onClick: () => {
                                ProfileStore.showProfileForm = true;
                            },
                            },
                        ]}
                        />
                      </div>
                    </div>
      
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
              </div>
            </>
          )
        }

        </>
    )
});

export default ProfileView