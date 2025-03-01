import React, { createContext, useContext, useEffect } from "react";
import { Dropdown, Panel, PanelType } from "@fluentui/react";
//import MainStore from "../../store/mainStore";
//import PreferenceStore from "../../store/preferenceStore";
import { observer } from "mobx-react-lite";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import { Divider, Drawer, InputNumber, notification, Select } from "antd";
import { toJS } from "mobx";
const { Option } = Select;
//const mainstore = createContext(MainStore);
//const prefStore = createContext(PreferenceStore);
export const ApplicationPreference = observer(() => {
  // const mainStore = useContext(mainstore);
  //const preferenceStore = useContext(prefStore);
  useEffect(() => {
    async function loadPreference() {
      /* try {
        await preferenceStore.loadPreference();
      } catch (error) {
        notification.error({
          message: "EDataBank Feedback",
          description: error.message,
        });
      } */
    }
    loadPreference();
  }, []);
  return (
    <Drawer
      visible={false} //mainStore.showSettingsDialog
      title="My Preference"
      width={300}
      onClose={() => {
        // mainStore.showSettingsDialog = false;
      }}
    >
      <Divider orientation="left" plain style={{ color: "#A0AEC0" }}>
        General
      </Divider>
      {/*  <Form layout="vertical">
        <FormItem label="Oil values decimal places">
          <InputNumber
            min={0}
            value={preferenceStore.preference?.oilValuesDecimalPlaces}
            onChange={(value) => {
              preferenceStore.preference.oilValuesDecimalPlaces = Number(value);
            }}
            onBlur={async ({ target }) => {
              let pref = preferenceStore.preference;
              preferenceStore.preference = {
                ...pref,
                oilValuesDecimalPlaces: target.value,
              };

              await preferenceStore.savePreference(
                toJS(preferenceStore.preference)
              );
            }}
          ></InputNumber>
        </FormItem>
        <FormItem label="Gas values decimal places">
          <InputNumber
            min={2}
            value={preferenceStore.preference?.gasValuesDecimalPlaces}
            onChange={(value) => {
              preferenceStore.preference.gasValuesDecimalPlaces = Number(value);
            }}
            onBlur={async ({ target }) => {
              let pref = preferenceStore.preference;
              preferenceStore.preference = {
                ...pref,
                gasValuesDecimalPlaces: target.value,
              };

              await preferenceStore.savePreference(
                toJS(preferenceStore.preference)
              );
            }}
          ></InputNumber>
        </FormItem>

        <FormItem label="Date Format">
          <Select
            value={preferenceStore.preference?.dateFormat}
            onChange={async (value) => {
              preferenceStore.preference.dateFormat = value;
              let pref = preferenceStore.preference;
              preferenceStore.preference = {
                ...pref,
                dateFormat: value,
              };

              await preferenceStore.savePreference(
                toJS(preferenceStore.preference)
              );
            }}
          >
            {preferenceStore.dateFormats.map((df, idx) => (
              <Option key={idx} value={df.key}>
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div
                      className="ms-Grid-col ms-sm6"
                      style={{ fontSize: "12px" }}
                    >
                      {df.key}
                    </div>
                    <div
                      className="ms-Grid-col ms-sm6"
                      style={{
                        fontSize: "12px",
                        backgroundColor: "#CBD5E0",
                        color: "#718096",
                      }}
                    >
                      {df.text}
                    </div>
                  </div>
                </div>
              </Option>
            ))}
          </Select>
        </FormItem>
      </Form>
      <Form layout="horizontal">
        <FormItem label="Entries decimal places"></FormItem>
      </Form> */}
    </Drawer>
  );
});
