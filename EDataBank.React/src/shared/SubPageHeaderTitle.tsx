import React from "react";
import { Badge, Typography } from "antd";
const { Title } = Typography;
export const SubPageHeaderTitle = (props: any) => {
  return (
    <div className={`ms-Grid-row ${props.addclass ? props.addclass : ""}`}>
      <div className="ms-Grid-col ms-sm12 title">
        <Title
          level={4}
          style={{
            display: "inline-block",
            fontSize: "16px",
            color: !props.color ? "red" : props.color,
          }}
        >
          {props.title}
        </Title>
        <Badge
          count={props.count}
          title={`${props.count} ${props.title}`}
          overflowCount={1000000}
        />
      </div>
    </div>
  );
};
