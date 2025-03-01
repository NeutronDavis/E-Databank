import React from "react";
import IMG  from "../img/logo.gif"
type Props = {};

const LeftBanner = (props: Props) => {
  return (
    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 no-padding">
      <div className="image-wrapper">
        <div className="image-message">
          <a href="/">
            <img
            className="login-logo"
            src={IMG}
            alt="logo"
          />
            </a>
          <div className="image-hr-container">
            <h2 style={{ color: "white" }}>Welcome To ESOCS</h2>
            <hr className="image-hr" />
          </div>
          <div className="image-text">
            <p>
              This is the Eternal Sacred Order Of The Cherubim And Seraphim data bank, Login to access your profile or the admin page base on your designation.
            </p>
          </div>
          <ul className="social-icons">
            <li>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-google-plus-g"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default LeftBanner;
