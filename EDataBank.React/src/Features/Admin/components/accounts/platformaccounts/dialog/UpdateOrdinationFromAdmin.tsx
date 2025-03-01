import React, { createContext, useContext } from "react";

import {
  ProgressIndicator,
} from "@fluentui/react";
import { Observer, observer } from "mobx-react-lite";
import { Button, Divider, Form,Modal, Select,Space, notification } from "antd";

import { set } from "mobx";

import { Formik } from "formik";
import * as yup from "yup";
import FormItem from "antd/es/form/FormItem";

import { Dropdown,IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { TextField,ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { platformStore } from "../../../../store/platformStore";

import adminStore from "../../../../store/adminstore";
import { IOrdination, IRank } from "../../../../types/interface";
import { IOrdinationView } from "../../../../../Data/types/interfaces";
const _ = require("underscore");


const adminStoreCtx = createContext(adminStore);
const platformStoreCtx = createContext(platformStore);



export const ordinationValidationSchema = yup.object().shape({
    rankId: yup.string().required("Rank name is required").nullable(),
    nextRankId: yup.string().required("Rank order is required").nullable(),
    year: yup.string().required("Rank order is required").nullable()
  });

function UpdateOrdinationFromAdmin() {
    // const [fields, setFields] = useState<Array<string>>([]);
  const AdminStore = useContext(adminStoreCtx);

 
  const PlatformStore = useContext(platformStoreCtx);
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };
  const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 100 } };
  const iconProps = { iconName: 'Calendar' };

  let genderInitials = ()=>{
    let initial = ""
    if(AdminStore.selectedMemberFromSearch.gender === "Male"){
        initial = "F"
    }else{
        initial = "M"
    }
    return initial
  }
  return (
    <Modal
        open={AdminStore.showOrdinationDialog}
        // width={"20%"}
        title= {`Edit Ordination`}
        onCancel={() => {
            AdminStore.showOrdinationDialog= false;
           
        }}
    
        destroyOnClose={true}
        footer={false}
        maskClosable={false}
    >
 
     <Formik
        initialValues={AdminStore.selectedOrdination}
        isInitialValid={false}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting }) => {
            try {

                let ordination:IOrdination = {
                    ordinationId:AdminStore.selectedOrdination.ordinationId,
                    rankId:values.rankId,
                    usersId:String(AdminStore.selectedMemberFromSearch.id),
                    year:values.year,
                    branchId:AdminStore.selectedOrdination.branchId,
                    nextRankId:values.nextRankId
                }

                await AdminStore.updateOrdination(ordination);
             
                AdminStore.showOrdinationDialog= false;

                notification.success({
                  message: "EDataBank Feedback",
                  description:"Ordination Update Successful",
                });

                await AdminStore.getSearchedMemberInfo(String(AdminStore.selectedMemberFromSearch.id));
                AdminStore.selectedOrdination = {} as IOrdinationView
              } catch (error: any) {
                notification.error({
                  message: "EDataBank Platform Feedback ",
                  description: "error occurred:" + error?.response?.body?.msg,
                });
              }
        }}
        validationSchema={ordinationValidationSchema}
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
          isValid,
        }) => (
          <Form onFinish={handleSubmit} layout="vertical">
            <div className="ms-Grid" dir="ltr">
            <Observer>
                {()=>(
                    <>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                                <FormItem label="Rank"  help={touched.rankId || errors.rankId} required>
                                    
                                     <Dropdown
                                        // label="select your rank"
                                        defaultSelectedKey={values.rankId}
                                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any> | undefined, index?: number | undefined)=>{
                                            console.log(option?.key)
                                            setFieldValue("rankId",option?.key);
                                           
                                        }}
                                        // selectedKeys={values.rankId}
                                        options={[...PlatformStore.ranks.values()].filter((rank:IRank)=> rank.rankGender !== genderInitials() ).map((rank:IRank) => {
                                          return  { key: rank.rankId, text:rank.rankName }

                                        })}
                                        // disabled={true}
                                        styles={dropdownStyles}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                            <FormItem
                                help={touched.year || errors.year}
                                label="Rank Year"
                                required
                            >

                                <TextField 
                                    // label="With an icon" 
                                    iconProps={iconProps} 
                                    value={String(values.year)}
                                    styles={narrowTextFieldStyles}
                                    onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined)=>{
                                        console.log(newValue)
                                        setFieldValue("year", Number(newValue));
                                      
                                    }}
                                />
                            </FormItem>
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                                <FormItem label="Next Rank"  help={touched.nextRankId || errors.nextRankId} required>
                           
                                      <Dropdown
                                        // label="select your next rank"
                                        defaultSelectedKey={values.nextRankId}
                                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any> | undefined, index?: number | undefined)=>{
                                            console.log(option?.key)
                                            setFieldValue("nextRankId",option?.key);
                                            
                                        }}
                                        // selectedKeys={values.rankId}
                                        options={[...PlatformStore.ranks.values()].filter((rank:IRank)=> rank.rankGender !== genderInitials() ).map((rank:IRank) => {
                                          return  { key: rank.rankId, text:rank.rankName }
                                        })}
                                        // disabled={true}
                                        styles={dropdownStyles}
                                    />
                                </FormItem>
                            </div>
                        </div>
                    
                    </>
                )}
            </Observer>
            
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                    <FormItem>
                        <Divider />
                        {PlatformStore.isSaving && (
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                            <div
                                className="ms-Grid-col ms-sm12 ms-md12 ms-lg12"
                                style={{ paddingBottom: "5px" }}
                            >
                                <ProgressIndicator
                                description={`Please Wait: Saving Rank...`}
                                styles={{ root: { textAlign: "center" } }}
                                ></ProgressIndicator>
                            </div>
                            </div>
                        </div>
                        )}
                    </FormItem>
                    </div>
                </div>

                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ">
                    <FormItem>
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
                                AdminStore.showOrdinationDialog= false;
                            }}
                        >
                            Cancel
                        </Button>

                        <Observer>
                            {()=>(
                                <Button
                                    key="submit"
                                    htmlType="submit"
                                    type="primary"
                                    disabled={!isValid}
                                    loading={AdminStore.isUpdatingOrdination}
                                    style={{color:"wheat"}}
                                >
                                    Save
                                </Button>
                            )
                            }
                        </Observer>
                        </Space>
                    </FormItem>
                    </div>
                </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default observer(UpdateOrdinationFromAdmin);
