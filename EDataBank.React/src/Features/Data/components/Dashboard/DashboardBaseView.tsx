import Meta from 'antd/lib/card/Meta';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { LikeOutlined, MessageOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { BookOpen,User,Users } from 'react-feather';
import "../../../MasterPage/styles/grid.css"
import Chart, { Chart2 } from './Chart';
import { createContext, useContext, useEffect } from 'react';
import dashboardStore from '../../store/dashboardStore';
import { Avatar, Divider, List, Skeleton, Space, Tabs, notification } from 'antd';
import { CalculateMemberInProvinceForPie, IAdvisoryBoard, IMaleAndFemaleCountInProvince, IPieChartReturn } from '../../types/interfaces';
import logo from "../../../Home/img/logo.gif"
import React from 'react';
import { title } from 'process';
const { TabPane } = Tabs;
const dashboardStoreCtx = createContext(dashboardStore);
const DashboardBaseView = observer(() => {
    const DashboardStore = useContext(dashboardStoreCtx);
    useEffect(() => {
        async function LoadData() {
            try {
                await DashboardStore.getAllDashboardData()
                let d = [...DashboardStore.membersInProvinceForPie.values()].map(x=>x.membersDivTotalMembersMulByThreeSixty);
                DashboardStore.maximumNumberForPieData = Math.max(...d);
                
            } catch (error:any) {
                console.log("hhhhh",error?.response)
                if(error?.response?.body?.errorType == "timeOut"){
                    notification.warning({
                      message: "EDataBank Platform Feedback ",
                      description:error?.response?.body?.msg,
                    });

                  }else{
                    notification.error({
                      message: "EDataBank Platform Feedback ",
                      description: "error occurred:" + error?.response?.body?.msg,
                    });
                  }
            }
        }
        LoadData();
      }, []);

      const data = Array.from({ length: 23 }).map((_, i) => ({
        href: 'https://ant.design',
        title: `DEPUTY BABA ALADURA`,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        // content:
        //   'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      }));

      const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );
      const avatarResponsiveSize: any = {
        xs: 65,
        sm: 70,
        md: 90,
        lg: 100,
        xl: 200,
      };
    return(
    <>

    <Tabs defaultActiveKey={DashboardStore.selectedTap}
      onChange={async(key) => {
          DashboardStore.selectedTap = key;
          // setTab(key.toString());
          // if(key === "2" ){
            //   AdminStore.ordinationProgression.clear()
            //   AdminStore.provinceVal = 0
            //   AdminStore.branchVal = 0
            //   AdminStore.yearVal = 0
            // }
        }}
    >
      <TabPane tab="DASHBOARD" key="1">
          {/* <Divider orientation="left">
          <h3 style={{ padding: "5px", color: "#0e76bc" }}>DASHBOARD</h3>
        </Divider> */}
          {DashboardStore.isLoading  ? (
              <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </>
            ) : (
              <>
              <div className="cards">
                  <div className="card">
                      <Meta
                          avatar={<User style={{ color: "#D92525" }} size={50} />}
                          title={<h1 style={{ color: "#1890ff" }}>TOTAL MALE</h1>}
                          description={
                              <span className="feedback-dashboard-value">
                                  {DashboardStore.totals.male?.toLocaleString()}
                              </span>
                          }
                      />
                  </div>
                  <div className="card">
                      <Meta
                          avatar={<User style={{ color: "#D92525" }} size={50} />}
                          title={<h1 style={{ color: "#1890ff" }}>TOTAL FEMALE</h1>}
                          description={
                          <span className="feedback-dashboard-value">
                              {DashboardStore.totals.female?.toLocaleString()}
                          </span>
                          }
                      />
                  </div>
                  <div className="card">
                  <Meta
                      avatar={<Users style={{ color: "#D92525" }} size={60} />}
                      title={<h1 style={{ color: "#1890ff" }}>TOTAL MEMBERS</h1>}
                      description={
                      <span className="feedback-dashboard-value">
                          {DashboardStore.totals.total?.toLocaleString()}
                      </span>
                      }
                  />
                  </div>
              </div>
              
              <div className="ms-Grid" dir="ltr" style={{ paddingTop: "10%" }}>
                  <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                          <Chart
                              title={'MALE AND FEMALE DISTRIBUTION OF TOTAL POPULATION IN EACH PROVINCE'}
                              subtitle={'This chart illustrates the total number of both male and female in each province.'}
                              color={''}
                              maleData={[...DashboardStore.provinceTotalMaleAndFemale.values()].map((value: IMaleAndFemaleCountInProvince)=> value.male)}
                              femaleData={[...DashboardStore.provinceTotalMaleAndFemale.values()].map((value: IMaleAndFemaleCountInProvince)=> value.female)}
                              province={[...DashboardStore.provinceTotalMaleAndFemale.values()].map((value: IMaleAndFemaleCountInProvince)=> value.provinceName)}
                          />
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                      <Chart2 
                              title={'PERCENTAGE OF MEMBERS IN EACH PROVINCE'}
                              subtitle={"This chart illustrates the total percentage distribution of both male and female populations in each province."}
                              data={[...DashboardStore.membersInProvinceForPie.values()].map((value: CalculateMemberInProvinceForPie)=>{
                                  let d:IPieChartReturn = {
                                      name:value.provinceName,
                                      y:value.membersDivTotalMembersMulByThreeSixty,
                                      selected:DashboardStore.maximumNumberForPieData === value.membersDivTotalMembersMulByThreeSixty?true:false,
                                      sliced:DashboardStore.maximumNumberForPieData === value.membersDivTotalMembersMulByThreeSixty?true:false,
                                  }
                                 return d
                                
                              })}
                          />
                      </div>
                  </div>
    
              </div>
              
              </>
            )}
        
      </TabPane>
      <TabPane tab="ADVISORY BOARD" key="2">
        <>
        <List
    itemLayout="vertical"
    size="large"
   
    dataSource={[...DashboardStore.advisoryBoardMemberInfo.values()].map(p => ({
        title:`${p.currentPosition ==  null || p.currentPosition == undefined?"":p.currentPosition?.toUpperCase() + ","}${p.rank?.toUpperCase()}`,
        avatar: `${p.pic == null || p.pic == undefined || p.pic == ""?"":p.pic }`,
        description:`${p.title == null || p.title == undefined?"":p.title?.toUpperCase()} ${p.lastName?.toUpperCase()} ${p.otherName.toUpperCase()}`
    }))}
    footer={
      <div>
        <b style={{color:"#1890FF"}}>ADVISORY BOARD LIST</b>
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        // actions={[
        //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        // ]}
        extra={
            item.avatar === ""?(
                <Avatar 
                style={{ backgroundColor: "#0e76bc" }} 
                icon={<UserOutlined />} 
                size={avatarResponsiveSize.xl}
                src={""}/>
            ):(
                <img
                  width={272}
                  alt="logo"
                  src={item.avatar}
                 
                />
            )
        }
      >
        <List.Item.Meta
          avatar={<Avatar  src={logo} />}
          title={<a>{item.title}</a>}
          description={item.description}
        />
        {/* {item.content} */}
      </List.Item>
    )}
  />
        </>
      </TabPane>
     
    </Tabs>
    </>)
})



export default DashboardBaseView;