import React, { Component } from "react";
//import "../modules/center.css";
//import { getMenu } from "../modules/helpers";

import { PageHeader, Tooltip } from "antd";
import { ChevronLeft } from "react-feather";
//import renderHTML from "react-render-html";

export function PageContainerHOC(WrappedComponent: any) {
  return class extends Component {
    render() {
      //  const menu = getMenu(this.props.match.url);
      return (
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div
                  className="ms-Grid-col ms-sm9"
                  style={{ paddingTop: "10px" }}
                >
                  <PageHeader
                    className="site-page-header"
                    onBack={() => {
                      //this.props.history.goBack();
                    }}
                    /*  title={renderHTML(menu)} */
                    /*  subTitle="This is a subtitle" */
                    backIcon={
                      <Tooltip title="go back">
                        <ChevronLeft
                          style={{ marginTop: "5px", color: "red" }}
                        />
                      </Tooltip>
                    }
                  />
                </div>

                <div
                  className="ms-Grid-col ms-sm1"
                  style={{
                    textAlign: "right",
                    width: "50px",
                    paddingTop: "10px",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div
            className="ms-Grid-col ms-sm12 "
            id="outer"
            style={{
              display: "flex",

              flexDirection: "column",
            }}
          >
            <WrappedComponent id="inner" className="ms-depth-4" />
          </div>
        </div>
      );
    }
  };
}
