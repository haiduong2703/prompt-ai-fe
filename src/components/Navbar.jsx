import { Layout, Avatar, Badge } from "antd";
import {
  BellOutlined,
  MessageOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <SearchOutlined style={{ fontSize: "18px", marginRight: "20px" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Badge count={3}>
          <BellOutlined style={{ fontSize: "18px" }} />
        </Badge>
        <Badge count={4}>
          <MessageOutlined style={{ fontSize: "18px" }} />
        </Badge>
        <Avatar src="https://i.pravatar.cc/40" />
      </div>
    </Header>
  );
};

export default Navbar;
