import React from "react";
import { Route, Routes, Navigate  } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import PromptLibrary from "../components/user/Prompt/PromptLibrary";
import UserLayout from "../pages/user/UserLayout/UserLayout";
import Pricing from "../components/user/Pricing/Pricing";
import Contact from "../components/user/Contact/Contact";
import UserHome from "../components/user/UserHome/Home";

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
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<UserHome />} />
          <Route path="prompts" element={<PromptLibrary />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
      </Route>

      )}
    </Routes>
  );
};

export default RoutesMain;