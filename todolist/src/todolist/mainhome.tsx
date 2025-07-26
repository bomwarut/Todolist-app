import { useState } from "react";
import {
  CalendarOutlined,
  LogoutOutlined,
  MoonOutlined,
  PieChartOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu, Typography, type MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth, type User } from "../auth/authcontext";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { toggleTheme } from "../redux/themeSlice";

export default function Mainhomecomponent() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const rawuserdata: string = localStorage.getItem("user") || "";
  const userdata: User = JSON.parse(rawuserdata);

  const [collapsed, setCollapsed] = useState<boolean>(false);

  type MenuItem = Required<MenuProps>["items"][number];

  const signout = () => {
    logout();
    navigate("/signin");
    if (theme === "dark") {
      dispatch(toggleTheme());
    }
  };

  const items: MenuItem[] = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/"),
    },
    {
      key: "2",
      icon: <CalendarOutlined />,
      label: "Todolist",
      onClick: () => navigate("todolist"),
    },
    {
      key: "3",
      icon: (
        <Flex>{theme === "light" ? <SunOutlined /> : <MoonOutlined />}</Flex>
      ),
      label: theme === "light" ? "Dark mode" : "Light mode",
      onClick: () => dispatch(toggleTheme()),
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: userdata.email || "",
      children: [
        {
          key: "5",
          label: "Signout",
          icon: <LogoutOutlined />,
          onClick: () => signout(),
        },
      ],
    },
  ];

  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        theme={theme as "light" | "dark"}
        onCollapse={(value) => setCollapsed(value)}
      >
        {!collapsed && (
          <Typography.Title
            level={1}
            style={{
              margin: "18px",
              color: theme === "dark" ? "white" : "",
            }}
          >
            Todo app
          </Typography.Title>
        )}
        <Menu
          mode="inline"
          theme={theme as "light" | "dark"}
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
