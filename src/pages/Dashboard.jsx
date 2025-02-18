import { Layout } from "antd";

const { Content } = Layout;

const Dashboard = () => {
  return (
    <Content
      style={{
        margin: "20px",
        padding: "20px",
        background: "#fff",
        minHeight: "80vh",
      }}
    >
      <h2>Dashboard</h2>
      <p>Welcome to the admin panel.</p>
    </Content>
  );
};

export default Dashboard;
