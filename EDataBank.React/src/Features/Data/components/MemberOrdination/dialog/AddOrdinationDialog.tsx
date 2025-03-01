import { DialogType, DialogFooter,Dialog} from "@fluentui/react/lib/Dialog";
import React, { createContext, useContext, useState } from "react";

import {
  DefaultButton,
  PrimaryButton,
  ProgressIndicator,
} from "@fluentui/react";
import { Observer, observer } from "mobx-react-lite";
import { Button, Divider, Form, Input, InputNumber, Modal, Select, Skeleton, Space, notification } from "antd";
import DialogEx from "../../../../../Utility/IDialog";
import { getCurrentUser } from "../../../../../Utility/helper";
import { set } from "mobx";

import { Formik } from "formik";
import * as yup from "yup";
import FormItem from "antd/es/form/FormItem";
import { platformStore } from "../../../../Admin/store/platformStore";
import memberOrdinationStore from "../../../store/memberOrdinationStore";
import { ChangesType, IChangeRequest, IChanges } from "../../../../Admin/components/profileChangeRequest/types/interface";
import { changeRequestStore } from "../../../../Admin/components/profileChangeRequest/store/ChangeRequestStore";
import { IOrdination, IRank } from "../../../../Admin/types/interface";
import { IOrdinationView } from "../../../types/interfaces";
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { TextField, MaskedTextField,ITextFieldStyles } from '@fluentui/react/lib/TextField';
const _ = require("underscore");
const { Option } = Select;
const memberOrdinationStoreCtx = createContext(memberOrdinationStore);
const platformStoreCtx = createContext(platformStore);
const changeRequestStoreCtx = createContext(changeRequestStore);


export const ordinationValidationSchema = yup.object().shape({
    rankId: yup.string().required("Rank name is required").nullable(),
    nextRankId: yup.string().required("Rank order is required").nullable(),
    year: yup.string().required("Rank order is required").nullable()
  });

let initData:IOrdination = {} as IOrdination

function AddOrdinationDialog() {
    const [fields, setFields] = useState<Array<string>>([]);
  const MemberOrdinationStore = useContext(memberOrdinationStoreCtx);
  const ChangeRequestStore = useContext(changeRequestStoreCtx);
 
  const PlatformStore = useContext(platformStoreCtx);
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };
  const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 100 } };
  const iconProps = { iconName: 'Calendar' };

  let genderInitials = ()=>{
    let initial = ""
    if(getCurrentUser().gender === "Male"){
        initial = "F"
    }else{
        initial = "M"
    }
    return initial
  }
  return (
    <Modal
        open={MemberOrdinationStore.showAddDialog}
        // width={"20%"}
        title= {`Add Ordination`}
        onCancel={() => {
            MemberOrdinationStore.showAddDialog= false;
        }}
    
        destroyOnClose={true}
        footer={false}
        maskClosable={false}
    >
 
     <Formik
        initialValues={initData}
        isInitialValid={false}
        validateOnBlur={true}
        validateOnChange={true}
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
                    changesType:ChangesType.NewOrdination,
                    fieldsModified:vd.map((value: IChanges)=>value.field).join(","),
                    fieldValue:vd.map((value: IChanges)=>value.value).join(","),
                    ordinationId:0,
                    usersId:getCurrentUser().id
                }
      
                let retVal = await ChangeRequestStore.submitChangeRequest(request);
                if(retVal.success){
                    MemberOrdinationStore.showAddDialog= false;
                    notification.success({
                      message: "EDataBank Feedback",
                      description: retVal.msg,
                    });
                }
              
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
                                            setFields(f=>[...f,"rankId"])
                                            setFieldValue("branchId",getCurrentUser().branchId);
                                            setFields(f=>[...f,"branchId"])
                                          
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
                                    value={values.year?String(values.year):""}
                                    styles={narrowTextFieldStyles}
                                    onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined)=>{
                                        setFieldValue("year", Number(newValue));
                                        setFields(f=>[...f,"year"])
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
                                            setFieldValue("nextRankId",option?.key);
                                            setFields(f=>[...f,"nextRankId"])
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
                            MemberOrdinationStore.showAddDialog = false;
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
                                    loading={ChangeRequestStore.isSaving}
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

export default observer(AddOrdinationDialog);
