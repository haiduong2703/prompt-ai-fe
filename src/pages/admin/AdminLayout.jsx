import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
