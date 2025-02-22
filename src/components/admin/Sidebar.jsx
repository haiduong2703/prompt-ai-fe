import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  TableOutlined,
  FormOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa user khỏi localStorage
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };

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
          <Link to="prompt">Quản lý Prompts</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="category">Quản lý thể loại</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TableOutlined />}>
          <Link to="contact">Quản lý liên hệ</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<TableOutlined />}>
          <Link to="sub">Quản lý gói đăng ký</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<FormOutlined />}>
          <Link to="/forms">Forms</Link>
        </Menu.Item>
        {/* Nút đăng xuất */}
        <Menu.Item
          key="6"
          icon={<LogoutOutlined />}
          onClick={handleLogout} // Xử lý đăng xuất
        >
          Đăng xuất
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
