import { createContext, useContext, useState,useEffect,useRef } from "react";
import { observer } from "mobx-react-lite";
import {
    CalendarOutlined,
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    FileExcelOutlined,
    KeyOutlined,
    LockOutlined,
    ReloadOutlined,
    UserOutlined,
  } from "@ant-design/icons";
 
  import {
    Button,
    Select,
    Form,
    Space,
    Divider,
    Input,
    notification,
    Tag,
    Modal,
    Table,
    DatePicker,
    Segmented,
    InputNumber,
  } from "antd";
  import { DialogType, MessageBar, MessageBarType,  Panel,  Spinner, SpinnerSize } from "@fluentui/react";
  import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
 
  import * as yup from "yup";
  import { Formik } from "formik";
  import FormItem from "antd/lib/form/FormItem";
  import TextArea from "antd/lib/input/TextArea";
 
  import { SubPageHeaderTitle } from "../../../../../../shared/SubPageHeaderTitle";
  import Moment from "react-moment";

import { IUser } from "../../../../../Home/types/interfaces";
import adminStore from "../../../../store/adminstore";
import PhoneInput from "react-phone-input-2";
import moment from "moment";
import { SegmentedValue } from "antd/lib/segmented";
import { platformStore } from "../../../../store/platformStore";
import { IBand, IBranch, INationality, IPrincipalBand, IProfession, IQualification, IRank } from "../../../../types/interface";
import { Country, State, City } from "country-state-city";
import DialogEx from "../../../../../../Utility/IDialog";
import "../../../../styles/dialogEx.css"
const { Option } = Select;
const _ = require("underscore");
const adminStoreCtx = createContext(adminStore);
const platformStoreCtx = createContext(platformStore);
const initialFormValues: IUser = {
    title: "",
    otherName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth:"",
    gender: "",
    address: "",
    
    maritalStatus: "Single",
    yearOfMarriage:undefined,
    nameOfSpouse: "",
    noOfChildren: 0,

    rankId:undefined,
    branchId:undefined,
    bandId:undefined,
    principalBandId:undefined,
    ordinationRankOfSpouse:undefined,
    cPPInChurch: "",

    nationality1Id:undefined,
    nationality2Id:undefined,

    occupation: "",
    professionId:undefined,
    qualificationId:undefined,
    usersId: "",
    ordinationYear:""
}
const newMemberValidation = yup.object().shape({
    title: yup.string().required("Member's title is required"),
    otherName: yup.string().required("Member's other names are required"),
    lastName: yup.string().required("Member's last names is required"),
    email: yup.string().email().required("Member's email is required"),
    phoneNumber: yup.string().required("Member's phone number is required"),
    dateOfBirth:yup.string().required("Member's date of birth is required"),
    gender:yup.string().required("Member's gender is required"),
    address:yup.string().required("Member's address is required"),

    rankId:yup.string().required("Member's current rank is required"),
    branchId:yup.string().required("Member's branch is required"),
    bandId:yup.string().required("Member's band is required"),
    principalBandId:yup.string().required("Member's principal band is required"),
    cPPInChurch:yup.string().required("Member's CPPInChurch is required"),
    ordinationYear:yup.string().required("Member's ordination year is required"),
});


