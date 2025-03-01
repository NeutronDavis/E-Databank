import React from "react";
import loginsvg from "../../img/login.svg";
type Props = {};

export const FormBanner = (props: Props) => {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12">
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-sm12">
              <img
                src={loginsvg}
                alt="EDataBank pass"
                style={{ width: "200px" }}
              />
            </div>
          </div>
          <div className="ms-Grid-row">
            {" "}
            <div className="ms-Grid-col ms-sm12" style={{ color: "black" }}>
              <div style={{ textAlign: "center" }}>
                <span className="ms-fontSize-20 ">
                  We need your ESOCS Pass 
                </span>
              </div>

              <div>
                <small className="smalltext">
                  Enter your credentials to login.{" "}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
