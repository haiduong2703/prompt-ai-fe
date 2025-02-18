import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  TableOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider collapsible style={{ minHeight: "100vh" }}>
      <div
        className="logo"
        style={{
          height: 64,
          textAlign: "center",
          padding: "16px",
          color: "#fff",
          fontSize: 18,
        }}
      >
        ElaAdmin
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/">Quản lý Prompts</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="/category">Quản lý thể loại</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TableOutlined />}>
          <Link to="/tables">Tables</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FormOutlined />}>
          <Link to="/forms">Forms</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
