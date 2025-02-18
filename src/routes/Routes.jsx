import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import PromptLibrary from "../components/user/PromptLibrary";

const RoutesMain = () => {
  // Giả sử có một cách để xác định role (có thể từ context/redux store)
  const isAdmin = false; // Thay đổi logic này theo cách bạn xác định role

  return (
    <Routes>
      {isAdmin ? (
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* Thêm các route admin khác ở đây */}
        </Route>
      ) : (
        <Route path="/" element={<PromptLibrary />} />
      )}
    </Routes>
  );
};

export default RoutesMain;