import { createContext, useContext, useState } from "react";
import { Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Segmented,
  Select,
  Space,
  Tag,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import { UserOutlined,ProjectOutlined } from "@ant-design/icons";
import { Observer, observer } from "mobx-react-lite";
import { ProgressIndicator } from "@fluentui/react";
import { SegmentedValue } from "antd/lib/segmented";

import { profileStore as ProfileStore } from "../../store/ProfileStore";
import { homeStore as HomeStore } from "../../../Home/store/HomeStore";
import { signUpView, CurrentUser } from "../../../Home/types/interfaces";
import {IProfile } from "../../types/interface";
import {
  ProfileValidationSchema,
} from "../../../../Utility/Validations/profileValidation";
import { Country, State, City } from "country-state-city";
import { platformStore } from "../../../Admin/store/platformStore";
import { IBranch, INationality, IProfession, IQualification, IRank } from "../../../Admin/types/interface";
import moment from "moment";
import { ChangesType, IChangeRequest, IChanges, IChangesTableData } from "../../../Admin/components/profileChangeRequest/types/interface";
import { changeRequestStore } from "../../../Admin/components/profileChangeRequest/store/ChangeRequestStore";
import { getCurrentUser } from "../../../../Utility/helper";

const HomeStoreCtx = createContext(HomeStore);
const ProfileStoreCtx = createContext(ProfileStore);
const platformStoreCtx = createContext(platformStore);
const changeRequestStoreCtx = createContext(changeRequestStore);
type Props = {};

const { Option } = Select;
const BasicSettingsForm = observer((props: Props) => {
  const homeStore = useContext(HomeStoreCtx);
  const profileStore = useContext(ProfileStoreCtx);
  const PlatformStore = useContext(platformStoreCtx);
  const ChangeRequestStore = useContext(changeRequestStoreCtx);
  const [country, setCountry] = useState<string>("NG");
  const [fields, setFields] = useState<Array<string>>([]);
  return (
    <Formik
      enableReinitialize={true}
      isInitialValid={true}
      initialValues={profileStore.basicProfile}
      validationSchema={ProfileValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const fieldsWithoutDuplicates = [...new Set(fields)];
          let vd: Array<IChanges> = [];
          fieldsWithoutDuplicates.forEach((v: string, i: number) => {
            // Assuming values is an object
            if (values.hasOwnProperty(v)) {
              vd.push({ value: values[v], field: v });
            } else {
              // Handle the case where the values object does not have a property with the specified field name
              console.error(`Property '${v}' not found in 'values' object.`);
            }
          });
          let request:IChangeRequest ={
              changesType:ChangesType.Profile,
              fieldsModified:vd.map((value: IChanges)=>value.field).join(","),
              fieldValue:vd.map((value: IChanges)=>value.value).join(","),
              ordinationId:0,
              usersId:getCurrentUser().id
          }

          let retVal = await ChangeRequestStore.submitChangeRequest(request);

          if (retVal.success) {
            notification.success({
              message: "EDataBank Feedback",
              description:retVal.msg,
            });
            profileStore.showBasicSettingsForm = false;
          }
        } catch (error: any) {
          notification.error({
            message: "EDataBank Feedback",
            description: error.message,
          });
        } finally {
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,

        handleSubmit,
        isSubmitting,
        setFieldValue,
        handleBlur,
        submitForm
      }) => (
        <Form layout="vertical" onFinish={handleSubmit}>
          <FormItem
            label="Title"
            className="bsformm-formItems"
            help={touched.title || errors.title}
          >
            <Segmented
              options={["Mr", "Mrs", "Miss", "Master"]}
              value={values?.title}
              onChange={(value: SegmentedValue) => {
                setFieldValue("title", value, false);
                setFields(f=>[...f,"title"])
              }}
            />
          </FormItem>

          <FormItem
            label="Last Name"
            required
            help={touched.lastName || errors.lastName}
            className="bsformm-formItems"
          >
            <Input
              prefix={<UserOutlined style={{ color: "#A0AEC0" }} />}
              placeholder="Enter your LastName"
              value={values?.lastName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setFieldValue("lastName",event.target.value)
                setFields(f=>[...f,"title"])
              }}
              name="lastName"
              allowClear
            />
          </FormItem>
          <FormItem
            label="Other Name"
            required
            help={touched.otherName || errors.otherName}
            className="bsformm-formItems"
          >
            <Input
              prefix={<UserOutlined style={{ color: "#A0AEC0" }} />}
              placeholder="Enter your otherNames"
              value={values?.otherName}
              name="otherName"
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setFieldValue("otherName",event.target.value)
                setFields(f=>[...f,"otherName"])
              }}
              allowClear
            />
          </FormItem>
          <FormItem
            label="Email"
            required
            help={touched.email || errors.email}
            className="bsformm-formItems"
          >
            <Input
              prefix={<UserOutlined style={{ color: "#A0AEC0" }} />}
              placeholder="Enter your Email"
              value={values?.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setFieldValue("email",event.target.value)
                setFields(f=>[...f,"email"])
              }}
              name="email"
              allowClear
            />
          </FormItem>
          <FormItem
            label="Phone Number"
            className="bsformm-formItems"
            help={touched.phoneNumber || errors.phoneNumber}
          >
            <PhoneInput
              country={"ng"}
              enableSearch={true}
              value={values?.phoneNumber}
              onChange={(phoneNumber) => {
                setFieldValue("phoneNumber", phoneNumber);
                setFields(f=>[...f,"phoneNumber"])
              }}
            />
          </FormItem>
          <FormItem
            label="Gender"
            className="bsformm-formItems"
            help={touched.gender || errors.gender}
          >
            <Segmented
              options={["Male", "Female"]}
              value={values?.gender}
              onChange={(value: SegmentedValue) => {
                setFieldValue("gender", value, false);
                setFields(f=>[...f,"gender"])
              }}
            ></Segmented>
          </FormItem>
          <FormItem 
            label={<b>Date of Birth</b>}
            required
            className="bsformm-formItems"
              help={touched.dateOfBirth || errors.dateOfBirth}
              // required
        >
           <DatePicker 
                size='large' 
                style={{ minWidth: "100%",height:"40px" }}
                onChange={(v: any, d) => {
                    console.log(d,v)
                    setFieldValue("dateOfBirth",d);
                    setFields(f=>[...f,"dateOfBirth"])
                }}
            picker="year" />
            {/* <DatePicker
                size='large'         
                style={{ minWidth: "100%",height:"40px" }}
                format="dddd Do MMMM YYYY"
                defaultValue={values.dateOfBirth? moment(values?.dateOfBirth):moment()}
                onBlur={handleBlur}
                
                onChange={(v: any, d) => {
                    setFieldValue("dateOfBirth",moment(v._d).format("MM/DD/YYYY"));
                    setFields(f=>[...f,"gender"])
                }}
               
            /> */}
        </FormItem>
          <FormItem
            label="Marital Status"
            className="bsformm-formItems"
            help={touched.maritalStatus && errors.maritalStatus}
          >
            <Segmented
              options={["Single", "Married", "Widowed", "Divorced","Celibate"]}
              value={values?.maritalStatus}
              onChange={(value: SegmentedValue) => {
                setFieldValue("maritalStatus", value, false);
                setFields(f=>[...f,"maritalStatus"])
              }}
            ></Segmented>
          </FormItem>
          <FormItem 
            label={<b>Date Of Marriage</b>}
            className="bsformm-formItems"
              help={touched.yearOfMarriage || errors.yearOfMarriage}
              // required
        >
            <DatePicker 
              size='large' 
              style={{ minWidth: "100%",height:"40px" }}
                onChange={(v: any, d) => {
                  console.log(d,v)
                  setFieldValue("yearOfMarriage",d);
                  setFields(f=>[...f,"yearOfMarriage"])
              }}
              picker="year" />
            {/* <DatePicker
                size='large'         
                style={{ minWidth: "100%",height:"40px" }}
                format="dddd Do MMMM YYYY"
                defaultValue={values.yearOfMarriage? moment(values?.yearOfMarriage):moment()}
                onBlur={handleBlur}
                
                onChange={(v: any, d) => {
                    setFieldValue("yearOfMarriage",moment(v._d).format("MM/DD/YYYY"));
                    setFields(f=>[...f,"yearOfMarriage"])
                }}
               
            /> */}
        </FormItem>
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
                setFields(f=>[...f,"noOfChildren"])
              }}
            />
          </FormItem>
          <FormItem label="Nationality1"  help={touched.nationality1Id || errors.nationality1Id}>
              <Select
                style={{ width: "100%" }}
                placeholder="select Country"
                showSearch
                filterOption={(input, option) =>{
                  console.log("myOption",option)
                    return String(option!.key).toLowerCase().includes(input.toLowerCase())
                  }
                }
                value={values.nationality1Id}
                onChange={(val, opt: any) => {
                  setFieldValue("nationality1Id",val);
                  setFields(f=>[...f,"nationality1Id"])
                }}
              >
                 {[...PlatformStore.nationalities.values()].map((nationality:INationality) => (
                        <Option value={nationality.nationalityId} key={nationality.nationalityName}>
                          {nationality.nationalityName}
                        </Option>
                  ))}
              </Select>
            </FormItem>
      
          <FormItem label="Nationality2"  help={touched.nationality2Id || errors.nationality2Id}>
              <Select
                style={{ width: "100%" }}
                placeholder="select Country"
                showSearch
                filterOption={(input, option) =>{
                  console.log("myOption",option)
                  return String(option!.key).toLowerCase().includes(input.toLowerCase())
                  }
                }
                value={values.nationality2Id}
                onChange={(val, opt: any) => {
                  setFieldValue("nationality2Id",val);
                  setFields(f=>[...f,"nationality2Id"])
                }}
              >
                {[...PlatformStore.nationalities.values()].map((nationality:INationality) => (
                        <Option value={nationality.nationalityId} key={nationality.nationalityName}>
                          {nationality.nationalityName}
                        </Option>
                  ))}
              </Select>
            </FormItem>
            <FormItem
            label="Occupation"
            
            help={touched.occupation || errors.occupation}
            className="bsformm-formItems"
          >
            <Input
              prefix={<ProjectOutlined style={{ color: "#A0AEC0" }} />}
              placeholder="Enter your occupation"
              value={values?.occupation}
              name="occupation"
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setFieldValue("occupation",event.target.value)
                setFields(f=>[...f,"occupation"])
              }}
              allowClear
            />
          </FormItem>
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setFieldValue("nameOfSpouse",event.target.value)
                setFields(f=>[...f,"nameOfSpouse"])
              }}
              allowClear
            />
          </FormItem>
          <Observer>
            {()=>(
              <>
                <FormItem label="Ordination Rank Of Spouse"  help={touched.ordinationRankOfSpouse || errors.ordinationRankOfSpouse}>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="select Ordination Rank Of Spouse"
                      showSearch
                      filterOption={(input, option) =>{
                        console.log("myOption",option)
                        return String(option!.key).toLowerCase().includes(input.toLowerCase())
                      }
                      }
                  
                      value={values.ordinationRankOfSpouse}
                      onChange={(val, opt: any) => {
                        setFieldValue("ordinationRankOfSpouse",val);
                        setFields(f=>[...f,"ordinationRankOfSpouse"])
                      }}
                    >
                      {[...PlatformStore.ranks.values()].filter((rank:IRank)=> rank.rankGender !== "M" ).map((rank:IRank) => (
                        <Option value={rank.rankId} key={rank.rankName}>
                          {rank.rankName}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                <FormItem label="Qualification"  help={touched.qualificationId || errors.qualificationId}>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="select Your Qualification"
                      showSearch
                      filterOption={(input, option) =>{
                        // console.log("myOption",option)
                        return String(option!.key).toLowerCase().includes(input.toLowerCase())
                      }
                      }
                  
                      value={values.qualificationId}
                      onChange={(val, opt: any) => {
                        setFieldValue("qualificationId",val);
                        setFields(f=>[...f,"qualificationId"])
                      }}
                    >
                      {[...PlatformStore.qualifications.values()].map((qualification:IQualification) => (
                        <Option value={qualification.qualificationId} key={qualification.qualificationName}>
                          {qualification.qualificationName}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
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
                        setFields(f=>[...f,"professionId"])
                      }}
                    >
                      {[...PlatformStore.professions.values()].map((profession:IProfession) => (
                        <Option value={profession.professionId} key={profession.professionName}>
                          {profession.professionName}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
            

              </>
            )}
          </Observer>
          <FormItem style={{ paddingTop: "20px", textAlign: "right" }}>
            <Space>
              <Button
                type="link"
                onClick={() => {
                  profileStore.showBasicSettingsForm = false;
                }}
              >
                Cancel
              </Button>
              <Button 
                htmlType="button" 
                type="primary"
                onClick={()=>submitForm()}
                >
                Save
              </Button>
            </Space>
          </FormItem>
          <Observer>
            {() => (
              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                {ChangeRequestStore.isSaving && (
                  <ProgressIndicator
                    description="sending update request..."
                    styles={{ root: { textAlign: "center" } }}
                  ></ProgressIndicator>
                )}
              </div>
            )}
          </Observer>
        </Form>
      )}
    </Formik>
  );
});

export default BasicSettingsForm;
