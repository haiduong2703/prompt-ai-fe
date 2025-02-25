import React, { useContext, useEffect, useState } from "react";
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
import ListPrompts from "../components/user/Prompt/ListPrompts/ListPrompts";
import DetailPrompt from "../components/user/Prompt/DetailPrompt/DetailPrompt";
import BlogLayout from "../pages/user/Blog";
import { UserContext } from "../context/AuthContext";
import BlogManager from "../components/admin/Blog";
import BlogCategoryManager from "../components/admin/BlogCategory";
import BlogDetailPage from "../pages/user/Blog/Detail";
import TopicAdmin from "../components/admin/Topic";
const RoutesMain = () => {
  //Giả sử có một cách để xác định role (có thể từ context/redux store)
  const { user } = useContext(UserContext); // Lấy user từ Context API
  const isAdmin = user && user.role === 2; // Kiểm tra role
  //const isAdmin = true; // Thay đổi logic này theo cách bạn xác định role
  console.log(isAdmin);
  useEffect(() => {
    document.title = "Promp";
  }, []);
  return (
    <Routes>
      {isAdmin ? (
        <Route path="/" element={<AdminLayout />}>
          <Route path="topic" element={<TopicAdmin />} />
          <Route path="prompt" element={<PromptList />} />
          <Route path="category" element={<CategoryManager />} />
          <Route path="contact" element={<ContactManager />} />
          <Route path="sub" element={<SubscriptionManager />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="blogcategory" element={<BlogCategoryManager />} />
        </Route>
      ) : (
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<UserHome />} />
          <Route path="prompts" element={<PromptLibrary />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="prompts/list-prompts" element={<ListPrompts />} />
          <Route path="prompts/detail-prompts/:id" element={<DetailPrompt />} />
          <Route path="signup" element={<Register />} />
          <Route path="blog" element={<BlogLayout />} />
          <Route path="blog/:id" element={<BlogDetailPage />} />
          <Route path="prompts/list-prompts" element={<ListPrompts />} />
        </Route>
      )}
    </Routes>
  );
};

export default RoutesMain;
