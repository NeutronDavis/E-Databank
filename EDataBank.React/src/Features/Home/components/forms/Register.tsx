import { Link, ProgressIndicator } from "@fluentui/react";
import "react-phone-input-2/lib/plain.css";
import { Stack } from "@fluentui/react/lib/Stack";
import React, { createContext, useContext, useEffect } from "react";
import { Form, Input, Button, notification, Space, Checkbox, Select, Segmented } from "antd";
import { LockOutlined, CheckOutlined, MailOutlined } from "@ant-design/icons";
/* import ReCAPTCHA from "react-google-recaptcha"; */
import { Formik } from "formik";
import { Observer, observer } from "mobx-react-lite";
import { homeStore as HomeStore } from "../../store/HomeStore";
import { signUpView, PrivacyPolicy } from "../../types/interfaces";
import PhoneInput from "react-phone-input-2";
import {
  IRegister,
  RegisterValidationSchema,
} from "../../../../Utility/Validations/HomeValidations";
import FormItem from "antd/es/form/FormItem";
import { platformStore } from "../../../Admin/store/platformStore";
import { IBand, IBranch, INationality, IPrincipalBand, IProfession, IQualification, IRank } from "../../../Admin/types/interface";
import { SegmentedValue } from "antd/lib/segmented";
const { Option } = Select;


const HomeStoreCtx = createContext(HomeStore);
const platformStoreCtx = createContext(platformStore);



const InitRegister: IRegister = {
  title:"Mr",
  otherName: "",
  email: "",
  lastName: "",
  gender: "Male",
  password: "",
  branchId:undefined,
  bandId:undefined,
  principalBandId:undefined,
  nationality1Id:undefined,
  nationality2Id:undefined,
  professionId:undefined,
  qualificationId:undefined,
  rankId:undefined,
  phoneNumber: "",
  confirmPassword: "",
  acceptTerms: false,
};

type Props = {};

