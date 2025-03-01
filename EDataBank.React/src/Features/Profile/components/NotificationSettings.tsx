import React from "react";
import { List, Switch } from "antd";

export const NotificationSettings = () => {
  const getData = () => [
    {
      title: "Account Password",
      description: <>Notify me by sending my password to bounding email</>,
      actions: [
        <Switch
          checkedChildren="enable"
          unCheckedChildren="disable"
          defaultChecked
          disabled
        />,
      ],
    },

    {
      title: "Notification Trail",
      description: `Enable Inbox messages and notifications trail `,
      actions: [
        <Switch
          checkedChildren="enable"
          unCheckedChildren="disable"
          defaultChecked
          onClick={() => {}}
          disabled
        />,
      ],
    },

    {
      title: "Security Email",
      description: `Send Password to my bounding email only`,
      actions: [
        <Switch
          checkedChildren="enable"
          unCheckedChildren="disable"
          defaultChecked
          disabled
        />,
      ],
    },
    {
      title: "Messages  and Email Format",
      description: `Enable only HTML format`,
      actions: [
        <Switch
          checkedChildren="enable"
          unCheckedChildren="disable"
          defaultChecked
          disabled
        />,
      ],
    },
  ];
  return (
    <div
      className="ms-Grid"
      dir="ltr"
      style={{
        paddingTop: "8px",
        paddingRight: "40px",
        paddingBottom: "8px",
        paddingLeft: "40px",
      }}
    >
      <div className="ms-Grid-row">
        <div
          className="ms-Grid-col ms-sm12"
          style={{
            marginBottom: "12px",
            color: "rgba(0,0,0,.85)",
            fontWeight: "500",
            fontSize: "20px",
            lineHeight: "28px",
          }}
        >
          Notification and Messages
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          <List
            itemLayout="horizontal"
            dataSource={getData()}
            renderItem={(item) => (
              <List.Item actions={item.actions}>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default NotificationSettings;
