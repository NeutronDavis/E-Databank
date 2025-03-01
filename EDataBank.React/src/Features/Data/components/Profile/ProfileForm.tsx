import { createContext, useContext, useState } from "react";
import { Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Segmented,
  Select,
  Space,
  Tag,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import { UserOutlined,ProjectOutlined, CalendarOutlined } from "@ant-design/icons";
import { Observer, observer } from "mobx-react-lite";
import { ProgressIndicator } from "@fluentui/react";
import { SegmentedValue } from "antd/lib/segmented";

import { profileStore } from "../../../Profile/store/ProfileStore";

import {
  ProfileValidationSchema,
} from "../../../../Utility/Validations/profileValidation";
import { platformStore } from "../../../Admin/store/platformStore";
import { IBand, IBranch, INationality, IPrincipalBand, IProfession, IQualification, IRank } from "../../../Admin/types/interface";
import moment from "moment";
import { ChangesType, IChangeRequest, IChanges, IChangesTableData } from "../../../Admin/components/profileChangeRequest/types/interface";
import { changeRequestStore } from "../../../Admin/components/profileChangeRequest/store/ChangeRequestStore";
import { getCurrentUser } from "../../../../Utility/helper";


const profileStoreCtx = createContext(profileStore);
const platformStoreCtx = createContext(platformStore);
const changeRequestStoreCtx = createContext(changeRequestStore);
type Props = {};

const { Option } = Select;
const ProfileForm = observer((props: Props) => {

  const ProfileStore = useContext(profileStoreCtx);
  const PlatformStore = useContext(platformStoreCtx);
  const ChangeRequestStore = useContext(changeRequestStoreCtx);
 
  const [fields, setFields] = useState<Array<string>>([]);
  return (
    <Modal
    open={ProfileStore.showProfileForm}
    width={"50%"}
    title="Profile Update Form"
    onCancel={() => {
        ProfileStore.showProfileForm = false;
    }}
    destroyOnClose={true}
    footer={false}
    maskClosable={false}
  >

  
    <Formik
        enableReinitialize={true}
        isInitialValid={true}
        initialValues={ProfileStore.basicProfile}
        // validationSchema={ProfileValidationSchema}
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
                profileStore.showProfileForm = false;
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
            isValid,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            handleBlur,
            submitForm
        }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
            <div className="ms-Grid" dir="ltr" >
                <Divider>Personal Information</Divider>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem
                            label="Title"
                            className="bsformm-formItems"
                            help={touched.title || errors.title}
                        >
                            <Segmented
                            options={["Mr", "Mrs","Dr","Prof","Ref","Hon","Engr","Arch","Bar"]}
                            value={values?.title}
                            onChange={(value: SegmentedValue) => {
                                setFieldValue("title", value, false);
                                setFields(f=>[...f,"title"])
                            }}
                            />
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
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
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
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
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
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
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
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
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
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
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem 
                            label={<b>Date of Birth {`(dd-mm-yyyy)`}</b>}
                            required
                            className="bsformm-formItems"
                            help={touched.dateOfBirth || errors.dateOfBirth}
                            // required
                        >
                             <Input
                            prefix={<CalendarOutlined style={{ color: "#A0AEC0" }} />}
                            placeholder="Enter your Date Of Birth (dd-mm-yyyy)"
                            value={values.dateOfBirth}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                                setFieldValue("dateOfBirth",event.target.value)
                                setFields(f=>[...f,"dateOfBirth"])
                            }}
                            name="dateOfBirth"
                            allowClear
                            />
                            {/* <DatePicker 
                                    size='small' 
                                    style={{ minWidth: "100%",height:"40px" }}
                                    format="dddd-MMMM-YYYY"
                                    value={values.dateOfBirth?moment(values.dateOfBirth) !== null?moment(values.dateOfBirth):moment(values.dateOfBirth.split('-').reverse().join('-')):undefined}
                                    onChange={(v: any, d) => {
                                        // console.log(d,v)
                                        setFieldValue("dateOfBirth",d);
                                        setFields(f=>[...f,"dateOfBirth"])
                                    }}
                                 /> */}
                        
                        </FormItem>
                    </div>
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
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
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
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
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
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
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
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
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
                    </div>
                </div>
                <Divider>Family Information</Divider>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
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
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem 
                            label={<b>Year Of Marriage</b>}
                            className="bsformm-formItems"
                            help={touched.yearOfMarriage || errors.yearOfMarriage}
                            // required
                        >
                            <DatePicker 
                            size='small' 
                            style={{ minWidth: "100%",height:"40px" }}
                            value={values.yearOfMarriage?moment(new Date(`1/1/${values.yearOfMarriage}`)):undefined}
                                onChange={(v: any, d) => {
                                console.log(d,v)
                                setFieldValue("yearOfMarriage",d);
                                setFields(f=>[...f,"yearOfMarriage"])
                            }}
                            picker="year" />
                
                        </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
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
                                setFields(f=>[...f,"noOfChildren"])
                            }}
                            />
                        </FormItem>
                    </div>
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
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                                setFieldValue("nameOfSpouse",event.target.value)
                                setFields(f=>[...f,"nameOfSpouse"])
                            }}
                            allowClear
                            />
                        </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
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
                                    {[...PlatformStore.ranks.values()].filter((rank:IRank)=> values.gender?rank.rankGender !== values.gender[0].toLocaleUpperCase():rank.rankGender !== "U").map((rank:IRank) => (
                                        <Option value={rank.rankId} key={rank.rankName}>
                                        {rank.rankName}
                                        </Option>
                                    ))}
                                    </Select>
                                </FormItem>
                            </>
                            )}
                        </Observer>
                    </div>
                    {/* <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">

                    </div> */}
                </div>
                <Divider>Church Information</Divider>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                            <Observer>
                                {()=>(
                                <>
                                    <FormItem label="Rank"  help={touched.rankId || errors.rankId}>
                                        <Select
                                        style={{ width: "100%" }}
                                        placeholder="select Rank"
                                        showSearch
                                        filterOption={(input, option) =>{
                                            console.log("myOption",option)
                                            return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                        }
                                        }
                                    
                                        value={values.rankId}
                                        onChange={(val, opt: any) => {
                                            setFieldValue("rankId",val);
                                            setFields(f=>[...f,"rankId"])
                                        }}
                                        >
                                        {[...PlatformStore.ranks.values()].filter((rank:IRank)=> values.gender?rank.rankGender === values.gender[0].toLocaleUpperCase():rank.rankGender !== "U").map((rank:IRank) => (
                                            <Option value={rank.rankId} key={rank.rankName}>
                                            {rank.rankName}
                                            </Option>
                                        ))}
                                        </Select>
                                    </FormItem>
                                </>
                                )}
                            </Observer>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                            <Observer>
                                {()=>(
                                <>
                                    <FormItem label="Branch"  help={touched.branchId || errors.branchId}>
                                        <Select
                                        style={{ width: "100%" }}
                                        placeholder="select Branch"
                                        showSearch
                                        filterOption={(input, option) =>{
                                            console.log("myOption",option)
                                            return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                        }
                                        }
                                    
                                        value={values.branchId}
                                        onChange={(val, opt: any) => {
                                            setFieldValue("branchId",val);
                                            setFields(f=>[...f,"branchId"])
                                        }}
                                        >
                                        {[...PlatformStore.branchs.values()].map((rank:IBranch) => (
                                            <Option value={rank.branchId} key={rank.branchName}>
                                            {rank.branchName}
                                            </Option>
                                        ))}
                                        </Select>
                                    </FormItem>
                                </>
                                )}
                            </Observer>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                            <Observer>
                                {()=>(
                                <>
                                    <FormItem label="Band"  help={touched.bandId || errors.bandId}>
                                        <Select
                                        style={{ width: "100%" }}
                                        placeholder="select Band"
                                        showSearch
                                        filterOption={(input, option) =>{
                                            console.log("myOption",option)
                                            return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                        }
                                        }
                                    
                                        value={values.bandId}
                                        onChange={(val, opt: any) => {
                                            setFieldValue("bandId",val);
                                            setFields(f=>[...f,"bandId"])
                                        }}
                                        >
                                        {[...PlatformStore.bands.values()].map((rank:IBand) => (
                                            <Option value={rank.bandId} key={rank.bandName}>
                                            {rank.bandName}
                                            </Option>
                                        ))}
                                        </Select>
                                    </FormItem>
                                </>
                                )}
                            </Observer>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    <Observer>
                                {()=>(
                                <>
                                    <FormItem label="PrincipalBand"  help={touched.principalBandId || errors.principalBandId}>
                                        <Select
                                        style={{ width: "100%" }}
                                        placeholder="Select PrincipalBand"
                                        showSearch
                                        filterOption={(input, option) =>{
                                            console.log("myOption",option)
                                            return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                        }
                                        }
                                    
                                        value={values.principalBandId}
                                        onChange={(val, opt: any) => {
                                            setFieldValue("principalBandId",val);
                                            setFields(f=>[...f,"principalBandId"])
                                        }}
                                        >
                                        {[...PlatformStore.principalBands.values()].map((rank:IPrincipalBand) => (
                                            <Option value={rank.principalBandId} key={rank.principalBandName}>
                                            {rank.principalBandName}
                                            </Option>
                                        ))}
                                        </Select>
                                    </FormItem>
                                </>
                                )}
                            </Observer>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <FormItem
                            label="Current/Previous position held in church"
                            required
                            help={touched.cppInChurch || errors.cppInChurch}
                            className="bsformm-formItems"
                        >
                            <Input
                            prefix={<UserOutlined style={{ color: "#A0AEC0" }} />}
                            placeholder="Enter your cPPInChurch"
                            value={values?.cppInChurch}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                                setFieldValue("cppInChurch",event.target.value)
                                setFields(f=>[...f,"cppInChurch"])
                            }}
                            name="cppInChurch"
                            allowClear
                            />
                        </FormItem>
                    </div>
                    {/* <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">

                    </div> */}
                </div>
            </div>

            <FormItem style={{ paddingTop: "20px", textAlign: "right" }}>
                <Space>
                <Button
                    type="link"
                    onClick={() => {
                        ProfileStore.showProfileForm = false;
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    htmlType="button" 
                    type="primary"
                    disabled={fields.length > 0?false:true}
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
    </Modal>
  );
});

export default ProfileForm;
