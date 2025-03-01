import {
  ApiOutlined,
  BankOutlined,
  DiffOutlined,
  HddOutlined,
  NodeExpandOutlined,
  PieChartOutlined,
  RiseOutlined,
  SettingOutlined,
  UngroupOutlined,
  WomanOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import { notification } from "antd";

declare global {
  interface Window {
    appMenu: any;
  }
}
const _ = require("underscore");
export const getAntIconEquivalent = (
  name: string,
  collapsed: boolean = false
) => {
  const IconStyle = {
    fontSize: collapsed ? "24px" : "20px",
  };

  const icons = [
    {
      key: "solution",
      icon: <DiffOutlined style={IconStyle} />,
    },
    {
      key: "profile",
      icon: <ProfileOutlined style={IconStyle} />,
    },
    {
      key: "tool",
      icon: <SettingOutlined style={IconStyle} />,
    },
    {
      key: "thunderbolt",
      icon: <ApiOutlined style={IconStyle} />,
    },

    {
      key: "fiscal",
      icon: <UngroupOutlined style={IconStyle} />,
    },
    {
      key: "materialmgt",
      icon: <HddOutlined style={IconStyle} />,
    },
    {
      key: "evacuation",
      icon: <NodeExpandOutlined style={IconStyle} />,
    },
    {
      key: "maindashboard",
      icon: <PieChartOutlined style={IconStyle} />,
    },
    {
      key: "health",
      icon: <RiseOutlined style={IconStyle} />,
    },
    {
      key: "myhealthtop",
      icon: <WomanOutlined style={IconStyle} />,
    },
    {
      key: "facilitytop",
      icon: <BankOutlined style={IconStyle} />,
    },
  ];
  const comp = _.first(_.where(icons, { key: name }));
  if (comp) {
    return comp.icon;
  } else {
    return null;
  }
};
const ignoreUrls = [
  { url: "/main/userprofile/settings", title: "My Profile Settings" },
];

export const getMenuBreadCrumd = (url: string) => {
  try {
    const exist = _.where(ignoreUrls, { url: url });
    if (exist.length) {
      return _.first(exist).title;
    }
    //return url;

    const appMenu = window.appMenu;
    if (!appMenu?.length) return "";
    const sm = _.first(
      _.where(_.flatten(_.pluck(appMenu, "subMenus")), { url: url })
    );
    let subMenu;

    if (sm) {
      subMenu = sm.name;

      const menuName = _.first(
        _.where(window.appMenu, { menuId: sm.menuId })
      ).menu;

      if (subMenu === menuName) return ` ${menuName}`;
      return ` <span style="font-weight:400;">${menuName} </span>| <span style="font-weight:400;color:#1890FF">${subMenu}</span>`;
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: "Something went wrong",
      description: "an error occured while loading...",
    });
  }
};

export const selectMenu = (url: string) => {
  if (!window.appMenu) return;
  const appMenu = window.appMenu;
  if (!appMenu && appMenu.length) return "";
  const sm = _.first(
    _.where(_.flatten(_.pluck(appMenu, "subMenus")), { url: url })
  );

  if (sm) {
    return sm;
  }

  var menu = _.first(_.where(appMenu, { menuUrl: url }));

  return menu;
};

export const canView = (subMenuId: string | number, permisions: any) => {
  const canView = _.first(
    _.where(permisions, { subMenuId: subMenuId })
  ).canView;
  return canView;
};

export const getCurrentUser = () =>
  JSON.parse(window.localStorage.getItem("currentUser") || "{}");
export const setCurrentUser = (data: any) => {
  window.sessionStorage.setItem("currentUser", JSON.stringify(data));
};
