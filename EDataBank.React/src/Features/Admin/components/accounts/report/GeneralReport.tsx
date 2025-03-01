import { Badge, Button, Divider, Form, Input, Layout, List, Segmented, Select, Skeleton, Table, Typography, notification } from "antd";
import { Observer, observer } from "mobx-react-lite";
import adminStore from "../../../store/adminstore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { platformStore } from "../../../store/platformStore";
import { IBranch, IBranchView, ICmc, IDistrict, IProfession, IProvince, IQueryData, IReportTableInfo } from "../../../types/interface";
import { toJS } from "mobx";
import { CommandBar, IContextualMenuItem, MessageBar, MessageBarType, Persona, PersonaSize, ProgressIndicator, SearchBox } from "@fluentui/react";
import FormItem from "antd/es/form/FormItem";
import { FileExcelOutlined, FilePdfOutlined, ReloadOutlined, SearchOutlined, SettingOutlined,DownloadOutlined, FilePptOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import { SubPageHeaderTitle } from "../../../../../shared/SubPageHeaderTitle";
import ProvincialMemberReportQueryDialog from "./ProvincialMemberReportQueryDialog";
import OrdinationProgressionQueryDialog from "./OrdinationProgressionQueryDialog";
import { SegmentedValue } from "antd/lib/segmented";
const { useDevice } = require("react-use-device");
const _ = require("underscore");
const { Paragraph } = Typography;
const adminStoreCtx = createContext(adminStore);
const platformStoreCtx = createContext(platformStore);
let GeneralReport = observer(()=>{
    const { isMOBILE, isDESKTOP,isTABLET } = useDevice();
    const AdminStore = useContext(adminStoreCtx);
    const PlatformStore = useContext(platformStoreCtx);
    const { Content, Sider } = Layout;
    const { Title } = Typography;
    const { Option } = Select;
    let [cmc,setCmc] = useState<number | undefined>(undefined)
    let [province,setProvince] = useState<number | undefined>(undefined)
    let [district,setDistrict] = useState<number | undefined>(undefined)
    let [branch,setBranch] = useState<number | undefined>(undefined)
    let [profession,setProfession] = useState<number | undefined>(undefined)
    let [disableProf,setDisableProf] = useState(true)

    const grid = useRef<AgGridReact>(null);
    const rowSelected = (grid: any) => {
      const selrow = grid.api.getSelectedNodes()[0];
  
    //   if (selrow) {
    //     adminStore.userAccount.disableToolbar = false;
    //   } else {
    //     adminStore.userAccount.disableToolbar = true;
    //   }
      
    //   if(selrow.data.isAccountLocked){
    //     // setActionTittle("Enable Account")
    //   }else{
    //     // setActionTittle("Disable Account")
    //   }
    };
    useEffect(() => {
      async function getData() {
        await PlatformStore.getAllCmc();
        await PlatformStore.getAllProvince();
        await PlatformStore.getAllDistrict();
        await PlatformStore.getAllBranch();
        await PlatformStore.getAllProfession();
        AdminStore.memberGeneralReportData.clear();
        AdminStore.reportTableContent.clear();
        AdminStore.branchInfoForReport =  {} as IBranchView;
        setCmc(undefined)
        setProvince(undefined)
        setDistrict(undefined)
      }
      getData();
      return () => {};
    }, []);
    const columns = [
        {
            dataIndex: "title",
            title:<></>,
            width: '20%',
            render: (text: string, record: IReportTableInfo, index: any) => {
                    return text;
                },
        },
        {
            dataIndex: "names",
            title: <b>NAME</b>,
            width: '20%',
            render: (text: string, record: IReportTableInfo, index: any) => {
                    return text;
                },
        },
        {
            dataIndex: "ranks",
            title: <b>RANK</b>,
            width: '20%',
            render: (text: string, record: IReportTableInfo, index: any) => {
                    return text;
                },
        },
        {
            dataIndex: "phone",
            title: <b>PHONE NUMBER</b>,
            width: '20%',
            render: (text: string, record: IReportTableInfo, index: any) => {
                    return text;
                },
        },
        {
            dataIndex: "email",
            title: <b>EMAIL</b>,
            width: '20%',
            render: (text: string, record: IReportTableInfo, index: any) => {
                    return text;
                },
        },
      
    ];
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
            // pinned:true,
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
            // pinned:true,
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
            headerName: "CurrentRank",
            field: "currentRank",
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
            headerName: "Year Of Marriage",
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

      const downloadReport=async()=>{
        try {
          await AdminStore.downloadBranchTemplate(adminStore.selectedBranchIdForGeneralReportReport,adminStore.selectedProfessionIdForGeneralReportReport)
          
        } catch (error:any) {
          //convert the blob to text so that you can extract the error message sent from the server
          // note this only happens when the agent responseType("blob")
          let texError = await error?.response?.body.text();
          let jsError = JSON.parse(texError);
          if(jsError.errorType =='timeOut' || jsError.errorType == "branchError"){
            notification.warning({
              message: "EDataBank Platform Feedback ",
              description: jsError.msg,
            });

          }else{
            notification.error({
              message: "EDataBank Platform Feedback ",
              description: "error occurred:" +jsError.msg,
            });
          }
        }
      }
    
    return(
        <Layout
        className="site-layout-background"
        style={{
          backgroundColor: "white",
        }}
      >
       
   
        <Content className="site-layout-background">
            <div  
            className="ms-Grid" dir="ltr"
            style={{
                overflowX:"auto"
            //    marginTop:"29px"
            }}>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
                        <SubPageHeaderTitle
                        count={adminStore.memberGeneralReportData.size}
                        title={"Members Report"}
                        />
                    </div>
                </div>
                <div className="ms-Grid-row" style={{width:"1750px"}}>
                    <div className="ms-Grid-col ms-sm12 ms-md3 ms-lg3" style={{marginTop:"90px"}}>
                    <Form layout="vertical">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                <FormItem
                                    label="Cmc"
                                    required
                                >
                                    <Select
                                        style={{ width: "100%" }}
                                        placeholder="select your Cmc"
                                        showSearch
                                        filterOption={(input, option) =>{
                                            return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                        }
                                        }
                                    
                                        value={cmc}
                                        onChange={(val, opt: any) => {
                                            setCmc(Number(val))
                                        }}
                                    >
                                        {[...PlatformStore.cmcs.values()].map((cmc:ICmc) => (
                                            <Option value={cmc.cmcId} key={cmc.cmcOrder}>
                                                {cmc.cmcOrder}
                                            </Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                <FormItem
                                    label="Province"
                                    >
                                        <Select
                                            style={{ width: "100%" }}
                                            placeholder="select province"
                                            showSearch
                                            disabled={_.isUndefined(cmc)}
                                            filterOption={(input, option) =>{
                                                return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                            }
                                            }
                                        
                                            value={province}
                                            onChange={(val, opt: any) => {
                                                setProvince(Number(val))
                                            }}
                                        >
                                            {[...PlatformStore.provinces.values()].filter((value: IProvince)=> value.cmcId === cmc).map((province:IProvince) => (
                                                <Option value={province.provinceId} key={province.provinceName}>
                                                    {province.provinceName}
                                                </Option>
                                            ))}
                                        </Select>
                                </FormItem>
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                <FormItem
                                    label="District"
                                    >
                                        <Select
                                            style={{ width: "100%" }}
                                            placeholder="select district"
                                            disabled={_.isUndefined(province)}
                                            showSearch
                                            filterOption={(input, option) =>{
                                                return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                            }
                                            }
                                        
                                            value={district}
                                            onChange={(val, opt: any) => {
                                               setDistrict(Number(val))
                                            }}
                                        >
                                            {[...PlatformStore.districts.values()].filter((value: IDistrict)=> value.provinceId === province).map((district:IDistrict) => (
                                                <Option value={district.districtId} key={district.districtName}>
                                                    {district.districtName}
                                                </Option>
                                            ))}
                                        </Select>
                                </FormItem>
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                <FormItem
                                    label="Branch"
                                    >
                                        <Select
                                            style={{ width: "100%" }}
                                            placeholder="select your branch"
                                            disabled={_.isUndefined(district)}
                                            showSearch
                                            filterOption={(input, option) =>{
                                                return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                            }
                                            }
                                        
                                            // value={branch}
                                            onChange={async(val, opt: any) => {
                                                setBranch(Number(val))
                                                AdminStore.reportTableContent.clear();
                                                let branch = PlatformStore.branchs.get(Number(val))
                                                AdminStore.selectedBranchForGeneralReportReport = branch as IBranch;
                                                AdminStore.selectedBranchIdForGeneralReportReport = Number(val);
                                                // await AdminStore.genReport(Number(val),adminStore.selectedProfessionIdForGeneralReportReport); 
                                                
                                            }}
                                        >
                                            {[...PlatformStore.branchs.values()].filter((value: IBranch)=> value.districtId === district).map((branch:IBranch) => (
                                                <Option value={branch.branchId} key={branch.branchName}>
                                                {branch.branchName}
                                                </Option>
                                            ))}
                                        </Select>
                                </FormItem>
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                
                              <br/>
                                <Segmented
                                  options={["All Profession","Select Profession"]}   
                                  value={AdminStore.selectedProfOption}                 
                                  onChange={(value: SegmentedValue) => {
                                    AdminStore.selectedProfOption = String(value)
                                    setDisableProf(value == "Select Profession"?false:true)
                                    if(value == "All Profession"){
                                        AdminStore.selectedProfessionIdForGeneralReportReport = 0;
                                    }
                                  }}
                                ></Segmented>
                                <FormItem
                                    label="Profession"
                                    >
                                        <Select
                                            style={{ width: "100%" }}
                                            placeholder="select profession"
                                            disabled={disableProf}
                                            showSearch
                                            filterOption={(input, option) =>{
                                                return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                            }
                                            }
                                        
                                            value={profession}
                                            onChange={async(val, opt: any) => {
                                                AdminStore.selectedProfessionIdForGeneralReportReport = Number(val);
                                                setProfession(Number(val))
                                            }}
                                        >
                                            {[...PlatformStore.professions.values()].map((p:IProfession) => (
                                                <Option value={p.professionId} key={p.professionName}>
                                                  {p.professionName}
                                                </Option>
                                            ))}
                                        </Select>
                                </FormItem>
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                              <br/>
                              <Observer>
                                  {()=>(
                                      <Button
                                          key="submit"
                                          htmlType="submit"
                                          type="primary"
                                          disabled={branch !== undefined?false:true}
                                          style={{color:"wheat"}}
                                          onClick={async()=>{
                                            try {
                                              AdminStore.memberGeneralReportData.clear();
                                              AdminStore.reportTableContent.clear();
                                              AdminStore.branchInfoForReport =  {} as IBranchView;
                                              await AdminStore.genReport(adminStore.selectedBranchIdForGeneralReportReport,adminStore.selectedProfessionIdForGeneralReportReport); 
                                            } catch (error:any) {
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
                                          }}
                                      >
                                          Generate
                                      </Button>
                                  )
                                }
                              </Observer>
                            </div>
                        </div>
                    </Form>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md5 ms-lg5" style={{marginTop:"150px"}}>
                    <Form layout="vertical">

                   
                    <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                <FormItem
                                    label={<b>Province Address</b>}
                                    >
                                    <Input
                                    // disabled= {true}
                                        value={AdminStore.branchInfoForReport && AdminStore.branchInfoForReport.provinceAddress !== null && AdminStore.branchInfoForReport.provinceAddress !== undefined?AdminStore.branchInfoForReport.provinceAddress:""}
                                       readOnly
                                        bordered={false}
                                    />
                                </FormItem>
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                <FormItem
                                    label={<b>District Address</b>}
                                    >
                                    <Input
                                    // disabled= {true}
                                        value={AdminStore.branchInfoForReport && AdminStore.branchInfoForReport.districtAddress !== null && AdminStore.branchInfoForReport.districtAddress !== undefined?AdminStore.branchInfoForReport.districtAddress:""}
                                        readOnly
                                        bordered={false}
                                    />
                                </FormItem>
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                <FormItem
                                    label={<b>Branch Address</b>}
                                    >
                                    <Input
                                    // disabled= {true}
                                        value={AdminStore.branchInfoForReport && AdminStore.branchInfoForReport.branchAddress !== null && AdminStore.branchInfoForReport.branchAddress !== undefined?AdminStore.branchInfoForReport.branchAddress:""}
                                        readOnly
                                        bordered={false}
                                    />
                                </FormItem>
                            </div>
                        </div>
                    </Form>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4" style={{marginTop:"30px"}}>
                        <Divider>DETAILS OF PRINCIPAL OFFICERS OF THE BRANCH</Divider>
                        <Table
                            style={{ width: "100%" }}
                            size='small'
                            columns={columns}
                            bordered
                            dataSource={[...AdminStore.reportTableContent.values()]}
                            pagination={false}
                        />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{width:"1750px"}}>
                        <br/>
                        <br/>
                        <CommandBar
                        style={{}}
                        items={[
                            {
                            key: "refresh",
                            text: "Refresh",
                            name: "New",
                            disabled: branch !== undefined?false:true,
                            onRenderIcon: () => <ReloadOutlined className="qicon" />,
                            onClick: (
                                ev?:
                                | React.MouseEvent<HTMLElement, globalThis.MouseEvent>
                                | React.KeyboardEvent<HTMLElement>
                                | undefined,
                                item?: IContextualMenuItem | undefined
                            ) => {
                                AdminStore.genReport(adminStore.selectedBranchIdForGeneralReportReport,adminStore.selectedProfessionIdForGeneralReportReport);
                            },
                            },
                            {
                                key: 'pdf',
                                text: `Report`,
                                name: 'New',
                                //disabled: AdminStore.memberGeneralReportData.size > 0?false:true,
                                subMenuProps: {
                                    items: [
                                      {
                                        key: "bRep",
                                        text: "Download Branch Report",
                                        disabled: AdminStore.memberGeneralReportData.size > 0?false:true,
                                        // iconProps: { iconName: "Pdf" },
                                        onRenderIcon: () => <FilePdfOutlined className="qicon" />,
                                        onClick: () => {
                                          downloadReport()
                                      
                                        },
                                      },
                                      {
                                        key: "pRep",
                                        text: "Download Provincial Report...",
                                       // disabled: AdminStore.memberGeneralReportData.size > 0?false:true,
                                        // iconProps: { iconName: "Pdf" },
                                        onRenderIcon: () => <FilePdfOutlined className="qicon" />,
                                        onClick: () => {
                                          AdminStore.queryData = {} as IQueryData
                                            AdminStore.genderValue = "";
                                              AdminStore.openProvincialQueryReportDialog = true;
                                      
                                        },
                                      },
                                  
                                      
                                    ],
                                  },
                                onRenderIcon: () => <DownloadOutlined className="qicon" />,
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
                            onRender: () => <div style={{ width: "450px" }} />,
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
                    
                
                        <Observer>
                        {()=>(
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
                               { AdminStore.isDownloading && <ProgressIndicator
                description={`Please Wait While we generate this report...`}
                styles={{ root: { textAlign: "center" } }}
              ></ProgressIndicator>}
                                <div
                                    className="ag-theme-balham"
                                    style={{
                                    minHeight: "50vh",
                                    height: "60vh",
                                    width: "1750px",
                                    maxHeight: "80vh",
                                    }}
                                >
                                    <AgGridReact
                                    rowData={[...AdminStore.memberGeneralReportData.values()].map((row) => toJS(row))}
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

                    </div>
                </div>
              <ProvincialMemberReportQueryDialog/>
           
            </div>
        </Content>
      </Layout>
    )
})
export default GeneralReport;