const MemberRegistrationDialog = observer(()=>{
    const AdminStore = useContext(adminStoreCtx);
    const PlatformStore = useContext(platformStoreCtx);
    let maritalStatus:Array<string> = ["Single","Married","Widowed","Divorced","Celibate"]
    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 350 },
      };

      let genderInitials = (gender:string)=>{
        let initial = ""
        if(gender === "Male"){
            initial = "F"
        }else{
            initial = "M"
        }
        return initial
      }
    return(
 
    <Modal
    open={AdminStore.showMemberRegistrationDialog}
    width={"40%"}
    title="Register New Member"
    onCancel={() => {
        AdminStore.showMemberRegistrationDialog = false;
    }}
    destroyOnClose={true}
    footer={false}
    maskClosable={false}
  >

    <Formik
        initialValues={initialFormValues}
        enableReinitialize={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const user = values as IUser;
          try {
            let res = await AdminStore.registerMemberFromSystem(user);
            if (res.success) {
                resetForm();
                AdminStore.showMemberRegistrationDialog = !AdminStore.showMemberRegistrationDialog;
                notification.success({
                  message: "EDataBank Platform Feedback ",
                  description:"Member registration successful",
                });  
            }
          } catch (error: any) {
            notification.error({
              message: "EDataBank Platform Feedback ",
              description: error?.response?.body?.msg,
            });
          }
        }
    }
        //isInitialValid={false}
        validationSchema={newMemberValidation}
        validateOnMount={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          resetForm,
          isValid,
        }) => {
          return (
            <Form layout="vertical" onFinish={handleSubmit}>


              <div className="ms-Grid" dir="ltr" >
                <Divider>Member Basic Information</Divider>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <FormItem
                            label="Title"
                            className="bsformm-formItems"
                            help={touched.title || errors.title}
                            required
                        >
                            <Segmented
                            options={["Mr", "Mrs","Dr","Prof","Ref","Hon","Engr","Arch","Bar"]}
                            value={values?.title}
                            onChange={(value: SegmentedValue) => {
                                setFieldValue("title", value);
                            }}
                            />
                        </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-md3 ms-lg6">
                    <FormItem
                      required
                      label="Other Names"
                      help={touched.otherName || errors.otherName}
                    >
                      <Input
                        placeholder="Enter Other Names"
                        value={values?.otherName}
                        onChange={handleChange}
                        name="otherName"
                        allowClear
                      />
                    </FormItem>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                          <FormItem
                          required
                          label="Last Name"
                          help={touched.lastName || errors.lastName}
                        >
                          <Input
                            placeholder="Enter Last Name"
                            value={values?.lastName}
                            onChange={handleChange}
                            name="lastName"
                            allowClear
                          />
                        </FormItem>
                  </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md3 ms-lg6">
                        <FormItem
                        required
                        label="Email"
                        help={touched.email || errors.email}
                        >
                        <Input
                            placeholder="Enter Email"
                            value={values?.email}
                            onChange={handleChange}
                            name="email"
                            allowClear
                        />
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem
                            required
                            label={
                                <>
                                <div style={{ paddingTop: "15px" }}>
                                    Phone Number
                                </div>
                                </>
                            }
                            help={touched.phoneNumber || errors.phoneNumber}
                        >
                            <PhoneInput
                                country={"ng"}
                                enableSearch={true}
                                value={values?.phoneNumber}
                                onChange={(phone) => {
                                setFieldValue("phoneNumber", phone);
                                }}
                                inputStyle={{ width: "100%" }}
                            />
                        </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem 
                            label={<b>Date of Birth {`(dd-mm-yyyy)`}</b>}
                            className="bsformm-formItems"
                            help={touched.dateOfBirth || errors.dateOfBirth}
                            required
                        >
                            <Input
                                prefix={<CalendarOutlined style={{ color: "#A0AEC0" }} />}
                                placeholder="Enter your Date Of Birth (dd-mm-yyyy)"
                                value={values.dateOfBirth}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                                    setFieldValue("dateOfBirth",event.target.value)
                                   
                                }}
                                name="dateOfBirth"
                                allowClear
                            />
                            {/* <DatePicker 
                                size='large' 
                                style={{ minWidth: "100%",height:"40px" }}
                                onChange={(v: any, d) => {
                                    setFieldValue("yearOfBirth",Number(d));
                                }}
                            picker="year" /> */}
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem
                            label="Gender"
                            className="bsformm-formItems"
                            help={touched.gender || errors.gender}
                            required
                        >
                            <Segmented
                            options={["Male", "Female"]}
                            value={values?.gender}
                            onChange={(value: SegmentedValue) => {
                                setFieldValue("gender", value);
                            }}
                            ></Segmented>
                        </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <FormItem
                      required
                      label="Address"
                      help={touched.address || errors.address}
                    >
                      <TextArea
                        placeholder="Adddress"
                        value={values?.address}
                        onChange={handleChange}
                        name="address"
                        allowClear
                        rows={4}
                      />
                    </FormItem>
                  </div>
                </div>

                <Divider>Member Family Information</Divider>

                <div className="ms-Grid-row">
                
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem
                            label="Marital Status"
                            className="bsformm-formItems"
                            help={touched.maritalStatus || errors.maritalStatus}
                        >
                            <Select
                                style={{ width: "100%" }}
                                placeholder={"select marital Status"}
                                showSearch
                                filterOption={(input, option) =>{
                                    return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                }
                                }
                                value={values?.maritalStatus}
                                onChange={(val, opt: any) => {
                                    setFieldValue("maritalStatus", val, false);
                                }}
                            >
                                {maritalStatus.map((val:string,index:number)=>(
                                    <Option value={val} key={index} >
                                        {val}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem 
                            label={<b>Year Of Marriage</b>}
                            className="bsformm-formItems"
                            help={touched.yearOfMarriage || errors.yearOfMarriage}
                            // required
                        >
                            <DatePicker 
                            size='large' 
                            style={{ minWidth: "100%",height:"40px" }}
                             onChange={(v: any, d) => {
                                setFieldValue("yearOfMarriage",Number(d));
                            }}
                            picker="year" />
                      
                        </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem
                            label="Name Of Spouse"
                        
                            help={touched.nameOfSpouse || errors.nameOfSpouse}
                            className="bsformm-formItems"
                        >
                            <Input
                            prefix={<UserOutlined style={{ color: "#A0AEC0" }} />}
                            placeholder="Enter your spouse name"
                            value={values?.nameOfSpouse}
                            name="nameOfSpouse"
                            onChange={handleChange}
                            allowClear
                            />
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem
                            label="Number Of Children"
                            // required
                            help={touched.noOfChildren || errors.noOfChildren}
                            className="bsformm-formItems"
                        >
                            <InputNumber
                            style={{width:"200px"}}
                            prefix={<UserOutlined style={{ color: "#A0AEC0" }} />}
                            placeholder="Enter your children count"
                            value={values?.noOfChildren}
                            name="noOfChildren"
                            onChange={(value: number | null)=>{
                                setFieldValue("noOfChildren",value);
                            }}
                            />
                        </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem label="Ordination Rank Of Spouse"   help={touched.ordinationRankOfSpouse || errors.ordinationRankOfSpouse}>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="select your ordination rank of spouse"
                                showSearch
                                filterOption={(input, option) =>{
                                    return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                }
                                }
                            
                                value={values.ordinationRankOfSpouse}
                                onChange={(val, opt: any) => {
                                    setFieldValue("ordinationRankOfSpouse",val);
                                }}
                            >
                                {[...PlatformStore.ranks.values()].map((rank:IRank) => (
                                    <Option value={rank.rankId} key={rank.rankName}>
                                        {rank.rankName}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </div>
                </div>

                <Divider>Member Church Information</Divider>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 ">
                        <FormItem label="Rank"  help={touched.rankId || errors.rankId} required>
                                <Dropdown
                                // label="select your rank"
                                placeholder="select your rank"
                                defaultSelectedKey={values.rankId}
                                
                                onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any> | undefined, index?: number | undefined)=>{
                                    setFieldValue("rankId",option?.key);
                                }}
                                // selectedKeys={values.rankId}
                                options={[...PlatformStore.ranks.values()].filter((rank:IRank)=> rank.rankGender !== genderInitials(values.gender) ).map((rank:IRank) => {
                                    return  { key: rank.rankId, text:rank.rankName}

                                })}
                                disabled={values.gender == ""?true:false}
                                styles={dropdownStyles}
                            />
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem label="Branch"  help={touched.branchId || errors.branchId} required>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="select your branch"
                                showSearch
                                filterOption={(input, option) =>{
                                    return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                }
                                }
                            
                                value={values.branchId}
                                onChange={(val, opt: any) => {
                                    setFieldValue("branchId",val);
                                }}
                            >
                                {[...PlatformStore.branchs.values()].map((branch:IBranch) => (
                                    <Option value={branch.branchId} key={branch.branchName}>
                                    {branch.branchName}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6" >
                        <FormItem label="Band"  help={touched.bandId || errors.bandId} required>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="select your band"
                                showSearch
                                filterOption={(input, option) =>{
                                    return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                }
                                }
                            
                                value={values.bandId}
                                onChange={(val, opt: any) => {
                                    setFieldValue("bandId",val);
                                }}
                            >
                                {[...PlatformStore.bands.values()].map((band:IBand) => (
                                    <Option value={band.bandId} key={band.bandName}>
                                        {band.bandName}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem label="Principal Band" required  help={touched.principalBandId || errors.principalBandId}>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="select your principalBand"
                                showSearch
                                filterOption={(input, option) =>{
                                    return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                }
                                }
                            
                                value={values.principalBandId}
                                onChange={(val, opt: any) => {
                                    setFieldValue("principalBandId",val);
                                }}
                            >
                                {[...PlatformStore.principalBands.values()].map((principalBand:IPrincipalBand) => (
                                    <Option value={principalBand.principalBandId} key={principalBand.principalBandName}>
                                    {principalBand.principalBandName}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem
                            label="Year of ordination"
                            required
                            help={touched.ordinationYear || errors.ordinationYear}
                            className="bsformm-formItems"
                        >
                            <DatePicker 
                                size='large' 
                                style={{ minWidth: "100%",height:"40px" }}
                                onChange={(v: any, d) => {
                                    console.log(d,v)
                                    setFieldValue("ordinationYear",d);
                                }}
                            picker="year" />
                            {/* <Input
                                placeholder="Year of ordination"
                                value={values?.ordinationYear}
                                onChange={handleChange}
                                name="ordinationYear"
                                allowClear
                            /> */}
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem
                            label="Current/Previous Position Held In Church"
                            required
                            help={touched.cPPInChurch || errors.cPPInChurch}
                            className="bsformm-formItems"
                        >
                            <Input
                                placeholder="Enter member cPP In Church"
                                value={values?.cPPInChurch}
                                onChange={handleChange}
                                name="cPPInChurch"
                                allowClear
                            />
                        </FormItem>
                    </div>
                </div>
             
                <Divider>Member Personal Information</Divider>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem label="Nationality1"  help={touched.nationality1Id || errors.nationality1Id}>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="select Country"
                                showSearch
                                filterOption={(input, option) =>{
                                    return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                }
                                }
                      
                                value={values.nationality1Id}
                                onChange={(val, opt: any) => {
                                    setFieldValue("nationality1Id",val);           
                                }}
                            >
                              {[...PlatformStore.nationalities.values()].map((nationality:INationality) => (
                                        <Option value={nationality.nationalityId} key={nationality.nationalityName}>
                                        {nationality.nationalityName}
                                        </Option>
                              ))}
                            </Select>
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem label="Nationality2"  help={touched.nationality2Id || errors.nationality2Id}>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="select Country"
                                showSearch
                                filterOption={(input, option) =>{
                                    return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                }
                                }
                            
                                value={values.nationality2Id}
                                onChange={(val, opt: any) => {
                                    setFieldValue("nationality2Id",val);
                                }}
                            >
                                {[...PlatformStore.nationalities.values()].map((nationality:INationality) => (
                                    <Option value={nationality.nationalityId} key={nationality.nationalityName}>
                                    {nationality.nationalityName}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem label="Profession"  help={touched.professionId || errors.professionId}>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="select your profession"
                                showSearch
                                filterOption={(input, option) =>{
                                    return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                }
                                }
                            
                                value={values.professionId}
                                onChange={(val, opt: any) => {
                                    setFieldValue("professionId",val);
                                }}
                            >
                                {[...PlatformStore.professions.values()].map((profession:IProfession) => (
                                    <Option value={profession.professionId} key={profession.professionName}>
                                        {profession.professionName}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem label="Qualification"  help={touched.qualificationId || errors.qualificationId}>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="select your qualification"
                                showSearch
                                filterOption={(input, option) =>{
                                        return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                    }
                                }
                            
                                value={values.qualificationId}
                                onChange={(val, opt: any) => {
                                    setFieldValue("qualificationId",val);
                                }}
                            >
                                {[...PlatformStore.qualifications.values()].map((qualification:IQualification) => (
                                    <Option value={qualification.qualificationId} key={qualification.qualificationName}>
                                        {qualification.qualificationName}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem
                            label="Occupation"
                            help={touched.occupation || errors.occupation}
                        >
                            <Input
                                placeholder="Enter Occupation"
                                value={values?.occupation}
                                onChange={handleChange}
                                name="occupation"
                                allowClear
                            />
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                       
                    </div>
                </div>



      
              
                  <FormItem>
                    <Divider />
                  </FormItem> 
                <div className="ms-Grid-row" style={{ marginTop: "10px" }}>
                    <div className="ms-Grid-col ms-sm12">
                      {isSubmitting && (
                        <Spinner
                          label="Pleas wait..."
                          ariaLive="assertive"
                          labelPosition="right"
                          size={SpinnerSize.large}
                        />
                      )}
                    </div>
                </div>
              
                  <FormItem>
                    <div className="ms-Grid" dir="ltr">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                          {" "}
                          <Space>
                            <Button
                              type="link"
                              onClick={() => {
                                resetForm();
                              }}
                            >
                              Clear Entries
                            </Button>
                          </Space>
                        </div>
                        
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">
                          <Space
                            align="end"
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <Button
                              type="link"
                              onClick={() => {
                                AdminStore.showMemberRegistrationDialog =
                                  false;
                              }}
                            >
                              Cancel
                            </Button>

                            <Button key="submit" htmlType="submit" type="primary" disabled={!isValid} style={{color:"white"}}>
                              Submit
                            </Button>
                          </Space>
                        </div>
                      </div>
                    </div>
                  </FormItem>
              </div>
            </Form>
          );
        }}
      </Formik>
      </Modal>
    )
})

export default MemberRegistrationDialog;