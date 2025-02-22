import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PromptList from "../components/admin/Prompt/PromptList";
import CategoryManager from "../components/admin/Category/CategoryAdmin";
import AdminLayout from "../pages/admin/AdminLayout";
import PromptLibrary from "../components/user/Prompt/PromptLibrary";
import UserLayout from "../pages/user/UserLayout/UserLayout";
import Pricing from "../components/user/Pricing/Pricing";
import Contact from "../components/user/Contact/Contact";
import UserHome from "../components/user/UserHome/Home";
import ContactManager from "../components/admin/Contact/ContactAdmin";
import Login from "../pages/user/Login";
import Register from "../pages/user/register";
import SubscriptionManager from "../components/admin/Subscription";
const RoutesMain = () => {
  // Giả sử có một cách để xác định role (có thể từ context/redux store)
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  // const isAdmin = user && user.role == 2 ? true : false; // Thay đổi logic này theo cách bạn xác định role
  const isAdmin = false; // Thay đổi logic này theo cách bạn xác định role
  console.log(isAdmin);
  return (
    <Routes>
      {isAdmin ? (
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="prompt" element={<PromptList />} />
          <Route path="category" element={<CategoryManager />} />
          <Route path="contact" element={<ContactManager />} />
          <Route path="sub" element={<SubscriptionManager />} />
        </Route>
      ) : (
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<UserHome />} />
          <Route path="prompts" element={<PromptLibrary />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<Register />} />
        </Route>
      )}
    </Routes>
  );
};

export default RoutesMain;
