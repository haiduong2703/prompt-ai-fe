import React from "react";
import { Route, Routes } from "react-router-dom";
import PromptList from "../components/Prompt/PromptList";
import CategoryManager from "../components/Category/CategoryAdmin";
import AdminLayout from "../pages/admin/AdminLayout";
import PromptLibrary from "../components/user/PromptLibrary";

const RoutesMain = () => {
  // Giả sử có một cách để xác định role (có thể từ context/redux store)
  const isAdmin = true; // Thay đổi logic này theo cách bạn xác định role

  return (
    <Routes>
      {isAdmin ? (
        <Route path="/" element={<AdminLayout />}>
          <Route path="/prompt" element={<PromptList />} />
          <Route path="/category" element={<CategoryManager />} />
        </Route>
      ) : (
        <Route path="/" element={<PromptLibrary />} />
      )}
    </Routes>
  );
};

export default RoutesMain;