const Register = observer((props: Props) => {
  const homeStore = useContext(HomeStoreCtx);
  const PlatformStore = useContext(platformStoreCtx);
  let genderInitials = (gender:string)=>{
    let initial = ""
    if(gender === "Male"){
        initial = "F"
    }else{
        initial = "M"
    }
    return initial
  }
  return (
    <Stack horizontalAlign="start" className="ms-motion-fadeIn">
      <Formik
        initialValues={InitRegister}
        validationSchema={RegisterValidationSchema}
        validateOnBlur={true}
        enableReinitialize={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            homeStore.isLoading = true;
            const retVal = await homeStore.registerUser(values);
            if (retVal.success) {
              notification.success({
                message: "SignUp Feedback",
                description: retVal.msg,
              });
              const { email } = values;

              homeStore.signUpView = signUpView.ValidateToken;
              homeStore.username = email;
              // homeStore.password = password;
            } else {
              notification.info({
                message: "SignUp Feedback",
                description: retVal.msg,
              });
            }

            homeStore.isLoading = false;
          } catch (error: any) {
            if (!error.response) {
              notification.error({
                key: "error",
                message: "SignUp Feedback",
                description:
                  "EDataBank api server is not reachable, please contact",
              });
              homeStore.isLoading = false;
            }

            notification.error({
              message: "SignUp Feedback",
              description: error?.response?.body?.msg,
            });
            homeStore.isLoading = false;
          } finally {
            homeStore.isLoading = false;
            setSubmitting(true);
          }
        }}
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
          validateForm,
        }) => (
          <Form onFinish={handleSubmit} layout="vertical">
            <Stack tokens={{ childrenGap: 10 }}>
            
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Form.Item
                          label="OtherName"
                          required
                          help={touched.otherName || errors.otherName}
                        >
                          <Input
                            placeholder="Enter your FirstName"
                            name="otherName"
                            value={values?.otherName}
                            onChange={handleChange}
                            allowClear
                          />
                        </Form.Item>
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Form.Item
                          label="LastName"
                          required
                          help={touched.lastName || errors.lastName}
                        >
                          <Input
                            placeholder="Enter your LastName"
                            name="lastName"
                            value={values?.lastName}
                            onChange={handleChange}
                            allowClear
                          />
                        </Form.Item>
                      </div>
                  </div>
                <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Form.Item
                          label="Gender"
                          required
                          className="bsformm-formItems"
                          help={touched.gender || errors.gender}
                        >
                          <Segmented
                            options={["Male", "Female"]}
                            value={values?.gender}
                            onChange={(value: SegmentedValue) => {
                              setFieldValue("gender", value, false);
                            }}
                          ></Segmented>
                        </Form.Item>
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Form.Item
                          label="Title"
                          required
                          className="bsformm-formItems"
                          help={touched.title || errors.title}
                        >
                          <Segmented
                            options={["Mr", "Mrs", "Miss", "Master"]}
                            value={values?.title}
                            onChange={(value: SegmentedValue) => {
                              setFieldValue("title", value, false);
                            }}
                          />
                        </Form.Item>
                      </div>
                  </div>
                <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Form.Item
                          label="Your Personal Email"
                          required
                          help={touched.email || errors.email}
                        >
                          <Input
                            prefix={<MailOutlined style={{ color: "#0E7BC4" }} />}
                            placeholder="Enter your Email"
                            name="email"
                            value={values?.email}
                            onChange={handleChange}
                            allowClear
                          />
                        </Form.Item>
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Form.Item
                          label="Phone Number"
                          required
                          help={touched.phoneNumber || errors.phoneNumber}
                        >
                          <PhoneInput
                            inputStyle={{width: "205px"}}
                            country={"ng"}
                            enableSearch={true}
                            value={values?.phoneNumber}
                            onChange={(phoneNumber) => {
                              setFieldValue("phoneNumber", phoneNumber);
                            }}
                          />
                        </Form.Item>
                      </div>
                  </div>
                <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Form.Item
                              label="Branch"
                              required
                              help={touched.branchId || errors.branchId}
                            >
                            <Observer>
                              {()=>(
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
                                    {[...platformStore.branchs.values()].map((branch:IBranch) => (
                                        <Option value={branch.branchId} key={branch.branchName}>
                                        {branch.branchName}
                                        </Option>
                                    ))}
                                </Select>
                              )}
                            </Observer>
                        </Form.Item>
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Form.Item
                              label="Band/Association"
                              required
                              help={touched.bandId || errors.bandId}
                            >
                            <Observer>
                              {()=>(
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
                                    {[...platformStore.bands.values()].map((band:IBand) => (
                                        <Option value={band.bandId} key={band.bandName}>
                                        {band.bandName}
                                        </Option>
                                    ))}
                                </Select>
                              )}
                            </Observer>
                        </Form.Item>
                      </div>
                  </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      <Form.Item
                            label="Principal Band"
                            required
                            help={touched.principalBandId || errors.principalBandId}
                          >
                          <Observer>
                            {()=>(
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
                                  {[...platformStore.principalBands.values()].map((pBand:IPrincipalBand) => (
                                      <Option value={pBand.principalBandId} key={pBand.principalBandName}>
                                      {pBand.principalBandName}
                                      </Option>
                                  ))}
                              </Select>
                            )}
                          </Observer>
                      </Form.Item>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                          <FormItem label="Current Rank"  help={touched.rankId || errors.rankId} required>
                              <Select
                                  style={{ width: "100%" }}
                                  placeholder="select your rank"
                                  showSearch
                                  filterOption={(input, option) =>{
                                      return String(option!.key).toLowerCase().includes(input.toLowerCase())
                                  }
                                  }
                              
                                  value={values.rankId}
                                  onChange={(val, opt: any) => {
                                      setFieldValue("rankId",val);
                                  }}
                              >
                                  {[...platformStore.ranks.values()].filter((rank:IRank)=> rank.rankGender !== genderInitials(values.gender) ).map((rank:IRank) => (
                                      <Option value={rank.rankId} key={rank.rankName}>
                                      {rank.rankName}
                                      </Option>
                                  ))}
                                
                              </Select>
                          </FormItem>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      <Form.Item
                              label="Nationality 1"
                              required
                              help={touched.nationality1Id || errors.nationality1Id}
                            >
                            <Observer>
                              {()=>(
                                <Select
                                    style={{ width: "100%" }}
                                    placeholder="select your nationality"
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
                                    {[...platformStore.nationalities.values()].map((nat:INationality) => (
                                        <Option value={nat.nationalityId} key={nat.nationalityName}>
                                        {nat.nationalityName}
                                        </Option>
                                    ))}
                                </Select>
                              )}
                            </Observer>
                      </Form.Item>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Form.Item
                              label="Nationality 2"
                              required
                              help={touched.nationality2Id || errors.nationality2Id}
                            >
                            <Observer>
                              {()=>(
                                <Select
                                    style={{ width: "100%" }}
                                    placeholder="select your nationality"
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
                                    {[...platformStore.nationalities.values()].map((nat:INationality) => (
                                        <Option value={nat.nationalityId} key={nat.nationalityName}>
                                        {nat.nationalityName}
                                        </Option>
                                    ))}
                                </Select>
                              )}
                            </Observer>
                        </Form.Item>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem label="Profession"  help={touched.professionId || errors.professionId}>
                          <Observer>
                              {()=>(
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
                           )}
                          </Observer>
                        </FormItem>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <FormItem label="Qualification"  help={touched.qualificationId || errors.qualificationId}>
                          <Observer>
                              {()=>(
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
                             )}
                             </Observer>
                        </FormItem>
                    </div>
                </div>
                
              </div>
              
              <Form.Item required help={touched.password && errors.password}>
                <Input.Password
                  placeholder="Password"
                  prefix={<LockOutlined style={{ color: "#0E7BC4" }} />}
                  name="password"
                  value={values?.password}
                  onChange={handleChange}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                required
                help={touched.confirmPassword && errors.confirmPassword}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  prefix={<LockOutlined style={{ color: "#0E7BC4" }} />}
                  name="confirmPassword"
                  value={values?.confirmPassword}
                  onChange={handleChange}
                  allowClear
                />
              </Form.Item>

              <Checkbox
                checked={values?.acceptTerms}
                onChange={({ target }) => {
                  console.log(target.checked);
                  setFieldValue("acceptTerms", target.checked);
                }}
              >
                I agree with{" "}
                <Link
                  style={{ color: "#0D75BB", fontSize: "12px" }}
                  onClick={() => {
                    homeStore.privacyPanel = PrivacyPolicy.Privacy;
                    homeStore.showPrivacyPanel = true;
                  }}
                >
                  Privacy policy{" "}
                </Link>{" "}
                and
                {"  "}
                <Link
                  style={{ color: "#0D75BB", fontSize: "12px" }}
                  onClick={() => {
                    homeStore.privacyPanel = PrivacyPolicy.Terms;
                    homeStore.showPrivacyPanel = true;
                  }}
                >
                  Term of use
                </Link>
              </Checkbox>
              <Form.Item>
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <Observer>
                      {() => (
                        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                          {homeStore.isLoading && (
                            <ProgressIndicator
                              description="creating your account..."
                              styles={{ root: { textAlign: "center" } }}
                            ></ProgressIndicator>
                          )}
                        </div>
                      )}
                    </Observer>{" "}
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      {" "}
                      <Stack
                        horizontal
                        horizontalAlign="end"
                        style={{ marginTop: "5px" }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{color:"white"}}
                          icon={<CheckOutlined />}
                          loading={homeStore.isLoading}
                          disabled={!values?.acceptTerms}
                        >
                          Sign Up
                        </Button>
                      </Stack>
                    </div>
                  </div>
                </div>

                <Space>
                  <div className=" ms-sm12 ms-fontSize-12">
                    Have an account?
                  </div>
                  <Link
                    style={{ color: "#0D75BB" }}
                    className=" ms-sm12 ms-fontSize-12"
                    onClick={() => {
                      homeStore.signUpView = signUpView.Login;
                    }}
                  >
                    Login
                  </Link>
                </Space>
              </Form.Item>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
});

export default Register;
