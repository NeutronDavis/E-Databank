import React, { Component } from "react";

import { Link } from "@fluentui/react";
import { Menu, Dropdown, Divider } from "antd";
import "../../styles/mobilemenu.css";
const { Item } = Menu;

export const MobileMenu = (props: any) => {
  const menu: any = () => (
    <Menu>
      {props.menus.map((menu: any) => (
        <Item key={menu.menuId}>
          <Link
            to={menu.menuUrl || ""}
            onClick={() => {
              //this.props.clearselection();
            }}
          >
            <span style={{ textDecoration: "none!important" }}>
              {menu.menu}
            </span>
          </Link>
          <Divider></Divider>
        </Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <i
        className="ms-Icon ms-Icon--GlobalNavButton ms-fontSize-42 hamburger"
        aria-hidden="true"
      ></i>
    </Dropdown>
  );
};
