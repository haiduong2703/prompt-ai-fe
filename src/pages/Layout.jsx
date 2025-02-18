import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "./Dashboard";
import RoutesMain from "../routes/Routes";
const LayoutMain = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Navbar />
          <RoutesMain />
        </Layout>
      </Layout>
    </Router>
  );
};

export default LayoutMain;
