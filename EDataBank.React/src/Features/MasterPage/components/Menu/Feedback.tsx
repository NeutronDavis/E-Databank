import React from "react";
import { Button, Modal, Radio, Space } from "antd";
type Props = {};

const Feedback = (props: Props) => {
  return (
    <Modal
      title="Basic Modal"
      visible={true}
      onOk={() => {}}
      onCancel={() => {}}
    >
      <Radio.Group onChange={() => {}} value={1}>
        <Space direction="vertical">
          <Radio value={1}>Payment Issue</Radio>
          <Radio value={2}>Service Issue</Radio>
          <Radio value={4}>Platform Bug/Crash Reporting</Radio>
          <Radio value={5}>New Feature Request</Radio>
          <Radio value={6}>Commendation</Radio>
        </Space>
      </Radio.Group>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default Feedback;
